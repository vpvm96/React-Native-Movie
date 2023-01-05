import { useState } from "react"
import { useQuery, useQueryClient, useInfiniteQuery } from "react-query"
import { ActivityIndicator, View } from "react-native"
import { getNowPlaying, getTopReated, getUpcoming } from "../api"
import Swiper from "react-native-swiper"
import MovieHeader from "../components/movies/MovieHeader"
import MovieComingView from "../components/movies/MoivesComingView"
import MovieScrollView from "../components/movies/MovieScrollView"
import styled from "@emotion/native"

const Movie = () => {
  const queryClient = useQueryClient()
  const [isRefreshing, setIsRefresing] = useState(false)

  const { data: nowPlayingData, isLoading: isLoadingNP } = useQuery(
    ["Moives", "NowPlaying"],
    getNowPlaying
  )
  const {
    data: topRatedData,
    isLoading: isLoadingTR,
    fetchNextPage: fetchNextPageTR,
    hasNextPage: hasNextPageTR,
  } = useInfiniteQuery(["Moives", "TopRated"], getTopReated, {
    getNextPageParam: (lastPage) => {
      if (lastPage.page < lastPage.total_pages) {
        return lastPage.page + 1
      }
    },
  })
  const {
    data: upcomingData,
    isLoading: isLoadingUC,
    fetchNextPage: fetchNextPageUC,
    hasNextPage: hasNextPageUC,
  } = useInfiniteQuery(["Movies", "Upcoming"], getUpcoming, {
    getNextPageParam: (lastPage) => {
      if (lastPage.page < lastPage.total_pages) {
        return lastPage.page + 1
      }
    },
  })

  const onRefresh = async () => {
    setIsRefresing(true)
    // await Promise.all([refetchNP(), refetchTR(), refetchUC()])
    queryClient.refetchQueries(["Movies"])
    setIsRefresing(false)
  }

  const isLoading = isLoadingNP || isLoadingTR || isLoadingUC

  const upcomingFetchMore = async () => {
    if (hasNextPageUC) {
      await fetchNextPageUC()
    }
  }

  const ratedFetchMore = async () => {
    if (hasNextPageTR) {
      await fetchNextPageTR()
    }
  }

  if (isLoading) {
    return (
      <Loader>
        <ActivityIndicator />
      </Loader>
    )
  }

  return (
    <MovieMainWrap
      onEndReached={upcomingFetchMore}
      onEndReachedThreshold={0.5}
      refreshing={isRefreshing}
      onRefresh={onRefresh}
      ListHeaderComponent={
        <>
          <Swiper height="100%" showsPagination={false} autoplay loop>
            {nowPlayingData.results.map((movie) => (
              <MovieHeader key={movie.id} movie={movie} />
            ))}
          </Swiper>
          <MovieBodyWrap>
            <MovieBodyRatedTitle>Top Rated Movies</MovieBodyRatedTitle>
            <MoviebodyRatedContainer
              horizontal
              showsHorizontalScrollIndicator={false}
              onEndReached={ratedFetchMore}
              onEndReachedThreshold={0.5}
              data={topRatedData.pages.map((page) => page.results).flat()}
              renderItem={({ item }) => <MovieScrollView movie={item} />}
              keyExtractor={(item) => item.id}
              ItemSeparatorComponent={<MovieBodyRatedContainerGap />}
            />
            <MovieBodyComingTitle>Upcoming Movies</MovieBodyComingTitle>
          </MovieBodyWrap>
        </>
      }
      data={upcomingData.pages.map((page) => page.results).flat()}
      renderItem={({ item }) => <MovieComingView movie={item} />}
      keyExtractor={(item) => item.id}
      ItemSeparatorComponent={<View style={{ height: 15 }} />}
    />
  )
}

const Loader = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`

const MovieMainWrap = styled.FlatList`
  width: 100%;
`

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
// const MovieBodyComingContainer = styled.View`
//   width: 100%;
// `

export default Movie
