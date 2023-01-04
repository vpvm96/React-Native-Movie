import { Text, TouchableOpacity, useColorScheme } from "react-native"
import { BLACK_COLOR, YELLOW_COLOR } from "../assets/styles/colors"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import Detail from "../screen/Detail"

const Stack = createNativeStackNavigator()

const Stacks = ({ navigation: { goBack } }) => {
  const isDark = useColorScheme() === "dark"
  return (
    <Stack.Navigator
      screenOptions={{
        headerTitleAlign: "left",
        headerTintColor: isDark ? YELLOW_COLOR : BLACK_COLOR,
        headerLeft: () => (
          <TouchableOpacity onPress={() => goBack()}>
            <Text style={{ color: YELLOW_COLOR }}>Back</Text>
          </TouchableOpacity>
        ),
      }}
    >
      <Stack.Screen name="Detail" component={Detail} />
    </Stack.Navigator>
  )
}

export default Stacks
