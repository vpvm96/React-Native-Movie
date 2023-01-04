import React, { useEffect, useState } from "react"
import {
  ActivityIndicator,
  Linking,
  StyleSheet,
  useColorScheme,
} from "react-native"
import { LinearGradient } from "expo-linear-gradient"
import { AntDesign } from "@expo/vector-icons"
import { getImgPath } from "../utils/util"
import styled from "@emotion/native"

const Detail = ({
  navigation: { navigate },
  route: {
    params: { movieId },
  },
}) => {
  const [movieData, setMovieData] = useState({})
  const [isLoading, setIsLoading] = useState(true)
  const isDark = useColorScheme() === "dark"

  const API_KEY = "6bddfa41d1886e777ac198dc0c085925"
  const BASE_URL = "https://api.themoviedb.org/3/movie"

  const getDetail = async () => {
    const res = await fetch(
      `${BASE_URL}/${movieId}?api_key=${API_KEY}&language=en-US&append_to_response=videos`
    ).then((res) => res.json())
    setMovieData(res)
    setIsLoading(false)
  }

  const openYoutube = async (key) => {
    const url = `https://www.youtube.com/watch?v=${key}`
    await Linking.openURL(url)
  }

  useEffect(() => {
    getDetail()
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
      <DetailSectionTitle>Reviews</DetailSectionTitle>
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

const DetailSectionTitle = styled.Text`
  color: ${(props) => props.theme.title};
`

export default Detail
