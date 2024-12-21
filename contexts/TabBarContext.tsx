import React, { createContext, useContext, useState } from 'react';
import { Animated } from 'react-native';

type TabBarContextType = {
  translateY: Animated.Value;
  handleScroll: (event: any) => void;
};

const TabBarContext = createContext<TabBarContextType | undefined>(undefined);

export function TabBarProvider({ children }: { children: React.ReactNode }) {
  const translateY = new Animated.Value(0);
  let lastScrollY = 0;

  const handleScroll = (event: any) => {
    const currentScrollY = event.nativeEvent.contentOffset.y;
    
    if (currentScrollY < 0) {
      // When pulled down, show the tab bar
      Animated.spring(translateY, {
        toValue: 0,
        useNativeDriver: true,
      }).start();
    } else if (currentScrollY > lastScrollY && currentScrollY > 50) {
      // Scrolling down & past threshold, hide the tab bar
      Animated.spring(translateY, {
        toValue: 100, // Move it off screen
        useNativeDriver: true,
      }).start();
    } else if (currentScrollY < lastScrollY) {
      // Scrolling up, show the tab bar
      Animated.spring(translateY, {
        toValue: 0,
        useNativeDriver: true,
      }).start();
    }
    
    lastScrollY = currentScrollY;
  };

  return (
    <TabBarContext.Provider value={{ translateY, handleScroll }}>
      {children}
    </TabBarContext.Provider>
  );
}

export function useTabBar() {
  const context = useContext(TabBarContext);
  if (context === undefined) {
    throw new Error('useTabBar must be used within a TabBarProvider');
  }
  return context;
} 