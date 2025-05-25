import MovieCard from "@/components/MOvieCard";
import SearchBar from "@/components/SearchBar";
import { fetchMovies } from "@/servises/api";
import { updateSearchCount } from "@/servises/appWrite";
import useFetch from "@/servises/useFetch";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Image,
  StyleSheet,
  Text,
  View,
} from "react-native";
const Search = () => {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const {
    data: movies,
    loading: moviesLoading,
    error: moviesError,
    refetch: loadMoviesSearched,
    reset,
  } = useFetch(() => fetchMovies({ query: searchQuery }), false);
  useEffect(() => {
    const timeOutId = setTimeout(async () => {
      if (searchQuery.trim()) {
        await loadMoviesSearched();
      } else {
        reset();
      }
    }, 500);
    return () => clearTimeout(timeOutId);
  }, [searchQuery]);
  useEffect(() => {
    if (movies?.length > 0 && movies?.[0]) {
      updateSearchCount(searchQuery, movies[0]);
    }
  }, [movies]);
  return (
    <View style={styles.container}>
      <Image
        style={styles.topFon}
        source={require("@/assets/images/fon3.jpg")}
      />

      <FlatList
        ListEmptyComponent={
          !moviesLoading && !moviesError ? (
            <View style={styles.EmptyScreen}>
              <Text style={styles.EmptyScreenText}>
                {searchQuery.trim() ? "No movies found" : "Search for a movie"}
              </Text>
            </View>
          ) : null
        }
        data={movies}
        renderItem={({ item }) => <MovieCard {...item} />}
        keyExtractor={(item) => item.id.toString()}
        numColumns={3}
        columnWrapperStyle={{
          width: "100%",
          //borderWidth: 1,
          alignItems: "flex-start",
          justifyContent: "space-around",
          //borderColor: "red",
          marginBottom: 20,
        }}
        ListHeaderComponent={
          <View style={styles.searchItems}>
            <SearchBar
              placeholder="Search for a movie"
              value={searchQuery}
              onChangeText={(text: string) => setSearchQuery(text)}
            ></SearchBar>

            {moviesLoading && (
              <ActivityIndicator
                style={styles.activityIndicator}
                size="large"
                color="white"
              />
            )}
            {moviesError && (
              <Text style={styles.ErrorText}>Error:{moviesError.message}</Text>
            )}
            {!moviesLoading &&
              moviesError == null &&
              searchQuery.trim() &&
              movies?.length > 0 && (
                <Text style={styles.searchDone}>
                  Rearch results for{" "}
                  <Text style={styles.searchDoneText}>{searchQuery}</Text>
                </Text>
              )}
          </View>
        }
      ></FlatList>
    </View>
  );
};

export default Search;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#01140c",
    flex: 1,
    //borderWidth: 1,
    paddingTop: 130,
    //borderColor: "red",
  },
  topFon: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: 130,
    objectFit: "cover",
    zIndex: 4,
  },
  activityIndicator: {
    marginHorizontal: "auto",
  },
  searchItems: {
    width: "100%",
    alignItems: "center",
    justifyContent: "space-around",
    paddingTop: 15,
    paddingBottom: 25,
  },
  ErrorText: {
    color: "red",
    fontSize: 30,
    width: "100%",
    textAlign: "center",
  },
  searchDone: {
    marginTop: 20,
    color: "white",
    fontSize: 20,
    fontWeight: "heavy",
    textAlign: "center",
  },
  searchDoneText: {
    color: "white",
    fontSize: 30,
    fontWeight: "bold",
    textAlign: "center",
  },
  NotMatchMovies: {
    marginTop: 200,
    marginHorizontal: "auto",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
    flexDirection: "column",
  },
  NotMatchMoviesText: {
    color: "red",
    fontSize: 18,
    marginHorizontal: "auto",
    fontWeight: "500",
  },
  EmptyScreen: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  EmptyScreenText: {
    color: "white",
    fontSize: 16,
    fontWeight: "200",
  },
});
