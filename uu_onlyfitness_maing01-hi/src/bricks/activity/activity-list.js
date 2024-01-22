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
import { Modal } from "uu5g05-elements";

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

    const [showCreateModal, setShowCreateModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);

    const [currentItem, setCurrentItem] = useState(undefined);

    useEffect(() => {
      callsMap.listCategories();
      callsMap.listActivities();
    }, []);

    // create

    const onCreateClick = () => {
      setShowCreateModal(true);
    }

    const handleCreateSubmit = (data) => {
      callsMap.saveActivity(data);
      setShowCreateModal(false);
    };

    const handleCreateCancel = () => {
        setShowCreateModal(false);
    };

    // create

    const onEditClick = (item) => {
      setCurrentItem(item);
      setShowEditModal(true);
    }

    const handleEditSubmit = (data) => {
      callsMap.editActivity({...data, id: currentItem.id});
      setShowEditModal(false);
      setCurrentItem(undefined);
    };

    const handleEditCancel = () => {
      setShowEditModal(false);
      setCurrentItem(undefined);
    };
  
    const { identity } = useSession();

    const createHeader = "Create activity";
    const editHeader = "Edit activity";
  
    return (
      <div>
        <WelcomeRow>
          <h1>Activity page</h1>
        </WelcomeRow>

        <WelcomeRow>
          <p onClick={onCreateClick}>create new activity</p>
        </WelcomeRow>

        <WelcomeRow>
          <ActivityTable onEditClick={onEditClick}/>
        </WelcomeRow>

        <Modal
          header={createHeader}
          open={showCreateModal}
          onClose={handleCreateCancel}
          collapsible={false}
          children={<ActivityForm onCancel={handleCreateCancel} onSave={handleCreateSubmit} categoryData={categoryData} />}
        />

        <Modal
          header={editHeader}
          open={showEditModal}
          onClose={handleEditCancel}
          collapsible={false}
          children={<ActivityForm data={currentItem} onCancel={handleEditCancel} onSave={handleEditSubmit} categoryData={categoryData} />}
        />

      </div>
    );
  };
  
  export default ActivityList;