import { StyleSheet, Platform, ActivityIndicator } from "react-native";
import { Pressable } from "react-native";
import { ScrollView } from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";
import { blurhash } from "@/constants/Placeholder";
import useStory from "@/store/useStory";
import useFeed from "@/store/useFeed";
import { useEffect, useRef, useState } from "react";
import Animated, { FadeIn } from "react-native-reanimated";
import { FeedItem } from "@/components/FeedItem";
import { useTabBar } from '@/contexts/TabBarContext';
import { router } from 'expo-router';

export default function HomeScreen() {
  const { items: stories, isLoading: storiesLoading, error: storiesError, hasMore: hasMoreStories, loadStories } = useStory();
  const { items: feedItems, isLoading: feedLoading, error: feedError, hasMore: hasMoreFeed, loadFeed } = useFeed();
  const scrollViewRef = useRef<ScrollView>(null);
  const feedScrollViewRef = useRef<ScrollView>(null);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const { handleScroll: handleTabBarScroll } = useTabBar();

  useEffect(() => {
    loadStories(true);
    loadFeed(true);
  }, []);

  useEffect(() => {
    if (!feedLoading) {
      setIsLoadingMore(false);
    }
  }, [feedLoading]);

  const handleStoriesScroll = (event: any) => {
    if (storiesLoading || !hasMoreStories) return;

    const { layoutMeasurement, contentOffset, contentSize } = event.nativeEvent;
    const isEndReached = layoutMeasurement.width + contentOffset.x >= contentSize.width - 20;

    if (isEndReached && !isLoadingMore) {
      setIsLoadingMore(true);
      loadStories();
    }
  };

  const handleFeedScroll = (event: any) => {

    handleTabBarScroll(event);
    if (feedLoading || !hasMoreFeed) return;

    const { layoutMeasurement, contentOffset, contentSize } = event.nativeEvent;
    const isEndReached = layoutMeasurement.height + contentOffset.y >= contentSize.height - 200;

    if (isEndReached && !isLoadingMore) {
      setIsLoadingMore(true);
      loadFeed();
    }
  };

  const icons: Array<keyof typeof Ionicons.glyphMap> = [
    "albums-outline",
    "paper-plane-outline",
    "person-outline",
  ];

  const handleIconPress = (icon: string) => {
    if (icon === 'paper-plane-outline') {
      router.push('/ai');
    }
  };

  const renderStories = () => {
    if (storiesError) {
      return (
        <ThemedView style={styles.storyErrorContainer}>
          <ThemedText>{storiesError}</ThemedText>
        </ThemedView>
      );
    }

    return (
      <ScrollView 
        ref={scrollViewRef}
        horizontal={true} 
        showsHorizontalScrollIndicator={false}
        onScroll={handleStoriesScroll}
        scrollEventThrottle={16}
        contentContainerStyle={styles.storiesScrollContainer}
      >
        <Pressable style={styles.storyItem}>
          <Ionicons name="compass-outline" size={64} color="black" />
        </Pressable>
        {stories.map((story) => (
          <Pressable key={story.id} style={styles.storyWrapper}>
            <Image
              style={styles.story}
              source={story.url}
              placeholder={{ blurhash }}
              contentFit="cover"
              transition={1000}
            />
          </Pressable>
        ))}
        {!hasMoreStories && stories.length > 0 && (
          <Animated.View 
            entering={FadeIn.duration(300)}
            style={styles.endContainer}
          >
            <Ionicons name="stop-circle" size={50} color="#E60023" />
          </Animated.View>
        )}
      </ScrollView>
    );
  };

  const renderFeed = () => {
    if (feedError) {
      return (
        <ThemedView style={styles.feedErrorContainer}>
          <ThemedText>{feedError}</ThemedText>
        </ThemedView>
      );
    }

    return (
      <ScrollView
        ref={feedScrollViewRef}
        onScroll={handleFeedScroll}
        scrollEventThrottle={16}
        style={styles.feedContainer}
        contentContainerStyle={styles.feedContentContainer}
      >
        {feedItems.map((item, index) => (
          <FeedItem
            key={item.id}
            title={item.title}
            source={item.source}
            imageUrl={item.imageUrl}
            timeAgo={item.timeAgo}
            isFirstItem={index === 0}
          />
        ))}
        {feedLoading && (
          <ThemedView style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#E60023" />
          </ThemedView>
        )}
      </ScrollView>
    );
  };

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <ThemedView style={styles.headerContainer}>
          {icons.map((icon) => (
            <Pressable 
              key={icon} 
              onPress={() => handleIconPress(icon)}
            >
              <Ionicons name={icon} size={32} color="black" />
            </Pressable>
          ))}
        </ThemedView>
        <ThemedView style={styles.mainContainer}>
          <ThemedView style={styles.storiesContainer}>
            {renderStories()}
          </ThemedView>
          {renderFeed()}
        </ThemedView>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  mainContainer: {
    flex: 1,
  },
  headerContainer: {
    backgroundColor: "white",
    justifyContent: "flex-end",
    paddingHorizontal: 12,
    paddingVertical: 8,
    columnGap: 10,
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#E8E8E8",
  },
  storiesContainer: {
    backgroundColor: "white",
    borderBottomWidth: 1,
    borderBottomColor: "#E8E8E8",
  },
  storiesScrollContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 8,
    gap: 12,
    height: 80,
  },
  storyItem: {
    width: 64,
    height: 64,
    justifyContent: 'center',
    alignItems: 'center',
  },
  storyWrapper: {
    width: 64,
    height: 64,
    borderRadius: 30,
    padding: 2,
    borderWidth: 2,
    borderColor: "#E60023",
  },
  story: {
    borderRadius: 28,
    width: 56,
    height: 56,
  },
  storyErrorContainer: {
    padding: 12,
    alignItems: "center",
  },
  endContainer: {
    justifyContent: "center",
    alignItems: "center",
    width: 64,
    height: 64,
  },
  feedContainer: {
    flex: 1,
    backgroundColor: 'white',
  },
  feedContentContainer: {
  },
  feedErrorContainer: {
    padding: 20,
    alignItems: "center",
  },
  loadingContainer: {
    padding: 20,
    alignItems: "center",
  },
});
