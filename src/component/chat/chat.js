import {
  Flex,
  Input,
  Text,
  HStack,
  Box,
  Grid,
  GridItem,
  Avatar,
} from "@chakra-ui/react";
import React, { useState, useEffect } from "react";
import Footer from "./footer";
import Header from "./header";
import Messages from "./message";
import SidebarWithHeader from "../sidebarwithheader/SidebarWithHeader";
import { API, BASE_URL } from "../../config/config";
import axios from "axios";
import { BsChatLeftDotsFill } from "react-icons/bs";

const Chat = () => {
  const [counsellor, setCounselor] = useState([]);
  const [search, setSearch] = useState("");
  const [messages, setMessages] = useState([
    { from: "computer", text: "Hi, My Name is ...." },
    { from: "me", text: "Hey there" },
    { from: "me", text: "Myself Ajay Kushwah" },
    {
      from: "computer",
      text: "Nice to meet you. You can send me message and i'll reply you with same message.",
    },
  ]);
  const [inputMessage, setInputMessage] = useState("");

  const handleSendMessage = () => {
    if (!inputMessage.trim().length) {
      return;
    }
    const data = inputMessage;

    setMessages((old) => [...old, { from: "me", text: data }]);
    setInputMessage("");

    setTimeout(() => {
      setMessages((old) => [...old, { from: "computer", text: data }]);
    }, 1000);
  };
  const token = localStorage.getItem("token");
  const handleGetUser = async () => {
    await axios
      .get(`${API.getAllUser}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        setCounselor(response.data);
      });
  };

  useEffect(() => {
    handleGetUser();
  }, []);

  return (
    <>
      <SidebarWithHeader />
      <Grid templateColumns="repeat(2, 1fr)" w="100%" pt={10}>
        <GridItem pl={250}>
          <HStack mb={3} fontSize="30px">
            <Text>
              <BsChatLeftDotsFill />
            </Text>
            <Text fontSize="30px">Chat</Text>
          </HStack>
          <Text fontSize="30px">Messages</Text>
          <Input
            w={300}
            placeholder="Seach Counsellor..."
            border="none"
            onChange={(e) => setSearch(e.target.value)}
          />
          <Box mt={5} w={300} border="1px solid black" boxShadow={"2xl"}>
            {counsellor &&
              counsellor
                .filter((item) => {
                  if (search === "") {
                    return item;
                  } else if (
                    item.name.toLowerCase().includes(search.toLowerCase())
                  ) {
                    return item;
                  }
                })
                .slice(0, 5)
                .map((data) => {
                  return (
                    <>
                      <HStack spacing={6} mt="5" pl={10}>
                        <Avatar
                          name="Dan Abrahmov"
                          src={`${BASE_URL}/${data.image}`}
                        />
                        <Text fontSize={"sm"}>{data.name}</Text>
                        <Text></Text>
                      </HStack>
                    </>
                  );
                })}
          </Box>
        </GridItem>
        <GridItem pr={10}>
          <Flex justify="center" align="center">
            <Flex w="100%" flexDir="column">
              <Header />
              <Messages messages={messages} />
              <Footer
                inputMessage={inputMessage}
                setInputMessage={setInputMessage}
                handleSendMessage={handleSendMessage}
              />
            </Flex>
          </Flex>
        </GridItem>
      </Grid>
    </>
  );
};

export default Chat;
