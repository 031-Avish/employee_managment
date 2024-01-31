import React,{useState} from 'react'

export default function UpdateDetails({ setModalOpen, employee }) {
    const [formData, setFormData] = useState({
        fullName: employee.fullName,
        age: employee.age,
        dateOfBirth: employee.dateOfBirth,
        salary: employee.salary,
        department: employee.department
      });
      const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
          ...prevState,
          [name]: value
        }));
      };
    
      
      const handleSubmit = (e) => {
        e.preventDefault();
        
      };
  return (
    <div>
        <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="fullName">Full Name:</label>
        <input type="text" id="fullName" name="fullName" value={formData.fullName} onChange={handleChange} />
      </div>
      <div>
        <label htmlFor="age">Age:</label>
        <input type="number" id="age" name="age" value={formData.age} onChange={handleChange} />
      </div>
      <div>
        <label htmlFor="dateOfBirth">Date of Birth:</label>
        <input type="date" id="dateOfBirth" name="dateOfBirth" value={formData.dateOfBirth} onChange={handleChange} />
      </div>
      <div>
        <label htmlFor="salary">Salary:</label>
        <input type="number" id="salary" name="salary" value={formData.salary} onChange={handleChange} />
      </div>
      <div>
        <label htmlFor="department">Department:</label>
        <input type="text" id="department" name="department" value={formData.department} onChange={handleChange} />
      </div>
      <button type="submit">Update Employee</button>
    </form>
  
      
    </div>
  )
}
