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
  Flex,
} from "@chakra-ui/react";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaUserGraduate } from "react-icons/fa";
import Pagination from "./pagination";
import { Link, NavLink } from "react-router-dom";
import { AiFillDelete, AiFillEdit } from "react-icons/ai";
import SidebarWithHeader from "../sidebarwithheader/SidebarWithHeader";

function StudentTable() {
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(5);
  const [student, setStudent] = useState([]);
  const [title, setTitle] = useState("");
  const [option, setOption] = useState([]);
  const [getclass, setGetclass] = useState([]);
  const [handelDelete,setDelete]=useState("")
  const token = localStorage.getItem("token");
  const studentData = async () => {
    const response = await axios.get(`${API.getStudent}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    setStudent(response.data.data);
  };
  useEffect(() => {
    studentData();

  }, []);
  const handleDelete = async (item) => {
    await axios
      .delete(`${API.studentDelete}`, {
        data: {
          id: [item],
        },
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        setDelete(res.data)
        alert("delete record succsessfully")
        studentData();
        
      })

  };


  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = option.slice(indexOfFirstPost, indexOfLastPost);

  const paginate = (pageNumber) => {
    window.scroll(0, 0);
    setCurrentPage(pageNumber);
  };
  const selectHandle = (e) => {
    if (e === "all") {
      setOption(student);
    } else {
      const post = student.filter(function (result) {
        return result.assignClass._id === e;
      });
      setOption(post);
    }
  };

  const classdata = async () => {
    const response = await axios.get(`${API.getClass}`);
    setGetclass(response.data.data);
  };
  useEffect(() => {
    classdata();
  }, []);

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
              w="300px"
              onChange={(e) => setTitle(e.target.value)}
              size="md"
              placeholder="search students"
            />
          </GridItem>
          <GridItem w="50%" h="10" m={30}>
            <HStack>
              <Text>Filter </Text>
              <Select
                w="400px"
                defaultValue="all"
                onChange={(e) => selectHandle(e.target.value)}
              >
                <option value="all">all</option>
                {getclass.map((item) => {
                  return (
                    <option key={item._id} value={item._id}>
                      {item.className}
                    </option>
                  );
                })}
                
              </Select>
              <Spacer />
              <Text color="#005580">
                <NavLink style={{ textDecoration: "none" }} to="/addstudent">
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
                  <td>
                    <Flex>
                      {studentData.name}
                      <Text pl="10px" pr="10px">
                        S/O
                      </Text>
                      {studentData.fatherName}
                    </Flex>
                  </td>
                  <td>{studentData.assignClass.className}</td>
                  <td></td>
                  <td></td>
                  <td>
                    <HStack>
                      <button
                        onClick={() => handleDelete(studentData._id)}
                        className="btn btn-danger"
                      >
                        <AiFillDelete />
                      </button>

                      <Link to={`/editstudent${studentData._id}`}>
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


