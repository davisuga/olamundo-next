import * as React from "react";
import {
  ChakraProvider,
  forwardRef,
  ChakraProps,
  chakra,
  Container,
  ComponentWithAs,
} from "@chakra-ui/react";
import { motion, MotionProps, isValidMotionProp } from "framer-motion";

export type MotionBoxProps = Omit<ChakraProps, keyof MotionProps> &
  MotionProps & {
    as?: React.ElementType;
  };

export const MotionBox = motion.custom(
  forwardRef<MotionBoxProps, "div">((props, ref) => {
    const chakraProps = Object.fromEntries(
      // do not pass framer props to DOM element
      Object.entries(props).filter(([key]) => !isValidMotionProp(key))
    );
    return <chakra.div ref={ref} {...chakraProps} />;
  })
) as ComponentWithAs<"div", MotionBoxProps>;

export default function App() {
  return (
    <ChakraProvider>
      <Container h="100vh" d="flex" alignItems="center" justifyContent="center">
        <MotionBox
          as="aside"
          animate={{
            scale: [1, 2, 2, 1, 1],
            rotate: [0, 0, 270, 270, 0],
            borderRadius: ["20%", "20%", "50%", "50%", "20%"],
          }}
          transition={{
            duration: 2,
            ease: "easeInOut",
            times: [0, 0.2, 0.5, 0.8, 1],
            repeat: Infinity,
            repeatType: "loop",
            repeatDelay: 1,
          }}
          padding="2"
          bgGradient="linear(to-l, #7928CA, #FF0080)"
          width="12"
          height="12"
          display="flex"
        />
      </Container>
    </ChakraProvider>
  );
}
