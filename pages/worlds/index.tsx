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
  const dispatch = useDispatch();
  const currentWorld: number = useSelector((state) => state.currentWorld);
  const worldsIds = useSelector((state) => state.worlds);
  useEffect(() => {
    const worldsIds = worlds.map((world) => world.id);
    console.log(worldsIds);
    dispatch({ type: "SET_WORLDS", worlds: worldsIds });
  }, []);

  const colors = ["yellow.500", "green.500", "blue.500", "purple.500"];
  const darkColors = ["yellow.900", "green.900", "blue.900", "purple.900"];

  return (
    <Flex flexDir="column" alignItems="center">
      <Button
        onClick={(e) => {
          localStorage.setItem("logged", "false");
          router.push("/");
        }}
        alignSelf="flex-end"
        m={4}
      >
        Logout
      </Button>
      <Heading textAlign="center" alignSelf="center" size="xl">
        Mundos
      </Heading>
      <Flex
        flexDir="row"
        justifyContent="center"
        alignItems="center"
        flexWrap="wrap"
      >
        {worlds &&
          worlds.map((world) => {
            const worldIndex = worldsIds.indexOf(world.id);
            const currentWorldIndex =
              worldsIds.indexOf(currentWorld) == -1
                ? 1
                : worldsIds.indexOf(currentWorld);
            const isAllowed = worldIndex <= currentWorldIndex;
            const backgroundColor = isAllowed
              ? colors[worlds.indexOf(world)]
              : darkColors[worlds.indexOf(world)];
            const worldLink = isAllowed ? world.id : "";

            return (
              <Link href={"/worlds/" + worldLink}>
                <MotionBox
                  display="flex"
                  h={200}
                  w={["90%", 200]}
                  m={5}
                  textAlign="center"
                  justifyContent="center"
                  alignItems="center"
                  borderWidth="1px"
                  borderRadius="lg"
                  boxShadow="lg"
                  key={world.id}
                  bg={backgroundColor}
                  whileHover={isAllowed && { scale: 1.1 }}
                  whileTap={isAllowed && { scale: 0.95 }}
                >
                  <Text fontWeight="bold" fontSize="2xl">
                    {world.name}
                  </Text>
                </MotionBox>
              </Link>
            );
          })}
      </Flex>
    </Flex>
  );
}

export const getStaticProps = async (context) => {
  console.log("searching for lessons...");
  const worlds = await api.get<World>("/world");

  return { props: { worlds: worlds.data } };
};
export default Worlds;
