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
      <select name="gender" value={formData.gender || ''} onChange={handleChange}  style={{border: '1px solid orange', margin: '5px', borderRadius: '20px', padding: '5px', margin: '7px', backgroundColor:'black', color:'white', width:'120px'}} >
        <option value="">Select Gender</option>
        <option value="M">Male</option>
        <option value="F">Female</option>
        <option value="O">Other</option>
      </select>
  </label>
  <label>
    Height:
    <input type="number" name="height" value={formData.height || ''} onChange={handleChange}
    style={{border: '1px solid orange', margin: '5px', borderRadius: '20px', padding: '5px', margin: '7px', backgroundColor:'black', color:'white', width:'120px'}} />
  </label>
      <label>
        Weight:
        <input type="number" name="weight" value={formData.weight || ''} onChange={handleChange}
        style={{border: '1px solid orange', margin: '5px', borderRadius: '20px', padding: '5px', margin: '7px', backgroundColor:'black', color:'white', width:'120px'}}  />
      </label>
      <label>
        Age:
        <input type="number" name="age" value={formData.age || ''} onChange={handleChange} 
        style={{border: '1px solid orange', margin: '5px', borderRadius: '20px', padding: '5px', margin: '7px', backgroundColor:'black', color:'white', width:'120px'}} />
      </label>
      <button style={{width:'90px', padding:'7px', borderRadius:'20px', backgroundColor:'orange', color:'black'}} type="submit">Save</button>
    </form>
  
    </div>
  );
};

export default UserProfileForm;
