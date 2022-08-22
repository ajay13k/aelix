import "./style.css";
import {
  IconButton,
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
} from "@chakra-ui/react";
import { NavLink } from "react-router-dom";
import { MdDashboard } from "react-icons/md";
const SidebarWithHeader = () => {
  return (
    <>
      <div class="topnav">
        <Box float="right" mr={5} mt={2}>
          <HStack spacing={{ base: "0", md: "6" }}>
            <IconButton size="lg" variant="ghost" aria-label="open menu" />
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
                    <button>logout</button>
                  </MenuItem>
                </MenuList>
              </Menu>
            </Flex>
          </HStack>
        </Box>
      </div>
      <div class="sidenav">
        <Box mt={20}>
          <HStack>
            <Text fontSize={30}>
              <MdDashboard />
            </Text>
            <NavLink style={{ textDecoration: "none" }} to="dashboard">
              DashBoard
            </NavLink>
          </HStack>
          <NavLink style={{ textDecoration: "none" }} to="myprofile">
            Profile
          </NavLink>
          <NavLink style={{ textDecoration: "none" }} to="students">
            Students
          </NavLink>
          <NavLink style={{ textDecoration: "none" }} to="changepassword">
            Change Password
          </NavLink>
        </Box>
      </div>
    </>
  );
};

export default SidebarWithHeader;
