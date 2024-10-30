export interface User {
  id: string;
  username: string;
  avatar: string;
  mood?: 'happy' | 'creative' | 'chill' | 'focused';
  aiMood?: {
    confidence: number;
    detected: string;
  };
}

export interface Comment {
  id: string;
  user: User;
  text: string;
  timestamp: string;
  likes: number;
  sentiment?: {
    score: number;
    label: 'positive' | 'neutral' | 'negative';
  };
}

export interface Post {
  id: string;
  user: User;
  image: string;
  caption: string;
  likes: number;
  mood?: string;
  location?: string;
  colorPalette: string[];
  tags: string[];
  comments: Comment[];
  timestamp: string;
  aiAnalysis?: {
    contentWarnings: string[];
    suggestedTags: string[];
    dominantColors: string[];
    objectsDetected: string[];
    aestheticScore: number;
  };
}

export interface Story {
  id: string;
  user: User;
  type: 'image' | 'poll' | 'ai-filter';
  content: string;
  filter?: {
    name: string;
    strength: number;
  };
  interactions?: {
    options?: string[];
    votes?: number;
    participants?: number;
  };
}