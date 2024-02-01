import React, { useState } from 'react'
import axios from 'axios';
import "./Allemployee.css"

// function based component 
export default function Allemployee({ employee, setAllEmployee }) {
   // to hide or show form 
  const [showForm, setShowForm] = useState(false);
  const [updatedEmp, setUpdatedEmp] = useState(null);


  // read form data
  const formInput = (e) => {
    const { name, value } = e.target;
    setUpdatedEmp(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  // update employee and save in db 
  const updateEmployee = async (e) => {
    e.preventDefault();
    try {
      console.log(employee.id);
      const { data } = await axios.post(`/updateEmployee`, { id: employee.id, updatedEmp });
      console.log('Updated details:', data);
      if (data.error !== undefined) {
        alert(data.error);
        return;
      }
      setShowForm(false);
      setAllEmployee(data);
    }
    catch (error) {
      console.log(error);
    }
  };

  // show or hide 
  const showHide = () => {
    setShowForm(true);
  }

  // delete the employee 
  const deleteEmployee = async () => {
    try {
      const { data } = await axios.delete(`/delete/${employee.id}`);
      setAllEmployee(data);
    }
    catch (error) {
      console.log(error);
    }
  }

  
  return (
    <div>
      <div className="employees-detail" key={employee.id}>
        <h2>{employee.fullName}</h2>
        <p>age: {employee.age}</p>
        <p>salary : {employee.salary}</p>
        <p>Department: {employee.department}</p>
        {showForm ? (
          <form onSubmit={updateEmployee}>
            <div className='form-div'>
              <label htmlFor="fullName">Full Name:</label>
              <input type="text" id="fullName" name="fullName" value={updatedEmp?.fullName} onChange={formInput} />
            </div>
            <div className='form-div'>
              <label htmlFor="age">Age:</label>
              <input type="number" id="age" name="age" value={updatedEmp?.age} onChange={formInput} />
            </div>
            <div className='form-div'>
              <label htmlFor="salary">Salary:</label>
              <input type="number" id="salary" name="salary" value={updatedEmp?.salary} onChange={formInput} />
            </div>
            <div className='form-div'>
              <label htmlFor="department">Department:</label>
              <input type="text" id="department" name="department" value={updatedEmp?.department} onChange={formInput} />
            </div>
            <button type="submit">Update Employee</button>
          </form>
        ) : (
          <button onClick={showHide}>Update</button>
        )}
        <button onClick={deleteEmployee}>Delete</button>
      </div>
    </div>
  )
}
