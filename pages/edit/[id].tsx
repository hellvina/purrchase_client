import { NextPage } from "next";
import Header from "@/components/Header";
import LiveForm from "@/components/LiveForm";
import { Flex } from "@chakra-ui/react";
import { useRouter } from "next/router";

const Dashboard: NextPage = () => {
  const router = useRouter();
  const { id } = router.query;

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
        <LiveForm title="Edite sua Live" id={id as string} />
      </Flex>
    </>
  );
};

export default Dashboard;
