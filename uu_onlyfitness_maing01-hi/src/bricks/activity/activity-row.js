import React, { useContext } from 'react';
import { Button, Icon } from "uu5g05-elements";
import Config from "../config/config.js";
import ActivityContext from "./activity-context.js";

const Css = {
  editButton: () =>
    Config.Css.css({
      marginLeft: "10px",
      color: "orange"
    }),

  deleteButton: () =>
    Config.Css.css({
      marginLeft: "10px",
      color: "orange"
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
      <div>{convertDate(data.activityDate)} - {convertCat(data.categoryId, categoryData)} ({data.time} minutes) 
        <Button className={Css.editButton()} onClick={() => props.onEdit(data)}>
          <Icon icon="mdi-pencil" />
        </Button>
        <Button className={Css.deleteButton()} onClick={() => props.onDelete(data.id)}>
          <Icon icon="mdi-trash-can" />
        </Button>
      </div>
    );
  };
  
  export default ActivityRow;