import React, { useRef, useState } from "react";
import NextLink from "next/link";
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Box,
  Button,
  IconButton,
  Link,
} from "@chakra-ui/react";
import { format, parseISO } from "date-fns";

import { Table, Tr, Th, Td } from "./Table";
import { DeleteIcon } from "@chakra-ui/icons";
import { deleteSite } from "@/lib/db";
import { useAuth } from "@/lib/auth";
import { mutate } from "swr";
import DeleteSiteButton from "./DeleteSiteButton";

const SiteTable = ({ sites }) => {
  console.log(sites);
  const [isOpen, setIsOpen] = useState();
  const auth = useAuth();
  const cancelRef = useRef();

  const onClose = () => setIsOpen(false);
  const onDelete = (siteId) => {
    deleteSite(siteId);
    mutate(
      ["/api/sites", auth.user.token],
      async (data) => {
        return {
          sites: data.sites.filter((site) => site.id !== siteId),
        };
      },
      false
    );
    onClose();
  };

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
            <Box as="tr" key={index}>
              <Td fontWeight="medium">
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
                  color="blue.500"
                  fontWeight="medium"
                  passHref
                >
                  View Review
                </NextLink>
              </Td>
              <Td>{format(parseISO(site.createdAt), "P")}</Td>
              <Td>
                <DeleteSiteButton siteId={site.id} />
              </Td>
            </Box>
          ))}
        </tbody>
      </Table>
    </Box>
  );
};

export default SiteTable;
