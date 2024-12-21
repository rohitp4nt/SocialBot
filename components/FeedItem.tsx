import { StyleSheet, View, Pressable } from "react-native";
import { Image } from "expo-image";
import { ThemedText } from "./ThemedText";
import { ThemedView } from "./ThemedView";
import { blurhash } from "@/constants/Placeholder";

interface FeedItemProps {
  title: string;
  source: string;
  imageUrl: string;
  timeAgo: string;
  onPress?: () => void;
  isFirstItem?: boolean;
}

export function FeedItem({ title, source, imageUrl, timeAgo, onPress, isFirstItem }: FeedItemProps) {
  return (
    <Pressable onPress={onPress}>
      <ThemedView style={[styles.container, isFirstItem && styles.firstItemContainer]}>
        <View style={styles.sourceContainer}>
          <Image
            source="https://picsum.photos/40"
            style={styles.sourceImage}
            placeholder={blurhash}
            contentFit="cover"
            transition={500}
          />
          <View>
            <ThemedText style={styles.sourceName}>{source}</ThemedText>
            <ThemedText style={styles.timeAgo}>{timeAgo}</ThemedText>
          </View>
        </View>
        
        <ThemedText style={styles.title}>{title}</ThemedText>
        
        <Image
          source={imageUrl}
          style={styles.feedImage}
          placeholder={blurhash}
          contentFit="cover"
          transition={1000}
        />
      </ThemedView>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#E8E8E8",
    backgroundColor: "white",
  },
  firstItemContainer: {
    paddingTop: 8,
  },
  sourceContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  sourceImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 12,
  },
  sourceName: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1A1A1A",
  },
  timeAgo: {
    fontSize: 14,
    color: "#737373",
  },
  title: {
    fontSize: 15,
    lineHeight: 22,
    marginBottom: 12,
    color: "#1A1A1A",
    fontWeight: "400",
  },
  feedImage: {
    width: "100%",
    height: 200,
    borderRadius: 8,
  },
}); 