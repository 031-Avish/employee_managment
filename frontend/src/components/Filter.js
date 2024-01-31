import React, {useState} from 'react';
import axios from 'axios';
export default function Filter({setAllEmployee}) {
  const [sortOption, setSortOption] = useState('');

  const handleSortChange = async(option) => {
    setSortOption(option);

    try{
        const {data}=await axios.post(`http://localhost:5000/filteremployee`,{
              option: option,
            });
            setAllEmployee(data);
            console.log(data);
        }
        catch(error)
        {
            console.log(error);
        }
    console.log(option);
  };

  return (
    <div>
    <h1>Simple Page with Sorting Radio Buttons</h1>
    <div>
      <input
        type="radio"
        id="nameAsc"
        name="sortOption"
        value="nameAsc"
        checked={sortOption === 'nameAsc'}
        onChange={() => handleSortChange('nameAsc')}
      />
      <label htmlFor="nameAsc">By Name Asc</label>
    </div>
    <div>
      <input
        type="radio"
        id="nameDesc"
        name="sortOption"
        value="nameDesc"
        checked={sortOption === 'nameDesc'}
        onChange={() => handleSortChange('nameDesc')}
      />
      <label htmlFor="nameDesc">By Name Desc</label>
    </div>
    <div>
      <input
        type="radio"
        id="salaryLow"
        name="sortOption"
        value="salaryLow"
        checked={sortOption === 'salaryLow'}
        onChange={() => handleSortChange('salaryLow')}
      />
      <label htmlFor="salaryLow">By Salary Low</label>
    </div>
    <div>
      <input
        type="radio"
        id="salaryHigh"
        name="sortOption"
        value="salaryHigh"
        checked={sortOption === 'salaryHigh'}
        onChange={() => handleSortChange('salaryHigh')}
      />
      <label htmlFor="salaryHigh">By Salary High</label>
    </div>
  </div>
);
}
