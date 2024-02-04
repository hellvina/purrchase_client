import { NextPage } from "next";
import getLives from "@/services/api/lives";
import { useState, useEffect } from "react";
import { Box, Flex, useMediaQuery } from "@chakra-ui/react";
import Header from "@/components/Header";
import LiveCard, { LiveProps } from "@/components/LiveCard";
import responseIterator from "@/helpers/responseIterator";

const Index: NextPage = () => {
  const smaller768 = useMediaQuery("(max-width: 768px)");
  const [lives, setLives] = useState<[]>([]);

  useEffect(() => {
    const live = async () => {
      try {
        const token = process.env.NEXT_PUBLIC_TOKEN;
        const rawData = await getLives("1", token);
        const newData = responseIterator(rawData);
        setLives(newData);
      } catch (error) {
        console.error("Error trying fetching lives", error);
      }
    };
    live();
  }, []);

  return (
    <>
      <Header />
      <Flex
        wrap="wrap"
        flexDirection="row"
        gap={8}
        justifyContent="center"
        padding="3em 5em 0 5em"
      >
        {lives.map((live: LiveProps) => (
          <Box key={live.id} maxW="fit-content">
            <LiveCard {...live} />
          </Box>
        ))}
      </Flex>
    </>
  );
};

export default Index;

function setLivesState(newData: any) {
  throw new Error("Function not implemented.");
}
