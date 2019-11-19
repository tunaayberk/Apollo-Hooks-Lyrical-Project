import React from "react";
import { useMutation } from "@apollo/react-hooks";
import history from "../history";

//General Form Inputs Handler
import { useSignUpForm } from "./form/useSignUpForm";

import mutation from "../queries/mutationAddSong";
import query from "../queries/fetchSongsList";

const SongCreate = () => {
  const onSubmit = () => {
    addNewSong({
      variables: { title: inputs.songTitle },
      refetchQueries: [{ query }]
    }).then(() => history.push("/"));
  };

  const [addNewSong, { data }] = useMutation(mutation);
  const { inputs, handleInputChange, handleSubmit } = useSignUpForm(onSubmit);

  return (
    <div>
      <h3>Create a New Song</h3>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Song Title:</label>
          <input
            type="text"
            name="songTitle"
            onChange={handleInputChange}
            value={inputs.songTitle || ""}
            required
          />
        </div>
        <button className="btn-floating btn-large green right" type="submit">
          <i className="material-icons">add</i>
        </button>
      </form>
    </div>
  );
};

export default SongCreate;
