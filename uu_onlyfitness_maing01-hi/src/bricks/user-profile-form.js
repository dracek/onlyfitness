import React from 'react';
import Config from "./config/config.js";
import { useFormik } from 'formik';

const Css = {
  main: () => 
    Config.Css.css({
      height: '100vh'
  }),

  form: () => 
    Config.Css.css({
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center' 
  }),
  
  button: () => 
    Config.Css.css({
      width: '120px',
      padding: '7px',
      borderRadius: '20px',
      backgroundColor: 'orange',
      color: 'black',
      marginTop: '25px',
      cursor: "pointer"
  }),

  select: () => 
    Config.Css.css({
      border: '1px solid orange', 
      margin: '7px', 
      borderRadius: '20px', 
      padding: '5px', 
      backgroundColor: 'black', 
      color: 'white', 
      width: '150px'
    }),

  input: () => 
    Config.Css.css({
      border: `1px solid orange`,
      margin: '7px',
      borderRadius: '20px',
      padding: '5px',
      backgroundColor: 'black',
      color: 'white'
    }),

  inputError: () => 
    Config.Css.css({
      border: `1px solid orange`,
      margin: '7px',
      borderRadius: '20px',
      padding: '5px',
      backgroundColor: 'orange',
      color: 'black'
    }),

  errorMessage: () => 
    Config.Css.css({
      color: 'orange',
      marginBottom: '7px'
    })    
};

const UserProfileForm = ({ onCancel, onSave, data }) => {
  const formik = useFormik({

    initialValues: {
      gender: data.gender || 'O',
      height: data.height ? data.height.toString() : '0',
      weight: data.weight ? data.weight.toString() : '0',
      age: data.age ? data.age.toString() : '0',
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

      const age = parseInt(values.age, 10);
      if (isNaN(age) || age < 15 || age > 150) {
        errors.age = "Are you sure about the age? Our range is only between 15 and 150 years.";
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
    <div className={Css.main()}>
      <form onSubmit={formik.handleSubmit} onReset={onCancel} className={Css.form()}>
        <div>
          <label for={"gender"}>Gender:</label>
          <select
            name="gender"
            value={formik.values.gender}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className={Css.select()}
            placeholder="Select Gender"
          >
            <option value="M">Male</option>
            <option value="F">Female</option>
            <option value="O">Other</option>
          </select>
        </div>
        <div>
          <label for={"height"}>Height:</label>
          <input
            type="number"
            name="height"
            value={formik.values.height}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className={formik.errors.height ? Css.inputError() : Css.input()}
          />{"cm"}
        </div>
        {formik.errors.height && <div className={Css.errorMessage()} >{formik.errors.height}</div>}
        
        <div>
          <label for={"weight"}>Weight:</label>
          <input
            type="number"
            name="weight"
            value={formik.values.weight}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className={formik.errors.weight ? Css.inputError() : Css.input()}
          />{"kg"}
        </div>
        {formik.errors.weight && <div className={Css.errorMessage()} >{formik.errors.weight}</div>}
     
        <div>
          <label for={"age"}>Age:</label>
          <input
            type="number"
            name="age"
            value={formik.values.age}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className={formik.errors.age ? Css.inputError() : Css.input()}
          />{"years"}
        </div>
        {formik.errors.age && <div className={Css.errorMessage()} >{formik.errors.age}</div>}

        <button className={Css.button()} type="submit">
          Save
        </button>
        <button className={Css.button()} type="reset">
          Cancel
        </button>
      </form>
    </div>
  );
};

export default UserProfileForm;
