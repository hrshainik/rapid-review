import { useAuth } from "@/lib/auth";
import {
  Avatar,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
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
          <Link href="#">Feedback</Link>
          <Link href="#">Sites</Link>
        </Stack>
        <Flex alignItems="center">
          <Link mr={4} href="#">
            Account
          </Link>
          <Avatar size="sm" src={auth.user.photoURL} />
        </Flex>
      </Flex>
      <Flex backgroundColor="gray.100" p={8} height="100%">
        <Flex maxWidth="800px" ml="auto" mr="auto" direction="column" w="100%">
          <Breadcrumb>
            <BreadcrumbItem isCurrentPage>
              <BreadcrumbLink color="gray.700" fontSize="sm">
                Sites
              </BreadcrumbLink>
            </BreadcrumbItem>
          </Breadcrumb>
          <Heading color="black" mb={4}>
            Sites
          </Heading>
          {children}
        </Flex>
      </Flex>
    </Flex>
  );
};

export default DashboardShell;
