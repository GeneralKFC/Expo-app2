import { Text } from "@react-navigation/elements";
import { LinearGradient } from "expo-linear-gradient";
import { Tabs } from "expo-router";
import React from "react";
import { Image, ImageSourcePropType, StyleSheet, View } from "react-native";
interface text {
  name: string;
  focused: boolean;
  icon: ImageSourcePropType;
}
const TabIcon = ({ name, focused, icon }: text) => {
  if (focused) {
    return (
      <LinearGradient
        colors={["#1E3A8A", "#172554"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.container}
      >
        <Image alt="Icons" style={styles.IconsSourse} source={icon}></Image>
        <Text style={styles.text}>{name}</Text>
      </LinearGradient>
    );
  } else {
    return (
      <View style={styles.NotFocusedContainer}>
        <Image
          alt="Icons"
          tintColor="#E0E7FF"
          style={styles.IconsSourse}
          source={icon}
        ></Image>
      </View>
    );
  }
};
const layout = () => {
  return (
    <Tabs
      screenOptions={{
        tabBarShowLabel: false,
        tabBarItemStyle: {
          display: "flex",
          flexDirection: "row",
          width: "25%",
          height: "100%",
          alignItems: "center",
          justifyContent: "center",
        },
        tabBarStyle: {
          backgroundColor: "#0d111f",
          borderRadius: 0,
          height: 52,
          width: "100%",
          borderWidth: 1,
          borderColor: "red",
          alignItems: "center",
          justifyContent: "center",
          marginBottom: 100,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <View style={styles.Block}>
              <TabIcon
                focused={focused}
                icon={require("@/assets/icons/homeTextColor.png")}
                name="Home"
              />
            </View>
          ),
        }}
      ></Tabs.Screen>
      <Tabs.Screen
        name="search"
        options={{
          title: "Search",
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <View style={styles.Block}>
              <TabIcon
                icon={require("@/assets/icons/searchTextColor.png")}
                focused={focused}
                name="Search"
              />
            </View>
          ),
        }}
      ></Tabs.Screen>
      <Tabs.Screen
        name="saved"
        options={{
          title: "Saved",
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <View style={styles.Block}>
              <TabIcon
                icon={require("@/assets/icons/savedTextColor.png")}
                focused={focused}
                name="Saved"
              />
            </View>
          ),
        }}
      ></Tabs.Screen>
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <View style={styles.Block}>
              <TabIcon
                icon={require("@/assets/icons/profileTextColor.png")}
                focused={focused}
                name="Profile"
              />
            </View>
          ),
        }}
      ></Tabs.Screen>
    </Tabs>
  );
};

export default layout;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    height: 52,
    width: "100%",
    gap: 5,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 0,
  },
  text: {
    fontSize: 18,
    color: "#E0E7FF",
    fontWeight: "semibold",
  },
  NotFocusedContainer: {
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  },
  IconsSourse: {
    width: 20,
    height: 20,
    color: "white",
  },
  Block: {
    height: 52,
    width: "100%",
    borderWidth: 5,
    borderColor: "Green",
  },
});
