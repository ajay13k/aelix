import React, { useEffect, useState } from "react";
import ScrollToBottom from "react-scroll-to-bottom";
import { HStack, Spacer } from "@chakra-ui/react";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { Link } from "react-router-dom";

function Chat({ socket, username, room }) {
  const [currentMessage, setCurrentMessage] = useState("");
  const [messageList, setMessageList] = useState([]);
  const sendMessage = async () => {
    if (currentMessage !== "") {
      const messageData = {
        room: room,
        author: username,
        message: currentMessage,
        time:
          new Date(Date.now()).getHours() +
          ":" +
          new Date(Date.now()).getMinutes(),
      };

      await socket.emit("send_message", messageData);
      setMessageList((list) => [...list, messageData]);
      setCurrentMessage("");
    }
  };

  useEffect(() => {
    socket.on("receive_message", (data) => {
      setMessageList((list) => [...list, data]);
    });
  }, [socket]);

  return (
    <>
      <HStack fontWeight="bold">
        <AiOutlineArrowLeft />
        <Link style={{ textDecoration: "none" }} to="SidebarWithHeader">
          Go To Home
        </Link>
      </HStack>
      <HStack>
        <div className="chat-window">
          <div className="chat-header">
            <p>Live Chat</p>
          </div>
          <div className="chat-body">
            <ScrollToBottom className="message-container">
              {messageList.map((messageContent) => {
                return (
                  <div
                    className="message"
                    id={username === messageContent.author ? "you" : "other"}
                  >
                    <div>
                      <div className="message-content">
                        <p>{messageContent.message}</p>
                      </div>
                      <div className="message-meta">
                        <p id="time">{messageContent.time}</p>
                        <p id="author">{messageContent.author}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </ScrollToBottom>
          </div>
          <div className="chat-footer">
            <input
              type="text"
              value={currentMessage}
              placeholder="Hey..."
              onChange={(event) => {
                setCurrentMessage(event.target.value);
              }}
              onKeyPress={(event) => {
                event.key === "Enter" && sendMessage();
              }}
            />
            <button onClick={sendMessage}>&#9658;</button>
          </div>
        </div>
        <Spacer/>
        <div className="chat-window">
          <div className="chat-header">
            <p>Chat Messages</p>
          </div>
          <div className="chat-body">
            <ScrollToBottom className="message-container">
              {messageList.map((messageContent) => {
                return (
                  <div className="message">
                    <div>
                      <div className="message-content">
                        {messageContent.message}
                      </div>
                      {messageContent.time}
                    </div>
                  </div>
                );
              })}
            </ScrollToBottom>
          </div>
        </div>
      </HStack>
    </>
  );
}

export default Chat;
