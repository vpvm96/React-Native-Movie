import { useEffect } from "react"
import { useColorScheme, TouchableOpacity, Text } from "react-native"
import { authService } from "../firebase"
import { AntDesign } from "@expo/vector-icons"
import { YELLOW_COLOR, WHITE_COLOR } from "../assets/styles/colors"
import styled from "@emotion/native"

export default function Review({
  navigation: { goBack, navigate, setOptions },
  route: {
    params: { review, from },
  },
}) {
  const isDark = useColorScheme() === "dark"

  const onEdit = () => {
    navigate("Reviewedit", { review, from })
  }

  useEffect(() => {
    setOptions({
      headerLeft: () => (
        <TouchableOpacity onPress={() => goBack()}>
          <Text style={{ color: isDark ? YELLOW_COLOR : WHITE_COLOR }}>
            Back
          </Text>
        </TouchableOpacity>
      ),
      headerRight: () => {
        if (authService.currentUser) {
          return (
            <TouchableOpacity onPress={onEdit}>
              <AntDesign
                name="edit"
                size={24}
                color={isDark ? YELLOW_COLOR : WHITE_COLOR}
              />
            </TouchableOpacity>
          )
        }
      },
    })
  }, [])

  return (
    <Container>
      <SectionTitle>평점</SectionTitle>

      <Ratings>⭐️ {review.rating} / 10</Ratings>

      <SectionTitle>제목</SectionTitle>

      <Title>{review.title}</Title>

      <SectionTitle>내용</SectionTitle>

      <Content>{review.contents}</Content>
    </Container>
  )
}

export const Container = styled.ScrollView`
  padding: 20px;
`

export const SectionTitle = styled.Text`
  font-size: 30px;
  font-weight: 600;
  color: ${(props) => props.theme.title};
  margin-bottom: 15px;
`

export const Ratings = styled.Text`
  color: ${(props) => props.theme.title};
  font-size: 20px;
  margin-bottom: 20px;
`
export const Title = styled.Text`
  font-size: 20px;
  font-weight: 500;
  color: ${(props) => props.theme.title};
  margin-bottom: 20px;
`
export const Content = styled.Text`
  font-size: 20px;
  font-weight: 500;
  color: ${(props) => props.theme.title};
  line-height: 30px;
`
