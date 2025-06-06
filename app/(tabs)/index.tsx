import MovieCard from "@/components/MOvieCard";
import SearchBar from "@/components/SearchBar";
import TrendingCard from "@/components/TrendingCard";
import { fetchMovies } from "@/servises/api";
import { getTrendingMovies } from "@/servises/appWrite";
import useFetch from "@/servises/useFetch";
import { useRouter } from "expo-router";
import {
  ActivityIndicator,
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
export default function Index() {
  const router = useRouter();
  const {
    data: trendingMovies,
    loading: trendingLoading,
    error: trendingError,
  } = useFetch(getTrendingMovies);
  const {
    data: movies,
    loading: moviesLoading,
    error: moviesError,
  } = useFetch(() => fetchMovies({ query: "" }));
  // console.log(trendingMovies);
  return (
    <View style={styles.container}>
      <Image
        style={styles.topFon}
        source={require("@/assets/images/fon3.jpg")}
      />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          minHeight: "100%",
          paddingBottom: 10,
        }}
        style={styles.ItemscContainer}
      >
        <Image style={styles.Logo} source={require("@/assets/images/1.png")} />
        {moviesLoading && trendingLoading ? (
          <ActivityIndicator
            style={styles.moviesLoading}
            size="large"
            color="white"
          />
        ) : moviesError && trendingError ? (
          <Text>Error:{moviesError?.message || trendingError?.message}</Text>
        ) : (
          <View style={styles.ItemsContainer2}>
            <SearchBar
              onPress={() => router.push("/search")}
              placeholder="Search for a movie"
            />
            {trendingMovies && (
              <View style={styles.TrendingMovie_container}>
                <Text style={styles.TrendingMovie_header}>Trending Movies</Text>
                <FlatList
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  ItemSeparatorComponent={() => (
                    <View style={styles.cont}></View>
                  )}
                  renderItem={({ item, index }) => (
                    <TrendingCard movie={item} index={index} />
                  )}
                  data={trendingMovies}
                  keyExtractor={(item) => item.movie_id}
                ></FlatList>
              </View>
            )}
            <Text style={styles.NotFoundMOvieText}>Latest Movies</Text>

            <FlatList
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
              scrollEnabled={false}
            ></FlatList>
          </View>
        )}
      </ScrollView>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: "#01140c",
    flex: 1,
    // borderWidth: 1,
    // borderColor: "red",
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
  ItemscContainer: {
    flex: 1,
    paddingTop: 60,
    paddingLeft: 15,
    paddingRight: 15,
    //borderWidth: 1,
    // borderColor: "red",
  },
  Logo: {
    width: 40,
    height: 40,
    marginHorizontal: "auto",
  },
  ItemsContainer2: {
    flex: 1,
    marginTop: 45,
  },
  moviesLoading: {
    marginTop: 10,
  },
  NotFoundMOvieText: {
    color: "white",
    fontSize: 25,
    fontWeight: "semibold",
    marginTop: 20,
    marginBottom: 10,
  },
  SearchContainer2: {
    flex: 1,
    paddingTop: 60,
    paddingLeft: 15,
    paddingRight: 15,
    // borderWidth: 1,
    //borderColor: "red",
  },
  TitleMovie: {
    color: "#0fa379",
    fontSize: 18,
    maxWidth: "45%",
    textAlign: "center",
    // borderWidth: 1,
    //borderColor: "red",
  },
  TrendingMovie_container: {
    width: "100%",
    marginTop: 20,
    //borderWidth: 1,
    //borderColor: "red",
  },
  TrendingMovie_header: {
    color: "white",
    fontSize: 25,
    justifyContent: "flex-start",
    marginBottom: 10,
    fontWeight: "semibold",
  },
  FlatList_Title: {
    color: "white",
  },
  cont: {
    width: 12,
  },
});
