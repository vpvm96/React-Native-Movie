import { ThemeProvider } from "@emotion/react"
import {
  DarkTheme,
  DefaultTheme,
  NavigationContainer,
} from "@react-navigation/native"
import { useColorScheme } from "react-native"
import { darkTheme, lightTheme } from "./assets/styles/theme"
import Main from "./navigation/Main"

export default function App() {
  const isDark = useColorScheme() === "dark"

  return (
    <ThemeProvider theme={isDark ? darkTheme : lightTheme}>
      <NavigationContainer theme={isDark ? DarkTheme : DefaultTheme}>
        <Main />
      </NavigationContainer>
    </ThemeProvider>
  )
}
