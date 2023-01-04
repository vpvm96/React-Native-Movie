import { useNavigation } from "@react-navigation/native"
import { getImgPath } from "../../utils/util"
import styled from "@emotion/native"

const MovieComingView = ({ movie }) => {
  const { id, poster_path, title, overview, release_date } = movie
  const { navigate } = useNavigation()
  return (
    <MovieComingWrap
      key={id}
      onPress={() =>
        navigate("Stacks", { screen: "Detail", params: { movieId: id } })
      }
    >
      <MovieComingPostBox>
        <MovieComingPostImg source={{ uri: getImgPath(poster_path) }} />
      </MovieComingPostBox>
      <MovieComingTextBox>
        <MovieComingTitleText>{title}</MovieComingTitleText>
        <MovieComingCreatedAtText>{release_date}</MovieComingCreatedAtText>
        <MovieComingDescText>
          {overview.slice(0, 150)} {overview.length > 150 && "..."}
        </MovieComingDescText>
      </MovieComingTextBox>
    </MovieComingWrap>
  )
}

const MovieComingWrap = styled.TouchableOpacity`
  width: 100%;
  margin-top: 20px;
  display: flex;
  flex-direction: row;
  justify-content: center;
`

const MovieComingPostBox = styled.View`
  width: 30%;
`

const MovieComingPostImg = styled.Image`
  width: 100%;
  height: 200px;
`

const MovieComingTextBox = styled.View`
  width: 60%;
  margin-left: 20px;
`
const MovieComingTitleText = styled.Text`
  color: ${(props) => props.theme.title};
  margin-top: 5px;
  font-size: 20px;
  margin-bottom: 5px;
  font-weight: bold;
`
const MovieComingCreatedAtText = styled.Text`
  color: ${(props) => props.theme.title};
  margin-top: 15px;
`
const MovieComingDescText = styled.Text`
  color: ${(props) => props.theme.title};
  margin-top: 15px;
`

export default MovieComingView
