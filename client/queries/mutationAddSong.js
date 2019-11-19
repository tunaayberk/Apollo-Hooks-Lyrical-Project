import gql from "graphql-tag";

export default gql`
  mutation AddSong($title: String) {
    addSong(title: $title) {
      title
    }
  }
`;
