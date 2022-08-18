import { Button, Box, HStack ,Text} from "@chakra-ui/react";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { Link } from "react-router-dom";
import PinInput from "react-pin-input";
const Pin = () => {
  return (
    <>
      <HStack fontWeight="bold" m={10}>
        <AiOutlineArrowLeft />
        <Link style={{ textDecoration: "none" }} to="SidebarWithHeader">
          Go Back
        </Link>
      </HStack>
      <Box border="1px solid black" bg="#e6f7ff" w="30%">
        <PinInput
          length={6}
          initialValue=""
          secret
          onChange={(value, index) => {}}
          type="numeric"
          inputMode="number"
          style={{ padding: "10px" }}
          inputStyle={{ borderColor: "red" }}
          inputFocusStyle={{ borderColor: "blue" }}
          onComplete={(value, index) => {}}
          autoSelect={true}
          regexCriteria={/^[ A-Za-z0-9_@./#&+-]*$/}
        />
        <PinInput
          length={6}
          initialValue=""
          secret
          onChange={(value, index) => {}}
          type="numeric"
          inputMode="number"
          style={{ padding: "10px" }}
          inputStyle={{ borderColor: "red" }}
          inputFocusStyle={{ borderColor: "blue" }}
          onComplete={(value, index) => {}}
          autoSelect={true}
          regexCriteria={/^[ A-Za-z0-9_@./#&+-]*$/}
        />
        <Text pl={250} mb="15px">
          <Button bg="#b3f0ff" color="black">
            Save
          </Button>
        </Text>
      </Box>
    </>
  );
};

export default Pin;

