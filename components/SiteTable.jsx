import React from "react";
import NextLink from "next/link";
import { Box, Link } from "@chakra-ui/react";
import { format, parseISO } from "date-fns";

import { Table, Tr, Th, Td } from "./Table";

const SiteTable = ({ sites }) => {
  // console.log(sites);
  return (
    <Box overflowX="scroll">
      <Table w="full">
        <thead>
          <Tr>
            <Th>Name</Th>
            <Th>Site Link</Th>
            <Th>Review Link</Th>
            <Th>Date Added</Th>
            <Th width="50px">{""}</Th>
          </Tr>
        </thead>
        <tbody>
          {sites.map((site, index) => (
            <Box as="tr" key={site.id}>
              <Td>
                <NextLink
                  href="/site/[siteId]"
                  as={`/site/${site.id}`}
                  passHref
                >
                  {/* <Link id={`site-table-link-${index}`} fontWeight="medium"> */}
                  {site.name}
                  {/* </Link> */}
                </NextLink>
              </Td>
              <Td>
                <Link href={site.url} isExternal>
                  {site.url}
                </Link>
              </Td>
              <Td>
                <NextLink
                  href="/site/[siteId]"
                  as={`/site/${site.id}`}
                  passHref
                >
                  {/* <Link color="blue.500" fontWeight="medium"> */}
                  View Review
                  {/* </Link> */}
                </NextLink>
              </Td>
              <Td>{format(parseISO(site.createdAt), "P")}</Td>
              <Td>Delete</Td>
            </Box>
          ))}
        </tbody>
      </Table>
    </Box>
  );
};

export default SiteTable;
