import { Link } from "expo-router";
import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

interface Movie {
  id: number;
  title: string;
  poster_path: string;
  vote_average: number;
  release_date: string;
}
const MovieCard = ({
  id,
  title,
  poster_path,
  vote_average,
  release_date,
}: Movie) => {
  return (
    <Link style={styles.CardContainer} href={`/movies/${id}`} asChild>
      <TouchableOpacity style={styles.CardTouch}>
        <Image
          style={styles.CardImg}
          resizeMode="cover"
          source={{
            uri: poster_path
              ? `https://image.tmdb.org/t/p/w500${poster_path}`
              : `https://placehold.co/600*400/1a1a1a/ffffff.png`,
          }}
        ></Image>
        <Text numberOfLines={1} style={styles.CardTitle}>
          {title}
        </Text>
        <View style={styles.CardStarRating}>
          <Image
            style={styles.CardStar}
            source={require("@/assets/icons/Star.png")}
          ></Image>
          <Text style={styles.CardRating}>{vote_average}</Text>
        </View>
        <View style={styles.CardRealize}>
          <Text style={styles.CardRealizeDateText}>
            {release_date.split("-")[0]}
          </Text>
        </View>
      </TouchableOpacity>
    </Link>
  );
};

export default MovieCard;

const styles = StyleSheet.create({
  CardContainer: {
    width: "100%",
    //borderWidth: 1,
    //borderColor: "red",
  },
  CardTouch: {
    width: "30%",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
    textAlign: "center",
    gap: 10,
    //borderWidth: 1,
    //borderColor: "red",
  },
  CardImg: {
    width: "100%",
    height: 180,
    borderRadius: 5,
  },
  CardTitle: {
    color: "white",
    fontSize: 15,
    fontWeight: "300",
  },
  CardStarRating: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    gap: 10,
    //borderWidth: 1,
    //borderColor: "red",
  },
  CardStar: {
    width: 20,
    height: 20,
  },
  CardRating: {
    color: "white",
    fontSize: 15,
    fontWeight: "bold",
  },
  CardRealize: {
    width: "100%",
    justifyContent: "flex-start",
  },
  CardRealizeDateText: {
    color: "white",
    fontSize: 14,
    fontWeight: "200",
  },
});
