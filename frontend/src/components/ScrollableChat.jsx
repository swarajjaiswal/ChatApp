import React from "react";
import ScrollableFeed from "react-scrollable-feed";
import { isLastMessage, isSameSender, isSameSenderMargin, isSameUser } from "../utils/chatUtils";
import { Avatar, Tooltip } from "@chakra-ui/react";
import { useChatContext } from "../context/ChatProvider";

const ScrollableChat = ({ messages }) => {
  const { user } = useChatContext();

  return (
    <ScrollableFeed>
      {messages &&
        messages.map((message, index) => (
          <div
            className="flex items-start mb-3"
            key={message._id}
            style={{ alignItems: "flex-start" }}
          >
            {(isSameSender(messages, message, index, user._id) ||
              isLastMessage(messages, index, user._id)) && (
              <Tooltip
                label={message.sender.name}
                placement="bottom-start"
                hasArrow
              >
                <Avatar
                  mt="7px"
                  mr="8px"
                  size="sm"
                  cursor="pointer"
                  name={message.sender.name}
                  src={message.sender.pic}
                />
              </Tooltip>
            )}
            {/* Change span to div for proper block styling */}
            <div
              style={{
                backgroundColor: message.sender._id === user._id ? "pink" : "purple",
                color: message.sender._id === user._id ? "white" : "black",
                padding: "8px 15px",
                borderRadius: "20px",
                maxWidth: "75%",
                alignSelf: message.sender._id === user._id ? "flex-end" : "flex-start",
                marginLeft: isSameSenderMargin(messages, message, index, user._id),
                marginTop: isSameUser(messages, message, index, user._id) ? 3 : 10,
                boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
                display: "inline-block", // Ensure the div behaves correctly
              }}
            >
              {message.content}
            </div>
          </div>
        ))}
    </ScrollableFeed>
  );
};

export default ScrollableChat;
