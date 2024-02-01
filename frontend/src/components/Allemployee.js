import React ,{useState} from 'react'
import axios from 'axios';
import "./Allemployee.css"
import UpdateDetails from './UpdateDetails';
import { useNavigate } from 'react-router-dom';
export default function Allemployee({ employee ,setAllEmployee }) {
    const [showUpdateForm, setShowUpdateForm] = useState(false);
    const [formData, setFormData] = useState(null);
      const navigate = useNavigate();

      const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
          ...prevState,
          [name]: value
        }));
      };
      const handleSubmit = async(e) => {
        e.preventDefault();
        try{
        console.log(employee.id);
        const {data} = await axios.post(`http://localhost:5000/updateEmployee`, { id: employee.id, formData });
        console.log('Updated details:', data);
        setShowUpdateForm(false);
        setAllEmployee(data);
        
        }
        catch(error)
        {
            console.log(error);
        }

        
      };
      const handleUpdate=()=>{
        setShowUpdateForm(true);
      }
      const deleteEmployee=async()=>{
        try{
        const {data}=await axios.delete(`http://localhost:5000/delete/${employee.id}`);
            setAllEmployee(data);
        }
        catch(error)
        {
            console.log(error);
        }
      }

    return (
        <div>
            <div className="employees-detail" key={employee.id}>
                <h2>{employee.fullName}</h2>
                <p>age: {employee.age}</p>
                <p>data of Birth : {employee.dateOfBirth}</p>
                <p>salary : {employee.salary}</p>
                <p>Department: {employee.department}</p>
                {showUpdateForm ? (
        <form onSubmit={handleSubmit}>
        <div className='form-div'>
          <label htmlFor="fullName">Full Name:</label>
          <input type="text" id="fullName" name="fullName" value={formData?.fullName} onChange={handleChange} />
        </div>
        <div className='form-div'>
          <label htmlFor="age">Age:</label>
          <input type="number" id="age" name="age" value={formData?.age} onChange={handleChange} />
        </div>
        <div className='form-div'>
          <label htmlFor="dateOfBirth">Date of Birth:</label>
          <input type="date" id="dateOfBirth" name="dateOfBirth" value={formData?.dateOfBirth} onChange={handleChange} />
        </div>
        <div className='form-div'>
          <label htmlFor="salary">Salary:</label>
          <input type="number" id="salary" name="salary" value={formData?.salary} onChange={handleChange} />
        </div>
        <div className='form-div'>
          <label htmlFor="department">Department:</label>
          <input type="text" id="department" name="department" value={formData?.department} onChange={handleChange} />
        </div>
        <button type="submit">Update Employee</button>
      </form>
      ) : (
        <button onClick={handleUpdate}>Update</button>
      )}
      <button onClick={deleteEmployee}>Delete</button>
            </div>
        </div>
    )
}
