import { Text, TouchableOpacity, useColorScheme } from "react-native"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { authService } from "../firebase"
import { signOut } from "firebase/auth"
import { BLACK_COLOR, YELLOW_COLOR } from "../assets/styles/colors"
import Detail from "../screen/Detail"
import Login from "../screen/Login"
import Review from "../screen/Review"
import Reviewedit from "../components/ReviewEdit"

const Stack = createNativeStackNavigator()

const Stacks = ({ navigation: { goBack, navigate, setOptions } }) => {
  const isDark = useColorScheme() === "dark"

  const handleAuth = () => {
    if (!!authService.currentUser?.uid) {
      signOut(authService)
        .then(() => {
          console.log("로그아웃 성공")
          setOptions({ headerRight: null })
        })
        .catch((err) => alert(err))
    } else {
      navigate("Login")
    }
  }
  return (
    <Stack.Navigator
      screenOptions={{
        headerTitleAlign: "center",
        headerLeft: () => (
          <TouchableOpacity onPress={() => goBack()}>
            <Text style={{ color: isDark ? YELLOW_COLOR : BLACK_COLOR }}>
              Back
            </Text>
          </TouchableOpacity>
        ),
        headerRight: () => {
          return (
            <TouchableOpacity onPress={handleAuth}>
              <Text style={{ color: isDark ? YELLOW_COLOR : BLACK_COLOR }}>
                {authService.currentUser ? "로그아웃" : "로그인"}
              </Text>
            </TouchableOpacity>
          )
        },
      }}
    >
      <Stack.Screen name="Detail" component={Detail} />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Review" component={Review} />
      <Stack.Screen name="Reviewedit" component={Reviewedit} />
    </Stack.Navigator>
  )
}

export default Stacks
