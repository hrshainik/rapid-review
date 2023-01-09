import { useAuth } from "@/lib/auth";
import {
  Avatar,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Button,
  Flex,
  Heading,
  Stack,
} from "@chakra-ui/react";
import Link from "next/link";
import React from "react";

const DashboardShell = ({ children }) => {
  const auth = useAuth();

  return (
    <Flex direction="column">
      <Flex
        backgroundColor="white"
        alignItems="center"
        justifyContent="space-between"
        py={4}
        px={8}
      >
        <Stack isInline spacing={4} align="center">
          <Link href="/dashboard">Feedback</Link>
          <Link href="/dashboard">Sites</Link>
        </Stack>
        <Flex alignItems="center">
          <Button mr={4} onClick={(e) => auth.signout()}>
            Logout
          </Button>
          <Avatar size="sm" src={auth.user?.photoURL} />
        </Flex>
      </Flex>
      <Flex backgroundColor="gray.100" p={8} height="100vh">
        <Flex maxWidth="800px" ml="auto" mr="auto" direction="column" w="100%">
          {children}
        </Flex>
      </Flex>
    </Flex>
  );
};

export default DashboardShell;
