import { Utils, createVisualComponent, Content, useSession, Lsi } from "uu5g05";
import React, { useEffect, useState, useContext } from 'react';
import UserProfileForm from '../user-profile-form';
import WelcomeRow from '../welcome-row';
import Uu5Elements from "uu5g05-elements";
import Plus4U5Elements from "uu_plus4u5g02-elements";
import importLsi from "../../lsi/import-lsi.js";
import Config from "../config/config.js";
import ActivityContext from "./activity-context.js";
import ActivityTable from "./activity-table";
import ActivityForm from "./activity-form"

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
  })  
};

const ActivityList = (props) => {
    const { callsMap, activityData, categoryData }  = useContext(ActivityContext);

    useEffect(() => {
      callsMap.listCategories();
      callsMap.listActivities();
    }, []);

    const [isEditing, setIsEditing] = useState(false);

    const handleEdit = () => {
      setIsEditing(true);
    };
  
    const handleSave = (data) => {
      console.log("SAVE", data);
      callsMap.saveActivity(data);
      setIsEditing(false);
    };

    const handleCancel = () => {
      setIsEditing(false);
    };
  
    const { identity } = useSession();
  
    return (
      <div>
        <WelcomeRow>
          <h1>Activity page</h1>
        </WelcomeRow>

        <WelcomeRow>
          <ActivityForm onCancel={handleCancel} onSave={handleSave} categoryData={categoryData} />
        </WelcomeRow>

        <WelcomeRow>
          <ActivityTable />
        </WelcomeRow>
      </div>
    );
  };
  
  export default ActivityList;