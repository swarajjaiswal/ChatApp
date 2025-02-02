const Chat = require('../models/chatModel');
const Message = require('../models/messageModel');
const User = require('../models/userModel');

const sendMessages = async (req, res) => {
  const { content, chatId } = req.body;

  if (!content || !chatId) {
    return res.status(400).json({ message: "Invalid data" });
  }

  const message = {
    sender: req.user._id,
    content,
    chat: chatId,
  };

  try {
    let newMessage = await Message.create(message);

    // Populate the message with sender and chat details
    newMessage = await newMessage.populate("sender", "name pic");
    newMessage = await newMessage.populate("chat");
    newMessage = await User.populate(newMessage, {
      path: "chat.users",
      select: "name pic email",
    });

    // Update the latest message in the chat
    await Chat.findByIdAndUpdate(chatId, {
      latestMessage: newMessage,
    });

    res.status(201).json(newMessage);
  } catch (error) {
    res.status(400).json({ message: "Failed to send message", error: error.message });
  }
};

const fetchMessages = async (req, res) => {
  const chatId = req.params.chatId;

  try {
    const messages = await Message.find({ chat: chatId })
      .populate("sender", "name pic email")
      .populate("chat")
      .populate("chat.users", "name pic email");

    res.json(messages);
  } catch (error) {
    res.status(400).json({ message: "Failed to fetch messages", error: error.message });
  }
};

module.exports = { sendMessages, fetchMessages };
