import gql from "graphql-tag";

export default gql`
  mutation addSong($id: ID) {
    deleteSong(id: $id) {
      id
      title
    }
  }
`;
