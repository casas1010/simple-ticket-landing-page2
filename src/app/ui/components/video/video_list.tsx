import { Video } from "@/app/core/types/video";

import {  motion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';

// YouTube API Types
interface YTPlayerState {
  ENDED: number;
  PLAYING: number;
  PAUSED: number;
  BUFFERING: number;
  CUED: number;
}

interface YTPlayerEvent {
  data: number;
  target: YTPlayer;
}

interface YTPlayer {
  destroy(): void;
  playVideo(): void;
  pauseVideo(): void;
  stopVideo(): void;
  seekTo(seconds: number, allowSeekAhead?: boolean): void;
  getCurrentTime(): number;
  getDuration(): number;
  getPlayerState(): number;
}

interface YTPlayerOptions {
  events?: {
    onStateChange?: (event: YTPlayerEvent) => void;
    onReady?: (event: YTPlayerEvent) => void;
    onError?: (event: YTPlayerEvent) => void;
  };
  playerVars?: {
    autoplay?: number;
    mute?: number;
    enablejsapi?: number;
  };
}

interface YouTubeAPI {
  Player: new (element: HTMLElement | string, options: YTPlayerOptions) => YTPlayer;
  PlayerState: YTPlayerState;
}

// Helper function to extract YouTube video ID from URL
function getYouTubeVideoId(url: string): string | null {
  const regex = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/;
  const match = url.match(regex);
  return match ? match[1] : null;
}

// Video Selection Screen Component
function VideoSelectionScreen({ 
  videos, 
  onVideoSelect, 
  countdown 
}: { 
  videos: Video[]; 
  onVideoSelect: (index: number) => void;
  countdown: number;
}) {
  return (
    <div className="w-full max-w-lg">
      <div className="text-center mb-6">
        <h3 className="text-white text-2xl font-bold mb-2">
          Choose a Video to Play
        </h3>
        <div className="text-slate-300 text-sm">
          Auto-playing first video in <span className="text-blue-400 font-mono text-lg">{countdown}</span> seconds
        </div>
      </div>
      
      <div className="space-y-3">
        {videos.map((video, index) => (
          <motion.button
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            onClick={() => onVideoSelect(index)}
            className="w-full p-4 rounded-lg text-left transition-all duration-200 bg-slate-800/70 border border-slate-700/50 text-slate-300 hover:bg-blue-600/30 hover:border-blue-400/50 hover:text-white group"
          >
            <div className="flex items-center justify-between">
              <div>
                <div className="text-lg font-semibold group-hover:text-blue-300">
                  {video.name}
                </div>
                <div className="text-sm text-slate-400 mt-1">
                  Click to play this video
                </div>
              </div>
              <div className="flex-shrink-0 w-8 h-8 bg-slate-700 rounded-full flex items-center justify-center group-hover:bg-blue-500 transition-colors">
                <span className="text-white text-sm font-bold">{index + 1}</span>
              </div>
            </div>
          </motion.button>
        ))}
      </div>
    </div>
  );
}

// Video Playlist Component
function VideoPlaylist({ videos, autoplay = true }: { videos: Video[]; autoplay?: boolean }) {
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const [showSelection, setShowSelection] = useState(true);
  const [countdown, setCountdown] = useState(6);
  const [isManualSelection, setIsManualSelection] = useState(false);
  
  // Countdown timer for auto-selection
  useEffect(() => {
    if (!showSelection) return;
    
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          setShowSelection(false);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [showSelection]);

  const handleVideoSelect = (index: number) => {
    setCurrentVideoIndex(index);
    setShowSelection(false);
    setIsManualSelection(true); // Mark as manual selection to enable audio
  };

  const handlePlaylistVideoSelect = (index: number) => {
    setCurrentVideoIndex(index);
    setIsManualSelection(true); // Enable audio for playlist selections
  };

  const handleVideoEnd = () => {
    // Auto-advance to next video
    if (currentVideoIndex < videos.length - 1) {
      setCurrentVideoIndex(prev => prev + 1);
      setIsManualSelection(true); // Keep audio enabled for auto-advance
    }
  };

  if (!videos || videos.length === 0) return null;

  // Show selection screen if we have multiple videos and haven't selected yet
  if (showSelection && videos.length > 1) {
    return (
      <VideoSelectionScreen 
        videos={videos}
        onVideoSelect={handleVideoSelect}
        countdown={countdown}
      />
    );
  }

  const currentVideo = videos[currentVideoIndex];
  const videoId = currentVideo?.url ? getYouTubeVideoId(currentVideo.url) : null;

  return (
    <div className="w-full max-w-lg">
      {/* Main Video Player */}
      {videoId && (
        <div className="mb-4">
          <YouTubePlayer 
            key={`${videoId}-${currentVideoIndex}`} // Force re-render when video changes
            videoId={videoId} 
            autoplay={autoplay}
            enableAudio={isManualSelection} // Enable audio for manual selections
            onVideoEnd={handleVideoEnd}
          />
          <h3 className="text-white text-lg font-semibold mt-2 text-center">
            {currentVideo.name}
          </h3>
        </div>
      )}

      {/* Video List/Overview */}
      {videos.length > 1 && (
        <div className="space-y-2 max-h-40 overflow-y-auto">
          <h4 className="text-slate-300 text-sm font-medium mb-2">
            Videos ({videos.length})
          </h4>
          {videos.map((video, index) => (
            <button
              key={index}
              onClick={() => handlePlaylistVideoSelect(index)}
              className={`w-full p-3 rounded-lg text-left transition-all duration-200 ${
                index === currentVideoIndex
                  ? 'bg-blue-600/30 border border-blue-400/50 text-white'
                  : 'bg-slate-800/50 border border-slate-700/50 text-slate-300 hover:bg-slate-700/50'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium truncate pr-2">
                  {index + 1}. {video.name}
                </span>
                {index === currentVideoIndex && (
                  <div className="flex-shrink-0 w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
                )}
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

function YouTubePlayer({ 
  videoId, 
  autoplay = false, 
  enableAudio = false,
  onVideoEnd 
}: { 
  videoId: string; 
  autoplay?: boolean; 
  enableAudio?: boolean;
  onVideoEnd?: () => void;
}) {
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    // Set up YouTube API for video end detection
    if (onVideoEnd && typeof window !== 'undefined') {
      // Load YouTube IFrame API if not already loaded
      if (!window.YT) {
        const tag = document.createElement('script');
        tag.src = 'https://www.youtube.com/iframe_api';
        const firstScriptTag = document.getElementsByTagName('script')[0];
        if (firstScriptTag?.parentNode) {
          firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
        }
        
        window.onYouTubeIframeAPIReady = () => {
          initializePlayer();
        };
      } else {
        initializePlayer();
      }
    }

    function initializePlayer() {
      if (window.YT && iframeRef.current) {
        new window.YT.Player(iframeRef.current, {
          events: {
            onStateChange: (event: YTPlayerEvent) => {
              // YT.PlayerState.ENDED = 0
              if (event.data === window.YT.PlayerState.ENDED && onVideoEnd) {
                onVideoEnd();
              }
            }
          }
        });
      }
    }
  }, [videoId, onVideoEnd]);

  // Build embed URL with appropriate parameters
  const params = new URLSearchParams();
  if (autoplay) {
    params.append('autoplay', '1');
    // Only mute if audio is not explicitly enabled
    if (!enableAudio) {
      params.append('mute', '1');
    }
  }
  params.append('enablejsapi', '1'); // Enable JavaScript API for end detection
  
  const embedUrl = `https://www.youtube.com/embed/${videoId}?${params.toString()}`;

  return (
    <div className="w-full aspect-video rounded-lg overflow-hidden">
      <iframe
        ref={iframeRef}
        id={`youtube-player-${videoId}`}
        src={embedUrl}
        title="YouTube video player"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
        className="w-full h-full"
      />
    </div>
  );
}

// Extend Window interface for TypeScript
declare global {
  interface Window {
    YT: YouTubeAPI;
    onYouTubeIframeAPIReady: () => void;
  }
}

export default VideoPlaylist;