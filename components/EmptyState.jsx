import { Box, Button, Flex, Heading, Text } from "@chakra-ui/react";
import Link from "next/link";
import React from "react";
import AddSiteModal from "./AddSiteModal";
import DashboardShell from "./DashboardShell";

const EmptyState = () => {
  return (
    <Flex
      width="100%"
      backgroundColor="white"
      p={16}
      borderRadius="8px"
      direction="column"
      alignItems="center"
    >
      <Heading size="lg" mb={2}>
        You haven&apos;t added any sites
      </Heading>
      <Text mb={4}>Welcome. Let&apos;s get started</Text>
      <AddSiteModal>Add Site</AddSiteModal>
    </Flex>
  );
};

export default EmptyState;
