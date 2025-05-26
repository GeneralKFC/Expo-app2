import { fetchMovieDetails } from "@/servises/api";
import useFetch from "@/servises/useFetch";
import { router, useLocalSearchParams } from "expo-router";
import React from "react";
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
interface MovieInfoProps {
  label: string;
  value: string | number | null;
}
const MovieDetails = () => {
  const { id } = useLocalSearchParams();
  const { data: movie, loading } = useFetch(() =>
    fetchMovieDetails(id as string)
  );
  const MovieInfo = ({ label, value }: MovieInfoProps) => (
    <View style={styles.MovieInfo_container}>
      <Text style={styles.MovieInfo_Header_Text}>{label}</Text>
      <Text style={styles.MovieInfo_Overview}>{value || "N/A"}</Text>
    </View>
  );
  return (
    <View style={styles.MovieDetails_container}>
      <TouchableOpacity onPress={router.back} style={styles.Arrow_Back_Touch}>
        <View style={styles.Arrow_Back_View}>
          <Image
            source={require("@/assets/icons/ArrowBackWhite.png")}
            style={styles.Arrow_Back}
          ></Image>
          <Text style={styles.Arrow_Back_Text}>Go back</Text>
        </View>
      </TouchableOpacity>
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
              RunTime: {movie?.runtime}m
            </Text>
          </View>
          <View style={styles.ForDetails_Box3}>
            <Image
              style={styles.ForDetails_Box3_Icon}
              source={require("@/assets/icons/Star.png")}
            ></Image>
            <Text style={styles.ForDetails_Box3_Text}>
              {movie?.vote_average ?? 0}
            </Text>
            <Text style={styles.ForDetails_Box3_Text}>
              ({movie?.vote_count} votess)
            </Text>
          </View>
          <MovieInfo label="Overview" value={movie?.overview}></MovieInfo>
          <MovieInfo
            label="Genres"
            value={movie?.genres?.map((g: any) => g.name).join(" - ") || "N/A"}
          ></MovieInfo>
          <View style={styles.Budget_container}>
            <MovieInfo label="Budget" value={`$${movie?.budget}`}></MovieInfo>
            <MovieInfo label="Revenue" value={`$${movie?.revenue}`}></MovieInfo>
          </View>
          <MovieInfo
            label="Production Companies"
            value={
              movie?.production_companies
                ?.map((pc: any) => pc.name)
                .join(" - ") || "N/A"
            }
          ></MovieInfo>
        </View>
      </ScrollView>
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
    flexDirection: "column",
    justifyContent: "flex-start",
    paddingHorizontal: 15,
    gap: 15,
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
    borderRadius: 5,
    fontWeight: "400",
  },
  ForDetails_Box3: {
    flexDirection: "row",
    gap: 10,
    alignItems: "center",
  },
  ForDetails_Box3_Text: {
    color: "white",
    backgroundColor: "green",
    fontSize: 18,
    borderRadius: 5,
    padding: 5,
    fontWeight: "400",
  },
  ForDetails_Box3_Icon: {
    width: 28,
    height: 28,
  },
  MovieInfo_container: {
    flexDirection: "column",
    marginTop: 10,
    gap: 10,
  },
  MovieInfo_Header_Text: {
    color: "white",
    fontWeight: "semibold",
    fontSize: 24,
  },
  MovieInfo_Overview: {
    color: "white",
    fontSize: 18,
    fontWeight: "400",
  },
  Budget_container: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  Arrow_Back_Touch: {
    width: 0,
    height: 0,
    zIndex: 1000,
    position: "fixed",
    flexDirection: "column",
    top: 55,
    right: "-75%",
  },
  Arrow_Back_View: {
    backgroundColor: "red",
    borderRadius: 5,
    width: 80,
    height: 76,
    alignItems: "center",
    justifyContent: "center",
  },
  Arrow_Back: {
    width: 50,
    height: 50,
    borderRadius: 5,
  },
  Arrow_Back_Text: {
    zIndex: 1001,
    color: "white",
    fontSize: 16,
    fontWeight: "semibold",
  },
});
