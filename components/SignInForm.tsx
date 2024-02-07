import {
  FormControl,
  FormLabel,
  Input,
  Button,
  useDisclosure,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { loginUser } from "@/services/api/user"; // Importe a função loginUser correta
import { setTokenToLocalDb, setIdToLocalDb } from "@/helpers/localDbHelper";
import { useRouter } from "next/router";

const SignInForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorAlert, setErrorAlert] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [logged, setLogged] = useState(false);

  const router = useRouter();

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

  const handleLogin = async (event: { preventDefault: () => void }) => {
    event.preventDefault();
    setIsLoading(true);

    try {
      const userLogged = await loginUser({ email, password });
      console.log("LOG BEFORE CREATE", logged);

      setTokenToLocalDb(userLogged.token);
      setIdToLocalDb(userLogged.user.id);

      console.log("AFETR CREATE", logged);
    } catch (error) {
      setErrorAlert("Error when tring login with user");
      return errorAlert;
    } finally {
      setIsLoading(false);
      await router.reload();
    }
  };

  return (
    <form onSubmit={handleLogin}>
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
      <Button
        type="submit"
        mt={4}
        bgColor="tropical_indigo"
        position="absolute"
        top="17.95em"
        right="8.9em"
        isLoading={isLoading}
        loadingText="Loading"
      >
        Entrar
      </Button>
    </form>
  );
};

export default SignInForm;
