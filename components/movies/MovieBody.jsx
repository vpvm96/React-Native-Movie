import styled from "@emotion/native"
import MovieComingView from "./MoivesComingView"
import MovieScrollView from "./MovieScrollView"

const MovieBody = ({ topRateds, upComings }) => {
  return (
    <MovieBodyWrap>
      <MovieBodyRatedTitle>Top Rated Movies</MovieBodyRatedTitle>
      <MovieBodyRastedContainer horizontal={true}>
        {topRateds.map((movie) => (
          <MovieScrollView key={movie.id} movie={movie} />
        ))}
      </MovieBodyRastedContainer>
      <MovieBodyComingTitle>Upcoming Movies</MovieBodyComingTitle>
      <MovieBodyComingContainer>
        {upComings.map((movie) => (
          <MovieComingView key={movie.id} movie={movie} />
        ))}
      </MovieBodyComingContainer>
    </MovieBodyWrap>
  )
}

const MovieBodyWrap = styled.View`
  width: 100%;
`

const MovieBodyRatedTitle = styled.Text`
  margin-top: 15px;
  font-size: 20px;
  font-weight: bold;
  color: ${(props) => props.theme.categoryTitle};
`

const MovieBodyRastedContainer = styled.ScrollView`
  width: 100%;
`

const MovieBodyComingTitle = styled.Text`
  margin-top: 15px;
  font-size: 20px;
  font-weight: bold;
  color: ${(props) => props.theme.categoryTitle};
`
const MovieBodyComingContainer = styled.View`
  width: 100%;
`

export default MovieBody
