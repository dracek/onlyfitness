import React from 'react';
import Config from "../config/config.js";
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
      alignItems: 'center' ,
  
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
      color: 'white',
      width: '150px'
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
    }),
    
  buttonRow: () => 
    Config.Css.css({
      marginTop: "25px",
      display: 'flex',
      width: '100%',
      justifyContent: 'space-evenly'
    })   
};

const ActivityForm = ({ onCancel, onSave, categoryData, data }) => {
  const formik = useFormik({
    initialValues: data ? {
      categoryId: data.categoryId, 
      activityDate: new Date(data.activityDate).toISOString().substring(0,10),
      time: data.time
    } : {
      categoryId: categoryData.length > 0 ? categoryData[0].id : undefined, 
      activityDate: new Date(Date.now()).toISOString().substring(0,10),
      time: "10"
    },
    enableReinitialize: true,
    validate: (values) => {
      const errors = {};
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
        <div style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <label htmlFor="categoryId">Category:</label>
          <select
            id="categoryId"
            name="categoryId"
            value={formik.values.categoryId}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className={Css.select()}
          >
            {categoryData.map(cat => <option key={cat.id} value={cat.id}>{cat.name}</option>)}
          </select>

          <label htmlFor="activityDate">Date:</label>
          <input
            id="activityDate"
            type="date"  
            name="activityDate"
            value={formik.values.activityDate}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className={formik.errors.activityDate ? Css.inputError() : Css.input()}
          />
          {formik.errors.activityDate && <div className={Css.errorMessage()}>{formik.errors.activityDate}</div>}

          <label htmlFor="time">Time:</label>
          <input
            id="time"
            type="number"
            name="time"
            value={formik.values.time}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className={formik.errors.time ? Css.inputError() : Css.input()}
          />
          {formik.errors.time && <div className={Css.errorMessage()}>{formik.errors.time}</div>}
        </div>

        <div className={Css.buttonRow()}>
          <button className={Css.button()} type="reset">
            Cancel
          </button>
          <button className={Css.button()} type="submit">
            Save
          </button>
        </div>
      </form>
    </div>
  );
};

export default ActivityForm;
