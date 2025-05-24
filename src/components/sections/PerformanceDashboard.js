"use client";

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { X, BarChart, Cpu, Zap, Clock, ChevronDown, ChevronUp } from 'lucide-react';
import { useTheme } from '../../app/ThemeContext';
import useThemeClasses, { cx } from '../../app/ThemeUtils';

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
  const { theme } = useTheme();
  const classes = useThemeClasses();

  const calculateFPS = useCallback(() => {
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
  }, []);

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

  const getPageLoadMetrics = () => {
    if (window.performance && window.performance.timing) {
      const timing = window.performance.timing;
      
      const loadTime = timing.loadEventEnd - timing.navigationStart;
      
      const timeToInteractive = timing.domInteractive - timing.navigationStart;
      
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

  useEffect(() => {
    getPageLoadMetrics();
    
    frameRef.current = requestAnimationFrame(calculateFPS);
    
    if (performance && performance.memory) {
      intervalRef.current = setInterval(getMemoryUsage, 2000);
    }
    
    return () => {
      cancelAnimationFrame(frameRef.current);
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [calculateFPS]);

  const formatTime = (ms) => {
    if (ms < 1000) return `${ms}ms`;
    return `${(ms / 1000).toFixed(2)}s`;
  };

  const getMetricColor = (metric, value) => {
    const thresholds = {
      fps: { good: 50, average: 30 },
      loadTime: { good: 2000, average: 4000 },
      timeToInteractive: { good: 3500, average: 7500 },
      firstContentfulPaint: { good: 1800, average: 3000 },
      largestContentfulPaint: { good: 2500, average: 4000 }
    };
    
    if (!thresholds[metric]) return theme === 'dark' ? 'text-gray-300' : 'text-gray-700';
    
    if (value <= thresholds[metric].good) return 'text-green-400';
    if (value <= thresholds[metric].average) return 'text-amber-400';
    return 'text-red-400';
  };

  const ComponentTree = () => (
    <div className="mt-4 text-xs">
      <div className="mb-5">
        <h4 className="text-sm font-medium text-teal-400 mb-2">Component Hierarchy</h4>
        <div className={cx(
          "pl-3 border-l",
          theme === 'dark' ? "border-gray-700" : "border-gray-300"
        )}>
          <div className="mb-2">
            <span className={cx(
              "font-medium",
              theme === 'dark' ? "text-white" : "text-gray-900"
            )}>App</span>
            <div className={cx(
              "pl-3 border-l mt-1",
              theme === 'dark' ? "border-gray-700" : "border-gray-300"
            )}>
              <div className="mb-1"><span className="text-teal-400">├─</span> Header</div>
              <div className="mb-1"><span className="text-teal-400">├─</span> ParticleBackground</div>
              <div className="mb-1"><span className="text-teal-400">├─</span> CustomCursor</div>
              <div className="mb-1">
                <span className="text-teal-400">├─</span> Main
                <div className={cx(
                  "pl-3 border-l mt-1",
                  theme === 'dark' ? "border-gray-700" : "border-gray-300"
                )}>
                  <div className="mb-1"><span className="text-blue-400">├─</span> HomeSection</div>
                  <div className="mb-1"><span className="text-blue-400">├─</span> AboutSection</div>
                  <div className="mb-1"><span className="text-blue-400">├─</span> ExperienceSection</div>
                  <div className="mb-1"><span className="text-blue-400">├─</span> ProjectsSection</div>
                  <div className="mb-1"><span className="text-blue-400">├─</span> ContactSection</div>
                  <div className="mb-1"><span className="text-blue-400">└─</span> GitHubSection</div>
                </div>
              </div>
              <div className="mb-1"><span className="text-teal-400">├─</span> Footer</div>
              <div><span className="text-teal-400">└─</span> ThemeToggle</div>
            </div>
          </div>
        </div>
      </div>
    
      <div>
        <h4 className="text-sm font-medium text-teal-400 mb-2">Data Flow</h4>
        <div className={cx(
          "p-3 rounded-md border",
          theme === 'dark' ? "bg-gray-800/50 border-gray-700" : "bg-gray-100 border-gray-200"
        )}>
          <div className="flex items-center justify-between mb-2">
            <span>React Context API</span>
            <span className={cx(
              "px-2 py-0.5 rounded-md text-xs",
              theme === 'dark' ? "bg-blue-500/20 text-blue-400" : "bg-blue-100 text-blue-600"
            )}>State Management</span>
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

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className={cx(
          "border p-2 rounded shadow-md text-xs",
          theme === 'dark' ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"
        )}>
          <p className="text-teal-400">{label}</p>
          <p className={theme === 'dark' ? "text-gray-300" : "text-gray-700"}>{`Value: ${payload[0].value}`}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className={`fixed right-6 bottom-6 z-50 transition-all duration-300 ${isOpen ? 'w-80' : 'w-auto'}`}>
      {/* Dashboard Panel */}
      <div className={cx(
        "border rounded-lg shadow-xl overflow-hidden transition-all duration-300",
        theme === 'dark' ? "bg-gray-900/95 backdrop-blur-md border-gray-700" : "bg-white/95 backdrop-blur-md border-gray-200",
        isOpen ? 'max-h-96' : 'max-h-0 opacity-0 pointer-events-none'
      )}>
        <div className="p-4">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-teal-400 font-medium">Performance Dashboard</h3>
            <button 
              onClick={() => setIsOpen(false)} 
              className={cx(
                theme === 'dark' ? "text-gray-400 hover:text-white" : "text-gray-500 hover:text-gray-900"
              )}
              aria-label="Close dashboard"
            >
              <X size={16} />
            </button>
          </div>
          
          {/* Tab Navigation */}
          <div className={cx(
            "flex border-b mb-4",
            theme === 'dark' ? "border-gray-700" : "border-gray-200"
          )}>
            <button 
              onClick={() => setActiveTab('metrics')} 
              className={cx(
                "px-4 py-2 text-xs font-medium",
                activeTab === 'metrics' 
                  ? "text-teal-400 border-b-2 border-teal-400" 
                  : theme === 'dark' ? "text-gray-400" : "text-gray-500"
              )}
            >
              Metrics
            </button>
            <button 
              onClick={() => setActiveTab('architecture')} 
              className={cx(
                "px-4 py-2 text-xs font-medium",
                activeTab === 'architecture' 
                  ? "text-teal-400 border-b-2 border-teal-400" 
                  : theme === 'dark' ? "text-gray-400" : "text-gray-500"
              )}
            >
              Architecture
            </button>
          </div>
          
          {/* Tab Content */}
          {activeTab === 'metrics' && (
            <div className="h-64 overflow-auto">
              {/* Current Metrics */}
              <div className="grid grid-cols-2 gap-3 mb-4">
                <div className={cx(
                  "p-3 rounded-md border",
                  theme === 'dark' ? "bg-gray-800/50 border-gray-700" : "bg-gray-50 border-gray-200"
                )}>
                  <div className="flex justify-between items-center mb-1">
                    <div className={cx(
                      "flex items-center gap-1 text-xs",
                      theme === 'dark' ? "text-gray-400" : "text-gray-500"
                    )}>
                      <BarChart size={12} />
                      <span>FPS</span>
                    </div>
                    <span className={cx(
                      "text-sm font-medium",
                      getMetricColor('fps', metrics.fps)
                    )}>
                      {metrics.fps}
                    </span>
                  </div>
                  <div className="h-16">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={fpsHistory}>
                        <CartesianGrid strokeDasharray="3 3" stroke={theme === 'dark' ? "#374151" : "#e5e7eb"} />
                        <XAxis dataKey="time" tick={false} />
                        <YAxis domain={[0, 'dataMax + 10']} tick={{ fontSize: 10 }} width={25} />
                        <Tooltip content={<CustomTooltip />} />
                        <Line type="monotone" dataKey="value" stroke="#0d9488" dot={false} />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </div>
                
                <div className={cx(
                  "p-3 rounded-md border",
                  theme === 'dark' ? "bg-gray-800/50 border-gray-700" : "bg-gray-50 border-gray-200"
                )}>
                  <div className="flex justify-between items-center mb-1">
                    <div className={cx(
                      "flex items-center gap-1 text-xs",
                      theme === 'dark' ? "text-gray-400" : "text-gray-500"
                    )}>
                      <Cpu size={12} />
                      <span>Memory</span>
                    </div>
                    <span className={cx(
                      "text-sm font-medium",
                      theme === 'dark' ? "text-gray-300" : "text-gray-700"
                    )}>
                      {metrics.memory} MB
                    </span>
                  </div>
                  <div className="h-16">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={memoryHistory}>
                        <CartesianGrid strokeDasharray="3 3" stroke={theme === 'dark' ? "#374151" : "#e5e7eb"} />
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
                <div className={cx(
                  "flex justify-between items-center p-2 rounded-md",
                  theme === 'dark' ? "bg-gray-800/30" : "bg-gray-100"
                )}>
                  <div className="flex items-center gap-2">
                    <Zap size={14} className="text-amber-400" />
                    <span className="text-xs">Page Load Time</span>
                  </div>
                  <span className={cx(
                    "text-xs font-medium",
                    getMetricColor('loadTime', metrics.loadTime)
                  )}>
                    {formatTime(metrics.loadTime)}
                  </span>
                </div>
                
                <div className={cx(
                  "flex justify-between items-center p-2 rounded-md",
                  theme === 'dark' ? "bg-gray-800/30" : "bg-gray-100"
                )}>
                  <div className="flex items-center gap-2">
                    <Clock size={14} className="text-blue-400" />
                    <span className="text-xs">Time to Interactive</span>
                  </div>
                  <span className={cx(
                    "text-xs font-medium",
                    getMetricColor('timeToInteractive', metrics.timeToInteractive)
                  )}>
                    {formatTime(metrics.timeToInteractive)}
                  </span>
                </div>
                
                <div className={cx(
                  "flex justify-between items-center p-2 rounded-md",
                  theme === 'dark' ? "bg-gray-800/30" : "bg-gray-100"
                )}>
                  <div className="flex items-center gap-2">
                    <BarChart size={14} className="text-green-400" />
                    <span className="text-xs">First Contentful Paint</span>
                  </div>
                  <span className={cx(
                    "text-xs font-medium",
                    getMetricColor('firstContentfulPaint', metrics.firstContentfulPaint)
                  )}>
                    {formatTime(metrics.firstContentfulPaint)}
                  </span>
                </div>
                
                {metrics.largestContentfulPaint > 0 && (
                  <div className={cx(
                    "flex justify-between items-center p-2 rounded-md",
                    theme === 'dark' ? "bg-gray-800/30" : "bg-gray-100"
                  )}>
                    <div className="flex items-center gap-2">
                      <BarChart size={14} className="text-purple-400" />
                      <span className="text-xs">Largest Contentful Paint</span>
                    </div>
                    <span className={cx(
                      "text-xs font-medium",
                      getMetricColor('largestContentfulPaint', metrics.largestContentfulPaint)
                    )}>
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
        className={cx(
          "ml-auto flex items-center gap-2 shadow-lg border text-teal-400 px-3 py-2 rounded-lg transition-colors duration-300",
          theme === 'dark' 
            ? "bg-gray-800/90 backdrop-blur-sm border-gray-700 hover:bg-gray-700/90" 
            : "bg-white/90 backdrop-blur-sm border-gray-200 hover:bg-gray-50/90"
        )}
      >
        <Cpu size={16} />
        <span className="text-xs font-medium">Performance</span>
        {isOpen ? <ChevronDown size={14} /> : <ChevronUp size={14} />}
      </button>
    </div>
  );
};

export default PerformanceDashboard;
