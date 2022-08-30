import PinInput from "react-pin-input";
import { Container, Box } from "@chakra-ui/react";
import SidebarWithHeader from "./sidebarwithheader/SidebarWithHeader";
import axios from "axios";
import { API } from "../config/config";
import { useEffect } from "react";
const Pin = () => {
  // const createPin = async () => {
  //   await axios.post(`${API.createPin}`).then((res) => {
  //     console.log("pin", res);
  //   });
  // };
  // useEffect(()=>{
  //   createPin()
  // })

  return (
    <>
      <SidebarWithHeader />
      <Container
        maxWidth="100%"
        style={{ padding: "0", display: "inline-block" }}
        ml="30%"
      >
        <form id="myform">
          <div className="pinbox mt-4">
            <div className="form-outline mb-4" name="rrr">
              <label for="createPin">Create a pin</label>
              <div className="createPin">
                <div>
                  <PinInput
                    length={4}
                    initialValue="0000"
                    type="numeric"
                    inputMode="number"
                    style={{ padding: "10px" }}
                    onComplete={(value, index) => {
                      this.setState({ pintt: value });
                    }}
                    autoSelect={true}
                    regexCriteria={/^[ A-Za-z0-9_@./#&+-]*$/}
                  />
                </div>
              </div>
            </div>
            <div className="form-outline mb-4">
              <label for="confirmPin">Confirm Pin</label>
              <div className="confirmPin">
                <div>
                  <PinInput
                    length={4}
                    initialValue="0000"
                    type="numeric"
                    inputMode="number"
                    style={{ padding: "10px" }}
                    onComplete={(value, index) => {
                      this.setState({ pint: value });
                    }}
                    autoSelect={true}
                    regexCriteria={/^[ A-Za-z0-9_@./#&+-]*$/}
                  />
                </div>
              </div>
            </div>

            <Box w={40} ml="20px">
              <input
                type="submit"
                className="btn btn-primary btn-block mb-4 mr-0"
                value="SAVE"
              />
            </Box>
          </div>
        </form>
      </Container>
    </>
  );
};

export default Pin;
