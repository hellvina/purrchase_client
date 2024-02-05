import { DeleteIcon } from "@chakra-ui/icons";
import {
  Flex,
  FormLabel,
  Input,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
} from "@chakra-ui/react";
import { ReactNode } from "react";

const Product = (): ReactNode => {
  return (
    <Flex gap={8} marginBottom="1em">
      <FormLabel position="absolute" top="-2em">
        Nome
      </FormLabel>
      <Input type="text" padding="0.3em" />
      <FormLabel position="absolute" top="-2em" right="50%">
        Imagem
      </FormLabel>
      <Input type="file" padding="0.3em" />
      <FormLabel position="absolute" top="-2em" right="8%">
        Quantidade
      </FormLabel>
      <NumberInput size="md" maxW={24} defaultValue={15} min={10}>
        <NumberInputField />
        <NumberInputStepper>
          <NumberIncrementStepper />
          <NumberDecrementStepper />
        </NumberInputStepper>
      </NumberInput>
    </Flex>
  );
};

export default Product;
