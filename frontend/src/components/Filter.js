import React, { useState } from 'react';
import axios from 'axios';

// component for filter/sort

export default function Filter({ setAllEmployee }) {
  // to see which option is selected 
  const [selectedOption, setSelectedOption] = useState('');

  const getSelectedOption = async (option) => {
    setSelectedOption(option);
    try {
      const { data } = await axios.post(`/filteremployee`, {
        option: option,
      });
      setAllEmployee(data);
      console.log(data);
    } catch (error) {
      console.log(error);
    }
    console.log(option);
  };

  return (
    <div className='filter-option'>
      <label htmlFor="selectedOption" className='select-label'>Filter by:</label>
      <select
        id="selectedOption"
        className='select-dropdown'
        value={selectedOption}
        onChange={(e) => getSelectedOption(e.target.value)}
      >
        <option value="">Select</option>
        <option value="nameAsc">Name Asc</option>
        <option value="nameDesc">Name Desc</option>
        <option value="salaryLow">Salary Low</option>
        <option value="salaryHigh">Salary High</option>
      </select>
    </div>
  );
}