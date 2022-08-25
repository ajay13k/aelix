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
} from "@chakra-ui/react";
import Pagination from "../student/pagination";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaUserGraduate } from "react-icons/fa";
import { Link, NavLink } from "react-router-dom";
import { AiFillEdit, AiFillDelete } from "react-icons/ai";
import SidebarWithHeader from "../sidebarwithheader/SidebarWithHeader";

function CounSellor() {
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(3);
  const [student, setStudent] = useState("");
  const [title, setTitle] = useState("");

  const handleGetUser = () => {
    const token = localStorage.getItem("token");
    fetch(API.getAllUser, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((response) => {
        if (response.status === 200) {
          return response.json();
        }
      })
      .then((data) => {
        setStudent(data);
      });
  };

  useEffect(() => {
    handleGetUser();
  }, []);

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = student.slice(indexOfFirstPost, indexOfLastPost);

  const paginate = (pageNumber) => {
    window.scroll(0, 0);
    setCurrentPage(pageNumber);
  };

  const token = localStorage.getItem("token");
  const handleDelete = (id) => {
    axios
      .delete(`${API.deleteUser}/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        console.log(response.data);
        handleGetUser();
      });
  };
  const handleEdit = (id) => {
    axios
      .put(`${API.deleteUser}/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        console.log(response.data);
        handleGetUser();
      });
  };

  return (
    <>
      <SidebarWithHeader />
      <Container maxW="1200" w="85%" ml="15%" pt="100px">
        <Container maxW={"1200"} mx="auto">
          <HStack m="5">
            <Text fontSize={30}>
              <FaUserGraduate />
            </Text>
            <Heading>Counsellor</Heading>
          </HStack>
          <Grid templateColumns="repeat(2, 1fr)" gap={80}>
            <GridItem w="100%" h="10" m={30}>
              <Input
                onChange={(e) => setTitle(e.target.value)}
                size="md"
                placeholder="Search Counsellor"
              />
            </GridItem>
            <GridItem w="50%" h="10" m={30}>
              <HStack>
                <Text color="#005580">
                  <NavLink
                    style={{ textDecoration: "none" }}
                    to="addcounsellor"
                  >
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
                <th>Assign Students</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {currentPosts &&
                currentPosts
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
                      <td>
                        {studentData &&
                          studentData.classId &&
                          studentData.classId.className}
                      </td>
                      <td>3</td>
                      <td>
                        <HStack>
                          <button
                            className="btn btn-danger"
                            // onClick={() => handleDelete(studentData._id)}
                          >
                            <AiFillDelete />
                          </button>
                          <Link to={`/editcounsellor${studentData._id}`}>
                            <button className="btn btn-primary">
                              <AiFillEdit />
                            </button>
                          </Link>
                        </HStack>
                      </td>
                    </tr>
                  ))}
            </tbody>
          </table>
        </Container>
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

export default CounSellor;
