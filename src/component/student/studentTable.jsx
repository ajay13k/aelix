import React, { useState, useEffect } from "react";
import axios from "axios";
function StudentTable() {
  const [student, setStudent] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const api = "http://95.111.202.157:4001/api/student";
  const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MmMyZDdlMjU1Mjk0NzZjZmM1Yjk5NDciLCJpYXQiOjE2NTg5MDI2NzksImV4cCI6MTY1ODk4OTA3OX0.npvYj9Ghmd8OJ6mGVym4cBxNCIDbU74hFSC8AgAN21g";
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
  const searchItems = (searchValue) => {
    console.log(searchValue);
    api.filter((value) => {
      if (searchInput === "") {
        return value;
      } else if (value.name.toLowerCase().includes(searchInput.toLowerCase())) {
        return value;
      }
    });
    setSearchInput(searchValue);
  };
  return (
    <>
      <input
        type="text"
        name="searchBox"
        className="form-control my-3"
        placeholder="Search..."
        onChange={(e) => searchItems(e.target.value)}
      />
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
          {student &&
            student.map((studentData) => (
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
