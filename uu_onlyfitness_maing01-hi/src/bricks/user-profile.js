import { Utils, useSession } from "uu5g05";
import React, { useEffect, useState, useContext } from 'react';
import UserProfileForm from './user-profile-form';
import Config from "./config/config.js";
import SettingsContext from "./settings-context.js";

const Css = {
  main: () =>
  Config.Css.css({
    display: "flex",
    maxWidth: 624,
    minWidth: 480,
    padding: "24px",
    margin: "0 auto",
    flexWrap: "wrap",
    flexDirection: "column",
    color: "white",
    "& > *": {
      display: "block",
      width: "100%"
    }
  }),
  profileInfo: () =>
    Config.Css.css({
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      "& > *": {
        margin: "12px;"
      }
    }),
  
  colored: () => 
    Config.Css.css({
      color:'orange'
  })  
};

const UserProfile = (props) => {
    const { callsMap, data }  = useContext(SettingsContext);

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

    const attrs = Utils.VisualComponent.getAttrs(props, Css.main());
  
    return (
      <div {...attrs}>
        <h1 style={{justifyContent: "space-around", display: "flex"}}>
            <span>User settings: {identity && identity.name}</span>
        </h1>
  
        {isEditing ? (
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
        )}
      </div>
    );
  };
  
  export default UserProfile;