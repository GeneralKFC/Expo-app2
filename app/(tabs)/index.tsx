import MovieCard from "@/components/MOvieCard";
import SearchBar from "@/components/SearchBar";
import { fetchMovies } from "@/servises/api";
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
    data: movies,
    loading: moviesLoading,
    error: moviesError,
  } = useFetch(() => fetchMovies({ query: "" }));
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
        {moviesLoading ? (
          <ActivityIndicator
            style={styles.moviesLoading}
            size="large"
            color="white"
          />
        ) : moviesError ? (
          <Text>Error:{moviesError?.message}</Text>
        ) : (
          <View style={styles.ItemsContainer2}>
            <SearchBar
              value=""
              onChangeText={() => {}}
              onPress={() => router.push("/search")}
              placeholder="Search for a movie"
            />
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
});
