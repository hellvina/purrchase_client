import { AddIcon, DeleteIcon } from "@chakra-ui/icons";
import {
  Box,
  CardHeader,
  FormControl,
  Heading,
  IconButton,
  Stack,
  StackDivider,
} from "@chakra-ui/react";
import { FC, useEffect, useState } from "react";
import Product from "./Product";
import { listProducts, updateLive } from "@/services/api/lives";
import responseIterator from "@/helpers/responseIterator";

interface ProductProps {
  id?: string;
  name?: string;
  image?: string;
  quantity?: number;
}

interface ProductsListProps {
  products: ProductProps[];
  setProducts: (products: ProductProps[]) => void;
}

const ProductList: FC<ProductProps> = ({ id, name, quantity }) => {
  type ProductType = React.ReactElement;
  const [products, setProducts] = useState<Object[]>([]);

  useEffect(() => {
    const handleLoadProducts = async () => {
      try {
        const response = await listProducts(id || "");
        const formatedData = responseIterator(response);
        setProducts(formatedData);
      } catch (error) {
        console.error("Error while loading products", error);
        throw new Error("Error while loading products");
      }
    };
    handleLoadProducts();
  }, []);

  const removeProduct = () => {
    if (products.length > 1) {
      setProducts((prevProducts) => prevProducts.slice(0, -1));
    }
  };

  const addProduct = () => {
    setProducts((prevProducts) => [
      ...prevProducts,
      <Product key={prevProducts.length} quantity={1} />,
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
          {products.map((product: ProductProps) => (
            <Box key={product.id} maxW="fit-content">
              <Product {...product} />
            </Box>
          ))}
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
