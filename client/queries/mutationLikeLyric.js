import gql from "graphql-tag";

export default gql`
  mutation LyricLike($id: ID) {
    likeLyric(id: $id) {
      id
      likes
    }
  }
`;
