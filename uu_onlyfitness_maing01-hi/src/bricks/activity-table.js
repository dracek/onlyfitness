import { Utils, createVisualComponent, Content, useSession, Lsi } from "uu5g05";
import React, { useEffect, useState, useContext } from 'react';
import UserProfileForm from './user-profile-form';
import WelcomeRow from './welcome-row';
import Uu5Elements from "uu5g05-elements";
import Plus4U5Elements from "uu_plus4u5g02-elements";
import importLsi from "../lsi/import-lsi.js";
import Config from "./config/config.js";
import ActivityContext from "./activity-context.js";

const Css = {
  profileInfo: () =>
    Config.Css.css({
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      height:'100vh'
    }),
  
  colored: () => 
    Config.Css.css({
      color:'orange'
  }),

  acts: () =>  
  Config.Css.css({
    color:'orange',
    minHeight: "500px;",
    "& div": {
      marginBottom: "12px;"
    }

  }),

  
  
};

const ActivityTable = (props) => {

    const { callsMap, activityData, categoryData }  = useContext(ActivityContext);

    

    /*

    useEffect(() => {
      callsMap.getUserSetting();
    }, []);

    const [isEditing, setIsEditing] = useState(false);

    const handleEdit = () => {
      setIsEditing(true);
    };
  
    const handleSave = (data) => {
      callsMap.saveUserSetting(data);
      setIsEditing(false);
    };

    const handleCancel = () => {
      setIsEditing(false);
    };
  
    const { identity } = useSession();
  
    */

    function convertDate(date){
      let d = new Date(date);
      return d.toLocaleDateString('cs-cz');
    }

    function convertCat(categoryId){
      const cat = categoryData.find(c => c.id === categoryId);
      return cat ? cat.name : "unknown";
    }

    return (
      <div className={Css.acts()} >
        {activityData.map(act => <div key={act.id}>{convertDate(act.activityDate)} - {convertCat(act.categoryId)} ({act.time} minutes)</div>)}
      </div>
    );
  };
  
  export default ActivityTable;