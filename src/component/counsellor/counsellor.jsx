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
import { AiOutlineArrowLeft, AiFillEdit, AiFillDelete } from "react-icons/ai";

function CounSellor() {
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(3);
  const [student, setStudent] = useState([]);
  const [title, setTitle] = useState("");
  // const [counsellor,setCounsellor]= useState("")
  const token = localStorage.getItem("token");
  const loadPost = async () => {
    const response = await axios.get(`${API.getStudent}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    setStudent(response.data.data);
  };
  // const counsellorSeach = async () => {
  //   const response = await axios.get(`${API.counsellorSearch}`, {
  //     headers: { Authorization: `Bearer ${token}` },
  //   });
  //   setCounsellor(response.data.data);

  // };

  useEffect(() => {
    loadPost();
  }, []);

  // useEffect(() => {
  //   counsellorSeach();
  // }, []);
  // Get current posts
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = student.slice(indexOfFirstPost, indexOfLastPost);
  // Change page
  const paginate = (pageNumber) => {
    window.scroll(0, 0);
    setCurrentPage(pageNumber);
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
              placeholder="search counsellor"
            />
          </GridItem>
          <GridItem w="50%" h="10" m={30}>
            <HStack>
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
              <th>Assign Students</th>
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
                  <td>3</td>
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

export default CounSellor;
