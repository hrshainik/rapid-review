import { useAuth } from "@/lib/auth";
import { createSite } from "@/lib/db";
import { useRef } from "react";
import { useForm } from "react-hook-form";

const {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  FormControl,
  FormLabel,
  Input,
  ModalFooter,
  useDisclosure,
  useToast,
} = require("@chakra-ui/react");

const AddSiteModal = ({ children }) => {
  const auth = useAuth();

  const initialRef = useRef(null);

  const toast = useToast();

  const { isOpen, onOpen, onClose } = useDisclosure();

  // const finalRef = useRef(null);

  const { handleSubmit, register, reset } = useForm();

  const onSubmit = ({ name, url }) => {
    createSite({
      authorId: auth.user.uid,
      createdAt: new Date().toISOString(),
      name,
      url,
    });
    toast({
      title: "Success",
      description: "We've added your site.",
      status: "success",
      duration: 9000,
      isClosable: true,
      position: "top",
    });
    onClose();
    reset();
  };

  return (
    <>
      <Button fontWeight={600} maxW="200px" onClick={onOpen}>
        {children}
      </Button>

      <Modal
        initialFocusRef={initialRef}
        // finalFocusRef={finalRef}
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalOverlay />
        <ModalContent as="form" onSubmit={handleSubmit(onSubmit)}>
          <ModalHeader fontWeight="bold">Add Site</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl>
              <FormLabel>Name</FormLabel>
              <Input
                ref={initialRef}
                placeholder="My Site"
                {...register("name", { required: true })}
              />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Link</FormLabel>
              <Input
                placeholder="https://website.com"
                {...register("url", { required: true })}
              />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button onClick={onClose} mr={3}>
              Cancel
            </Button>
            <Button backgroundColor="#99FFFE" color="#194D4C" type="submit">
              Create
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default AddSiteModal;
