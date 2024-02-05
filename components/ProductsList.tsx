import { AddIcon, DeleteIcon } from "@chakra-ui/icons";
import {
  CardHeader,
  FormControl,
  Heading,
  IconButton,
  Stack,
  StackDivider,
} from "@chakra-ui/react";
import { ReactNode, useState } from "react";
import Product from "./Product";

const ProductList = (): ReactNode => {
  type ProductType = React.ReactElement;

  const [products, setProducts] = useState<ProductType[]>([
    <Product key={0} />,
  ]);

  const removeProduct = () => {
    if (products.length > 1) {
      setProducts((prevProducts) => prevProducts.slice(0, -1));
    }
  };

  const addProduct = () => {
    setProducts((prevProducts) => [
      ...prevProducts,
      <Product key={prevProducts.length} />,
    ]);
  };

  return (
    <>
      <CardHeader>
        <Heading
          size="md"
          marginLeft="-1rem"
          marginTop="2rem"
          marginBottom="2rem"
        >
          Produtos da Live
        </Heading>
      </CardHeader>

      <Stack divider={<StackDivider />} spacing="4">
        <FormControl>
          {products}
          <IconButton
            backgroundColor="tropical_indigo"
            aria-label="Call Segun"
            size="md"
            onClick={removeProduct}
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

export default ProductList;
