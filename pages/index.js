import EmptyState from "@/components/EmptyState";
import { Box, Button, Flex, Heading, Text } from "@chakra-ui/react";
import Head from "next/head";
import Link from "next/link";
import { useAuth } from "../lib/auth";

export default function Home() {
  const { user, signin, signup, signout, signinWithGithub, signinWithGoogle } =
    useAuth();
  return (
    <div>
      <Head>
        <title>Rapid Review</title>
        <meta
          name="description"
          content="Just one div can solve your complex commenting problem"
        />
        <link rel="icon" href="/favicon.ico" />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              if (document.cookie && document.cookie.includes('RapidReviewAuth')) {
                window.location.href = "/dashboard"
              }
            `,
          }}
        />
      </Head>
      <Flex
        direction="column"
        alignItems="center"
        minH="100vh"
        justifyContent="center"
        gap={4}
      >
        <Heading>Rapid Review</Heading>
        {user && <Text>{user.email}</Text>}
        {user && <Text>{user.name}</Text>}
        {user ? (
          <Button onClick={(e) => signout()}>Sign Out</Button>
        ) : (
          <Flex gap={4}>
            <Button onClick={(e) => signinWithGithub()}>GitHub</Button>
            <Button onClick={(e) => signinWithGoogle()}>Google</Button>
          </Flex>
        )}
        <Link href="/dashboard">
          <Button>Dashboard</Button>
        </Link>
      </Flex>
    </div>
  );
}
