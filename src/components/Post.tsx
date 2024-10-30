import { Heart, MessageCircle, Share2, Bookmark, MapPin, Palette, Sparkles } from 'lucide-react';
import type { Post as PostType } from '../types';
import { useState, useEffect } from 'react';

interface PostProps {
  post: PostType;
}

export default function Post({ post }: PostProps) {
  const [isLiked, setIsLiked] = useState(false);
  const [showPalette, setShowPalette] = useState(false);
  const [showAIInsights, setShowAIInsights] = useState(false);

  useEffect(() => {
    // Simulate AI analysis when post is viewed
    if (!post.aiAnalysis) {
      setTimeout(() => {
        post.aiAnalysis = {
          contentWarnings: [],
          suggestedTags: ['photography', 'aesthetic', 'composition'],
          dominantColors: post.colorPalette,
          objectsDetected: ['person', 'camera', 'natural light'],
          aestheticScore: 8.7
        };
      }, 1000);
    }
  }, [post]);

  return (
    <article className="bg-white rounded-lg shadow mb-6 overflow-hidden">
      <div className="p-4 flex items-center justify-between">
        <div className="flex items-center">
          <div className="relative">
            <img
              src={post.user.avatar}
              alt={post.user.username}
              className="w-10 h-10 rounded-full"
            />
            {post.user.aiMood && (
              <div
                className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-white"
                style={{
                  backgroundColor: post.user.aiMood.detected === 'happy' ? '#FCD34D' :
                    post.user.aiMood.detected === 'creative' ? '#A78BFA' :
                    post.user.aiMood.detected === 'focused' ? '#60A5FA' : '#34D399'
                }}
              >
                <span className="absolute -top-8 -right-2 text-xs bg-black text-white px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition">
                  {post.user.aiMood.detected} ({Math.round(post.user.aiMood.confidence * 100)}%)
                </span>
              </div>
            )}
          </div>
          <div className="ml-3">
            <span className="font-semibold block">{post.user.username}</span>
            {post.location && (
              <div className="flex items-center text-xs text-gray-500">
                <MapPin className="w-3 h-3 mr-1" />
                {post.location}
              </div>
            )}
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <button
            onClick={() => setShowAIInsights(!showAIInsights)}
            className="p-2 hover:bg-gray-100 rounded-full group relative"
          >
            <Sparkles className="w-5 h-5" />
            <span className="absolute top-full right-0 text-xs bg-black text-white px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition whitespace-nowrap">
              AI Insights
            </span>
          </button>
          <button
            onClick={() => setShowPalette(!showPalette)}
            className="p-2 hover:bg-gray-100 rounded-full"
          >
            <Palette className="w-5 h-5" />
          </button>
        </div>
      </div>
      
      <div className="relative">
        <img
          src={post.image}
          alt="Post content"
          className="w-full aspect-square object-cover"
        />
        {showPalette && (
          <div className="absolute bottom-0 left-0 right-0 p-4 bg-black bg-opacity-50 flex justify-center space-x-2">
            {post.colorPalette.map((color, index) => (
              <div
                key={index}
                className="w-8 h-8 rounded-full"
                style={{ backgroundColor: color }}
              />
            ))}
          </div>
        )}
        {showAIInsights && post.aiAnalysis && (
          <div className="absolute top-0 left-0 right-0 p-4 bg-black bg-opacity-50 text-white">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span>Aesthetic Score:</span>
                <div className="flex items-center">
                  <span className="font-semibold">{post.aiAnalysis.aestheticScore}</span>
                  <span className="text-xs ml-1">/10</span>
                </div>
              </div>
              <div>
                <span className="text-sm">Objects Detected:</span>
                <div className="flex flex-wrap gap-1 mt-1">
                  {post.aiAnalysis.objectsDetected.map((obj, i) => (
                    <span key={i} className="text-xs bg-white bg-opacity-20 px-2 py-1 rounded">
                      {obj}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      
      <div className="p-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setIsLiked(!isLiked)}
              className={`transition transform hover:scale-110 ${isLiked ? 'text-red-500' : ''}`}
            >
              <Heart className={`w-7 h-7 ${isLiked ? 'fill-current' : ''}`} />
            </button>
            <button className="transition transform hover:scale-110">
              <MessageCircle className="w-7 h-7" />
            </button>
            <button className="transition transform hover:scale-110">
              <Share2 className="w-7 h-7" />
            </button>
          </div>
          <button className="transition transform hover:scale-110">
            <Bookmark className="w-7 h-7" />
          </button>
        </div>
        
        <div className="font-semibold mb-2">{post.likes.toLocaleString()} likes</div>
        
        <div className="space-y-2">
          <p>
            <span className="font-semibold mr-2">{post.user.username}</span>
            {post.caption}
          </p>
          
          <div className="flex flex-wrap gap-2">
            {post.tags.map(tag => (
              <span key={tag} className="text-blue-500 text-sm">
                #{tag}
              </span>
            ))}
          </div>
          
          {post.comments.map(comment => (
            <div key={comment.id} className="flex items-start space-x-2">
              <img
                src={comment.user.avatar}
                alt={comment.user.username}
                className="w-6 h-6 rounded-full"
              />
              <div>
                <span className="font-semibold mr-2">{comment.user.username}</span>
                {comment.text}
                {comment.sentiment && (
                  <span
                    className={`ml-2 text-xs px-2 py-1 rounded ${
                      comment.sentiment.label === 'positive' ? 'bg-green-100 text-green-800' :
                      comment.sentiment.label === 'negative' ? 'bg-red-100 text-red-800' :
                      'bg-gray-100 text-gray-800'
                    }`}
                  >
                    {comment.sentiment.label}
                  </span>
                )}
                <div className="flex items-center space-x-2 mt-1 text-xs text-gray-500">
                  <span>{comment.timestamp}</span>
                  <span>{comment.likes} likes</span>
                  <button className="font-semibold">Reply</button>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <p className="text-gray-500 text-sm mt-2">{post.timestamp}</p>
        
        <div className="mt-4 border-t pt-4">
          <input
            type="text"
            placeholder="Add a comment..."
            className="w-full focus:outline-none"
          />
        </div>
      </div>
    </article>
  );
}