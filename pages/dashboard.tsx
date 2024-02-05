import { NextPage } from "next";
import { getLivesById } from "@/services/api/lives";
import { useState, useEffect } from "react";
import { Box, Flex } from "@chakra-ui/react";
import Header from "@/components/Header";
import LiveCard, { LiveProps } from "@/components/LiveCard";
import responseIterator from "@/helpers/responseIterator";

const Index: NextPage = () => {
  const [lives, setLives] = useState<[]>([]);

  useEffect(() => {
    const live = async () => {
      try {
        const token = process.env.NEXT_PUBLIC_TOKEN;
        const rawData = await getLivesById(token);
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
