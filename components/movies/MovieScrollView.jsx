import { useNavigation } from "@react-navigation/native"
import { getImgPath } from "../../utils/util"
import styled from "@emotion/native"

const MovieScrollView = ({ movie }) => {
  const { id, poster_path, title, vote_average } = movie
  const { navigate } = useNavigation()

  return (
    <MovieViewWrap
      key={id}
      onPress={() =>
        navigate("Stacks", { screen: "Detail", params: { movieId: id } })
      }
    >
      <MovieViewImgBox>
        <MovieViewImg source={{ uri: getImgPath(poster_path) }} />
      </MovieViewImgBox>
      <MovieViewContentBox>
        <MovieViewRank>⭐️ {vote_average}</MovieViewRank>
        <MovieViewText>
          {title.slice(0, 11)} {title.length > 11 && "..."}
        </MovieViewText>
      </MovieViewContentBox>
    </MovieViewWrap>
  )
}

const MovieViewWrap = styled.TouchableOpacity`
  width: 130px;
`

const MovieViewImgBox = styled.View`
  width: 100%;
  margin-top: 20px;
`

const MovieViewImg = styled.Image`
  width: 100%;
  height: 170px;
`

const MovieViewContentBox = styled.View`
  width: 100%;
  height: 60px;
  background-color: #808e9b;
  border-radius: 0 0 7px 7px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
`

const MovieViewRank = styled.Text`
  color: ${(props) => props.theme.title};
  margin-left: 8px;
`

const MovieViewText = styled.Text`
  color: ${(props) => props.theme.title};
  margin-left: 8px;
  margin-top: 5px;
`

export default MovieScrollView
