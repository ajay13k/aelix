import { API } from "../../config/config";
import {
  Input,
  Select,
  GridItem,
  Grid,
  Text,
  HStack,
  Heading,
  Container,
  Spacer,
  Box,
} from "@chakra-ui/react";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaUserGraduate } from "react-icons/fa";
import Pagination from "./pagination";
import { Link, NavLink } from "react-router-dom";
import { AiOutlineArrowLeft, AiFillDelete, AiFillEdit } from "react-icons/ai";
import SidebarWithHeader from "../sidebarwithheader/SidebarWithHeader";

function StudentTable() {
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(3);
  const [student, setStudent] = useState([]);
  const [title, setTitle] = useState("");
  const [option, setOption] = useState([]);
  const token = localStorage.getItem("token");
  const loadPost = async () => {
    const response = await axios.get(`${API.getStudent}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    setStudent(response.data.data);
  };
  useEffect(() => {
    loadPost();
  }, []);
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
      <SidebarWithHeader />
      <Container maxW="1200" w="85%" ml="15%" pt="100px">

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
                  <NavLink style={{ textDecoration: "none" }} to="addstudent">
                    AddStudent
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
                      <HStack>
                        <button className="btn btn-danger">
                          <AiFillDelete />
                        </button>
                        <button className="btn btn-primary">
                          <AiFillEdit />
                        </button>
                      </HStack>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        <Pagination
          postsPerPage={postsPerPage}
          totalPosts={student.length}
          paginate={paginate}
          currentPage={currentPage}
        />
      </Container>
    </>
  );
}

export default StudentTable;
