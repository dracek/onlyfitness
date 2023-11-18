import { Utils, createVisualComponent, Content, useSession, Lsi } from "uu5g05";
import React, { useState, useEffect } from 'react';
import UserProfileForm from './user-profile-form';
import WelcomeRow from './welcome-row';
import Uu5Elements from "uu5g05-elements";
import Plus4U5Elements from "uu_plus4u5g02-elements";
import importLsi from "../lsi/import-lsi.js";
import { Placeholder } from "react-bootstrap";

const UserProfile = ({ onSave }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [userSettings, setUserSettings] = useState({
      gender: 'Male',
      height: 175,
      weight: 70,
      age: 25,
    });
  
    const handleEdit = () => {
      setIsEditing(true);
    };
  
    const handleSave = (data) => {
      onSave(data);
      setIsEditing(false);
    };
  
    const { identity } = useSession();
  
    return (
      <div>
        <WelcomeRow left={<Plus4U5Elements.PersonPhoto size="xl" borderRadius="none" />}>
          <Uu5Elements.Text category="story" segment="heading" type="h2" style={{ color: 'orange', alignItems: 'center' }}>
            <Lsi import={importLsi} path={["Home", "welcome"]} />
          </Uu5Elements.Text>
          {identity && (
            <Uu5Elements.Text category="story" segment="heading" type="h2">
              {identity.name}
            </Uu5Elements.Text>
          )}
        </WelcomeRow>
  
        {isEditing ? (
          <UserProfileForm onSave={handleSave} initialData={userSettings} />
        ) : (
          <div className="profile-info" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', height:'100vh'}}>
            
            <p>Gender: <a style={{color:'orange'}}>{userSettings.gender} </a></p>
            <p>Height: <a style={{color:'orange'}}>{userSettings.height}</a> cm</p>
            <p>Weight: <a style={{color:'orange'}}>{userSettings.weight}</a> kg</p>
            <p>Age: <a style={{color:'orange'}}>{userSettings.age}</a> years</p>
            <button style={{ width: '120px', padding: '7px', borderRadius: '20px', backgroundColor: 'orange', color: 'black', margin:'25px' }} onClick={handleEdit}>
              Edit
            </button>
          </div>
        )}
      </div>
    );
  };
  
  export default UserProfile;