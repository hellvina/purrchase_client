import React, { FC, useState, useEffect } from "react";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Stack,
  StackDivider,
} from "@chakra-ui/react";
import { LiveProps } from "./LiveCard";
import { showLive, updateLive } from "@/services/api/lives";
import responseIterator from "@/helpers/responseIterator";
import { dateFormatToISO } from "@/helpers/dateFormat";
import { removeEmptyValues } from "@/helpers/removeEmptyValues";
import CreateProduct from "./CreateProduct";

interface ProductProps {
  id?: any;
  name: string;
  image: string;
  quantity: number;
}

interface LiveFormProps {
  id?: string;
  title: string;
  onSubmit?: (formData: FormData) => Promise<string | null | undefined>;
}

const LiveForm: FC<LiveFormProps> = ({ title, id }) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [live, setLive] = useState<LiveProps | undefined>();
  const [liveTitle, setLiveTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [startDate, setStartDate] = useState("");
  const [finishDate, setFinishDate] = useState("");
  const [products, setProducts] = useState<ProductProps[]>([]);

  useEffect(() => {
    const handleLoadLive = async () => {
      try {
        if (!id) return;
        const response = await showLive(id);
        const liveData = responseIterator(response) as unknown as LiveProps;
        setLive(liveData);
      } catch (error) {
        console.error("Error while loading form", error);
      }
    };
    handleLoadLive();
  }, [id]);

  const handleUpdateLive = async () => {
    try {
      const body = {
        data: {
          title: liveTitle,
          description,
          image,
          startDate,
          finishDate,
          belongsToId: id,
          products: products.map((product) => ({
            ...product,
            id: product.id,
          })),
        },
      };
      console.log("body", body);
      const cleanData = removeEmptyValues(body);
      console.log("cleanData", cleanData);
      const response = await updateLive(id as string, cleanData);
      console.log("RESPONSE", response);
    } catch (error) {
      console.error("Error while updating live", error);
    }
  };

  const updateLiveOnClick = async () => {
    await handleUpdateLive();
  };

  const catchTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLiveTitle(event.target.value);
  };

  const catchDescription = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDescription(event.target.value);
  };

  const catchImage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setImage(event.target.value);
  };

  const catchStartDate = (event: React.ChangeEvent<HTMLInputElement>) => {
    const formatedDate = dateFormatToISO(event.target.value);
    setStartDate(formatedDate);
  };

  const catchFinishDate = (event: React.ChangeEvent<HTMLInputElement>) => {
    const formatedDate = dateFormatToISO(event.target.value);
    setFinishDate(formatedDate);
  };

  const updateProductList = (event: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const updatedProducts = [...products];
    updatedProducts[index] = {
      ...updatedProducts[index],
      [event.target.name]: event.target.value,
    };
    setProducts(updatedProducts);
  };

  return (
    <Card width="100%" height="fit-content">
      <CardHeader>
        <Heading size="md">{title}</Heading>
      </CardHeader>

      <CardBody>
        <form>
          <Stack divider={<StackDivider />} spacing="4">
            <FormControl>
              <FormLabel>Título:</FormLabel>
              <Input
                name="title"
                type="text"
                defaultValue={live?.title}
                onChange={catchTitle}
              />
            </FormControl>
            <FormControl>
              <FormLabel>Descrição:</FormLabel>
              <Input
                name="description"
                type="text"
                defaultValue={live?.description}
                onChange={catchDescription}
              />
            </FormControl>
            <FormControl>
              <FormLabel>Imagem:</FormLabel>
              <Input
                name="image"
                padding="0.3em"
                defaultValue={live?.image}
                onChange={catchImage}
              />
            </FormControl>
            <FormControl>
              <FormLabel>Data de Início:</FormLabel>
              <Input
                name="startDate"
                type="date"
                padding="0.3em"
                defaultValue={live?.startDate}
                onChange={catchStartDate}
              />
            </FormControl>
            <FormControl>
              <FormLabel>Data de Término:</FormLabel>
              <Input
                name="finishDate"
                type="date"
                padding="0.3em"
                defaultValue={live?.finishDate}
                onChange={catchFinishDate}
              />
            </FormControl>
          </Stack>
          {live && (
            <CreateProduct
              id={live.id as string}
              onChange={updateProductList}
            />
          )}
          <Button
            isLoading={loading}
            bgColor="tropical_indigo"
            mr={3}
            loadingText="Loading"
            alignContent="right"
            onClick={updateLiveOnClick}
          >
            Salvar
          </Button>
        </form>
      </CardBody>
    </Card>
  );
};

export default LiveForm;
