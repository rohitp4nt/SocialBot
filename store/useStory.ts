import { create } from "zustand";

export interface Story {
  id: string;
  url: string;
  isLoading?: boolean;
  error?: string;
}

interface StoryState {
  items: Story[];
  isLoading: boolean;
  hasMore: boolean;
  error: string | null;
  loadStories: (isInitial?: boolean) => Promise<void>;
  addStories: (newStories: Story[]) => void;
}

const STORIES_PER_PAGE = 8;
const MAX_STORIES = 50; 

const generateStoryUrl = (index: number) => `https://picsum.photos/200/300?${index}`;

const useStory = create<StoryState>()((set, get) => ({
  items: [],
  isLoading: false,
  hasMore: true,
  error: null,
  loadStories: async (isInitial = false) => {
    const { items, isLoading, hasMore } = get();
    
    if (isLoading || !hasMore) return;
    
    try {
      set({ isLoading: true, error: null });
      
      if (isInitial && items.length > 0) {
        set({ isLoading: false });
        return;
      }

      const currentLength = items.length;
      
      if (currentLength >= MAX_STORIES) {
        set({ hasMore: false, isLoading: false });
        return;
      }

      const remainingStories = MAX_STORIES - currentLength;
      const storiesThisPage = Math.min(STORIES_PER_PAGE, remainingStories);

      const newStories = Array.from({ length: storiesThisPage }, (_, i) => ({
        id: `story-${currentLength + i}`,
        url: generateStoryUrl(currentLength + i + 1),
      }));

      set((state) => ({ 
        items: [...state.items, ...newStories],
        isLoading: false,
        hasMore: currentLength + storiesThisPage < MAX_STORIES
      }));
    } catch (error) {
      set({ 
        error: error instanceof Error ? error.message : 'Failed to load stories',
        isLoading: false 
      });
    }
  },
  addStories: (newStories) =>
    set((state) => ({ items: [...state.items, ...newStories] })),
}));

export default useStory;
