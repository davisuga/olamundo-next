import { Box, Button } from "@chakra-ui/react";
import { World } from "@prisma/client";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import api from "../../services/axios";

type Props = {
  worlds: World[];
};

function Worlds({ worlds }: Props) {
  const router = useRouter();
  console.log("worlds inside the component: ", worlds);
  //return <h1 >sass</h1>
  const dispatch = useDispatch();
  useEffect(() => {
    const worldsIds = worlds.map((world) => world.id);
    console.log(worldsIds);
    dispatch({ type: "SET_WORLDS", worlds: worldsIds });
  }, []);
  return (
    <div>
      {worlds &&
        worlds.map((world) => {
          return (
            <Link href={"/worlds/" + world.id}>
              <Box
                h={200}
                w={200}
                m={5}
                bg="blue.500"
                textAlign="center"
                borderWidth="1px"
                borderRadius="lg"
                key={world.id}
              >
                {world.name}
              </Box>
            </Link>
          );
        })}

      <Button
        onClick={(e) => {
          localStorage.setItem("logged", "false");
          router.push("/");
        }}
      >
        Logout
      </Button>
    </div>
  );
}

export const getStaticProps = async (context) => {
  console.log("searching for lessons...");
  const worlds = await api.get<World>("/world");

  return { props: { worlds: worlds.data } };
};
export default Worlds;
