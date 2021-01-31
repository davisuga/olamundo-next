import { GetStaticProps } from "next";
import { useRouter } from "next/router";
import React, { useEffect, useMemo, useState } from "react";
import Input from "../../../components/Input";
import api from "../../../services/axios";
import Link from "next/link";
import { Box, Button, Heading, Flex } from "@chakra-ui/react";
import { useSelector, useDispatch } from "react-redux";
import { Lesson } from "@prisma/client";
import MotionBox from "../../../components/MotionBox";
import sortObjectArray from "../../../utils/sortObjArray";
type Props = {
  lessons: Lesson[];
};

function Lessons({ lessons }: Props) {
  const router = useRouter();
  const dispatch = useDispatch();
  const lessonsIds = useMemo(() => lessons.map((lesson) => lesson.id), lessons);
  const worldToNavigate = useMemo(() => lessons[0].worldId, lessons);
  const currentLesson = useSelector((state) => state.currentLesson);

  useEffect(() => {
    dispatch({ type: "SET_LESSONS", lessons: lessonsIds });
    dispatch({ type: "SET_WORLD", world: lessons[0].worldId });
  }, []);
  console.log("lessons inside the component: ", lessonsIds);

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
            const lessonIndex = lessonsIds.indexOf(lesson.id);
            const currentLessonIndex =
              lessonsIds.indexOf(currentLesson) == -1
                ? 1
                : lessonsIds.indexOf(currentLesson);
            const isAllowed = lessonIndex <= currentLessonIndex;
            const lessonToNavigate = lesson.id;
            return (
              <Link
                href={{
                  pathname: "/worlds/[world]/lessons/[lesson]",
                  query: {
                    world: worldToNavigate,
                    lesson: lessonToNavigate,
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
                  bg={isAllowed ? "blue.500" : "blue.900"}
                  key={lesson.id}
                  _hover={{
                    bg: "white",
                    color: "blue.500",
                  }}
                  whileHover={isAllowed && { scale: 1.1 }}
                  whileTap={isAllowed && { scale: 0.95 }}
                  animate={isAllowed && { opacity: [0, 1] }}
                  transition={isAllowed && { duration: 0.3 }}
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
          router.replace("/");
        }}
      >
        Logout
      </button>
    </div>
  );
}

export const getStaticProps: GetStaticProps = async (context) => {
  console.log("searching for lessons...");
  const lessons = await api.get<Lesson[]>(`/world?id=${context.params.world}`);
  const lessonsData = sortObjectArray(lessons.data, "id");
  return { props: { lessons: lessonsData, world: context.params.world } };
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
