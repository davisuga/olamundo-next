import { Box, Button, Heading, Text, Flex } from "@chakra-ui/react";
import { World } from "@prisma/client";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import MotionBox from "../../components/MotionBox";

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
  const colors = ["yellow.500", "green.500", "blue.500", "purple.500"];
  return (
    <div>
      <Heading textAlign="center" alignSelf="center" size="xl">
        Mundos
      </Heading>
      <Flex flexDir="row" justifyContent="center" alignItems="center">
        {worlds &&
          worlds.map((world) => {
            return (
              <Link href={"/worlds/" + world.id}>
                <MotionBox
                  display="flex"
                  h={200}
                  w={200}
                  m={5}
                  bg={colors[worlds.indexOf(world)]}
                  textAlign="center"
                  justifyContent="center"
                  alignItems="center"
                  borderWidth="1px"
                  borderRadius="lg"
                  boxShadow="lg"
                  key={world.id}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Text fontWeight="bold" fontSize="2xl">
                    {world.name}
                  </Text>
                </MotionBox>
              </Link>
            );
          })}
      </Flex>

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
