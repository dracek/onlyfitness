// UserProfileForm.jsx
import React, { useState } from 'react';

const UserProfileForm = ({ onSave, initialData }) => {
  const [formData, setFormData] = useState(initialData || {});
  const [submittedData, setSubmittedData] = useState(null);
  const handleChange = (e) => {
    
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form data:', formData);
  };

  return (
    <div style={{height:'100vh'}}>
    <form onSubmit={handleSubmit} style={{display:'flex', flexDirection:'column', alignItems:'center', }}>
    <label>
      Gender:
      <select name="gender" value={formData.gender || ''} onChange={handleChange}  style={{border: '1px solid orange', margin: '7px', borderRadius: '20px', padding: '5px', backgroundColor:'black', color:'white', width:'150px'}} >
        <option value="">Select Gender</option>
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
