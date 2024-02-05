import { NextPage } from "next";
import Header from "@/components/Header";
import LiveForm from "@/components/LiveForm";
import { Flex } from "@chakra-ui/react";

const Dashboard: NextPage = () => {
  return (
    <>
      <Header />
      <Flex
        wrap="wrap"
        flexDirection="row"
        gap={8}
        justifyContent="center"
        padding="3em 3em 0 3em"
      >
        <LiveForm title="Crie sua Live" />
      </Flex>
    </>
  );
};

export default Dashboard;
