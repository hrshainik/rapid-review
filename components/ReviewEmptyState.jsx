import { Box, Button, Flex, Heading, Text } from "@chakra-ui/react";
import Link from "next/link";
import React from "react";
import AddSiteModal from "./AddSiteModal";
import DashboardShell from "./DashboardShell";

const ReviewEmptyState = () => {
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
        There isn&apos;t any review.
      </Heading>
      <Text mb={4}>Share your sites!</Text>
    </Flex>
  );
};

export default ReviewEmptyState;
