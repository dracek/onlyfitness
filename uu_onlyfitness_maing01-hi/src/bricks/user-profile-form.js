import React from 'react';
import { useFormik } from 'formik';

const UserProfileForm = ({ onCancel, onSave, data }) => {
  const formik = useFormik({
    initialValues: {
      gender: data.gender || 'O',
      height: data.height ? data.height.toString() : '',
      weight: data.weight ? data.weight.toString() : '',
      age: data.age ? data.age.toString() : '',
    },
    validate: (values) => {
      const errors = {};

      // Validation for weight
      const weight = parseInt(values.weight, 10);
      if (isNaN(weight) || weight < 30 || weight > 300) {
        errors.weight = "Are you sure about the weight? Our range is only between 30 and 300 kg.";
      }

      // Validation for height
      const height = parseInt(values.height, 10);
      if (isNaN(height) || height < 110 || height > 240) {
        errors.height = "Are you sure about the height? Our range is only between 110 and 240 cm.";
      }

      return errors;
    },
    onSubmit: (values) => {
      onSave({
        gender: values.gender,
        age: parseInt(values.age, 10),
        weight: parseInt(values.weight, 10),
        height: parseInt(values.height, 10),
      });
    },
  });

  return (
    <div style={{ height: '100vh' }}>
      <form onSubmit={formik.handleSubmit} onReset={onCancel} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <label>
          Gender:
          <select
            name="gender"
            value={formik.values.gender}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            style={{ border: '1px solid orange', margin: '7px', borderRadius: '20px', padding: '5px', backgroundColor: 'black', color: 'white', width: '150px' }}
            placeholder="Select Gender"
          >
            <option value="M">Male</option>
            <option value="F">Female</option>
            <option value="O">Other</option>
          </select>
        </label>
        <label>
          Height:
          <input
            type="number"
            name="height"
            value={formik.values.height}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            style={{
              border: `1px solid ${formik.errors.height ? 'orange' : 'orange'}`,
              margin: '7px',
              borderRadius: '20px',
              padding: '5px',
              backgroundColor: formik.errors.height ? 'orange' : 'black',
              color: 'white',
            }}
          />
          cm
          </label>
          {formik.errors.height && <div style={{ color: 'orange' }}>{formik.errors.height}</div>}
        
        <label>
          Weight:
          <input
            type="number"
            name="weight"
            value={formik.values.weight}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            style={{
              border: `1px solid ${formik.errors.weight ? 'orange' : 'orange'}`,
              margin: '7px',
              borderRadius: '20px',
              padding: '5px',
              backgroundColor: formik.errors.weight ? 'orange' : 'black',
              color: 'white',
            }}
          />
          kg
          </label>
          {formik.errors.weight && <div style={{ color: 'orange' }}>{formik.errors.weight}</div>}
     
        <label>
          Age:
          <input
            type="number"
            name="age"
            value={formik.values.age}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            style={{ border: '1px solid orange', margin: '7px', borderRadius: '20px', padding: '5px', backgroundColor: 'black', color: 'white' }}
          />
          years
        </label>
        <button style={{ width: '120px', padding: '7px', borderRadius: '20px', backgroundColor: 'orange', color: 'black', marginTop: '25px' }} type="submit">
          Save
        </button>
        <button style={{ width: '120px', padding: '7px', borderRadius: '20px', backgroundColor: 'orange', color: 'black', marginTop: '25px' }} type="reset">
          Cancel
        </button>
      </form>
    </div>
  );
};

export default UserProfileForm;
