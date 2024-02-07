import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  FormControl,
  FormHelperText,
  FormLabel,
  Heading,
  Input,
  Stack,
  StackDivider,
} from "@chakra-ui/react";
import ProductList from "./ProductsList";
import { FC, useState } from "react";

interface LiveFormProps {
  title: string;
  onSubmit: (formData: FormData) => void;
}

const LiveForm: FC<LiveFormProps> = ({ title, onSubmit }) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [errorAlert, setErrorAlert] = useState<string | null>(null);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);

    try {
      const form = new FormData(event.currentTarget);
      await onSubmit(form);
    } catch (error) {
      console.error("Error while submiting form", error);
      setErrorAlert("Erro ao criar live");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Card width="100%" height="fit-content">
        <CardHeader>
          <Heading size="md">{title}</Heading>
        </CardHeader>

        <CardBody>
          <form onSubmit={handleSubmit}>
            <Stack divider={<StackDivider />} spacing="4">
              <FormControl>
                <FormLabel>Título</FormLabel>
                <Input name="title" type="text" />
                <FormHelperText>Título da sua live</FormHelperText>
              </FormControl>
              <FormControl>
                <FormLabel>Descrição</FormLabel>
                <Input name="description" type="text" />
                <FormHelperText>Faça uma descrição da sua live</FormHelperText>
              </FormControl>
              <FormControl>
                <FormLabel>Imagem da Live</FormLabel>
                <Input name="image" type="file" padding="0.3em" />
              </FormControl>
              <FormControl>
                <FormLabel>Data de Início</FormLabel>
                <Input name="startDate" type="date" padding="0.3em" />
              </FormControl>
              <FormControl>
                <FormLabel>Data de Término</FormLabel>
                <Input name="endDate" type="date" padding="0.3em" />
              </FormControl>
            </Stack>
            <ProductList />
            <Button
              isLoading={loading}
              bgColor="tropical_indigo"
              mr={3}
              type="submit"
              loadingText="Loading"
              alignContent="right"
            >
              Salvar
            </Button>
          </form>
        </CardBody>
      </Card>
    </>
  );
};

export default LiveForm;
