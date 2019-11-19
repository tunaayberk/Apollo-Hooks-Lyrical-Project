import gql from "graphql-tag";

export default gql`
  mutation LyricCreate($content: String, $songId: ID) {
    addLyricToSong(content: $content, songId: $songId) {
      id
      title
      lyrics {
        content
        id
        likes
      }
    }
  }
`;
