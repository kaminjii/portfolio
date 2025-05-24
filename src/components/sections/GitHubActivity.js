"use client";

import React, { useState, useEffect } from 'react';
import { GitBranch, GitPullRequest, Star, GitCommit, Clock } from 'lucide-react';
import FadeIn from '../animations/FadeIn';
import { useTheme } from '../../app/ThemeContext';
import useThemeClasses, { cx } from '../../app/ThemeUtils';

const GitHubActivity = ({ username = 'kaminjii' }) => {
  const [activities, setActivities] = useState([]);
  const [repos, setRepos] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const { theme } = useTheme();
  const classes = useThemeClasses();

  useEffect(() => {
    const fetchGitHubData = async () => {
      try {
        setIsLoading(true);
        setError(null);
        
        // Fetch user's public repos
        const reposResponse = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=6`);
        
        if (!reposResponse.ok) {
          throw new Error('Failed to fetch GitHub repos');
        }
        
        const reposData = await reposResponse.json();
        setRepos(reposData);
        
        // For each repo, fetch recent commits
        const activityPromises = reposData.slice(0, 3).map(async (repo) => {
          const commitsResponse = await fetch(`https://api.github.com/repos/${username}/${repo.name}/commits?per_page=3`);
          
          if (!commitsResponse.ok) {
            return [];
          }
          
          const commitsData = await commitsResponse.json();
          
          return commitsData.map(commit => ({
            type: 'commit',
            repo: repo.name,
            message: commit.commit.message,
            date: commit.commit.author.date,
            url: commit.html_url
          }));
        });
        
        const activitiesData = await Promise.all(activityPromises);
        setActivities(activitiesData.flat().slice(0, 5));
        
        setIsLoading(false);
      } catch (err) {
        console.error('Error fetching GitHub data:', err);
        setError('Failed to load GitHub activity. Please try again later.');
        setIsLoading(false);
      }
    };
    
    fetchGitHubData();
  }, [username]);
  
  // Format date to relative time (e.g., "2 days ago")
  const formatRelativeTime = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now - date;
    const diffSec = Math.floor(diffMs / 1000);
    const diffMin = Math.floor(diffSec / 60);
    const diffHr = Math.floor(diffMin / 60);
    const diffDays = Math.floor(diffHr / 24);
    
    if (diffDays > 30) {
      const diffMonths = Math.floor(diffDays / 30);
      return `${diffMonths} month${diffMonths === 1 ? '' : 's'} ago`;
    } else if (diffDays > 0) {
      return `${diffDays} day${diffDays === 1 ? '' : 's'} ago`;
    } else if (diffHr > 0) {
      return `${diffHr} hour${diffHr === 1 ? '' : 's'} ago`;
    } else if (diffMin > 0) {
      return `${diffMin} minute${diffMin === 1 ? '' : 's'} ago`;
    } else {
      return 'just now';
    }
  };
  
  // Truncate text if too long
  const truncateText = (text, maxLength = 60) => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
  };
  
  // Get appropriate icon for activity type
  const getActivityIcon = (type) => {
    switch (type) {
      case 'commit':
        return <GitCommit className="flex-shrink-0" size={18} />;
      case 'pull_request':
        return <GitPullRequest className="flex-shrink-0" size={18} />;
      case 'branch':
        return <GitBranch className="flex-shrink-0" size={18} />;
      default:
        return <Clock className="flex-shrink-0" size={18} />;
    }
  };
  
  return (
    <div className="py-4 rounded-lg">
      <div className="flex items-center justify-between mb-4">
        <h3 className={cx(
          "text-xl font-bold",
          theme === 'dark' ? "text-white" : "text-gray-900"
        )}>Latest GitHub Activity</h3>
        <a 
          href={`https://github.com/${username}`}
          target="_blank" 
          rel="noopener noreferrer"
          className="text-teal-400 hover:underline flex items-center"
        >
          View Profile
        </a>
      </div>
      
      {isLoading ? (
        <div className="grid place-items-center h-60">
          <div className="relative w-10 h-10">
            <div className={cx(
              "absolute top-0 left-0 w-full h-full rounded-full border-2 border-transparent border-t-teal-400 animate-spin"
            )}></div>
          </div>
        </div>
      ) : error ? (
        <div className={cx(
          "border p-4 rounded-lg",
          theme === 'dark' 
            ? "bg-red-900/20 border-red-400 text-red-400" 
            : "bg-red-100 border-red-400 text-red-600"
        )}>
          {error}
        </div>
      ) : (
        <>
          {/* Activity feed */}
          <div className="space-y-4 mb-8">
            {activities.length > 0 ? (
              activities.map((activity, index) => (
                <FadeIn key={index} delay={index * 100}>
                  <a 
                    href={activity.url}
                    target="_blank"
                    rel="noopener noreferrer" 
                    className={cx(
                      "flex gap-3 p-3 rounded-lg border transition-colors duration-200",
                      theme === 'dark' 
                        ? "bg-gray-800/50 hover:bg-gray-800/80 border-gray-700" 
                        : "bg-white hover:bg-gray-50 border-gray-200"
                    )}
                  >
                    <div className="text-teal-400 mt-1">
                      {getActivityIcon(activity.type)}
                    </div>
                    <div className="flex-1">
                      <p className={cx(
                        "mb-1",
                        theme === 'dark' ? "text-gray-300" : "text-gray-700"
                      )}>
                        <span className={cx(
                          "font-medium",
                          theme === 'dark' ? "text-white" : "text-gray-900"
                        )}>{activity.repo}</span>: {truncateText(activity.message)}
                      </p>
                      <p className={cx(
                        "text-xs flex items-center",
                        theme === 'dark' ? "text-gray-400" : "text-gray-500"
                      )}>
                        <Clock size={12} className="mr-1" /> {formatRelativeTime(activity.date)}
                      </p>
                    </div>
                  </a>
                </FadeIn>
              ))
            ) : (
              <div className={cx(
                "text-center",
                theme === 'dark' ? "text-gray-400" : "text-gray-500"
              )}>No recent activity found</div>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default GitHubActivity;
