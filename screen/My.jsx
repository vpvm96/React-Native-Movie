import { useState, useCallback } from "react"
import { Text, useColorScheme, FlatList, TouchableOpacity } from "react-native"
import { useFocusEffect } from "@react-navigation/native"
import { authService, fireStore } from "../firebase"
import { signOut } from "firebase/auth"
import {
  collection,
  onSnapshot,
  orderBy,
  query,
  where,
} from "firebase/firestore"
import { YELLOW_COLOR, WHITE_COLOR } from "../assets/styles/colors"
import Vote from "../components/Vote"
import styled from "@emotion/native"

export default function My({ navigation: { navigate, reset, setOptions } }) {
  const isDark = useColorScheme() === "dark"
  const [reviews, setReviews] = useState([])

  const goToReview = (theReview) => {
    navigate("Stack", {
      screen: "Review",
      params: { review: theReview, from: "My" },
    })
  }

  const logout = () => {
    signOut(authService)
      .then(() => {
        console.log("로그아웃 성공")
        navigate("Movies")
      })
      .catch((err) => alert(err))
  }
  useFocusEffect(
    useCallback(() => {
      if (!authService.currentUser) {
        // 비로그인 상태에서 마이페이지 접근 시 로그인화면으로 이동하고, 뒤로가기 시 무비탭
        reset({
          index: 1,
          routes: [
            {
              name: "Tabs",
              params: {
                screen: "Movies",
              },
            },
            {
              name: "Stack",
              params: {
                screen: "Login",
              },
            },
          ],
        })
        return
      }

      setOptions({
        headerRight: () => {
          return (
            <TouchableOpacity style={{ marginRight: 10 }} onPress={logout}>
              <Text style={{ color: isDark ? YELLOW_COLOR : WHITE_COLOR }}>
                로그아웃
              </Text>
            </TouchableOpacity>
          )
        },
      })

      const q = query(
        collection(fireStore, "reviews"),
        orderBy("createdAt", "desc"),
        where("userId", "==", authService.currentUser?.uid)
      )
      const unsubcribe = onSnapshot(q, (snapshot) => {
        const newReviews = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }))
        setReviews(newReviews)
      })
      return unsubcribe
    }, [])
  )

  return (
    <FlatList
      contentContainerStyle={{ padding: 20 }}
      data={reviews}
      ItemSeparatorComponent={VSeperator}
      ListHeaderComponent={<ListTitle>My Reviews</ListTitle>}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <ReviewWrapper onPress={() => goToReview(item)}>
          <Title>{item.title}</Title>
          <Contents numberOfLines={2}>{item.contents}</Contents>
          <Row>
            <Vote vote_average={item.rating} />
            <ReviewAt>
              {new Date(item.createdAt).toLocaleDateString("kr")}
            </ReviewAt>
          </Row>
        </ReviewWrapper>
      )}
    />
  )
}

const Container = styled.ScrollView`
  padding: 20px;
`

const ListTitle = styled.Text`
  font-size: 20px;
  font-weight: 500;
  color: ${(props) => props.theme.title};
  margin-bottom: 20px;
`
const ReviewWrapper = styled.TouchableOpacity`
  padding: 10px 15px;
  border-radius: 5px;
  border-width: 1px;
  border-color: ${(props) => props.theme.title};
`
const Title = styled.Text`
  color: ${(props) => props.theme.title};
  font-size: 20px;
`

const Contents = styled(Title)`
  margin: 10px 0;
  height: 50px;
`

const Row = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-end;
`

const ReviewAt = styled.Text`
  font-size: 14px;
  color: ${(props) => props.theme.title};
`
const VSeperator = styled.View`
  height: 10px;
`
