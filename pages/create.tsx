import { NextPage } from "next";
import Header from "@/components/Header";
import { Flex } from "@chakra-ui/react";
import CreateLiveForm from "@/components/CreateLiveForm";

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
        <CreateLiveForm title="Crie sua Live" />
      </Flex>
    </>
  );
};

export default Dashboard;
