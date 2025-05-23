import SearchBar from "@/components/SearchBar";
import { useRouter } from "expo-router";
import { Image, ScrollView, StyleSheet, View } from "react-native";
export default function Index() {
  const router = useRouter();
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
        <View style={styles.ItemsContainer2}>
          <SearchBar
            onPress={() => router.push("/search")}
            placeholder="Search for a movie"
          />
        </View>
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
    height: "15%",
    objectFit: "cover",
  },
  ItemscContainer: {
    flex: 1,
    paddingTop: 60,
    paddingLeft: 15,
    paddingRight: 15,
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
});
