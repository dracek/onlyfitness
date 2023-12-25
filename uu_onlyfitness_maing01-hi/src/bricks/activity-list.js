import { Utils, createVisualComponent, Content, useSession, Lsi } from "uu5g05";
import React, { useEffect, useState, useContext } from 'react';
import UserProfileForm from './user-profile-form';
import WelcomeRow from './welcome-row';
import Uu5Elements from "uu5g05-elements";
import Plus4U5Elements from "uu_plus4u5g02-elements";
import importLsi from "../lsi/import-lsi.js";
import Config from "./config/config.js";
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
  
        {/*isEditing ? (
          <UserProfileForm onSave={handleSave} onCancel={handleCancel} data={data} />
        ) : (
          <div className={Css.profileInfo()} >
            <p>Gender: <span className={Css.colored()}>{data.gender} </span></p>
            <p>Height: <span className={Css.colored()}>{data.height}</span> cm</p>
            <p>Weight: <span className={Css.colored()}>{data.weight}</span> kg</p>
            <p>Age: <span className={Css.colored()}>{data.age}</span> years</p>

            <button style={{ width: '120px', padding: '7px', borderRadius: '20px', backgroundColor: 'orange', color: 'black', margin:'25px' }} onClick={handleEdit}>
              Edit
            </button>
          </div>
        )*/}
      </div>
    );
  };
  
  export default ActivityList;