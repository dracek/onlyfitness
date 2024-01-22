import React, { useEffect, useState, useContext } from 'react';
import { Utils } from "uu5g05";
import Config from "../config/config.js";
import ActivityContext from "./activity-context.js";
import ActivityForm from "./activity-form"
import { Modal, Button } from "uu5g05-elements";
import ActivityRow from "./activity-row.js";
import ConfirmModal from "../confirm-modal";

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
  acts: () =>  
    Config.Css.css({
      color:'orange',
      minHeight: "500px;",
      "& div": {
        marginBottom: "12px;"
      }
  }),  
};

const ActivityList = (props) => {
    const { callsMap, activityData, categoryData }  = useContext(ActivityContext);

    const [showCreateModal, setShowCreateModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

    const [currentId, setCurrentId] = useState(undefined);
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

    // delete

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

    const createHeader = "Create activity";
    const editHeader = "Edit activity";
    const confirmHeader = "Really delete this activity?";
  
    const attrs = Utils.VisualComponent.getAttrs(props, Css.main());

    return (
      <div {...attrs}>

        <h1>Activity page</h1>

        <div>
          <Button onClick={onCreateClick}>create new activity</Button>
        </div>

        <div className={Css.acts()} >
          {activityData.map(act => <ActivityRow key={act.id} data={act} onDelete = {onDeleteClick} onEdit={() => onEditClick(act)} />)}
        </div>

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

        <ConfirmModal open={showDeleteConfirm} header={confirmHeader} onSubmit={handleDeleteSubmit} onClose={handleDeleteCancel} />

      </div>
    );
  };
  
  export default ActivityList;