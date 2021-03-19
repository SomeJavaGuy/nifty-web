import React from "react";
import { useParams } from "react-router";

const CreateNFT = () => {
  const { clipId } = useParams<{ clipId: string }>();

  console.log(clipId);

  return <div>CreateNFT</div>;
};

export default CreateNFT;
