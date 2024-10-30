import { useState } from 'react';
import type { Story } from '../types';

export default function Stories() {
  const [activeStory, setActiveStory] = useState<Story | null>(null);

  const stories: Story[] = [
    {
      id: '1',
      user: {
        id: '1',
        username: 'sarah_design',
        avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop',
        mood: 'creative'
      },
      type: 'poll',
      content: 'Which design direction should I take?',
      interactions: {
        options: ['Minimal', 'Colorful'],
        votes: 245,
        participants: 456
      }
    },
    {
      id: '2',
      user: {
        id: '2',
        username: 'alex.photo',
        avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop',
        mood: 'chill'
      },
      type: 'image',
      content: 'https://images.unsplash.com/photo-1682687982501-1e58ab814714?w=800&h=800&fit=crop'
    }
  ];

  return (
    <>
      <div className="bg-white rounded-lg shadow p-4 mb-6">
        <div className="flex space-x-4 overflow-x-auto scrollbar-hide pb-2">
          {stories.map(story => (
            <button
              key={story.id}
              onClick={() => setActiveStory(story)}
              className="flex flex-col items-center space-y-1 flex-shrink-0"
            >
              <div className="p-[2px] rounded-full bg-gradient-to-tr from-yellow-400 via-purple-600 to-pink-600">
                <div className="p-[2px] rounded-full bg-white">
                  <img
                    src={story.user.avatar}
                    alt={story.user.username}
                    className="w-16 h-16 rounded-full object-cover"
                  />
                </div>
              </div>
              <span className="text-xs text-gray-600">{story.user.username}</span>
            </button>
          ))}
        </div>
      </div>

      {activeStory && (
        <div className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center">
          <div className="max-w-lg w-full mx-4">
            <div className="bg-white rounded-lg overflow-hidden">
              <div className="p-4 flex items-center justify-between">
                <div className="flex items-center">
                  <img
                    src={activeStory.user.avatar}
                    alt={activeStory.user.username}
                    className="w-8 h-8 rounded-full"
                  />
                  <span className="ml-2 font-semibold">{activeStory.user.username}</span>
                </div>
                <button
                  onClick={() => setActiveStory(null)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  ✕
                </button>
              </div>
              
              {activeStory.type === 'poll' ? (
                <div className="p-8">
                  <h3 className="text-xl font-semibold mb-4">{activeStory.content}</h3>
                  <div className="space-y-3">
                    {activeStory.interactions?.options?.map((option, index) => (
                      <button
                        key={index}
                        className="w-full py-3 px-6 rounded-lg bg-gray-100 hover:bg-gray-200 transition"
                      >
                        {option}
                      </button>
                    ))}
                  </div>
                  <div className="mt-4 text-sm text-gray-500 text-center">
                    {activeStory.interactions?.participants} participants
                  </div>
                </div>
              ) : (
                <img
                  src={activeStory.content}
                  alt="Story content"
                  className="w-full aspect-square object-cover"
                />
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}