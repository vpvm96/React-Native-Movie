import { ActivityIndicator } from "react-native"
import styled from "@emotion/native"

const View = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`

export default function Loader() {
  return (
    <View>
      <ActivityIndicator />
    </View>
  )
}
