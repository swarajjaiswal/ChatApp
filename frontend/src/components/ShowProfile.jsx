import React from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  IconButton,
  useDisclosure,
  Image,
  Text,
} from "@chakra-ui/react";
import { ViewIcon } from "@chakra-ui/icons";
import { useChatContext } from "../context/ChatProvider";

const ShowProfile = ({ children }) => {
  const { selectedChat } = useChatContext();
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      {children ? (
        <span onClick={onOpen}>{children}</span>
      ) : (
        <IconButton
          display={{ base: "flex" }}
          icon={<ViewIcon />}
          onClick={onOpen}
        />
      )}

      <Modal
        isCentered
        onClose={onClose}
        isOpen={isOpen}
        motionPreset="slideInBottom"
      >
        <ModalOverlay />
        <ModalContent m={2}>
          <ModalHeader
            as="h2"
            fontSize="2xl"
            fontWeight="bold"
            textAlign="center"
            p={4}
          >
            {selectedChat && selectedChat.users[1]?.name || "Unknown User"}
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody display="flex" flexDirection="column" alignItems="center">
            <Image
              borderRadius="full"
              boxSize="150px"
              alt={selectedChat?.users[1]?.name || "User"}
              src={selectedChat?.users[1]?.pic || "/default-avatar.png"}
              mb={4}
            />
            <Text
              fontSize="lg"
              fontWeight="semibold"
              textAlign="center"
              mt={2}
              mb={2}
            >
              {selectedChat?.users[1]?.email || "Email not available"}
            </Text>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ShowProfile;
