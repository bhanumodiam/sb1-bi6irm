import React from 'react';
import Header from './components/Header';
import Stories from './components/Stories';
import Post from './components/Post';
import type { Post as PostType } from './types';

function App() {
  const posts: PostType[] = [
    {
      id: '1',
      user: {
        id: '1',
        username: 'sarah_design',
        avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop',
        mood: 'creative'
      },
      image: 'https://images.unsplash.com/photo-1516245834210-c4c142787335?w=800&h=800&fit=crop',
      caption: '✨ Exploring new design directions for an upcoming project. Which color palette speaks to you?',
      likes: 1234,
      mood: 'creative',
      location: 'Design Studio, NYC',
      colorPalette: ['#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4'],
      tags: ['design', 'creativity', 'colors', 'moodboard'],
      comments: [
        {
          id: 'c1',
          user: {
            id: '2',
            username: 'mike.dev',
            avatar: 'https://images.unsplash.com/photo-1519345182560-3f2917c472ef?w=100&h=100&fit=crop'
          },
          text: 'The second palette is perfect for the project! 🎨',
          timestamp: '2h ago',
          likes: 24
        }
      ],
      timestamp: '3 HOURS AGO'
    },
    {
      id: '2',
      user: {
        id: '2',
        username: 'alex.photo',
        avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop',
        mood: 'chill'
      },
      image: 'https://images.unsplash.com/photo-1682687982501-1e58ab814714?w=800&h=800&fit=crop',
      caption: 'Found this perfect spot for sunset photography 🌅 The colors were absolutely incredible!',
      likes: 2567,
      mood: 'chill',
      location: 'Malibu Beach',
      colorPalette: ['#FFB6B6', '#FFE66D', '#6C5B7B', '#355C7D'],
      tags: ['photography', 'sunset', 'nature', 'peaceful'],
      comments: [
        {
          id: 'c2',
          user: {
            id: '3',
            username: 'emma.art',
            avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop'
          },
          text: 'This lighting is absolutely magical! 😍',
          timestamp: '1h ago',
          likes: 45
        }
      ],
      timestamp: '5 HOURS AGO'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="max-w-4xl mx-auto px-4 py-8">
        <Stories />
        <div className="space-y-6">
          {posts.map(post => (
            <Post key={post.id} post={post} />
          ))}
        </div>
      </main>
    </div>
  );
}

export default App;