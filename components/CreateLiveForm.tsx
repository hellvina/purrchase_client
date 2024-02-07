import React from "react";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Link,
  Stack,
  StackDivider,
} from "@chakra-ui/react";
import { Formik, Form, Field } from "formik";
import { createLive } from "@/services/api/lives";
import CreateProductList from "./CreateProducList";
import { getIdFromLocalDb } from "@/helpers/localDbHelper";
import { dateFormatToISO } from "@/helpers/dateFormat";
import { useRouter } from "next/router";

interface FormValues {
  title: string;
  description: string;
  image: string;
  startDate: string;
  finishDate: string;
  belongsToId: string;
  products: [];
}

interface ProductProps {
  name?: string;
  image?: string;
  quantity?: number;
}
interface CreateLiveFormProps {
  title: string;
}

const CreateLiveForm: React.FC<CreateLiveFormProps> = ({ title }) => {
  const router = useRouter();

  const handleSubmit = async (
    values: FormValues,
    actions: { resetForm: () => void }
  ) => {
    try {
      if (
        !isValidDateFormat(values.startDate) ||
        !isValidDateFormat(values.finishDate)
      ) {
        console.error("Datas de início ou término inválidas");
        return;
      }

      const startDateISO = dateFormatToISO(values.startDate);
      const finishDateISO = dateFormatToISO(values.finishDate);

      const updatedValues = {
        ...values,
        startDate: startDateISO,
        finishDate: finishDateISO,
      };
      await createLive(updatedValues);
      router.push("/dashboard");
      actions.resetForm();
    } catch (error) {
      console.error("Error while creating live:", error);
    }
  };
  const isValidDateFormat = (date: string): boolean => {
    const isoDateRegex = /^\d{4}-\d{2}-\d{2}$/;
    return isoDateRegex.test(date);
  };
  const userId = getIdFromLocalDb() as string;
  return (
    <>
      <Card width="100%" height="fit-content">
        <CardHeader>
          <Heading size="md">{title}</Heading>
        </CardHeader>

        <CardBody>
          <Formik
            initialValues={{
              title: "",
              description: "",
              image: "",
              startDate: "",
              finishDate: "",
              belongsToId: userId,
              products: [],
            }}
            onSubmit={handleSubmit}
          >
            {({ isSubmitting, values, setFieldValue }) => (
              <Form>
                <Stack divider={<StackDivider />} spacing="4">
                  <FormLabel>Título:</FormLabel>
                  <Field name="title" type="text" as={Input} />
                  <FormLabel>Descrição:</FormLabel>
                  <Field name="description" type="text" as={Input} />
                  <FormLabel>Imagem:</FormLabel>
                  <Field name="image" placeholder="URL da imagem" as={Input} />
                  <FormLabel>Data de Início:</FormLabel>
                  <Field name="startDate" type="date" as={Input} />
                  <FormLabel>Data de Término:</FormLabel>
                  <Field name="finishDate" type="date" as={Input} />
                </Stack>
                <CreateProductList
                  onChange={(products) => setFieldValue("products", products)}
                />
                <Link href="/dashboard">
                  <Button
                    alignSelf="end"
                    marginLeft="45em"
                    marginBottom="30px"
                    type="submit"
                    isLoading={isSubmitting}
                    loadingText="Loading"
                  >
                    {" "}
                    Salvar
                  </Button>
                </Link>
              </Form>
            )}
          </Formik>
        </CardBody>
      </Card>
    </>
  );
};

export default CreateLiveForm;
