import React from 'react';
import {
  View,
  Image,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  useWindowDimensions,
} from 'react-native';

type Post = {
  id: string;
  image: string;
};

type PostGridProps = {
  posts: Post[];
  onPressPost?: (post: Post) => void;
};

const NUM_COLUMNS = 3;

const PostGrid: React.FC<PostGridProps> = ({ posts, onPressPost }) => {
  const { width } = useWindowDimensions();
  const itemSize = width / NUM_COLUMNS;

  const renderItem = ({ item }: { item: Post }) => (
    <TouchableOpacity
      style={[styles.itemWrapper, { width: itemSize }]}
      onPress={() => onPressPost?.(item)}
      activeOpacity={0.8}
    >
      <View style={styles.grayBox}>
        <Image source={{ uri: item.image }} style={styles.image} />
      </View>
    </TouchableOpacity>
  );

  return (
    <FlatList
      data={posts}
      renderItem={renderItem}
      keyExtractor={(item) => item.id}
      numColumns={NUM_COLUMNS}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.container}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 4,
  },
  itemWrapper: {
    padding: 2,
  },
  grayBox: {
    backgroundColor: '#e0e0e0',
    borderRadius: 0,
    overflow: 'hidden',
    aspectRatio: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
});

export default PostGrid;
