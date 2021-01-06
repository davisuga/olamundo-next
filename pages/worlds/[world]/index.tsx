import { GetStaticProps } from "next";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import Input from "../../../components/Input";
import api from "../../../services/axios";
import Link from "next/link";
import { Box, Button, Heading, Flex } from "@chakra-ui/react";
import { useSelector, useDispatch } from "react-redux";
import { Lesson } from "@prisma/client";
import MotionBox from "../../../components/MotionBox";

type Props = {
  lessons: Lesson[];
};

function Lessons({ lessons }: Props) {
  const router = useRouter();
  const dispatch = useDispatch();
  const lessonsIds = lessons.map((lesson) => lesson.id);
  useEffect(() => {
    dispatch({ type: "SET_LESSONS", lessons: lessonsIds });
    dispatch({ type: "SET_WORLD", world: lessons[0].worldId });
  }, []);
  console.log("lessons inside the component: ", lessons);
  return (
    <div>
      <Heading textAlign="center" alignSelf="center" size="xl">
        Licoes
      </Heading>
      <Flex
        justifyContent="center"
        alignItems="center"
        flexWrap="wrap"
        flexDir="row"
      >
        {lessons &&
          lessons.map((lesson) => {
            return (
              <Link
                href={{
                  pathname: "/worlds/[world]/lessons/[lesson]",
                  query: {
                    world: lessons[0].worldId,
                    lesson: lesson.id,
                  },
                }}
              >
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
                  bg="blue.500"
                  key={lesson.id}
                  _hover={{
                    bg: "white",
                    color: "blue.500",
                  }}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {lesson.title}
                </MotionBox>
              </Link>
            );
          })}
      </Flex>
      <button
        onClick={(e) => {
          localStorage.setItem("logged", "false");
          router.push("/");
        }}
      >
        Logout
      </button>
    </div>
  );
}

export const getStaticProps: GetStaticProps = async (context) => {
  console.log("searching for lessons...");
  const lessons = await api.get<Lesson>(`/world?id=${context.params.world}`);

  return { props: { lessons: lessons.data, world: context.params.world } };
};
export const getStaticPaths = async (context) => {
  console.log();
  const res = await api.get("/world");
  const worlds = res.data;
  console.log(`worlds: `, worlds);
  const paths = worlds.map((lesson: Lesson) => ({
    params: { world: JSON.stringify(lesson.id) },
  }));
  return { paths, fallback: false };
};

export default Lessons;

// function Page({ stars }) {
//     return <div>Next stars: {stars}</div>;
// }

// Page.getInitialProps = async (ctx) => {
//     const res = await fetch("https://api.github.com/repos/vercel/next.js");
//     const json = await res.json();
//     return { stars: json.stargazers_count };
// };

// export default Page;
