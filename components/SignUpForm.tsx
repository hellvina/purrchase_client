import { setIdToLocalDb, setTokenToLocalDb } from "@/helpers/tokenHelper";
import createUser from "@/services/api/user";
import { Button, FormControl, FormLabel, Input } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";

const SignUpForm = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

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

  const CreateUser = async (event: { preventDefault: () => void }) => {
    event.preventDefault();

    try {
      const createdUser = await createUser({ username, email, password });

      const userObject = createdUser as { token: string; user: { id: string } };
      setTokenToLocalDb(userObject.token);
      setIdToLocalDb(userObject.user.id);
    } catch (error) {
      console.error("Error trying create user", error);
    }
  };

  return (
    <>
      <form onSubmit={CreateUser}></form>
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
    </>
  );
};

export default SignUpForm;
