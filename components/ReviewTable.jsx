import React from "react";
import { Box, Code, IconButton, Switch } from "@chakra-ui/react";
import { DeleteIcon } from "@chakra-ui/icon";

import { Table, Tr, Th, Td } from "./Table";
import DeleteReviewButton from "@/components/DeleteReviewButton";

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
              <Td>
                <Switch
                  color="green"
                  defaultChecked={review.status === "active"}
                />
              </Td>
              <Td>
                <DeleteReviewButton reviewId={review.id} />
              </Td>
            </Box>
          ))}
        </tbody>
      </Table>
    </Box>
  );
};

export default ReviewTable;
