import { Input, Stack, Box, Text, HStack, Center } from "@chakra-ui/react";
import React, { useState, useEffect } from "react";
import axios from "axios";
function StudentTable() {
  const [student, setStudent] = useState([]);
  const [title, setTitle] = useState("");
  const api = "http://95.111.202.157:4001/api/student";
  const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MmMyZDdlMjU1Mjk0NzZjZmM1Yjk5NDciLCJpYXQiOjE2NTk0MTkxNzAsImV4cCI6MTY1OTUwNTU3MH0.ipy-alwjelPQ8S_T67dWC3v3hInava8pT5Maiud65ow";
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
  return (
    <>
      <Center>
        <Stack mt="10" mb={10} w="300px">
          <Input
            onChange={(e) => setTitle(e.target.value)}
            size="md"
            placeholder="search students"
          />
        </Stack>
      </Center>

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
          {student
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
    </>
  );
}

export default StudentTable;
