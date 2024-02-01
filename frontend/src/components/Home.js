import React, { useEffect, useState } from 'react'
import axios from "axios";
import toast from "react-hot-toast";
import "./Home.css"
import Allemployee from './Allemployee';
import Filter from './Filter';

// home component

export default function Home() {
    // state for search field 
    const [searchTerm, setSearchTerm] = useState('');
    // emp details
    const [allEmployee, setAllEmployee] = useState(null);
    // for average salary
    const [averageSal, setAverageSal] = useState(null);
    // show or hide averageSal
    const [show, setShow] = useState(false);

    // salary calculation 
    const calcuateSal = async () => {
        try {
            const { data } = await axios.get('/calcutateAvgSal');
            setAverageSal(data.averageSalary);
            console.log(data);
            setShow(true);
        } catch (error) {
            console.log(error);
        }
    };

    // hide or show 
    const changeButton = () => {
        setShow(!show);
    }

    // function to get search input 
    const searchItem = function (e) {
        setSearchTerm(e.target.value);
        if (searchTerm.length == 1)
            getAllEmployee();
        console.log(searchTerm);
    }

    // call to get all employees
    const getAllEmployee = async () => {
        try {
            const { data } = await axios.get('/getAllEmployee');
            setAllEmployee(data);
            console.log(allEmployee);
        }
        catch (error) {
            console.log(error);
        }
    }

    // call for serching all employees
    const searchEmployee = async () => {
        try {
            const { data } = await axios.get('/getAllOnSearch', {
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
        <div >
            <div class="navbar">
                <h2>Employee Managment
                </h2>
                <div>
                    <input type="text" class="search-input" placeholder="Search..." value={searchTerm} onChange={searchItem} />
                    <button class="search-button" onClick={searchEmployee}>Search</button>
                </div>
                <Filter setAllEmployee={setAllEmployee} />
            </div>
            <div className="employees-page">
                <div>
                    {!show && (
                        <button onClick={calcuateSal}>Calculate Average Salary</button>
                    )}
                    {show && (
                            <div>
                                <h3>Average Salary is {averageSal}</h3>
                                <button
                                    onClick={changeButton}> Hide salary
                                </button>
                            </div>
                        )
                    }
                </div>
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
                        })}
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
