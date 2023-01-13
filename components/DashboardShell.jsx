import { useAuth } from "@/lib/auth";
import { Avatar, Flex, Stack } from "@chakra-ui/react";
import Link from "next/link";
import NextLink from "next/link";
import React from "react";

const DashboardShell = ({ children }) => {
  const auth = useAuth();

  return (
    <Flex direction="column">
      <Flex
        backgroundColor="white"
        mb={[8, 16]}
        w="full"
        borderTop="5px solid #0AF5F4"
      >
        <Flex
          alignItems="center"
          justifyContent="space-between"
          pt={4}
          pb={4}
          maxW="1250px"
          margin="0 auto"
          w="full"
          px={8}
          h="60px"
        >
          <Flex align="center" gap={4}>
            {/* <NextLink href="/" passHref>
              <Icon name="" size="24px" mr={8} />
            </NextLink> */}
            <NextLink href="/dashboard" passHref>
              Sites
            </NextLink>
            <NextLink href="/review" passHref>
              Reviews
            </NextLink>
          </Flex>
          <Flex justifyContent="center" alignItems="center">
            <NextLink href="/account" passHref>
              <Avatar size="sm" src={auth.user?.photoURL} />
            </NextLink>
          </Flex>
        </Flex>
      </Flex>
      <Flex p={4}>
        <Flex
          margin="0 auto"
          direction="column"
          maxW="1250px"
          px={[0, 8, 8]}
          w="100%"
        >
          {children}
        </Flex>
      </Flex>
    </Flex>
  );
};

export default DashboardShell;
