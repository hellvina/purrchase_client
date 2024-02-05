import { dateFormat } from "@/helpers/dateFormat";
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
import { useRouter } from "next/router";
import { ReactNode } from "react";
import { useMediaQuery } from "usehooks-ts";

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
  const greaterThan = useMediaQuery("(min-width: 550px)");
  const smallerThan768 = useMediaQuery("(max-width: 550px)");
  const router = useRouter();
  const isDashboardPage = router.pathname === "/dashboard";

  if (smallerThan768) {
    return (
      <Card
        maxW="100%"
        height="fit-content"
        bgColor="raising_grey"
        color="mint_cream"
      >
        <CardBody>
          <Image src={image} alt={title} borderRadius="lg" />
          <Stack mt="6" spacing="3">
            <Heading size="md">{title}</Heading>
            <Text>{description}</Text>
          </Stack>
          <Text>
            {dateFormat(startDate)} até {dateFormat(finishDate)}
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
            {isDashboardPage && (
              <Button
                variant="ghost"
                bg="tropical_indigo"
                color="mint_cream"
                colorScheme="buttonOnHover"
              >
                Deletar
              </Button>
            )}
          </ButtonGroup>
        </CardFooter>
      </Card>
    );
  }

  if (greaterThan) {
    return (
      <Card
        maxW="16em"
        height="fit-content"
        bgColor="raising_grey"
        color="mint_cream"
      >
        <CardBody>
          <Image src={image} alt={title} borderRadius="lg" maxH="sm" />
          <Stack mt="6" spacing="3">
            <Heading size="md">{title}</Heading>
            <Text height="3em" maxH="3em">
              {description}
            </Text>
          </Stack>
          <Text>
            {dateFormat(startDate)} até {dateFormat(finishDate)}
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
            {isDashboardPage && (
              <Button
                variant="ghost"
                bg="tropical_indigo"
                color="mint_cream"
                colorScheme="buttonOnHover"
              >
                Deletar
              </Button>
            )}
          </ButtonGroup>
        </CardFooter>
      </Card>
    );
  }
};
export default LiveCard;
