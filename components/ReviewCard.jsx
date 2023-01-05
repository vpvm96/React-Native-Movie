import { SCREEN_WIDTH } from "../utils/util"
import { useNavigation } from "@react-navigation/native"
import Vote from "./Vote"
import styled from "@emotion/native"

export default function ReviewCard({ review }) {
  const { navigate } = useNavigation()
  const goToReview = () => {
    navigate("Review", {
      review,
      from: "Detail",
    })
  }

  return (
    <Column onPress={goToReview}>
      <AbovePart>
        <ReviewDate>
          {new Date(review.createdAt).toLocaleDateString("kr")}
        </ReviewDate>
        <ReviewTitle>{review.title}</ReviewTitle>
        <ReviewContents numberOfLines={5}>{review.contents}</ReviewContents>
      </AbovePart>
      <Vote vote_average={review.rating} />
    </Column>
  )
}

const Reviews = styled.ScrollView``
const Column = styled.TouchableOpacity`
  justify-content: space-between;
  border-width: 1px;
  border-color: ${(props) => props.theme.title};
  width: ${SCREEN_WIDTH / 2.5 + "px"};
  border-radius: 10px;
  padding: 10px;
  height: 200px;
`
const AbovePart = styled.View``
const ReviewDate = styled.Text`
  color: ${(props) => props.theme.title};
  margin-bottom: 10px;
`
const ReviewTitle = styled.Text`
  color: ${(props) => props.theme.title};
  margin-bottom: 10px;
`
const ReviewContents = styled.Text`
  color: ${(props) => props.theme.title};
  line-height: 18px;
`
