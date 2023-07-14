const express = require('express');
const router = express.Router();
const {Employee} = require('../model/employees');


// Create an employee
router.post('/', async (req, res) => {
  try {
    const { firstName, lastName, email, department, salary } = req.body;

    // Create a new employee
    const newEmployee = new Employee({ firstName, lastName, email, department, salary });
    await newEmployee.save();
//console.log(newEmployee)
    res.status(201).json({ message: 'Employee created successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Employee creation failed' });
  }
});

//Get all employees
router.get('/', async (req, res) => {
  
  try {
    
    const employees = await Employee.find()
    res.status(200).json(employees);
    
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch employees' });
  }
});
///2nd get
// router.get('/', async (req, res) => {
//   const page = parseInt(req.query.page) || 1;
//   const limit = 5;
//   const skip = (page - 1) * limit;

//   try {
//       const totalEmployees = await Employee.countDocuments();
//       const totalPages = Math.ceil(totalEmployees / limit);

//       const employees = await Employee.find()
//           .skip(skip)
//           .limit(limit);

//       res.status(200).send({
//           page,
//           totalPages,
//           employees,
//       });
//   } catch (err) {
//       res.status(500).send({ msg: err.message });
//   }
// });



// Update an employee
router.put('/:id', async (req, res) => {
  try {
    const { firstName, lastName, email, department, salary } = req.body;

    const updatedEmployee = await Employee.findByIdAndUpdate(req.params.id, {
      firstName,
      lastName,
      email,
      department,
      salary,
    });

    res.status(200).json({ message: 'Employee updated successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to update employee' });
  }
});

// Delete an employee
router.delete('/:id', async (req, res) => {
  try {
    await Employee.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Employee deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete employee' });
  }
});

// ...

module.exports = {router};
