import { Conversation } from "../models/conversationModel.js";
import { Message } from "../models/messageModel.js";
import { getReciverSocketId, io } from "../socket/socket.js";

export const sendMessage = async (req, res) => {
  try {
    const senderId = req.id;
    const receiverId = req.params.id;
    const { message } = req.body;

    let gotConvarsation = await Conversation.findOne({
      participants: { $all: [senderId, receiverId] },
    });

    if (!gotConvarsation) {
      gotConvarsation = await Conversation.create({
        participants: [senderId, receiverId],
      });
    }

    const newMessage = await Message.create({
      senderId,
      receiverId,
      message
    });
    if (newMessage) {
      gotConvarsation.messages.push(newMessage._id); 
    };
    await Promise.all([gotConvarsation.save(),newMessage.save()])

    //socket io
    const receiverSocketId = getReciverSocketId(receiverId);
    if (receiverSocketId) {
      io.to(receiverSocketId).emit("newmessage",newMessage)
    }

    return res.status(201).json({
      newMessage
    })

  } catch (error) {
    console.log(error)
  }
}


export const getMessage = async (req, res) => {
  try {
    const receiverId = req.params.id;
    const senderId = req.id;
    const convarsation = await Conversation.findOne({
      participants: { $all: [senderId, receiverId] }
    }).populate("messages");
    // console.log(convarsation.messages)
    return res.status(200).json(convarsation?.messages)
  } catch (error) {
    console.log(error)
  }
}