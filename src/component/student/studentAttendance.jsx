import React, { useEffect, useState } from "react";
const UsingFetch = () => {
  const [users, setUsers] = useState([]);

  const fetchData = () => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setUsers(data);
      });
  };

  useEffect(() => {
    fetchData();
  }, []);
  const handleChange = (e) => {
    const { name, checked } = e.target;
    if (name === "allSelect") {
      const tempUser = users.map((user) => {
        return { ...user, isChecked: checked };
      });
      setUsers(tempUser);
    } else {
      const tempuser = users
        // .filter((item) => {
        //   console.log("anay", item);
        //   checked.toString().includes(item.id);
        // })
        .map((user) =>
          user.name === name ? { ...user, isChecked: checked } : user
        );
      setUsers(tempuser);
    }
  };

  return (
    <div>
      {console.log(users)}
      <table className="table">
        <thead>
          <tr>
            <th>Id</th>
            <th> Student Name</th>
            <th>
              <input
                onChange={handleChange}
                type="checkbox"
                id="checkbox"
                name="allSelect"
              />
              All Present/Absent
            </th>
          </tr>
        </thead>
        <tbody>
          {users.map((studentData) => (
            <tr key={studentData.id}>
              <td>{studentData.id}</td>
              <td>{studentData.name}</td>
              <td>
                <input
                  checked={studentData?.isChecked || false}
                  onChange={handleChange}
                  type="checkbox"
                  id="checkbox"
                  name={studentData.name}
                  value={studentData.name}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UsingFetch;
