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
import { FC } from "react";

interface ProductProps {
  name?: string;
  image?: string;
  quantity?: number;
  onChange?: (newProduct: ProductProps) => void;
}

const Product: FC<ProductProps> = ({
  name = "",
  image = "",
  quantity,
  onChange = () => {},
}) => {
  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (onChange) {
      onChange({ name: event.target.value, image, quantity });
    }
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (onChange) {
      onChange({ name, image: event.target.value, quantity });
    }
  };

  const handleQuantityChange = (valueAsString: string) => {
    const newQuantity = parseInt(valueAsString, 10);
    if (!isNaN(newQuantity)) {
      onChange({ name, image, quantity: newQuantity });
    }
  };

  return (
    <Flex gap={8} marginBottom="1em">
      <FormLabel position="absolute">Nome:</FormLabel>
      <Input
        placeholder="Nome do Produto"
        type="text"
        padding="0.3em"
        marginTop="2em"
        value={name}
        onChange={handleNameChange}
      />
      <FormLabel position="absolute" right="46%">
        Imagem:
      </FormLabel>
      <Input
        padding="0.3em"
        marginTop="2em"
        marginLeft="0.2em"
        value={image}
        type="file"
        onChange={handleImageChange}
      />
      <FormLabel position="absolute" right="2%">
        Quantidade:
      </FormLabel>
      <NumberInput
        size="md"
        marginTop="2em"
        marginLeft="0.1em"
        defaultValue={1}
        min={1}
        maxW={1000}
        value={quantity}
        onChange={handleQuantityChange}
      >
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
