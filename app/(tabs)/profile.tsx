import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";

const profile = () => {
  return (
    <View style={styles.Profile_container}>
      <View style={styles.Profile_header_container}>
        <Image
          resizeMode="contain"
          style={styles.Profile_Image}
          source={require("@/assets/images/logo.png")}
        ></Image>
        <Text style={styles.Profile_Text}>Profile</Text>
      </View>
    </View>
  );
};

export default profile;

const styles = StyleSheet.create({
  Profile_container: {
    backgroundColor: "#01140c",
    flex: 1,
  },
  Profile_header_container: {
    width: "100%",
    height: "100%",
    flexDirection: "column",
    paddingHorizontal: 30,
    alignItems: "center",
    justifyContent: "center",
  },
  Profile_Image: {
    width: 100,
    height: 100,
  },
  Profile_Text: {
    color: "white",
    fontSize: 25,
  },
});
