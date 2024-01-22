import React, { useEffect, useState, useContext } from 'react';
import UserProfileForm from '../user-profile-form';
import WelcomeRow from '../welcome-row';
import Uu5Elements from "uu5g05-elements";
import Plus4U5Elements from "uu_plus4u5g02-elements";
import importLsi from "../../lsi/import-lsi.js";
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

const ActivityRow = (props) => {

    const { callsMap, activityData, categoryData }  = useContext(ActivityContext);

    function convertDate(date){
      let d = new Date(date);
      return d.toLocaleDateString('cs-cz');
    }

    function convertCat(categoryId){
      const cat = categoryData.find(c => c.id === categoryId);
      return cat ? cat.name : "unknown";
    }

    const {data} = props;

    return (
      <div>{convertDate(data.activityDate)} - {convertCat(data.categoryId)} ({data.time} minutes) 
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