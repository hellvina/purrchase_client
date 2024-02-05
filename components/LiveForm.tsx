import {
  Card,
  CardBody,
  CardHeader,
  FormControl,
  FormHelperText,
  FormLabel,
  Heading,
  Input,
  Stack,
  StackDivider,
} from "@chakra-ui/react";
import { ReactNode } from "react";
import ProductList from "./ProductsList";

interface LiveFormProps {
  title: string;
}

const LiveForm: React.FC<LiveFormProps> = ({ title }) => {
  return (
    <Card width="100%" height="fit-content">
      <CardHeader>
        <Heading size="md">{title}</Heading>
      </CardHeader>

      <CardBody>
        <Stack divider={<StackDivider />} spacing="4">
          <FormControl>
            <FormLabel>Título</FormLabel>
            <Input type="text" />
            <FormHelperText>Título da sua live</FormHelperText>
          </FormControl>
          <FormControl>
            <FormLabel>Descrição</FormLabel>
            <Input type="text" />
            <FormHelperText>Faça uma descrição da sua live</FormHelperText>
          </FormControl>
          <FormControl>
            <FormLabel>Imagem da Live</FormLabel>
            <Input type="file" padding="0.3em" />
          </FormControl>
          <FormControl>
            <FormLabel>Data de Início</FormLabel>
            <Input type="date" padding="0.3em" />
          </FormControl>
          <FormControl>
            <FormLabel>Data de Término</FormLabel>
            <Input type="date" padding="0.3em" />
          </FormControl>
        </Stack>
        <ProductList />
      </CardBody>
    </Card>
  );
};

export default LiveForm;
