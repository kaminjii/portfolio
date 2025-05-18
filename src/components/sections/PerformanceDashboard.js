"use client";

import React, { useState, useEffect, useRef } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { X, BarChart, Cpu, Zap, Clock, ChevronDown, ChevronUp } from 'lucide-react';

const PerformanceDashboard = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('metrics');
  const [metrics, setMetrics] = useState({
    fps: 0,
    memory: 0,
    loadTime: 0,
    timeToInteractive: 0,
    firstContentfulPaint: 0,
    largestContentfulPaint: 0
  });
  const [fpsHistory, setFpsHistory] = useState([]);
  const [memoryHistory, setMemoryHistory] = useState([]);
  const frameRef = useRef(0);
  const lastFrameTimeRef = useRef(performance.now());
  const frameCountRef = useRef(0);
  const intervalRef = useRef(null);

  // Calculate FPS
  const calculateFPS = () => {
    frameCountRef.current++;
    const now = performance.now();
    const elapsed = now - lastFrameTimeRef.current;
    
    if (elapsed >= 1000) {
      const fps = Math.round((frameCountRef.current * 1000) / elapsed);
      setMetrics(prev => ({ ...prev, fps }));
      setFpsHistory(prev => {
        const newHistory = [...prev, { time: new Date().toLocaleTimeString(), value: fps }];
        if (newHistory.length > 30) newHistory.shift();
        return newHistory;
      });
      
      frameCountRef.current = 0;
      lastFrameTimeRef.current = now;
    }
    
    frameRef.current = requestAnimationFrame(calculateFPS);
  };

  // Get memory usage
  const getMemoryUsage = () => {
    if (performance && performance.memory) {
      const usedHeapSize = Math.round(performance.memory.usedJSHeapSize / (1024 * 1024));
      setMetrics(prev => ({ ...prev, memory: usedHeapSize }));
      setMemoryHistory(prev => {
        const newHistory = [...prev, { time: new Date().toLocaleTimeString(), value: usedHeapSize }];
        if (newHistory.length > 30) newHistory.shift();
        return newHistory;
      });
    }
  };

  // Get page load metrics
  const getPageLoadMetrics = () => {
    if (window.performance && window.performance.timing) {
      const timing = window.performance.timing;
      
      // Page load time (from navigation start to load event end)
      const loadTime = timing.loadEventEnd - timing.navigationStart;
      
      // Time to interactive (approximation)
      const timeToInteractive = timing.domInteractive - timing.navigationStart;
      
      // Paint metrics from Performance API if available
      let firstContentfulPaint = 0;
      let largestContentfulPaint = 0;
      
      const paintEntries = performance.getEntriesByType('paint');
      if (paintEntries.length) {
        for (const entry of paintEntries) {
          if (entry.name === 'first-contentful-paint') {
            firstContentfulPaint = Math.round(entry.startTime);
          }
        }
      }
      
      // Try to get LCP if available (Chrome only)
      try {
        const perfObserver = new PerformanceObserver((list) => {
          const entries = list.getEntries();
          const lastEntry = entries[entries.length - 1];
          largestContentfulPaint = Math.round(lastEntry.startTime);
          setMetrics(prev => ({ ...prev, largestContentfulPaint }));
        });
        perfObserver.observe({ type: 'largest-contentful-paint', buffered: true });
      } catch (e) {
        // LCP not supported in this browser
      }
      
      setMetrics(prev => ({
        ...prev,
        loadTime: Math.round(loadTime),
        timeToInteractive: Math.round(timeToInteractive),
        firstContentfulPaint
      }));
    }
  };

  // Initialize performance monitoring
  useEffect(() => {
    // Get initial page load metrics
    getPageLoadMetrics();
    
    // Start FPS calculation
    frameRef.current = requestAnimationFrame(calculateFPS);
    
    // Start memory monitoring
    if (performance && performance.memory) {
      intervalRef.current = setInterval(getMemoryUsage, 2000);
    }
    
    return () => {
      cancelAnimationFrame(frameRef.current);
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  // Format milliseconds to a readable format
  const formatTime = (ms) => {
    if (ms < 1000) return `${ms}ms`;
    return `${(ms / 1000).toFixed(2)}s`;
  };

  // Get color based on performance 
  const getMetricColor = (metric, value) => {
    // Thresholds based on web.dev performance metrics
    const thresholds = {
      fps: { good: 50, average: 30 },
      loadTime: { good: 2000, average: 4000 },
      timeToInteractive: { good: 3500, average: 7500 },
      firstContentfulPaint: { good: 1800, average: 3000 },
      largestContentfulPaint: { good: 2500, average: 4000 }
    };
    
    if (!thresholds[metric]) return 'text-gray-300';
    
    if (value <= thresholds[metric].good) return 'text-green-400';
    if (value <= thresholds[metric].average) return 'text-amber-400';
    return 'text-red-400';
  };

  // Component Tree for Architecture Tab
  const ComponentTree = () => (
    <div className="mt-4 text-xs">
      <div className="mb-5">
        <h4 className="text-sm font-medium text-teal-400 mb-2">Component Hierarchy</h4>
        <div className="pl-3 border-l border-gray-700">
          <div className="mb-2">
            <span className="text-white font-medium">App</span>
            <div className="pl-3 border-l border-gray-700 mt-1">
              <div className="mb-1"><span className="text-teal-400">├─</span> Header</div>
              <div className="mb-1"><span className="text-teal-400">├─</span> ParticleBackground</div>
              <div className="mb-1"><span className="text-teal-400">├─</span> CustomCursor</div>
              <div className="mb-1">
                <span className="text-teal-400">├─</span> Main
                <div className="pl-3 border-l border-gray-700 mt-1">
                  <div className="mb-1"><span className="text-blue-400">├─</span> HomeSection</div>
                  <div className="mb-1"><span className="text-blue-400">├─</span> AboutSection</div>
                  <div className="mb-1"><span className="text-blue-400">├─</span> ExperienceSection</div>
                  <div className="mb-1"><span className="text-blue-400">├─</span> ProjectsSection</div>
                  <div className="mb-1"><span className="text-blue-400">├─</span> ContactSection</div>
                  <div className="mb-1"><span className="text-blue-400">└─</span> GitHubSection</div>
                </div>
              </div>
              <div className="mb-1"><span className="text-teal-400">├─</span> Footer</div>
              <div><span className="text-teal-400">└─</span> StickyThemeToggle</div>
            </div>
          </div>
        </div>
      </div>
    
      <div>
        <h4 className="text-sm font-medium text-teal-400 mb-2">Data Flow</h4>
        <div className="bg-gray-800/50 p-3 rounded-md border border-gray-700">
          <div className="flex items-center justify-between mb-2">
            <span>React Context API</span>
            <span className="px-2 py-0.5 bg-blue-500/20 text-blue-400 rounded-md text-xs">State Management</span>
          </div>
          <ul className="space-y-1">
            <li className="flex items-center gap-2">
              <span className="w-2 h-2 bg-purple-400 rounded-full"></span>
              <span>ThemeContext</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );

  // Custom tooltip for charts
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-gray-800 border border-gray-700 p-2 rounded shadow-md text-xs">
          <p className="text-teal-400">{label}</p>
          <p className="text-gray-300">{`Value: ${payload[0].value}`}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className={`fixed right-6 bottom-6 z-50 transition-all duration-300 ${isOpen ? 'w-80' : 'w-auto'}`}>
      {/* Dashboard Panel */}
      <div className={`bg-gray-900/95 backdrop-blur-md border border-gray-700 rounded-lg shadow-xl overflow-hidden transition-all duration-300 ${isOpen ? 'max-h-96' : 'max-h-0 opacity-0 pointer-events-none'}`}>
        <div className="p-4">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-teal-400 font-medium">Performance Dashboard</h3>
            <button 
              onClick={() => setIsOpen(false)} 
              className="text-gray-400 hover:text-white"
              aria-label="Close dashboard"
            >
              <X size={16} />
            </button>
          </div>
          
          {/* Tab Navigation */}
          <div className="flex border-b border-gray-700 mb-4">
            <button 
              onClick={() => setActiveTab('metrics')} 
              className={`px-4 py-2 text-xs font-medium ${activeTab === 'metrics' ? 'text-teal-400 border-b-2 border-teal-400' : 'text-gray-400'}`}
            >
              Metrics
            </button>
            <button 
              onClick={() => setActiveTab('architecture')} 
              className={`px-4 py-2 text-xs font-medium ${activeTab === 'architecture' ? 'text-teal-400 border-b-2 border-teal-400' : 'text-gray-400'}`}
            >
              Architecture
            </button>
          </div>
          
          {/* Tab Content */}
          {activeTab === 'metrics' && (
            <div className="h-64 overflow-auto">
              {/* Current Metrics */}
              <div className="grid grid-cols-2 gap-3 mb-4">
                <div className="p-3 bg-gray-800/50 rounded-md border border-gray-700">
                  <div className="flex justify-between items-center mb-1">
                    <div className="flex items-center gap-1 text-xs text-gray-400">
                      <BarChart size={12} />
                      <span>FPS</span>
                    </div>
                    <span className={`text-sm font-medium ${getMetricColor('fps', metrics.fps)}`}>
                      {metrics.fps}
                    </span>
                  </div>
                  <div className="h-16">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={fpsHistory}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                        <XAxis dataKey="time" tick={false} />
                        <YAxis domain={[0, 'dataMax + 10']} tick={{ fontSize: 10 }} width={25} />
                        <Tooltip content={<CustomTooltip />} />
                        <Line type="monotone" dataKey="value" stroke="#0d9488" dot={false} />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </div>
                
                <div className="p-3 bg-gray-800/50 rounded-md border border-gray-700">
                  <div className="flex justify-between items-center mb-1">
                    <div className="flex items-center gap-1 text-xs text-gray-400">
                      <Cpu size={12} />
                      <span>Memory</span>
                    </div>
                    <span className="text-sm font-medium text-gray-300">
                      {metrics.memory} MB
                    </span>
                  </div>
                  <div className="h-16">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={memoryHistory}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                        <XAxis dataKey="time" tick={false} />
                        <YAxis domain={['dataMin - 10', 'dataMax + 10']} tick={{ fontSize: 10 }} width={25} />
                        <Tooltip content={<CustomTooltip />} />
                        <Line type="monotone" dataKey="value" stroke="#8884d8" dot={false} />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </div>
              
              {/* Page Load Metrics */}
              <h4 className="text-sm font-medium text-teal-400 mb-2">Page Load Metrics</h4>
              <div className="space-y-2">
                <div className="flex justify-between items-center p-2 bg-gray-800/30 rounded-md">
                  <div className="flex items-center gap-2">
                    <Zap size={14} className="text-amber-400" />
                    <span className="text-xs">Page Load Time</span>
                  </div>
                  <span className={`text-xs font-medium ${getMetricColor('loadTime', metrics.loadTime)}`}>
                    {formatTime(metrics.loadTime)}
                  </span>
                </div>
                
                <div className="flex justify-between items-center p-2 bg-gray-800/30 rounded-md">
                  <div className="flex items-center gap-2">
                    <Clock size={14} className="text-blue-400" />
                    <span className="text-xs">Time to Interactive</span>
                  </div>
                  <span className={`text-xs font-medium ${getMetricColor('timeToInteractive', metrics.timeToInteractive)}`}>
                    {formatTime(metrics.timeToInteractive)}
                  </span>
                </div>
                
                <div className="flex justify-between items-center p-2 bg-gray-800/30 rounded-md">
                  <div className="flex items-center gap-2">
                    <BarChart size={14} className="text-green-400" />
                    <span className="text-xs">First Contentful Paint</span>
                  </div>
                  <span className={`text-xs font-medium ${getMetricColor('firstContentfulPaint', metrics.firstContentfulPaint)}`}>
                    {formatTime(metrics.firstContentfulPaint)}
                  </span>
                </div>
                
                {metrics.largestContentfulPaint > 0 && (
                  <div className="flex justify-between items-center p-2 bg-gray-800/30 rounded-md">
                    <div className="flex items-center gap-2">
                      <BarChart size={14} className="text-purple-400" />
                      <span className="text-xs">Largest Contentful Paint</span>
                    </div>
                    <span className={`text-xs font-medium ${getMetricColor('largestContentfulPaint', metrics.largestContentfulPaint)}`}>
                      {formatTime(metrics.largestContentfulPaint)}
                    </span>
                  </div>
                )}
              </div>
            </div>
          )}
          
          {activeTab === 'architecture' && (
            <div className="h-64 overflow-auto">
              <ComponentTree />
            </div>
          )}
        </div>
      </div>
      
      {/* Toggle Button */}
      <button 
        onClick={() => setIsOpen(!isOpen)} 
        className="ml-auto flex items-center gap-2 bg-gray-800/90 backdrop-blur-sm shadow-lg border border-gray-700 text-teal-400 px-3 py-2 rounded-lg hover:bg-gray-700/90 transition-colors duration-300"
      >
        <Cpu size={16} />
        <span className="text-xs font-medium">Performance</span>
        {isOpen ? <ChevronDown size={14} /> : <ChevronUp size={14} />}
      </button>
    </div>
  );
};

export default PerformanceDashboard;