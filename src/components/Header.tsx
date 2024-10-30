import { Camera, Heart, MessageCircle, Search } from 'lucide-react';

export default function Header() {
  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-200">
      <div className="max-w-4xl mx-auto px-4 py-3 flex items-center justify-between">
        <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
          Photogram
        </h1>
        
        <div className="flex items-center space-x-4">
          <div className="relative hidden sm:block">
            <input
              type="text"
              placeholder="Search"
              className="pl-10 pr-4 py-1 bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
            <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          </div>
          
          <button className="p-2 hover:bg-gray-100 rounded-full">
            <Camera className="w-6 h-6" />
          </button>
          <button className="p-2 hover:bg-gray-100 rounded-full">
            <Heart className="w-6 h-6" />
          </button>
          <button className="p-2 hover:bg-gray-100 rounded-full">
            <MessageCircle className="w-6 h-6" />
          </button>
          <img
            src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop"
            alt="Profile"
            className="w-8 h-8 rounded-full cursor-pointer"
          />
        </div>
      </div>
    </header>
  );
}