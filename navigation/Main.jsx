import { createNativeStackNavigator } from "@react-navigation/native-stack"
import Tabs from "./Tabs"
import Stacks from "./Stacks"

const Stack = createNativeStackNavigator()

const Main = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="Tabs" component={Tabs} />
      <Stack.Screen name="Stacks" component={Stacks} />
    </Stack.Navigator>
  )
}

export default Main
