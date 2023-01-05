import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { MaterialIcons } from "@expo/vector-icons"
import { useColorScheme } from "react-native"
import { WHITE_COLOR, YELLOW_COLOR } from "../assets/styles/colors"
import { Zocial } from "@expo/vector-icons"
import React from "react"
import Movie from "../screen/Movie"
import My from "../screen/My"

const Tab = createBottomTabNavigator()

const Tabs = () => {
  const isDark = useColorScheme() === "dark"
  return (
    <Tab.Navigator
      screenOptions={{
        headerTintColor: isDark ? YELLOW_COLOR : WHITE_COLOR,
        tabBarActiveTintColor: isDark ? YELLOW_COLOR : WHITE_COLOR,
        tabBarLabelPosition: "beside-icon",
        headerTitleAlign: "center",
      }}
    >
      <Tab.Screen
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="local-movies" size={size} color={color} />
          ),
        }}
        name="Movies"
        component={Movie}
      />
      <Tab.Screen
        options={{
          tabBarIcon: ({ color, size }) => (
            <Zocial name="myspace" size={size} color={color} />
          ),
        }}
        name="My"
        component={My}
      />
    </Tab.Navigator>
  )
}

export default Tabs
