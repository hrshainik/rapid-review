import EmptyState from "@/components/EmptyState";
import { Box, Button, Flex, Heading, Text } from "@chakra-ui/react";
import Head from "next/head";
import Link from "next/link";
import { useAuth } from "../lib/auth";
import { AiFillGoogleCircle, AiFillGithub } from "react-icons/ai";

export default function Home() {
  const { user, signinWithGithub, signinWithGoogle } = useAuth();
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
        justifyContent="center"
        gap={4}
        minH="100vh"
      >
        <Heading>Rapid Review</Heading>
        <Text width="90%" maxWidth="700px" align="center" mb={4}>
          Rapid Review was built as part of React 2025. It is the easiest way to
          add comments or reviews to your static site. Try it out by leaving a
          comment below. After the comment is approved, it will display below.
        </Text>
        {!user ? (
          <Flex direction={["column", "row"]} gap={4}>
            <Button
              onClick={() => signinWithGithub()}
              backgroundColor="gray.900"
              color="white"
              fontWeight="medium"
              leftIcon={<AiFillGithub />}
              _hover={{ bg: "gray.700" }}
              _active={{
                bg: "gray.800",
                transform: "scale(0.95)",
              }}
            >
              Continue with GitHub
            </Button>
            <Button
              onClick={() => signinWithGoogle()}
              backgroundColor="white"
              color="gray.900"
              variant="outline"
              fontWeight="medium"
              leftIcon={<AiFillGoogleCircle />}
              _hover={{ bg: "gray.100" }}
              _active={{
                bg: "gray.100",
                transform: "scale(0.95)",
              }}
            >
              Continue with Google
            </Button>
          </Flex>
        ) : (
          <Button
            as="a"
            href="/dashboard"
            backgroundColor="gray.900"
            color="white"
            fontWeight="medium"
            _hover={{ bg: "gray.700" }}
            _active={{
              bg: "gray.800",
              transform: "scale(0.95)",
            }}
          >
            Dashboard
          </Button>
        )}
      </Flex>
    </div>
  );
}
