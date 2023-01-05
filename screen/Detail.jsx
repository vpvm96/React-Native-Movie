import { useQuery } from "react-query"
import {
  ActivityIndicator,
  Linking,
  StyleSheet,
  useColorScheme,
} from "react-native"
import { LinearGradient } from "expo-linear-gradient"
import { AntDesign } from "@expo/vector-icons"
import { getDetail } from "../api"
import { getImgPath } from "../utils/util"
import styled from "@emotion/native"

const Detail = ({
  navigation: { navigate },
  route: {
    params: { movieId },
  },
}) => {
  const isDark = useColorScheme() === "dark"

  const { data: movieData, isLoading } = useQuery(
    ["Detail", movieId],
    getDetail
  )

  const openYoutube = async (key) => {
    const url = `https://www.youtube.com/watch?v=${key}`
    await Linking.openURL(url)
  }

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
