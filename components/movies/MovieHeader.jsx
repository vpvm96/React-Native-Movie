import { LinearGradient } from "expo-linear-gradient"
import { StyleSheet } from "react-native"
import { getImgPath } from "../../utils/util"
import styled from "@emotion/native"

const MovieHeader = ({ movie }) => {
  const { id, backdrop_path, poster_path, title, vote_average, overview } =
    movie
  return (
    <MovieHeadWrap>
      <MovieHeadMainImg
        source={{
          uri: getImgPath(backdrop_path),
        }}
        style={StyleSheet.absoluteFill}
      />
      <LinearGradient
        style={StyleSheet.absoluteFill}
        colors={["transparent", "black"]}
      />
      <MovieHeadContainer>
        <MovieHeadSubImg
          source={{
            uri: getImgPath(poster_path),
          }}
          resizeMode="stretch"
        />
        <MovieHeadContentBox>
          <MovieHeadTitle>{title}</MovieHeadTitle>
          <MovieHeadRank>⭐️{vote_average}</MovieHeadRank>
          <MovieHeadSubTitle>
            {overview.slice(0, 150)} {overview.length > 150 && "..."}
          </MovieHeadSubTitle>
        </MovieHeadContentBox>
      </MovieHeadContainer>
    </MovieHeadWrap>
  )
}

const MovieHeadWrap = styled.SafeAreaView`
  width: 100%;
`

const MovieHeadMainImg = styled.Image`
  width: 100%;
`

const MovieHeadContainer = styled.View`
  width: 70%;
  margin-top: 200px;
  display: flex;
  flex-direction: row;
  align-items: flex-end;
`

const MovieHeadSubImg = styled.Image`
  width: 40%;
  height: 150px;
  margin-left: 10px;
`

const MovieHeadContentBox = styled.View`
  width: 90%;
  margin-left: 10px;
`

const MovieHeadTitle = styled.Text`
  font-size: 20px;
  margin-bottom: 5px;
  font-weight: bold;
  color: ${(props) => props.theme.title};
`
const MovieHeadRank = styled.Text`
  margin-bottom: 5px;
  color: ${(props) => props.theme.title};
`
const MovieHeadSubTitle = styled.Text`
  color: ${(props) => props.theme.title};
`

export default MovieHeader
