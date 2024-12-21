import { create } from "zustand";

interface FeedItem {
  id: string;
  title: string;
  source: string;
  imageUrl: string;
  timeAgo: string;
}

interface FeedStore {
  items: FeedItem[];
  isLoading: boolean;
  error: string | null;
  hasMore: boolean;
  loadFeed: (reset?: boolean) => Promise<void>;
}

const generateMockFeed = (startIndex: number, count: number): FeedItem[] => {
  return Array.from({ length: count }, (_, i) => ({
    id: `${startIndex + i}`,
    title: `NEW DELHI: ${Lorem.generateSentences(2)}`,
    source: "Times of India",
    imageUrl: `https://picsum.photos/800/400?random=${startIndex + i}`,
    timeAgo: "1d ago",
  }));
};

// Simple Lorem Ipsum generator
const Lorem = {
  words: [
    "breaking", "news", "government", "announces", "development", "policy",
    "economy", "sports", "technology", "innovation", "achievement", "milestone",
    "initiative", "program", "success", "launch", "implementation", "progress",
    "reform", "update", "report", "analysis", "study", "research", "findings"
  ],
  generateSentences(count: number): string {
    const sentences = [];
    for (let i = 0; i < count; i++) {
      const wordCount = 8 + Math.floor(Math.random() * 8);
      const sentence = Array.from({ length: wordCount }, () => 
        this.words[Math.floor(Math.random() * this.words.length)]
      ).join(" ");
      sentences.push(sentence.charAt(0).toUpperCase() + sentence.slice(1) + ".");
    }
    return sentences.join(" ");
  }
};

const useFeed = create<FeedStore>((set, get) => ({
  items: [],
  isLoading: false,
  error: null,
  hasMore: true,
  loadFeed: async (reset = false) => {
    try {
      set({ isLoading: true, error: null });
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const currentItems = get().items;
      const startIndex = reset ? 0 : currentItems.length;
      const newItems = generateMockFeed(startIndex, 10);
      
      set({
        items: reset ? newItems : [...currentItems, ...newItems],
        hasMore: startIndex < 50, // Limit to 50 items for demo
        isLoading: false,
      });
    } catch (error) {
      set({ error: "Failed to load feed", isLoading: false });
    }
  },
}));

export default useFeed; 