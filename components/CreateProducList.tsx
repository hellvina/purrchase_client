import { AddIcon, DeleteIcon } from "@chakra-ui/icons";
import {
  CardHeader,
  FormControl,
  Heading,
  IconButton,
  Stack,
  StackDivider,
} from "@chakra-ui/react";
import { FC, useEffect, useState } from "react";
import Product from "./Product";

interface ProductProps {
  id?: string;
  name?: string;
  image?: string;
  quantity?: number;
}

interface CreateProductListProps {
  onChange: (products: ProductProps[]) => void;
}

const CreateProductList: FC<CreateProductListProps> = ({ onChange }) => {
  const [products, setProducts] = useState<ProductProps[]>([
    { id: "", name: "", image: "", quantity: 1 },
  ]);

  const handleProductChange = (index: number, newProduct: ProductProps) => {
    const updatedProducts = [...products];
    updatedProducts[index] = newProduct;
    setProducts(updatedProducts);
    onChange(updatedProducts);
  };

  const removeProduct = () => {
    if (products.length > 1) {
      setProducts((prevProducts) => prevProducts.slice(0, -1));
      onChange(products.slice(0, -1));
    }
  };

  const addProduct = () => {
    setProducts((prevProducts) => [
      ...prevProducts,
      { id: "", name: "", image: "", quantity: 1 },
    ]);
    onChange([...products, { id: "", name: "", image: "", quantity: 1 }]);
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
        {products.map((product, index) => (
          <Product
            key={index}
            name={product.name}
            image={product.image}
            quantity={product.quantity}
            onChange={(newProduct) => handleProductChange(index, newProduct)}
          />
        ))}
        <FormControl>
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

export default CreateProductList;
