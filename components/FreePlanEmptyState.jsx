import { Box, Button, Heading, Text } from "@chakra-ui/react";
import Link from "next/link";
import React from "react";
import DashboardShell from "./DashboardShell";

const FreePlanEmptyState = () => {
  return (
    <DashboardShell>
      <Box width="100%" backgroundColor="white">
        <Heading size="md">Get feedback on your site instantly.</Heading>
        <Text>Start today, then grow with us.</Text>
        <Button>Upgrade to Starter</Button>
      </Box>
    </DashboardShell>
  );
};

export default FreePlanEmptyState;
