const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path=require('path');
const cors = require('cors');
const app = express();

console.log(__dirname);
app.use(cors());
app.use(express.static(path.join(__dirname, 'build')));
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});
const PORT = 5000;
let employees;
try {
    employees = JSON.parse(fs.readFileSync('employee.json', 'utf8'));
} catch (error) {
    console.error('Error reading file:', err.message);
}

// console.log(employees)
let empsort= [...employees];
function saveEmployeesToFile() {
    fs.writeFileSync('employee.json', JSON.stringify(employees, null, 2), 'utf8');
}
  
app.use(bodyParser.json());
app.get('/getAllEmployee', (req, res) => {
    try {
        res.status(200).json(employees);
    } catch (error) {
        res.status(500).json({error: "unable to fetch all employee"});
    }
});

app.get('/getAllOnSearch', (req, res) => {
    try {
        const query = req.query.name;
        // console.log(query);
        const result = employees.filter(employee => employee.fullName.toLowerCase().includes(query.toLowerCase()));
        // console.log(result);
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({error: "error in serching records"})
    }
});
app.post('/updateEmployee/', (req, res) => {
    try {
        const employeeId = req.body.id;
        const updatedData = req.body.formData;
        for (let key in updatedData) {
            if (updatedData[key] === null || updatedData[key] === undefined || updatedData[key] === '') {
                res.json({error:'please fill all the fields'});
        
        }
        
    }
        const employeeIndex = employees.findIndex(employee => employee.id === employeeId);
        if (employeeIndex !== -1) {
          employees[employeeIndex] = {...updatedData,id:employeeId};
        //   console.log("THIS IS A UPDATE", employees[employeeIndex]);
          saveEmployeesToFile();
          res.json(employees);
        } else {
          res.status(404).json({ error: 'Employee not found.' });
        }
    } catch (error) {
        res.status(500).json({error: "error updating employee"})
    }
  });
  app.delete('/delete/:id', (req, res) => {
    try {
        const employeeId = req.params.id;
        employees = employees.filter(employee => employee.id !== parseInt(employeeId));
        saveEmployeesToFile();
        res.status(200).json(employees);
    } catch (error) {
        res.status(500).json({error: " error deleting employee"})
    }
  });
  app.post('/filteremployee',(req,res)=>
  {
    try {
        const option=req.body.option;
        console.log(employees);
        if(option=="nameAsc")
        {
            console.log("ara h");
            const sortedByNameAsc = empsort.sort((a,b)=>
            {
                return a.fullName.localeCompare(b.fullName);
            });
            
            res.status(200).json(sortedByNameAsc);
        }
        else if(option=="nameDesc")
        {
            const sortedByNameAsc = empsort.sort((a,b)=>
            {
                return b.fullName.localeCompare(a.fullName);
            });
            res.status(200).json(sortedByNameAsc);
        }
        else if(option=="salaryLow")
        {
            const sortedByNameAsc = empsort.sort((a,b)=>
            {
                return a.salary-b.salary;
            });
            res.status(200).json(sortedByNameAsc);
        }
        else if(option=="salaryHigh")
        {
            const sortedByNameAsc = empsort.sort((a,b)=>
            {
                return b.salary-a.salary;
            });
            res.status(200).json(sortedByNameAsc);
        }
    } catch (error) {
        res.status(500).json({error: "error in sorting"});
    }
    
  })
  app.get('/calcutateAvgSal', (req, res) => {
    if (employees.length === 0) {
      res.json({ error: 'No employees in the company.' });
    } else {
      const averageSalary =  employees.reduce((acc, employee) => acc + parseInt(employee.salary), 0);
      res.json( {averageSalary:averageSalary});
    }
  });
  

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});