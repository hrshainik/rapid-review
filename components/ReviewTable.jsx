import React from "react";
import NextLink from "next/link";
import { Box, Code, Link } from "@chakra-ui/react";
import { format, parseISO } from "date-fns";

import { Table, Tr, Th, Td } from "./Table";

const ReviewTable = ({ allReview }) => {
  // console.log(sites);
  return (
    <Box overflowX="scroll">
      <Table w="full">
        <thead>
          <Tr>
            <Th>Name</Th>
            <Th>Review</Th>
            <Th>Route</Th>
            <Th>Visible</Th>
            <Th width="50px">{""}</Th>
          </Tr>
        </thead>
        <tbody>
          {allReview.map((review, index) => (
            <Box as="tr" key={index}>
              <Td fontWeight="medium">{review.author}</Td>
              <Td>{review.text}</Td>
              <Td>
                <Code
                  maxW="150px"
                  textOverflow="ellipsis"
                  whiteSpace="nowrap"
                  overflow="hidden"
                  display="inherit"
                >
                  {review.route || "/"}
                </Code>
              </Td>
              <Td>{review.status}</Td>
              <Td>Delete</Td>
            </Box>
          ))}
        </tbody>
      </Table>
    </Box>
  );
};

export default ReviewTable;
