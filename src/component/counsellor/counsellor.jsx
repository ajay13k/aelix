import {
  Input,
  Select,
  GridItem,
  Grid,
  Text,
  HStack,
  Heading,
  Container,
  Spacer
} from "@chakra-ui/react";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaUserGraduate } from "react-icons/fa";
import { Link,NavLink} from "react-router-dom";
import { AiOutlineArrowLeft } from "react-icons/ai";

function CounSellor() {
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(3);
  const [student, setStudent] = useState([]);
  const [title, setTitle] = useState("");
  const [option, setOption] = useState([]);

  const api = "http://95.111.202.157:4001/api/student";
  const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MmMyZDdlMjU1Mjk0NzZjZmM1Yjk5NDciLCJpYXQiOjE2NTk2ODg2MzUsImV4cCI6MTY1OTc3NTAzNX0.cJsNNJImVLQmx1uSZ5dwzFz93ksyc9lWt4HiqmfCoYY";
  const loadPost = async () => {
    const response = await axios.get(api, {
      headers: { Authorization: `Bearer ${token}` },
    });
    setStudent(response.data.data);
  };
  useEffect(() => {
    loadPost();
  }, []);
  const onDelete = async (studentData) => {
    const api = "http://95.111.202.157:4001/api/deleteStudent";
    await axios.delete(api + "/" + studentData._id);
    const student_data = student.filter((e) => e._id !== studentData._id);
    setStudent({ student_data });
  };
  // Get current posts
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = option.slice(indexOfFirstPost, indexOfLastPost);
  // Change page
  const paginate = (pageNumber) => {
    window.scroll(0, 0);
    setCurrentPage(pageNumber);
  };
  const selectHandle = (e) => {
    if (e === "all") {
      setOption(student);
    } else {
      const post = student.filter(function (result) {
        return result.assignClass.className === e;
      });
      setOption(post);
    }
  };

  return (
    <>
      <HStack p={5} fontWeight="bold">
        <AiOutlineArrowLeft />
        <Link style={{ textDecoration: "none" }} to="SidebarWithHeader">
          Go Back
        </Link>
      </HStack>
      <Container maxW={"1200"} mx="auto">
        <HStack m="5">
          <Text fontSize={30}>
            <FaUserGraduate />
          </Text>
          <Heading>Counsellor</Heading>
        </HStack>
        <Grid templateColumns="repeat(2, 1fr)" gap={80}>
          <GridItem w="50%" h="10" m={30}>
            <Input
              onChange={(e) => setTitle(e.target.value)}
              size="md"
              placeholder="search students"
            />
          </GridItem>
          <GridItem w="50%" h="10" m={30}>
            <HStack>
              <Text>Filter </Text>
              <Select
                defaultValue={"all"}
                onChange={(e) => selectHandle(e.target.value)}
              >
                <option value="all">all</option>
                {student &&
                  student.map((item) => {
                    return (
                      <>
                        <option
                          key={item._id}
                          value={item.assignClass.className}
                        >
                          {item.assignClass.className}
                        </option>
                      </>
                    );
                  })}
              </Select>
              <Spacer />
              <Text color="#005580">
                <NavLink style={{ textDecoration: "none" }} to="addcounsellor">
                  AddCounsellor
                </NavLink>
              </Text>
            </HStack>
          </GridItem>
        </Grid>

        <table className="table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Class</th>
              <th>Medical</th>
              <th>Emergency</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {currentPosts
              .filter((item) => {
                if (title === "") {
                  return item;
                } else if (
                  item.name.toLowerCase().includes(title.toLowerCase())
                ) {
                  return item;
                }
              })

              .map((studentData) => (
                <tr key={studentData._id}>
                  <td>{studentData.name}</td>
                  <td>{studentData.assignClass.className}</td>
                  <td></td>
                  <td></td>
                  <td>
                    <button
                      onClick={() => onDelete(studentData)}
                      className="btn btn-danger"
                    >
                      Delete
                    </button>
                    <button className="btn btn-primary">edit</button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </Container>
    </>
  );
}

export default CounSellor;
