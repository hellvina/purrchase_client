import React, { FC, useState, useEffect } from "react";
import { listProducts } from "@/services/api/lives";
import {
  IconButton,
  Stack,
  StackDivider,
  Box,
  FormControl,
  FormLabel,
  Input,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  Flex,
} from "@chakra-ui/react";
import { DeleteIcon, AddIcon } from "@chakra-ui/icons";
import responseIterator from "@/helpers/responseIterator";

interface ProductProps {
  name: string;
  image: string;
  quantity: number;
}

interface CreateProductProps {
  id: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>, index: number) => void;
}

const CreateProduct: FC<CreateProductProps> = ({ id, onChange }) => {
  const [products, setProducts] = useState<ProductProps[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const handleLoadProducts = async () => {
      try {
        const rawData = await listProducts(id);
        console.log("RAW DATA", rawData);
        const newData = responseIterator(rawData);
        setProducts(newData);
        setIsLoaded(true);
      } catch (error) {
        console.error("Error while loading products", error);
        setIsLoaded(false);
      }
    };
    if (!isLoaded) {
      handleLoadProducts();
    }
  });

  const removeProduct = (index: number) => {
    if (products.length > 1) {
      setProducts((prevProducts) => prevProducts.filter((_, i) => i !== index));
    }
  };

  const addProduct = () => {
    setProducts((prevProducts) => [
      ...prevProducts,
      { name: "", image: "", quantity: 1 },
    ]);
  };

  const handleProductNameChange = (value: string, index: number) => {
    const updatedProducts = [...products];
    updatedProducts[index].name = value;
    setProducts(updatedProducts);
  };

  const handleProductImageChange = (value: string, index: number) => {
    const updatedProducts = [...products];
    updatedProducts[index].image = value;
    setProducts(updatedProducts);
  };

  const handleProductQuantityChange = (value: string, index: number) => {
    const updatedProducts = [...products];
    const newQuantity = parseInt(value, 10);
    updatedProducts[index].quantity = isNaN(newQuantity) ? 0 : newQuantity;
    setProducts(updatedProducts);
  };

  return (
    <>
      <Stack divider={<StackDivider />} spacing="4">
        <FormControl>
          {products.map((product, index) => (
            <Box key={index} maxW="fit-content">
              <Flex gap={8} marginBottom="1em">
                <FormLabel position="absolute">Nome:</FormLabel>
                <Input
                  placeholder="Nome do Produto"
                  type="text"
                  padding="0.3em"
                  marginTop="2em"
                  defaultValue={product.name}
                  onChange={(e) =>
                    handleProductNameChange(e.target.value, index)
                  }
                />
                <FormLabel position="absolute" right="46%">
                  Imagem:
                </FormLabel>
                <Input
                  padding="0.3em"
                  marginTop="2em"
                  marginLeft="0.2em"
                  defaultValue={product.image}
                  type="text"
                  onChange={(e) =>
                    handleProductImageChange(e.target.value, index)
                  }
                />
                <FormLabel position="absolute" right="2%">
                  Quantidade:
                </FormLabel>
                <NumberInput
                  size="md"
                  marginTop="2em"
                  marginLeft="0.1em"
                  min={1}
                  maxW={1000}
                  defaultValue={product.quantity}
                  onChange={(e) => handleProductQuantityChange(e, index)}
                >
                  <NumberInputField />
                  <NumberInputStepper>
                    <NumberIncrementStepper />
                    <NumberDecrementStepper />
                  </NumberInputStepper>
                </NumberInput>
              </Flex>
            </Box>
          ))}
          <IconButton
            backgroundColor="tropical_indigo"
            aria-label="Call Segun"
            size="md"
            onClick={() => removeProduct}
            icon={<DeleteIcon />}
          />
          <IconButton
            backgroundColor="tropical_indigo"
            aria-label="Call Segun"
            size="md"
            marginRight="0.5em"
            icon={<AddIcon />}
            onClick={addProduct}
          />
        </FormControl>
      </Stack>
    </>
  );
};

export default CreateProduct;
