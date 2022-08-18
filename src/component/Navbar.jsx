import React, { ReactNode } from "react";
import { NavLink } from "react-router-dom";
import Dashboard from "./dashboard/dashboard";
import {
  IconButton,
  Avatar,
  Box,
  CloseButton,
  Flex,
  HStack,
  VStack,
  Icon,
  useColorModeValue,
  Drawer,
  DrawerContent,
  Text,
  useDisclosure,
  BoxProps,
  FlexProps,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  Link,
  Button,
} from "@chakra-ui/react";
import {
  FiMenu,
  FiBell,
  FiChevronDown,
  FiUnlock,
  FiMoreHorizontal,
} from "react-icons/fi";
import { IconType } from "react-icons";
import { BsChatLeftDotsFill } from "react-icons/bs";
import { FaUserGraduate } from "react-icons/fa";
import { MdDashboard } from "react-icons/md";
import { AiOutlineUserAdd } from "react-icons/ai";
import { BiUserCircle } from "react-icons/bi";
import { ReactText } from "react";

interface LinkItemProps {
  name: string;
  icon: IconType;
}
const LinkItems: Array<LinkItemProps> = [
  {
    name: (
      <NavLink style={{ textDecoration: "none" }} to="dashboard">
        DashBoard
      </NavLink>
    ),
    icon: MdDashboard,
  },
  {
    name: (
      <NavLink style={{ textDecoration: "none" }} to="myprofile">
        Profile
      </NavLink>
    ),
    icon: AiOutlineUserAdd,
  },
  {
    name: (
      <NavLink style={{ textDecoration: "none" }} to="students">
        Students
      </NavLink>
    ),
    icon: FaUserGraduate,
  },
  {
    name: (
      <NavLink style={{ textDecoration: "none" }} to="counsellor">
        Counsellor
      </NavLink>
    ),
    icon: BiUserCircle,
  },
  {
    name: (
      <NavLink style={{ textDecoration: "none" }} to="pin">
        Pin
      </NavLink>
    ),
    icon: FiMoreHorizontal,
  },
  {
    name: (
      <NavLink style={{ textDecoration: "none" }} to="changepassword">
        Change Password
      </NavLink>
    ),
    icon: FiUnlock,
  },
  {
    name: (
      <NavLink style={{ textDecoration: "none" }} to="chat">
        Chat
      </NavLink>
    ),
    icon: BsChatLeftDotsFill,
  },
];

export default function SidebarWithHeader({
  children,
}: {
  children: ReactNode,
}) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <Box minH="100vh" bg={useColorModeValue("gray.100", "gray.900")}>
      <SidebarContent
        onClose={() => onClose}
        display={{ base: "none", md: "block" }}
      />
      <Drawer
        autoFocus={false}
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        returnFocusOnClose={false}
        onOverlayClick={onClose}
        size="full"
      >
        <DrawerContent>
          <SidebarContent onClose={onClose} />
        </DrawerContent>
      </Drawer>
      {/* mobilenav */}
      <MobileNav onOpen={onOpen} />
      <Box ml={{ base: 0, md: 60 }} p="4">
        {children}
      </Box>
    </Box>
  );
}

interface SidebarProps extends BoxProps {
  onClose: () => void;
}

const SidebarContent = ({ onClose, ...rest }: SidebarProps) => {
  return (
    <Box
      transition="3s ease"
      bg={useColorModeValue("white", "gray.900")}
      borderRight="1px"
      borderRightColor={useColorModeValue("gray.200", "gray.700")}
      w={{ base: "full", md: 60 }}
      pos="fixed"
      h="full"
      {...rest}
    >
      <Flex h="20" alignItems="center" mx="8" justifyContent="space-between">
        <Text
          fontSize="2xl"
          fontFamily="monospace"
          fontWeight="bold"
          color="#1ac6ff"
        >
          AELIX 1
        </Text>
        <CloseButton display={{ base: "flex", md: "none" }} onClick={onClose} />
      </Flex>
      {LinkItems.map((link) => (
        <NavItem key={link.name} icon={link.icon}>
          {link.name}
        </NavItem>
      ))}
    </Box>
  );
};
const handleAlert = () => {
  alert("Alert");
};

interface NavItemProps extends FlexProps {
  icon: IconType;
  children: ReactText;
}
const NavItem = ({ icon, children, ...rest }: NavItemProps) => {
  return (
    <Link
      href="#"
      style={{ textDecoration: "none" }}
      _focus={{ boxShadow: "none" }}
    >
      <Flex
        align="center"
        p="4"
        mx="4"
        borderRadius="lg"
        role="group"
        cursor="pointer"
        _hover={{
          bg: "cyan.400",
          color: "white",
        }}
        {...rest}
      >
        {icon && (
          <Icon
            mr="4"
            fontSize="16"
            _groupHover={{
              color: "white",
            }}
            as={icon}
          />
        )}
        {children}
      </Flex>
    </Link>
  );
};

interface MobileProps extends FlexProps {
  onOpen: () => void;
}
const MobileNav = ({ onOpen, ...rest }: MobileProps) => {
  const handleLogout = () => {
    const tokeDelete = localStorage.removeItem("token");
    if (!tokeDelete) {
      window.location = "/";
    }
  };
  return (
    <Flex
      ml={{ base: 0, md: 60 }}
      px={{ base: 4, md: 4 }}
      height="20"
      alignItems="center"
      bg={useColorModeValue("white", "gray.900")}
      borderBottomWidth="1px"
      borderBottomColor={useColorModeValue("gray.200", "gray.700")}
      justifyContent={{ base: "space-between", md: "flex-end" }}
      {...rest}
    >
      <IconButton
        display={{ base: "flex", md: "none" }}
        onClick={onOpen}
        variant="outline"
        aria-label="open menu"
        icon={<FiMenu />}
      />

      <Text
        display={{ base: "flex", md: "none" }}
        fontSize="2xl"
        fontFamily="monospace"
        fontWeight="bold"
      >
        Logo
      </Text>

      <HStack spacing={{ base: "0", md: "6" }}>
        <IconButton
          size="lg"
          variant="ghost"
          aria-label="open menu"
          icon={<FiBell />}
          onClick={handleAlert}
        />
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
                <Box display={{ base: "none", md: "flex" }}>
                  <FiChevronDown />
                </Box>
              </HStack>
            </MenuButton>
            <MenuList
              bg={useColorModeValue("white", "gray.900")}
              borderColor={useColorModeValue("gray.200", "gray.700")}
            >
              <NavLink to="myprofile" style={{ textDecoration: "none" }}>
                <MenuItem>Profile</MenuItem>
              </NavLink>
              <MenuDivider />
              <MenuItem>
                <button onClick={handleLogout}>logout</button>
              </MenuItem>
            </MenuList>
          </Menu>
        </Flex>
      </HStack>
    </Flex>
  );
};
