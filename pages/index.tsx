import React from "react";
import api from "../services/axios";

export default function index({ worlds }) {
  return (
    <div>
      Im static, bro.
      {worlds.map((world) => (
        <div>{world.id}</div>
      ))}
    </div>
  );
}
export const getStaticProps = async (context) => {
  console.log("searching for lessons...");
  const worlds = await api.get("/world");

  return { props: { worlds: worlds.data } };
};
