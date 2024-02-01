// importing modules 
const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path=require('path');
const cors = require('cors');

const app = express();
// setting cors policy
app.use(cors());

// rendering frontend
app.use(express.static(path.join(__dirname, 'build')));
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});


const PORT = 5000;

// reading data 
let employees;
try {
    employees = JSON.parse(fs.readFileSync('employee.json', 'utf8'));
} catch (error) {
    console.error('Error reading file:', err.message);
}
// save the data back to file
function saveInFile() {
    fs.writeFileSync('employee.json', JSON.stringify(employees, null, 2), 'utf8');
}

// parser setup
app.use(bodyParser.json());

// get Api to get all employees
app.get('/getAllEmployee', (req, res) => {
    try {
        res.status(200).json(employees);
    } catch (error) {
        res.status(500).json({error: "unable to fetch all employee"});
    }
});

// Api to search employee by name
app.get('/getAllOnSearch', (req, res) => {
    try {
        const query = req.query.name;
        console.log(query); 
        const result = employees.filter(employee => employee.fullName.toLowerCase().includes(query.toLowerCase()));
        // console.log(result);
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({error: "error in serching records"})
    }
});

// Update the details of employee
app.post('/updateEmployee/', (req, res) => {
    try {
        const employeeId = req.body.id;
        const updatedData = req.body.updatedEmp;
        console.log(req.bod)
        // verify all values are entered correctly
        for (let key in updatedData) {
            if (updatedData[key] === null || updatedData[key] === undefined || updatedData[key] === '') {
                res.json({error:'please fill all the fields'});
        }  
    }
        // find the indec of employee and update it 
        const employeeIndex = employees.findIndex(employee => employee.id === employeeId);
        if (employeeIndex !== -1) {
            console.log(updatedData);
          employees[employeeIndex] = {...updatedData,id:employeeId};
          console.log("THIS IS A UPDATE", employees[employeeIndex]);
          saveInFile();
          res.status(200).json(employees);
        } else {
          res.status(404).json({ error: 'Employee not found.' });
        }
    } catch (error) {
        res.status(500).json({error: "error updating employee"})
    }
  });

  // delete employee details 
  app.delete('/delete/:id', (req, res) => {
    try {
        const employeeId = req.params.id;
        employees = employees.filter(employee => employee.id !== parseInt(employeeId));
        saveInFile();
        res.status(200).json(employees);
    } catch (error) {
        res.status(500).json({error: " error deleting employee"})
    }
  });

  // sort employees
  app.post('/filteremployee',(req,res)=>
  {
    try {
        const option=req.body.option;
        console.log(employees);

        // any one will run based on condition
        if(option=="nameAsc")
        {
            console.log("ara h");
            const nameAsc = employees.sort((a,b)=>
            {
                return a.fullName.localeCompare(b.fullName);
            });
            
            res.status(200).json(nameAsc);
        }
        else if(option=="nameDesc")
        {
            const nameDesc = employees.sort((a,b)=>
            {
                return b.fullName.localeCompare(a.fullName);
            });
            res.status(200).json(nameDesc);
        }
        else if(option=="salaryLow")
        {
            const salaryLow = employees.sort((a,b)=>
            {
                return a.salary-b.salary;
            });
            res.status(200).json(salaryLow);
        }
        else if(option=="salaryHigh")
        {
            const salaryHigh = employees.sort((a,b)=>
            {
                return b.salary-a.salary;
            });
            res.status(200).json(salaryHigh);
        }
    } catch (error) {
        res.status(500).json({error: "error in sorting"});
    } 
  });

  // calculate average salary of employee 
  app.get('/calcutateAvgSal', (req, res) => {
    // check if no employee is present
    if (employees.length === 0) {
      res.json({ error: 'Number of employees are zero' });
    } else {
      const averageSalary =  employees.reduce((acc, employee) => acc + parseInt(employee.salary), 0);
      res.json( {averageSalary:averageSalary});
    }
  });


  // start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});