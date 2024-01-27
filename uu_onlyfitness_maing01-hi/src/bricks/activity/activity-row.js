import React, { useContext } from 'react';
import { Button, Icon } from "uu5g05-elements";
import Config from "../config/config.js";
import ActivityContext from "./activity-context.js";

const Css = {
  row: () => 
    Config.Css.css({
      display: 'flex', 
      justifyContent: 'space-between', 
      alignItems: 'center', 
     
      borderRadius: '30px',
      padding: '10px 15px 0px 15px',
      boxShadow: '0 2px 4px rgba(255, 255, 255, 0.2)', // Subtle white glow for a 3D effect
      outline: 'none', 
      '&:focus': {
        boxShadow: '0 0 5px rgba(255, 255, 255, 0.4)', // More pronounced shadow on focus
      }
    }),
  text: () => 
    Config.Css.css({
      
    }),
  buttonsContainer: () => 
    Config.Css.css({
      display: 'flex',
      flexDirection: 'row',
    }),
  button: () => 
    Config.Css.css({
      color: "orange",
      marginLeft: '10px',
    }),
};

function convertDate(date){
  let d = new Date(date);
  return d.toLocaleDateString('cs-cz');
}

function convertCat(categoryId, categoryData){
  const cat = categoryData.find(c => c.id === categoryId);
  return cat ? cat.name : "unknown";
}

const ActivityRow = (props) => {

    const { categoryData }  = useContext(ActivityContext);
    const {data} = props;

    return (
      <div className={Css.row()}>
        <div className={Css.text()}>
          {convertDate(data.activityDate)} - {convertCat(data.categoryId, categoryData)} ({data.time} minutes)
        </div>
        <div className={Css.buttonsContainer()}>
          <Button className={Css.button()} onClick={() => props.onEdit(data)}>
            <Icon icon="mdi-pencil" />
          </Button>
          <Button className={Css.button()} onClick={() => props.onDelete(data.id)}>
            <Icon icon="mdi-trash-can" />
          </Button>
        </div>
        <div>{convertDate(data.activityDate)} - {convertCat(data.categoryId, categoryData)} ({data.time} minutes) 
          <Button className={Css.editButton()} onClick={() => props.onEdit(data)}>
            <Icon icon="mdi-pencil" />
          </Button>
          <Button className={Css.deleteButton()} onClick={() => props.onDelete(data.id)}>
            <Icon icon="mdi-trash-can" />
          </Button>
        </div>
      </div>
    );
};

export default ActivityRow;
