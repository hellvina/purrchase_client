import { NextPage } from "next";
import Head from "next/head";
import LandingPageTemplate from "../templates/LandingPage/LandingPageTemplate";

const Index: NextPage = () => {
  return (
    <>
      <Head>
        <title>purrchase_client</title>
        <meta name="description" content="Generated by Create Next Stack." />
      </Head>
      <LandingPageTemplate />
    </>
  );
};

export default Index;
