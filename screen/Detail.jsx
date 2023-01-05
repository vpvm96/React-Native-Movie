import { useEffect, useState } from "react"
import { useQuery } from "react-query"
import {
  ActivityIndicator,
  Linking,
  StyleSheet,
  useColorScheme,
  FlatList,
} from "react-native"
import { fireStore, authService } from "../firebase"
import { collection, onSnapshot, orderBy, query } from "firebase/firestore"
import { LinearGradient } from "expo-linear-gradient"
import { AntDesign } from "@expo/vector-icons"
import { getDetail } from "../api"
import { getImgPath } from "../utils/util"
import ReviewModal from "../components/ReviewModal"
import ReviewCard from "../components/ReviewCard"
import styled from "@emotion/native"

const Detail = ({
  navigation: { navigate },
  route: {
    params: { movieId },
  },
}) => {
  const [reviews, setReviews] = useState([])
  const [isOpenModal, setIsOpenModal] = useState(false)
  const isDark = useColorScheme() === "dark"

  const { data: movieData, isLoading } = useQuery(
    ["Detail", movieId],
    getDetail
  )

  const handleCommentAdded = () => {
    const isLogin = !!authService.currentUser
    if (!isLogin) {
      navigate("Login")
      return
    }
    setIsOpenModal(true)
  }

  const openYoutube = async (key) => {
    const url = `https://www.youtube.com/watch?v=${key}`
    await Linking.openURL(url)
  }

  useEffect(() => {
    const q = query(
      collection(fireStore, "reviews"),
      orderBy("createdAt", "desc")
    )
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const newReviews = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }))
      setReviews(newReviews)
    })
    return unsubscribe
  }, [])

  if (isLoading) {
    return (
      <Loader>
        <ActivityIndicator />
      </Loader>
    )
  }

  return (
    <DetailWrap>
      <DetailBackDropImgBox>
        <DetailBackDropImg
          style={StyleSheet.absoluteFill}
          source={{ uri: getImgPath(movieData.backdrop_path) }}
        />
        <LinearGradient
          style={StyleSheet.absoluteFill}
          colors={["transparent", "black"]}
        />
      </DetailBackDropImgBox>
      <DetailText>{movieData.title}</DetailText>
      <DetailOverView>{movieData.overview}</DetailOverView>
      <DetailYoutubeList>
        {movieData?.videos?.results.map((video) => (
          <DetailYoutubeLink
            key={video.key}
            onPress={() => openYoutube(video.key)}
          >
            <AntDesign
              name="youtube"
              size={24}
              color={isDark ? "white" : "black"}
            />
            <DetailYoutubeLinkName>{video.name}</DetailYoutubeLinkName>
          </DetailYoutubeLink>
        ))}
      </DetailYoutubeList>
      <DetailReviewBox onPress={handleCommentAdded}>
        <DetailReviewTitle>Reviews</DetailReviewTitle>
      </DetailReviewBox>
      <FlatList
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{
          paddingHorizontal: 20,
          marginBottom: 50,
          justifyContent: "flex-start",
        }}
        keyExtractor={(item) => item.id}
        horizontal
        data={reviews}
        ItemSeparatorComponent={HSeprator}
        renderItem={({ item }) => {
          if (item.movieId === movieId) {
            return <ReviewCard review={item} />
          }
        }}
      />
      <ReviewModal
        movieId={movieId}
        isOpenModal={isOpenModal}
        setIsOpenModal={setIsOpenModal}
      />
    </DetailWrap>
  )
}

const Loader = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`

const DetailWrap = styled.ScrollView``

const DetailBackDropImgBox = styled.View`
  width: 100%;
  height: 350px;
`

const DetailBackDropImg = styled.Image`
  width: 100%;
`

const DetailText = styled.Text`
  color: ${(props) => props.theme.title};
  font-size: 30px;
  font-weight: 600;
  margin-left: 20px;
`

const DetailOverView = styled.Text`
  color: ${(props) => props.theme.title};
  font-size: 15px;
  font-weight: 400;
  padding: 18px;
  line-height: 20px;
`

const DetailYoutubeList = styled.View`
  width: 100%;
  padding-left: 20px;
  padding-right: 20px;
`

const DetailYoutubeLink = styled.TouchableOpacity`
  width: 100%;
  flex-direction: row;
  margin-bottom: 10px;
`

const DetailYoutubeLinkName = styled.Text`
  color: ${(props) => props.theme.title};
  font-size: 16px;
  line-height: 24px;
  font-weight: 500;
  margin-left: 10px;
`

const DetailReviewBox = styled.TouchableOpacity`
  margin-left: 20px;
  margin-right: 20px;
  padding: 10px;
  margin-bottom: 20px;
  border-radius: 5px;
  border-width: 1px;
  align-items: center;
  border-color: ${(props) => props.theme.title};
`

const DetailReviewTitle = styled.Text`
  color: ${(props) => props.theme.title};
`

const HSeprator = styled.View`
  width: 10px;
`

export default Detail
