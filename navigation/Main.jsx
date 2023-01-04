import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { DARK_COLOR } from "../assets/styles/colors"
import Tabs from "./Tabs"

const Stack = createNativeStackNavigator()

const Main = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="Tabs" component={Tabs} />
      {/* <Stack.Screen /> */}
    </Stack.Navigator>
  )
}

export default Main
