import "./style.css";
import {
  Avatar,
  Box,
  Flex,
  HStack,
  VStack,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  Text,
  Container,
  Center,
  Button,
} from "@chakra-ui/react";
import { NavLink } from "react-router-dom";
import { MdDashboard } from "react-icons/md";
import { AiOutlineUserAdd } from "react-icons/ai";
import { FaUserGraduate } from "react-icons/fa";
import { BiUserCircle } from "react-icons/bi";
import { BsChatLeftDotsFill, BsAlarm } from "react-icons/bs";
import { FiUnlock, FiMoreHorizontal, FiAlertTriangle } from "react-icons/fi";
const SidebarWithHeader = () => {
  const handleLogout = () => {
    const tokeDelete = localStorage.removeItem("token");
    if (!tokeDelete) {
      window.location = "/";
      alert("Logout Successfully");
    }
  };
  const colorRed = () => {
    window.confirm(
      "loremLorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit"
    );
  };
  const colorYellow = () => {
    window.confirm(
      "loremLorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit"
    );
  };
  const colorBlack = () => {
    window.confirm(
      "loremLorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit"
    );
  };
  return (
    <>
      <div class="topnav">
        <Box float="right" mr={5} mt="6px">
          <HStack spacing={{ base: "0", md: "6" }}>
            <Text fontSize={30}>
              <FiAlertTriangle />
            </Text>

            <Text color="black">Security Alert</Text>
            <Button
              display="block"
              height="50px"
              width="50px"
              borderRadius="50%"
              bg="red"
              border="1px solid red"
              onClick={colorRed}
            >
              <BsAlarm />
            </Button>

            <Button
              display="block"
              height="50px"
              width="50px"
              borderRadius="50%"
              bg="Orange"
              border="1px solid Orange"
              onClick={colorYellow}
            >
              <BsAlarm />
            </Button>
            <Button
              display="block"
              height="50px"
              width="50px"
              borderRadius="50%"
              bg="Black"
              color="white"
              border="1px solid black"
              onClick={colorBlack}
            >
              <BsAlarm />
            </Button>

            <Flex alignItems={"center"}>
              <Menu>
                <MenuButton
                  py={2}
                  transition="all 0.3s"
                  _focus={{ boxShadow: "none" }}
                >
                  <HStack>
                    <Avatar size={"sm"} src={"https://bit.ly/sage-adebayo"} />
                    <VStack
                      display={{ base: "none", md: "flex" }}
                      alignItems="flex-start"
                      spacing="1px"
                      ml="2"
                    >
                      <Text fontSize="sm">Jhany Bravo</Text>
                      <Text fontSize="xs" color="gray.600">
                        Manager
                      </Text>
                    </VStack>
                    <Box display={{ base: "none", md: "flex" }}></Box>
                  </HStack>
                </MenuButton>
                <MenuList>
                  <MenuItem>Profile</MenuItem>
                  <MenuDivider />
                  <MenuItem>
                    <button onClick={handleLogout}>Logout</button>
                  </MenuItem>
                </MenuList>
              </Menu>
            </Flex>
          </HStack>
        </Box>
      </div>
      <div class="sidenav">
        <Center>
          <Text fontSize={40} color="#0066ff">
            AELIX
          </Text>
        </Center>
        <Box mt={5} p="8px">
          <NavLink style={{ textDecoration: "none" }} to="dashboard">
            <HStack mb={2}>
              <Text color="#1a1aff">
                <MdDashboard />
              </Text>
              <Text fontSize={16}>DashBoard</Text>
            </HStack>
          </NavLink>
          <NavLink style={{ textDecoration: "none" }} to="myprofile">
            <HStack mb={3}>
              <Text color="	#1a1aff">
                <AiOutlineUserAdd />
              </Text>

              <Text fontSize={16}>My Profile</Text>
            </HStack>
          </NavLink>
          <NavLink style={{ textDecoration: "none" }} to="students">
            <HStack mb={3}>
              <Text color="#1a1aff">
                <FaUserGraduate />
              </Text>

              <Text fontSize={16}>Student</Text>
            </HStack>
          </NavLink>
          <NavLink style={{ textDecoration: "none" }} to="counsellor">
            <HStack mb={3}>
              <Text color="#1a1aff">
                <BiUserCircle />
              </Text>

              <Text fontSize={16}>Counsellor</Text>
            </HStack>
          </NavLink>
          <NavLink style={{ textDecoration: "none" }} to="pin">
            <HStack mb={3}>
              <Text color="#1a1aff">
                <FiMoreHorizontal />
              </Text>
              <Text fontSize={16}>Pin</Text>
            </HStack>
          </NavLink>
          <NavLink style={{ textDecoration: "none" }} to="changepassword">
            <HStack mb={3}>
              <Text color="	 #1a1aff">
                <FiUnlock />
              </Text>
              <Text fontSize={16}>Change Password</Text>
            </HStack>
          </NavLink>
          <NavLink style={{ textDecoration: "none" }} to="chat">
            <HStack mb={3}>
              <Text color="	 #1a1aff">
                <BsChatLeftDotsFill />
              </Text>
              <Text fontSize={16}>Chat</Text>
            </HStack>
          </NavLink>
        </Box>
      </div>
    </>
  );
};

export default SidebarWithHeader;
