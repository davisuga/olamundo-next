import { useRouter } from "next/router";
import api from "../../services/axios";
import { GetStaticProps, GetStaticPaths } from "next";
import { useToast, Textarea, Radio, RadioGroup } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { Button, Box } from "@chakra-ui/react";
import { getExercise } from "../../utils/getExercises";
import { useSelector } from "react-redux";
import exercise from "../api/exercise";

const ExercisePage = ({ exercises }: { exercises: Exercise[] }) => {
  const router = useRouter();
  const toast = useToast();

  const [exercise, setExercise] = useState<Exercise>(exercises && exercises[0]);
  const [currentSelection, setCurrentSelection] = useState("0");
  const [exerciseDone, setExerciseDone] = useState(false);
  const [allExercisesDone, setAllExercisesDone] = useState(false);

  const currentLesson: number = useSelector((state) => state.currentLesson);
  const lessons: number[] = useSelector((state) => state.lessons);
  const worlds: number[] = useSelector((state) => state.worlds);
  const currentWorld: number = useSelector((state) => state.currentWorld);
  const isLastWorld: boolean = useSelector((state) => state.isLastWorld);
  const isLastLesson: boolean = useSelector((state) => state.isLastLesson);

  const navigateToNextLesson = () => {
    if (isLastLesson && isLastWorld) {
      router.push("/worlds");
    } else if (isLastLesson && !isLastWorld) {
      const worldToNavigate = worlds[worlds.indexOf(currentWorld) + 1];
      router.push(`/worlds/${worldToNavigate}`);
    } else if (!isLastLesson && !isLastWorld) {
      const lessonToNavigate = lessons[lessons.indexOf(currentLesson) + 1];
      router.push(`/worlds/${currentWorld}/lessons/${lessonToNavigate}`);
    }
  };

  const checkLastExercise = () => {
    exercises.indexOf(exercise) + 1 === exercises.length &&
      setAllExercisesDone(true);
  };

  const purgeAnswer = (answer: string) =>
    answer.toLowerCase().replaceAll(";", "").replaceAll(`\n`, ` `);

  const handleWrongAnswer = () => {
    toast({
      title: "Resposta incorreta :/",
      description: "Tente voltar à lição e reler o conteúdo",
      status: "error",
      duration: 9000,
      isClosable: true,
    });
    setExerciseDone(false);
  };

  const handleNextExercise = () => {
    !allExercisesDone &&
      setExercise(exercises[exercises.indexOf(exercise) + 1]);
    setExerciseDone(false);
    setCurrentSelection("");
  };

  const handleRightAnswer = () => {
    toast({
      title: "Resposta correta!",
      status: "success",
      duration: 9000,
      isClosable: true,
    });
    setExerciseDone(true);

    checkLastExercise();
  };

  const handleEmptyAnswer = () => {
    toast({
      title: "Preencha sua resposta!",
      status: "info",
      duration: 9000,
      isClosable: true,
    });
  };

  const checkResult = (result: null | number | string) => {
    if (!result) {
      handleEmptyAnswer();
      return;
    }

    const isResultCorrect =
      purgeAnswer(result.toString()) == purgeAnswer(exercise.answer);

    console.group("exercise answear");
    console.log("resposta: ", exercise.answer);
    console.log("tentativa: ");
    console.log(result);
    console.groupEnd();

    if (isResultCorrect) {
      handleRightAnswer();
    } else {
      handleWrongAnswer();
    }
  };

  return (
    <Box m="32">
      <div
        className="exercise"
        dangerouslySetInnerHTML={{
          __html: exercise?.content.htmlContent,
        }}
      />

      {exercise?.type && exercise?.type === "multiple_choice" ? (
        <RadioGroup
          onChange={(e) => setCurrentSelection(e.toString())}
          value={currentSelection}
        >
          {exercise?.choices.map((choice) => (
            <div>
              <Radio
                m="3"
                key={choice}
                //value={currentSelection}
                value={exercise.choices.indexOf(choice).toString()}
              >
                {choice}
              </Radio>
            </div>
          ))}
        </RadioGroup>
      ) : (
        <Textarea
          value={currentSelection}
          onChange={(e) => {
            setCurrentSelection(e.target.value);
          }}
        />
      )}

      {allExercisesDone && exerciseDone && (
        <Button colorScheme="teal" onClick={navigateToNextLesson}>
          PROXIMA LICAO
        </Button>
      )}

      {exerciseDone && !allExercisesDone ? (
        <Button colorScheme="green" onClick={handleNextExercise}>
          PROXIMO EXERCICIO
        </Button>
      ) : (
        <Button onClick={() => checkResult(currentSelection)}>
          CHECAR RESULTADO
        </Button>
      )}
    </Box>
  );
};

export const getStaticPaths = async () => {
  const res = await api.get("/lesson");
  const exercises = res.data;
  console.log(`exercises: `, exercises);
  const paths = exercises.map((exercise: Exercise) => ({
    params: { exercise: JSON.stringify(exercise.id) },
  }));
  return { paths, fallback: true };
};

export const getStaticProps = async ({ params }) => {
  console.log("the params: ", params);
  const res = await api.get<Exercise[]>(
    `/exercise?lessonId=${params.exercise}`
  );
  const exercises = res.data;
  const exercisesWithContent: Exercise[] = exercises.map((exercise) => {
    return { ...exercise, content: getExercise(exercise.url) };
  });
  console.log(`exercisesWithContent: `, exercisesWithContent);
  console.log(`exercisesWithoutContent: `, exercises);
  return {
    props: {
      exercises: exercisesWithContent,
    },
  };
};
export default ExercisePage;
