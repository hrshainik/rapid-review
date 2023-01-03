import { Button, Flex, Heading, Text } from "@chakra-ui/react";
import Head from "next/head";
import { useAuth } from "../lib/auth";

export default function Home() {
  const auth = useAuth();
  return (
    <div>
      <Head>
        <title>Rapid Review</title>
        <meta
          name="description"
          content="Just one div can solve your complex commenting problem"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Flex
        direction="column"
        alignItems="center"
        minH="100vh"
        justifyContent="center"
      >
        <Heading>Rapid Review</Heading>
        {!auth.user && (
          <Button onClick={(e) => auth.signinWithGithub()}>Sign In</Button>
        )}
        {auth.user && <Text>{auth.user.email}</Text>}
        {auth.user && <Text>{auth.user.name}</Text>}
        {auth.user && <Button onClick={(e) => auth.signout()}>Sign Out</Button>}
      </Flex>
    </div>
  );
}
