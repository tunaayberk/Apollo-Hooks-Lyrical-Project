import React from "react";
import { useMutation } from "@apollo/react-hooks";

//General Form Inputs Handler
import { useSignUpForm } from "./form/useSignUpForm";

import query from "../queries/fetchSong";
import mutation from "../queries/mutationAddLyric";

const LyricCreate = ({ songId }) => {
  const onSubmit = () => {
    addNewLyric({
      variables: { content: inputs.lyricContent, songId },
      refetchQueries: [{ query, variables: { id: songId } }]
    });
  };

  const [addNewLyric, { data }] = useMutation(mutation);
  const { inputs, handleInputChange, handleSubmit } = useSignUpForm(onSubmit);

  return (
    <form onSubmit={handleSubmit}>
      <label>Add a Lyric:</label>
      <input
        type="text"
        name="lyricContent"
        onChange={handleInputChange}
        value={inputs.lyricContent || ""}
        required
      />

      <button className="btn-floating btn-large green right" type="submit">
        Add Lyric
      </button>
    </form>
  );
};

export default LyricCreate;
