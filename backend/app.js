const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const cors = require('cors');
const app = express();
app.use(cors());
const PORT = 5000;
// Load existing employee records
let employees = JSON.parse(fs.readFileSync('employee.json', 'utf8'));
console.log(employees)

function saveEmployeesToFile() {
    fs.writeFileSync('employee.json', JSON.stringify(employees, null, 2), 'utf8');
}
  
app.use(bodyParser.json());
app.get('/getAllEmployee', (req, res) => {
    res.json(employees);
});

app.get('/getAllOnSearch', (req, res) => {
    const query = req.query.name;
    // console.log(query);
    const result = employees.filter(employee => employee.fullName.toLowerCase().includes(query.toLowerCase()));
    // console.log(result);
    res.json(result);
});
app.post('/updateEmployee/', (req, res) => {
    // Update an Employee's Record
    const employeeId = req.body.id;
    const updatedData = req.body.formData;
    // console.log(updatedData);
    const employeeIndex = employees.findIndex(employee => employee.id === employeeId);
    if (employeeIndex !== -1) {
      employees[employeeIndex] = {...updatedData,id:employeeId};
    //   console.log("THIS IS A UPDATE", employees[employeeIndex]);
      saveEmployeesToFile();
      res.json(employees);
    } else {
      res.status(404).json({ error: 'Employee not found.' });
    }
  });
  app.delete('/delete/:id', (req, res) => {
    const employeeId = req.params.id;
    employees = employees.filter(employee => employee.id !== parseInt(employeeId));
    saveEmployeesToFile();
    res.json(employees);
  });
  

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});