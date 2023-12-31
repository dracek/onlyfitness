import React from 'react';
import Config from "./config/config.js";
import { useFormik } from 'formik';

const Css = {
  main: () => 
    Config.Css.css({
      height: '100%'
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

const ActivityForm = ({ onCancel, onSave, categoryData }) => {

  console.log(categoryData, "xyz");

  const formik = useFormik({

    initialValues: {
      categoryId: categoryData.length > 0 ? categoryData[0].id : undefined, 
      activityDate: "2023-12-09", // todo now
      time: "10"
    },

    enableReinitialize : true,

    validate: (values) => {
      const errors = {};

      /*

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
      */

      const time = parseInt(values.time, 10);
      if (isNaN(time) || time < 1 || time > 1440) {
        errors.time = "Time is allowed only between 1 and 1440 minutes";
      }

      return errors;
    },
    onSubmit: (values) => {
      onSave({
        categoryId: values.categoryId,
        activityDate: values.activityDate,
        time: parseInt(values.time, 10),
      });
    },
  });

  return (
    <div className={Css.main()}>
      <form onSubmit={formik.handleSubmit} onReset={onCancel} className={Css.form()}>

        <div>
          <label for={"categoryId"}>Category:</label>
          <select
            name="categoryId"
            value={formik.values.categoryId}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className={Css.select()}
            placeholder="Select Category"
          >
            {categoryData.map(cat => <option value={cat.id}>{cat.name}</option>)}
          </select>
        </div>

        <div>
          <label for={"activityDate"}>Date:</label>
          <input
            type="string"
            name="activityDate"
            value={formik.values.activityDate}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className={formik.errors.activityDate ? Css.inputError() : Css.input()}
          />
        </div>
        {formik.errors.activityDate && <div className={Css.errorMessage()} >{formik.errors.activityDate}</div>}

        <div>
          <label for={"time"}>Time:</label>
          <input
            type="number"
            name="time"
            value={formik.values.time}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className={formik.errors.time ? Css.inputError() : Css.input()}
          />{"minutes"}
        </div>
        {formik.errors.time && <div className={Css.errorMessage()} >{formik.errors.time}</div>}

        
        <button className={Css.button()} type="submit">
          Save
        </button>
      </form>
    </div>
  );
};

export default ActivityForm;
