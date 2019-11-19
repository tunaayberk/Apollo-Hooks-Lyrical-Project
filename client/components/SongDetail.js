import React, { useState, useEffect } from "react";
import { useQuery } from "@apollo/react-hooks";

import LyricCreate from "./LyricCreate";
import LyricList from "./LyricList";

import query from "../queries/fetchSong";

const SongDetail = ({ routeProps }) => {
  const id = routeProps.match.params.id;
  const { loading, error, data, refetch } = useQuery(query, {
    variables: { id }
  });

  const [songDetail, setSongDetail] = useState({
    title: ""
  });
  const [lyricsShow, setLyricsShow] = useState("");

  useEffect(() => {
    if (loading === false) {
      setSongDetail(data.song);
      setLyricsShow(data.song.lyrics);
    }
  }, [data]);

  return (
    <div>
      <h3>Song Detail: {songDetail.title}</h3>

      <LyricList lyricsShow={lyricsShow} />

      <LyricCreate songId={id} />
    </div>
  );
};

export default SongDetail;
