import React from "react";
import { Image, StyleSheet, TextInput, View } from "react-native";
interface Props {
  placeholder: string;
  onPress?: () => void;
  value?: string;
  onChangeText?: (text: string) => void;
}
const SearchBar = ({ placeholder, onPress, value, onChangeText }: Props) => {
  return (
    <View style={styles.container}>
      <Image
        tintColor="#7f6a85"
        style={styles.SearchIcon}
        source={require("@/assets/icons/search.png")}
      />
      <TextInput
        value={value}
        onPress={onPress}
        onChangeText={onChangeText}
        placeholder={placeholder}
        style={styles.Input}
        placeholderTextColor="black"
      ></TextInput>
    </View>
  );
};

export default SearchBar;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 50,
    gap: 25,
    height: "auto",
  },
  SearchIcon: {
    width: 40,
    height: 40,
  },
  Input: {
    width: "70%",
    height: 50,
    backgroundColor: "#825d8c",
    borderRadius: 50,
    paddingLeft: 10,
    paddingRight: 10,
  },
});
