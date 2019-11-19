import React from "react";
import { useMutation } from "@apollo/react-hooks";
import mutation from "../queries/mutationLikeLyric";

const LyricList = ({ lyricsShow }) => {
  const [likeLyric, { data }] = useMutation(mutation);

  const handleLikeLyric = (id, likes) => {
    likeLyric({
      variables: { id },
      optimisticResponse: {
        __typename: "Mutation",
        likeLyric: {
          id: id,
          __typename: "LyricType",
          likes: likes + 1
        }
      }
    });
  };

  if (lyricsShow != "") {
    return (
      <ul className="collection">
        {lyricsShow.map(({ id, content, likes }) => {
          return (
            <li key={id} className="collection-item">
              {content}
              <div className="vote-box">
                <i
                  className="material-icons"
                  onClick={() => handleLikeLyric(id, likes)}
                >
                  thumb_up
                </i>
                {likes}
              </div>
            </li>
          );
        })}
      </ul>
    );
  } else {
    return null;
  }
};

export default LyricList;
