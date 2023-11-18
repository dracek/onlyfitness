import { useSession } from "uu5g05";
import React, { useState, useEffect } from 'react';
import Calls from "calls";
import Uu5Elements from "uu5g05-elements";
import Plus4U5Elements from "uu_plus4u5g02-elements";


const UserProfileForm = ({ onSave, initialData, identity }) => {
  const [formData, setFormData] = useState(initialData || {});
  const handleChange = (e) => {
    
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    
      const formDataWithIntegers = {
        gender: formData.gender,
        age: parseInt(formData.age, 10),
        weight: parseInt(formData.weight, 10),
        height: parseInt(formData.height, 10),
      };
  }


  return (
    <div style={{height:'100vh'}}>
    <form onSubmit={handleSubmit} style={{display:'flex', flexDirection:'column', alignItems:'center', }}>
    <label>
      Gender:
      <select name="gender" value={formData.gender || ''} onChange={handleChange}  style={{border: '1px solid orange', margin: '7px', borderRadius: '20px', padding: '5px', backgroundColor:'black', color:'white', width:'150px'}} placeholder="Select Gender">
        <option value="M">Male</option>
        <option value="F">Female</option>
        <option value="O">Other</option>
      </select>
  </label>
  <label>
    Height:
    <input type="number" name="height" value={formData.height || ''} onChange={handleChange}
    style={{border: '1px solid orange', margin: '7px', borderRadius: '20px', padding: '5px', backgroundColor:'black', color:'white'}} />
  cm
  </label>
      <label>
        Weight:
        <input type="number" name="weight" value={formData.weight || ''} onChange={handleChange}
        style={{border: '1px solid orange', margin: '7px', borderRadius: '20px', padding: '5px', backgroundColor:'black', color:'white'}}  />
      kg
      </label>
      <label>
        Age:
        <input type="number" name="age" value={formData.age || ''} onChange={handleChange} 
        style={{border: '1px solid orange', margin: '7px', borderRadius: '20px', padding: '5px', backgroundColor:'black', color:'white'}} />
        years
      </label>
      <button style={{width:'120px', padding:'7px', borderRadius:'20px', backgroundColor:'orange', color:'black', margin:'25px'}} type="submit">Save</button>
    </form>
  
    </div>
  );
};

export default UserProfileForm;
