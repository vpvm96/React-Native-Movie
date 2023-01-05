import { createNativeStackNavigator } from "@react-navigation/native-stack"
import Tabs from "./Tabs"
import Stacks from "./Stacks"

const Nav = createNativeStackNavigator()

const Main = () => {
  return (
    <Nav.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Nav.Screen name="Tabs" component={Tabs} />
      <Nav.Screen name="Stack" component={Stacks} />
    </Nav.Navigator>
  )
}

export default Main
