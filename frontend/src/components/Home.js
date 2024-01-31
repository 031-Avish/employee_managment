import React, { useEffect, useState } from 'react'
import axios from "axios";
import toast from "react-hot-toast";
import "./Home.css"
import UpdateDetails from './UpdateDetails';
import Allemployee from './Allemployee';
import Filter from './Filter';
export default function Home() {
    const [searchTerm, setSearchTerm] = useState('');
    // const [searchedEmployee, setSearchedEmployee] = useState(null);
    const [isUpdateClicked, setIsUpdateClicked] = useState(false);
    // store all the employee details 
    const [allEmployee, setAllEmployee] = useState(null);
    
    const searchItem = function (e) {
        setSearchTerm(e.target.value);
        if(searchTerm.length==1) 
        getAllEmployee();
        console.log(searchTerm);
    }
    const getAllEmployee = async () => {
        try {
            const { data } = await axios.get('http://localhost:5000/getAllEmployee');
            setAllEmployee(data);
            console.log(allEmployee);
        }
        catch (error) {
            console.log(error);
        }
    }
    const searchEmployee = async () => {
        try {
            const { data } = await axios.get('http://localhost:5000/getAllOnSearch', {
                params: {
                    name: searchTerm
                }
            });

            console.log(data);
            setAllEmployee(data);

        }
        catch (error) {
            console.log(error);
        }
    }
    useEffect(() => {
        getAllEmployee();
    }, []);

    return (
        <div>
            <input type="text" placeholder="Search..." value={searchTerm} onChange={searchItem} />
            <button onClick={searchEmployee}>Search</button>

            <Filter setAllEmployee={setAllEmployee}/>

            <div className="employees-page">
                <h1>Employee Details</h1>
                {allEmployee ? (
                    <div className="employees-grid">
                        {allEmployee.map((employee) => {
                            return (
                                <Allemployee
                    employee={employee}
                    setAllEmployee={setAllEmployee}
                  />
                                
                                );
                        }
                        )}
                    </div>
                ) : (<p>Loading...</p>)}
            </div>


                {/* <button onClick={getAllEmployee}>Show employee</button> */}
                {/* <button >update employee</button> */}
                {/* <button>Show employee</button> */}
                {/* <button>Show employee</button> */}
            
        </div>
    )
}


// const employees = [
//     { id: 1, name: 'John Doe', email: 'john@example.com', position: 'Developer' },
//     { id: 2, name: 'Jane Smith', email: 'jane@example.com', position: 'Designer' },
//     { id: 3, name: 'Michael Johnson', email: 'michael@example.com', position: 'Manager' },{ id: 4, name: 'John Doe', email: 'john@example.com', position: 'Developer' },
//     { id: 5, name: 'Jane Smith', email: 'jane@example.com', position: 'Designer' },
//     { id: 6, name: 'Michael Johnson', email: 'michael@example.com', position: 'Manager' },
//     { id: 7, name: 'John Doe', email: 'john@example.com', position: 'Developer' },
//     { id: 8, name: 'Jane Smith', email: 'jane@example.com', position: 'Designer' },
//     { id: 9, name: 'Michael Johnson', email: 'michael@example.com', position: 'Manager' }
// ];
//   const handleUpdate = () => {
//     setShowUpdateForm(true);
//   };
//   const handleChange = (e) => {
//     setUpdatedDetails({ ...updatedDetails, [e.target.name]: e.target.value });
//   };
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await axios.put(`/employees/${employees.id}`, updatedDetails);
//       console.log('Updated details:', response.data);
//       // Add logic to update state or display success message
//     } catch (error) {
//       console.log('Error updating details:', error.message);
//       // Add logic to display error message
//     }
//   };