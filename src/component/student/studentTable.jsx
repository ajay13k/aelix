import {
  Input,
  Select,
  GridItem,
  Grid,
  Text,
  HStack,
  Heading,
  Container,
} from "@chakra-ui/react";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaUserGraduate } from "react-icons/fa";
import Pagination from "./pagination";
import { Link } from "react-router-dom";
import { AiOutlineArrowLeft } from "react-icons/ai";

function StudentTable() {
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(2);
  const [student, setStudent] = useState([]);
  const [title, setTitle] = useState("");
  const [option, setOption] = useState();
  const api = "http://95.111.202.157:4001/api/student";
  const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MmMyZDdlMjU1Mjk0NzZjZmM1Yjk5NDciLCJpYXQiOjE2NTk0MjMxNjUsImV4cCI6MTY1OTUwOTU2NX0.H1is34i74zeXi3J6ZFR-3c2Hq-3-Rh7fcr5X2neaVw8";
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
  const currentPosts = student.slice(indexOfFirstPost, indexOfLastPost);

  // Change page
  const paginate = (pageNumber) => {
    window.scroll(0, 0);
    setCurrentPage(pageNumber);
  };
  const selectHandle = (e) => {
    const post = student.filter(
      function (result) {
        return result.assignClass.className === e;
      }

      // (item) => {
      //   item.assignClass.className === e.target.value
      // }
    );
    setOption(post);
  };

  return (
    <>
      <HStack p={5} fontWeight="bold">
        <AiOutlineArrowLeft />
        <Link style={{ textDecoration: "none" }} to="SidebarWithHeader">
          Go Back
        </Link>
      </HStack>
      <Container maxW={"1200"} mx="auto" mt={10}>
        <HStack m="5">
          <Text fontSize={30}>
            <FaUserGraduate />
          </Text>
          <Heading>Students</Heading>
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
                placeholder="Select option"
                onChange={(e) => selectHandle(e.target.value)}
              >
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
            {option&&option
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



            {/* {option&&option.map((studentData) => (
              <tr key={studentData._id}>
                <td>{studentData.name}</td>
                <td>{studentData.assignClass.className}</td>
              </tr>
            ))} */}
          </tbody>
        </table>
      </Container>
      <Pagination
        postsPerPage={postsPerPage}
        totalPosts={student.length}
        paginate={paginate}
        currentPage={currentPage}
      />
    </>
  );
}

export default StudentTable;
