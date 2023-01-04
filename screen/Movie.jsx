import { useEffect, useState } from "react"
import { ActivityIndicator, RefreshControl } from "react-native"
import Swiper from "react-native-swiper"
import MovieBody from "../components/movies/MovieBody"
import MovieHeader from "../components/movies/MovieHeader"
import styled from "@emotion/native"

const Movie = () => {
  const [nowPlayings, setNowPlayings] = useState([])
  const [topRateds, setTopRateds] = useState([])
  const [upComings, setUpcomings] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [isRefreshing, setIsRefresing] = useState(false)
  const BASE_URL = "https://api.themoviedb.org/3/movie"
  const API_KEY = "6bddfa41d1886e777ac198dc0c085925"

  const getNowPlaying = async () => {
    const { results } = await fetch(
      `${BASE_URL}/now_playing?api_key=${API_KEY}&language=en-US&page=1`
    ).then((res) => res.json())
    setNowPlayings(results)
  }

  const getTopReated = async () => {
    const { results } = await fetch(
      `${BASE_URL}/top_rated?api_key=${API_KEY}&language=en-US&page=1`
    ).then((res) => res.json())
    setTopRateds(results)
  }

  const getUpcoming = async () => {
    const { results } = await fetch(
      `${BASE_URL}/upcoming?api_key=${API_KEY}&language=en-US&page=1`
    ).then((res) => res.json())
    setUpcomings(results)
  }

  const getData = async () => {
    await Promise.all([getNowPlaying(), getTopReated(), getUpcoming()])
    setIsLoading(false)
  }

  const onRefresh = async () => {
    setIsRefresing(true)
    await getData()
    setIsRefresing(false)
  }

  useEffect(() => {
    getData()
  }, [])

  if (isLoading) {
    return (
      <Loader>
        <ActivityIndicator />
      </Loader>
    )
  }

  return (
    <MovieMainWrap
      refreshControl={
        <RefreshControl refreshing={isRefreshing} onRefresh={onRefresh} />
      }
    >
      <Swiper height="100%" showsPagination={false} autoplay loop>
        {nowPlayings.map((movie) => (
          <MovieHeader key={movie.id} movie={movie} />
        ))}
      </Swiper>
      <MovieBody topRateds={topRateds} upComings={upComings} />
    </MovieMainWrap>
  )
}

const Loader = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`

const MovieMainWrap = styled.ScrollView`
  width: 100%;
`

export default Movie
