import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { MaterialIcons } from "@expo/vector-icons"
import { Zocial } from "@expo/vector-icons"
import React from "react"
import Movie from "../screen/Movie"

const Tab = createBottomTabNavigator()

const Tabs = () => {
  return (
    <Tab.Navigator screenOptions={{ tabBarLabelPosition: "beside-icon" }}>
      <Tab.Screen
        options={{
          title: "영화",
          headerTitleAlign: "center",
          tabBarLabel: "Movies",
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="local-movies" size={size} color={color} />
          ),
        }}
        name="Movies"
        component={Movie}
      />
      {/* <Tab.Screen
        options={{
          title: "마이 페이지",
          tabBarLabel: "My Page",
          tabBarIcon: ({ color, size }) => (
            <Zocial name="myspace" size={size} color={color} />
          ),
        }}
        name="My"
      /> */}
    </Tab.Navigator>
  )
}

export default Tabs
