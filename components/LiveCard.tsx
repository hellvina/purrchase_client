import {
  Card,
  Text,
  CardBody,
  CardFooter,
  ButtonGroup,
  Button,
  Divider,
  Stack,
  Heading,
  Image,
} from "@chakra-ui/react";
import { ReactNode } from "react";

export interface LiveProps {
  id?: string;
  title: string;
  image: string;
  description: string;
  startDate: string;
  finishDate: string;
  products: [];
}

const LiveCard: React.FC<LiveProps> = ({
  title,
  image,
  description,
  startDate,
  finishDate,
}): ReactNode => {
  return (
    <Card maxW="sm" maxH="lg" height="lg" bgColor="#333746" color="mint_cream">
      <CardBody>
        <Image src={image} alt={title} borderRadius="lg" />
        <Stack mt="6" spacing="3">
          <Heading size="md">{title}</Heading>
          <Text>{description}</Text>
        </Stack>
        <Text>
          {startDate} - {finishDate}
        </Text>
      </CardBody>
      <Divider />
      <CardFooter>
        <ButtonGroup spacing="2">
          <Button
            variant="solid"
            bg="tropical_indigo"
            color="mint_cream"
            colorScheme="buttonOnHover"
          >
            Detalhes
          </Button>
          <Button
            variant="ghost"
            bg="tropical_indigo"
            color="mint_cream"
            colorScheme="buttonOnHover"
          >
            Deletar
          </Button>
        </ButtonGroup>
      </CardFooter>
    </Card>
  );
};
export default LiveCard;
