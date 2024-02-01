import React, { useState } from 'react';
import axios from 'axios';
import "./Filter.css"

export default function Filter({ setAllEmployee }) {
  const [sortOption, setSortOption] = useState('');

  const handleSortChange = async (option) => {
    setSortOption(option);

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
      <label htmlFor="sortOption" className='select-label'>Filter by:</label>
      <select
        id="sortOption"
        className='select-dropdown'
        value={sortOption}
        onChange={(e) => handleSortChange(e.target.value)}
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
// import React, {useState} from 'react';
// import axios from 'axios';
// import "./Filter.css"
// export default function Filter({setAllEmployee}) {
//   const [sortOption, setSortOption] = useState('');

//   const handleSortChange = async(option) => {
//     setSortOption(option);

//     try{
//         const {data}=await axios.post(`/filteremployee`,{
//               option: option,
//             });
//             setAllEmployee(data);
//             console.log(data);
//         }
//         catch(error)
//         {
//             console.log(error);
//         }
//     console.log(option);
//   };

//   return (
//     <div className='filter-option'>
//     <label className='radio-div'>Filter by </label>
//     <div className='radio-div'>
//       <input
//         type="radio"
//         id="nameAsc"
//         name="sortOption"
//         value="nameAsc"
//         checked={sortOption === 'nameAsc'}
//         onChange={() => handleSortChange('nameAsc')}
//       />
//       <label htmlFor="nameAsc">Name Asc</label>
//     </div>
//     <div className='radio-div'>
//       <input
//         type="radio"
//         id="nameDesc"
//         name="sortOption"
//         value="nameDesc"
//         checked={sortOption === 'nameDesc'}
//         onChange={() => handleSortChange('nameDesc')}
//       />
//       <label htmlFor="nameDesc">Name Desc</label>
//     </div>
//     <div className='radio-div'>
//       <input
//         type="radio"
//         id="salaryLow"
//         name="sortOption"
//         value="salaryLow"
//         checked={sortOption === 'salaryLow'}
//         onChange={() => handleSortChange('salaryLow')}
//       />
//       <label htmlFor="salaryLow">Salary Low</label>
//     </div>
//     <div className='radio-div'>
//       <input
//         type="radio"
//         id="salaryHigh"
//         name="sortOption"
//         value="salaryHigh"
//         checked={sortOption === 'salaryHigh'}
//         onChange={() => handleSortChange('salaryHigh')}
//       />
//       <label htmlFor="salaryHigh">Salary High</label>
//     </div>
//   </div>
// );
// }
