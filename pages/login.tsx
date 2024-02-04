import { MoonIcon, SunIcon } from "@chakra-ui/icons";
import {
  Button,
  Center,
  Flex,
  Heading,
  IconButton,
  Input,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  useColorMode,
  useColorModeValue,
} from "@chakra-ui/react";
import { NextPage } from "next";
import { useState } from "react";

const LoginPage: NextPage = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const formBackground = useColorModeValue("#e1e8f0", "raising_black");
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <>
      <Center padding="10rem">
        <Flex height="35vh" justifyContent="center">
          <Flex
            direction="column"
            background={formBackground}
            p={12}
            rounded={6}
            height={450}
          >
            <Tabs maxW={400} colorScheme="tropical_indigo">
              <TabList>
                <Tab>Entrar</Tab>
                <Tab>Cadastrar</Tab>
              </TabList>
              <TabPanels>
                <TabPanel>
                  <Heading mb={6} fontSize={26}>
                    Entre na Purrchase
                  </Heading>
                  <Input
                    placeholder="email@email.com"
                    variant="filled"
                    mb={3}
                    type="email"
                  />
                  <Input
                    placeholder="*****"
                    variant="filled"
                    mb={6}
                    type="password"
                  />
                  <Button mb={6} backgroundColor="tropical_indigo">
                    Entrar
                  </Button>
                </TabPanel>
                <TabPanel>
                  <Heading mb={6} fontSize={26}>
                    Se cadastre na Purrchase
                  </Heading>
                  <Input
                    placeholder="username"
                    variant="filled"
                    mb={3}
                    type="email"
                  />
                  <Input
                    placeholder="email@email.com"
                    variant="filled"
                    mb={3}
                    type="email"
                  />
                  <Input
                    placeholder="*****"
                    variant="filled"
                    mb={6}
                    type="password"
                  />
                  <Button mb={6} backgroundColor="tropical_indigo">
                    Criar
                  </Button>
                </TabPanel>
              </TabPanels>
            </Tabs>
          </Flex>
        </Flex>
        <IconButton
          icon={colorMode === "dark" ? <SunIcon /> : <MoonIcon />}
          aria-label="dark mode"
          onClick={toggleColorMode}
          position="fixed"
          top="2"
          right="2"
          zIndex="999"
        />
      </Center>
    </>
  );
};

export default LoginPage;
