import { NextPage } from "next";
import { createLive, getLivesById } from "@/services/api/lives";
import { useState, useEffect } from "react";
import { Box, Flex } from "@chakra-ui/react";
import Header from "@/components/Header";
import LiveCard, { LiveProps } from "@/components/LiveCard";
import responseIterator from "@/helpers/responseIterator";
import { getTokenFromLocalDb } from "@/helpers/localDbHelper";
import LiveForm from "@/components/LiveForm";
import router from "next/router";


const Index: NextPage = () => {
  const [lives, setLives] = useState<LiveProps[]>([]);
  const [withoutLives, setWhitoutLives] = useState<boolean>(false);
  const [formData, setFormData] = useState<FormData | null>(null);
  const [errorAlert, setErrorAlert] = useState<string | null>(null);

  useEffect(() => {
    const live = async () => {
      try {
        const token = getTokenFromLocalDb();
        const rawData = await getLivesById(token);
        const newData = responseIterator(rawData);

        if (!newData || newData.length === 0) {
          setWhitoutLives(true);
        }
        setLives(newData);
      } catch (error) {
        setErrorAlert("Error creating live");
        return errorAlert;
      }
    };
    live();
  }, []);

  const handleFormSubmit = async (formData: FormData) => {
    try {
      const live = await createLive(formData);
      setLives((prevLives) => {
        if (live !== null) {
          return [live, ...prevLives].filter(Boolean) as LiveProps[];
        } else {
          return prevLives;
        }
      });
      router.replace(router.asPath);
    } catch (error) {
      setErrorAlert("Error creating live");
      console.error("Error creating live", error);
      return errorAlert;
    }
  };

  return (
    <>
      <Header />
      {withoutLives ? (
        <LiveForm title="Crie sua primeira Live!" onSubmit={handleFormSubmit} />
      ) : (
        <Flex
          wrap="wrap"
          flexDirection="row"
          gap={8}
          justifyContent="center"
          padding="3em 5em 0 5em"
        >
          {lives.map((live: LiveProps) => (
            <Box key={live.id} maxW="fit-content">
              <LiveCard {...live} id={live.id} />
            </Box>
          ))}
        </Flex>
      )}
    </>
  );
};

export default Index;
