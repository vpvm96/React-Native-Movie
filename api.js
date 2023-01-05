import { fireStore } from "./firebase"
import { deleteDoc, doc, updateDoc } from "firebase/firestore"

const BASE_URL = "https://api.themoviedb.org/3/movie"
const API_KEY = "6bddfa41d1886e777ac198dc0c085925"

export const getNowPlaying = () =>
  fetch(
    `${BASE_URL}/now_playing?api_key=${API_KEY}&language=en-US&page=1`
  ).then((res) => res.json())

export const getTopReated = ({ pageParam = 1 }) =>
  fetch(
    `${BASE_URL}/top_rated?api_key=${API_KEY}&language=en-US&page=${pageParam}`
  ).then((res) => res.json())

export const getUpcoming = ({ pageParam = 1 }) =>
  fetch(
    `${BASE_URL}/upcoming?api_key=${API_KEY}&language=en-US&page=${pageParam}`
  ).then((res) => res.json())

export const getDetail = async (params) => {
  const [_, movieId] = params.queryKey
  return fetch(
    `${BASE_URL}/${movieId}?api_key=${API_KEY}&language=en-US&append_to_response=videos`
  ).then((res) => res.json())
}

export const deleteReview = async (reviewId) => {
  await deleteDoc(doc(fireStore, "reviews", reviewId))
}

export const editReview = async ({ reviewId, editingObj }) => {
  await updateDoc(doc(fireStore, "reviews", reviewId), editingObj)
}
