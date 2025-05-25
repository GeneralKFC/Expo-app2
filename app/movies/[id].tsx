import { fetchMovieDetails } from "@/servises/api";
import useFetch from "@/servises/useFetch";
import { useLocalSearchParams } from "expo-router";
import React from "react";
import { Image, ScrollView, StyleSheet, Text, View } from "react-native";
const MovieDetails = () => {
  const { id } = useLocalSearchParams();
  const { data: movie, loading } = useFetch(() =>
    fetchMovieDetails(id as string)
  );
  return (
    <View style={styles.MovieDetails_container}>
      <ScrollView
        contentContainerStyle={{
          width: "100%",
          paddingBottom: 80,
        }}
      >
        <View>
          <Image
            resizeMode="stretch"
            style={styles.MovieDetails_Movie_Image}
            source={{
              uri: `https://image.tmdb.org/t/p/w500${movie?.poster_path}`,
            }}
          ></Image>
        </View>
        <View style={styles.ForDetails_container}>
          <Text style={styles.ForDetails_title}>{movie?.title}</Text>
          <View style={styles.ForDetails_text}>
            <Text style={styles.ForDetails_Box2}>{movie?.release_date}</Text>
            <Text style={styles.ForDetails_Box2}>
              RunTime: {movie?.runtime}
            </Text>
          </View>
        </View>
      </ScrollView>

      <Text>MovieDetails:[id]</Text>
    </View>
  );
};

export default MovieDetails;

const styles = StyleSheet.create({
  MovieDetails_container: {
    width: "100%",
    height: "100%",
    backgroundColor: "#01140c",
  },
  MovieDetails_Movie_Image: {
    width: "100%",
    height: 650,
  },
  ForDetails_container: {
    width: "100%",
    marginTop: 20,
    flexDirection: "column",
    justifyContent: "flex-start",
    paddingHorizontal: 15,
  },
  ForDetails_title: {
    fontSize: 30,
    color: "white",
    fontWeight: "semibold",
  },
  ForDetails_text: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    gap: 10,
  },
  ForDetails_Box2: {
    color: "white",
    padding: 6,
    backgroundColor: "green",
    fontSize: 18,
    fontWeight: "400",
  },
});
