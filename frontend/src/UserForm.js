import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UserForm = () => {
  const [firstName, setFirstName] = useState('');
  const [middleName, setMiddleName] = useState('');
  const [lastName, setLastName] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('');
  const [course, setCourse] = useState('');
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      try {
        const response = await axios.get('http://localhost:5000/users');
        setUsers(response.data);
      } catch (error) {
        setError('Error fetching users');
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const user = { firstName, middleName, lastName, age, gender, course };
    setLoading(true);
    try {
      const response = await axios.post('http://localhost:5000/users', user);
      setUsers([...users, response.data]);
      resetForm();
    } catch (error) {
      setError('Error creating user');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (user) => {
    setSelectedUser(user);
    setFirstName(user.firstName);
    setMiddleName(user.middleName);
    setLastName(user.lastName);
    setAge(user.age);
    setGender(user.gender);
    setCourse(user.course);
  };
  
  const handleUpdate = async (event) => {
    event.preventDefault();
  
    const updatedUser = { firstName, middleName, lastName, age, gender, course };
  
    setLoading(true);
    try {
      const response = await axios.put(
        `http://localhost:5000/users/${selectedUser._id}`,
        updatedUser
      );
  
      const updatedUsersList = users.map((user) =>
        user._id === selectedUser._id ? response.data : user
      );
  
      setUsers(updatedUsersList);
      resetForm();
    } catch (error) {
      setError('Error updating user');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };
  

  const handleDelete = async (id) => {
    setLoading(true);
    try {
      await axios.delete(`http://localhost:5000/users/${id}`); // Corrected URL
      setUsers(users.filter((user) => user._id !== id));
    } catch (error) {
      setError('Error deleting user');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setSelectedUser(null);
    setFirstName('');
    setMiddleName('');
    setLastName('');
    setAge('');
    setGender('');
    setCourse('');
  };

  return (
    <div >
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={selectedUser ? handleUpdate : handleSubmit}>
        <div class="container-fluid">

          <div class="row">
            <div class="col-4">
              <input type="text"
                placeholder="First Name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                required class="form-control" aria-label="Text input with segmented dropdown button" />
            </div>
            <div class="col-4">
              <input
                type="text"
                class="form-control"
                placeholder="Middle Name"
                value={middleName}
                onChange={(e) => setMiddleName(e.target.value)}
              />


            </div>

            <div class="col-4">
              <input
                type="text"
                class="form-control"
                placeholder="Last Name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                required
              />
            </div>

          </div>
          <div class="row">
            <div class="col-4">
              <input
                type="text"
                placeholder="Age"
                class="form-control"
                value={age}
                onChange={(e) => setAge(e.target.value)}
                required
              />
            </div>

            <div class="col-4 gen">
              <span>Gender:</span>
              <div class="gender">
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="radioDefault"
                    id="radioDefault1"
                    value="Male"
                    checked={gender === 'Male'}
                    onChange={(e) => setGender(e.target.value)}
                  />
                  <label className="form-check-label label1" htmlFor="radioDefault1">
                    Male
                  </label>
                </div>
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="radioDefault"
                    id="radioDefault2"
                    value="Female"
                    checked={gender === 'Female'}
                    onChange={(e) => setGender(e.target.value)}
                  />
                  <label className="form-check-label" htmlFor="radioDefault2">
                    Female
                  </label>
                </div>

              </div>

            </div>
            <div class="col">
              <select
                className="form-select"
                aria-label="Default select example"
                value={course}
                onChange={(e) => setCourse(e.target.value)}
              >
                <option value="">--Please Select Course--</option>
                <option value="BSIT">BSIT</option>
                <option value="BSCS">BSCS</option>
                <option value="BSIS">BSIS</option>
                <option value="BLIS">BLIS</option>
                <option value="DIT">DIT</option>
              </select>

            </div>
          </div>
          <button class="btn btn-success" type="submit" disabled={loading}>
            <i class="bi bi-plus"></i> {loading ? 'Processing...' : (selectedUser ? 'Update User' : 'Add User')}
          </button>
        </div>

      </form>
      <hr></hr>
      {loading ? <p>Loading users...</p> : (
        <table class="table table-striped">
          <thead>
            <tr>
              <th scope="col">First Name</th>
              <th scope="col">Middle Name</th>
              <th scope="col">Last Name</th>
              <th scope="col">Age</th>
              <th scope="col">Gender</th>
              <th scope="col">Course</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>


            {users.map((user) => (
              <tr key={user._id}>
                <td>{user.firstName}</td>
                <td>{user.middleName}</td>
                <td>{user.lastName}</td>
                <td>{user.age}</td>
                <td>{user.gender}</td>
                <td>{user.course}</td>
                <td>
                  <button class="actionBtn editBtn btn btn-warning" onClick={() => handleEdit(user)}><i class="bi bi-pencil-square"></i>Edit</button>
                  <button class="actionBtn deleteBtn btn btn-danger" onClick={() => handleDelete(user._id)}><i class="bi bi-trash"></i>Delete</button>
                </td>
              </tr>
            ))}



          </tbody>
        </table>

      )}
    </div>
  );
};

export default UserForm;