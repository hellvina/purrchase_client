import { ReactNode, useEffect, useState } from "react";
import {
  Avatar,
  AvatarBadge,
  Button,
  Flex,
  FormControl,
  FormLabel,
  IconButton,
  Input,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Spacer,
  Stack,
  useDisclosure,
} from "@chakra-ui/react";
import Logo from "./Logo";
import Link from "next/link";
import { useMediaQuery } from "usehooks-ts";
import { HamburgerIcon } from "@chakra-ui/icons";
import React from "react";
import SignInForm from "./SignInForm";
import createUser from "@/services/api/user";
import { getTokenFromLocalDb, setIdToLocalDb } from "@/helpers/tokenHelper";

const Header = (): ReactNode => {
  const matches_768 = useMediaQuery("(min-width: 768px)");
  const smallerThan768 = useMediaQuery("(max-width: 768px)");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  const catchUsername = (element: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setUsername(element.target.value);
  };

  const catchEmail = (element: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setEmail(element.target.value);
  };

  const catchPassword = (element: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setPassword(element.target.value);
  };

  const CreateUser = async () => {
    try {
      setIsSaving(true);
      const createdUser = await createUser({ username, email, password });
      const userObject = createdUser as { token: string; user: { id: string } };
      setTokenToLocalDb(userObject.token);
      setIdToLocalDb(userObject.user.id);
    } catch (error) {
      console.error("Error trying to create user", error);
    } finally {
      setIsSaving(false);
      await onCreateModalClose();
    }
  };

  const saveUserOnClick = () => {
    CreateUser();
  };

  const {
    isOpen: isCreateModalOpen,
    onOpen: onCreateModalOpen,
    onClose: onCreateModalClose,
  } = useDisclosure();

  const {
    isOpen: isLoginModalOpen,
    onOpen: onLoginModalOpen,
    onClose: onLoginModalClose,
  } = useDisclosure();

  const initialRef = React.useRef(null);
  const finalRef = React.useRef(null);

  const handleCreateButtonClick = () => {
    onCreateModalOpen();
  };

  const handleLoginButtonClick = () => {
    onLoginModalOpen();
  };

  const token = getTokenFromLocalDb as unknown;
  const [logged, setLogged] = useState(false);

  console.log("TOKEN", token);

  useEffect(() => {
    if (token) {
      setLogged(true);
    }
  }, [token]);

  if (matches_768) {
    return (
      <Flex gap={6} alignItems="center" padding="1em" bgColor="raising_grey">
        <Link href="/">
          <Logo />
        </Link>
        <Spacer />
        <Button onClick={handleLoginButtonClick} width="fit-content">
          Entrar
        </Button>
        <Button onClick={handleCreateButtonClick} bgColor="tropical_indigo">
          Cadastrar-se
        </Button>

        <Modal
          isOpen={isLoginModalOpen}
          onClose={onLoginModalClose}
          initialFocusRef={initialRef}
          finalFocusRef={finalRef}
        >
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Entre na sua conta Purrchase</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <SignInForm />
            </ModalBody>
            <ModalFooter>
              <Button colorScheme="blue" mr={3}>
                Salvar
              </Button>
              <Button onClick={onLoginModalClose}>Cancelar</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>

        <Modal
          isOpen={isCreateModalOpen}
          onClose={onCreateModalClose}
          initialFocusRef={initialRef}
          finalFocusRef={finalRef}
        >
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Crie uma conta na Purrchase</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <form>
                <FormControl>
                  <FormLabel>Nome de usuário</FormLabel>
                  <Input
                    placeholder="username"
                    variant="filled"
                    mb={3}
                    type="text"
                    value={username}
                    onChange={catchUsername}
                  />
                </FormControl>

                <FormControl mt={4}>
                  <FormLabel>Email</FormLabel>
                  <Input
                    placeholder="email@email.com"
                    variant="filled"
                    mb={3}
                    type="email"
                    value={email}
                    onChange={catchEmail}
                  />
                </FormControl>

                <FormControl mt={4}>
                  <FormLabel>Senha</FormLabel>
                  <Input
                    placeholder="*****"
                    variant="filled"
                    mb={6}
                    type="password"
                    value={password}
                    onChange={catchPassword}
                  />
                </FormControl>
                <ModalFooter>
                  <Button
                    bgColor="tropical_indigo"
                    mr={3}
                    type="submit"
                    isLoading={isSaving}
                    loadingText="Loading"
                    onClick={saveUserOnClick}
                  >
                    Salvar
                  </Button>
                  <Button onClick={onCreateModalClose}>Fechar</Button>
                </ModalFooter>
              </form>
            </ModalBody>
          </ModalContent>
        </Modal>
        {logged && (
          <Link href="/dashboard">
            <Stack direction="row" spacing={4}>
              <Avatar>
                <AvatarBadge boxSize="1.25em" bg="green.500" />
              </Avatar>
            </Stack>
          </Link>
        )}
      </Flex>
    );
  }

  if (smallerThan768) {
    return (
      <Flex gap={6} alignItems="center" padding="1em" bgColor="raising_grey">
        <Link href="/">
          <Logo />
        </Link>
        <Spacer />
        <Menu>
          <MenuButton
            as={IconButton}
            aria-label="Options"
            icon={<HamburgerIcon />}
            variant="outline"
          />
          <MenuList>
            <MenuItem>Entrar</MenuItem>
            <MenuItem>Cadastrar-se</MenuItem>
          </MenuList>
          {logged && (
            <Stack direction="row" spacing={4}>
              <Avatar>
                <AvatarBadge boxSize="1.25em" bg="green.500" />
              </Avatar>
            </Stack>
          )}
        </Menu>
      </Flex>
    );
  }
};
export default Header;
function setTokenToLocalDb(token: string) {
  throw new Error("Function not implemented.");
}

function getTokenToLocalDb(id: string) {
  throw new Error("Function not implemented.");
}
