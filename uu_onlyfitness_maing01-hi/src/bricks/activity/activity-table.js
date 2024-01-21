import { Utils, createVisualComponent, Content, useSession, Lsi } from "uu5g05";
import React, { useEffect, useState, useContext } from 'react';
import UserProfileForm from '../user-profile-form';
import WelcomeRow from '../welcome-row';
import Uu5Elements from "uu5g05-elements";
import Plus4U5Elements from "uu_plus4u5g02-elements";
import importLsi from "../../lsi/import-lsi.js";
import Config from "../config/config.js";
import ActivityContext from "./activity-context.js";
import ActivityRow from "./activity-row.js";

import ConfirmModal from "../confirm-modal";

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

    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
    const [currentId, setCurrentId] = useState(undefined);

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

    const onDeleteClick = (id) => {
      setCurrentId(id);
      setShowDeleteConfirm(true);
    }

    const handleDeleteSubmit = () => {
      callsMap.deleteActivity(currentId);
      setCurrentId(undefined);
      setShowDeleteConfirm(false);
    };

    const handleDeleteCancel = () => {
      setCurrentId(undefined);
      setShowDeleteConfirm(false);
    };

    const confirmHeader = "Really delete this activity?";

    return (
      <div className={Css.acts()} >
        {activityData.map(act => <ActivityRow key={act.id} data={act} onDelete = {onDeleteClick} />)}
        <ConfirmModal open={showDeleteConfirm} header={confirmHeader} onSubmit={handleDeleteSubmit} onClose={handleDeleteCancel} />
      </div>
    );
  };
  
  export default ActivityTable;