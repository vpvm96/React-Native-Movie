import { ThemeProvider } from "@emotion/react"
import {
  DarkTheme,
  DefaultTheme,
  NavigationContainer,
} from "@react-navigation/native"
import { useColorScheme } from "react-native"
import { QueryClient, QueryClientProvider } from "react-query"
import { darkTheme, lightTheme } from "./assets/styles/theme"
import Main from "./navigation/Main"

const queryClient = new QueryClient()

export default function App() {
  const isDark = useColorScheme() === "dark"

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={isDark ? darkTheme : lightTheme}>
        <NavigationContainer theme={isDark ? DarkTheme : DefaultTheme}>
          <Main />
        </NavigationContainer>
      </ThemeProvider>
    </QueryClientProvider>
  )
}
