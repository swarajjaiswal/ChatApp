export const getSender = (loggedUser, users) => {
  return users[0]._id === loggedUser._id ? users[1].name : users[0].name;
};

export const getSenderFull = (loggedUser, users) => {
  return users[0]._id === loggedUser._id ? users[1] : users[0];
};

export const isSameSender = (messages, currmessage, index, userId) => {
  return (
    index < messages.length - 1 &&
    (messages[index + 1].sender._id !== currmessage.sender._id ||
      messages[index + 1].sender._id === undefined) &&
    messages[index].sender._id === userId
  );
};

export const isLastMessage = (messages, index, userId) => {
  return (
    index === messages.length - 1 &&
    messages[messages.length - 1].sender._id !== userId &&
    messages[messages.length - 1].sender._id
  );
};
export const isSameSenderMargin = (messages, message, index, userId) => {
  if (
    index < messages.length - 1 &&
    messages[index + 1].sender._id === message.sender._id &&
    message.sender._id !== userId
  ) {
    return 33; // Margin when the sender is the same as the next message's sender
  } else if (
    (index < messages.length - 1 &&
      messages[index + 1].sender._id !== message.sender._id &&
      message.sender._id !== userId) ||
    (index === messages.length - 1 && message.sender._id !== userId)
  ) {
    return 0; // No margin when sender is different or it's the last message
  } else {
    return "auto"; // Default margin
  }
};

export const isSameUser = (messages, message, index) => {
  return index > 0 && messages[index - 1].sender._id === message.sender._id;
};
