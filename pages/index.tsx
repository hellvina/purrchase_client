import { NextPage } from "next";
import getLives from "@/services/api/lives";
import { useState, useEffect } from "react";
import { Center, Container } from "@chakra-ui/react";
import Header from "@/components/Header";
import LiveCard, { LiveProps } from "@/components/LiveCard";
import responseIterator from "@/helpers/responseIterator";

const Index: NextPage = () => {
  const [lives, setLives] = useState<[]>([]);

  useEffect(() => {
    const live = async () => {
      try {
        const token = process.env.NEXT_PUBLIC_TOKEN;
        const rawData = await getLives("1", token);
        console.log("rawDATA", rawData);
        const newData = responseIterator(rawData);
        console.log("newDATA", newData);
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
      <Center padding="0 10rem 0 10rem">
        {lives.map((live: LiveProps) => (
          <Container key={live.id}>
            <LiveCard {...live} />
          </Container>
        ))}
        {/* <Button onClick={handleLoadMore}>Load More</Button> */}
      </Center>
    </>
  );
};

export default Index;

function setLivesState(newData: any) {
  throw new Error("Function not implemented.");
}
