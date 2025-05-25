import { Text } from "@react-navigation/elements";
import { Link } from "expo-router";
import React from "react";
import { Image, StyleSheet, TouchableOpacity, View } from "react-native";

interface TrendingCardProps {
  movie: {
    movie_id: number;
    Title: string;
    Poster_url: string;
  };
  index: number;
}
const TrendingCard = ({
  movie: { movie_id, Title, Poster_url },
  index,
}: TrendingCardProps) => {
  return (
    <Link href={`/movies/${movie_id}`} asChild>
      <TouchableOpacity style={styles.TouchCard}>
        <Image
          resizeMode="cover"
          style={styles.TrendingCardImage}
          source={{ uri: Poster_url }}
        />
        <View style={styles.TrendingCardBottomTextContainer}>
          <Text style={styles.index}>{index + 1}</Text>
        </View>
        <Text numberOfLines={2} style={styles.Title}>
          {Title}
        </Text>
      </TouchableOpacity>
    </Link>
  );
};

export default TrendingCard;

const styles = StyleSheet.create({
  TouchCard: {
    width: 150,
    flexDirection: "column",
    gap: 10,
  },
  TrendingCardImage: {
    width: "100%",
    height: 200,
    borderRadius: 5,
    position: "relative",
  },
  TrendingCardBottomTextContainer: {
    position: "absolute",
    top: "40%",
    left: 0,
  },
  text: {
    fontSize: 70,
    color: "white",
  },
  index: {
    color: "white",
    fontSize: 70,
  },
  Title: {
    color: "white",
    fontSize: 20,
  },
});
