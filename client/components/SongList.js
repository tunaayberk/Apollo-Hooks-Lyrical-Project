import React, { useState, useEffect } from "react";
import { useQuery, useMutation } from "@apollo/react-hooks";
import { Link } from "react-router-dom";

import query from "../queries/fetchSongsList";
import mutation from "../queries/mutationDeleteSong";

const SongList = () => {
  const { loading, error, data, refetch } = useQuery(query);
  const [songList, setSongList] = useState([
    { title: "Loading...", id: "000000" }
  ]);
  const [deleteSong] = useMutation(mutation);

  const handleDeleteSong = id => {
    deleteSong({
      variables: { id }
    }).then(() => refetch());
  };

  useEffect(() => {
    if (loading === false) {
      setSongList(data.songs);
    }
  }, [data]);

  return (
    <div>
      <ul className="collection">
        {songList.map(({ id, title }) => {
          return (
            <li key={id} className="collection-item">
              <Link to={`/songs/${id}`}>{title}</Link>
              <i
                className="material-icons"
                onClick={() => handleDeleteSong(id)}
              >
                delete
              </i>
            </li>
          );
        })}
      </ul>
      <Link to="/songs/new" className="btn-floating btn-large red right">
        <i className="material-icons">add</i>
      </Link>
    </div>
  );
};

export default SongList;
