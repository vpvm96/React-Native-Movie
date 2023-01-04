import MovieComingView from "./MoivesComingView"
import MovieScrollView from "./MovieScrollView"
import styled from "@emotion/native"

const MovieBody = ({ topRateds, upComings }) => {
  return (
    <MovieBodyWrap>
      <MovieBodyRatedTitle>Top Rated Movies</MovieBodyRatedTitle>
      <MoviebodyRatedContainer
        horizontal
        showsHorizontalScrollIndicator={false}
        data={topRateds}
        renderItem={({ item }) => <MovieScrollView movie={item} />}
        keyExtractor={(item) => item.id}
        ItemSeparatorComponent={<MovieBodyRatedContainerGap />}
      />
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

const MoviebodyRatedContainer = styled.FlatList`
  width: 100%;
`

const MovieBodyRatedContainerGap = styled.View`
  width: 10px;
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
