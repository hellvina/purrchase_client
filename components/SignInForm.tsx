import {
  FormControl,
  FormLabel,
  Input,
  ModalBody,
  ModalCloseButton,
  ModalHeader,
} from "@chakra-ui/react";
import React from "react";

const SignInForm = () => {
  return (
    <>
      <FormControl mt={4}>
        <FormLabel>Email</FormLabel>
        <Input
          placeholder="email@email.com"
          variant="filled"
          mb={3}
          type="email"
        />
      </FormControl>

      <FormControl mt={4}>
        <FormLabel>Senha</FormLabel>
        <Input placeholder="*****" variant="filled" mb={6} type="password" />
      </FormControl>
    </>
  );
};
export default SignInForm;
