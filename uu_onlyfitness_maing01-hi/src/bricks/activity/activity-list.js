import React, { useEffect, useState, useContext } from 'react';
import { Utils } from "uu5g05";
import Config from "../config/config.js";
import ActivityContext from "./activity-context.js";
import ActivityForm from "./activity-form"
import { Modal, Button } from "uu5g05-elements";
import ActivityRow from "./activity-row.js";
import ConfirmModal from "../confirm-modal";
import Uu5Forms from "uu5g05-forms";

import { DateTime } from "luxon";

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
  createButton: () =>  
    Config.Css.css({
      margin: "25px",
      minHeight: "50px",
      "& > button": {
        color: "white",
        padding: "19px",
        border: "1px solid orange",
        marginLeft: "10px",
        marginTop: "5px",
        "&:hover": {
          color:'orange',
        },
        borderRadius: "20px"
      }
    }),
  cal: () => 
    Config.Css.css({
      "& > input": {
        color:'black',
        backgroundColor: "orange",
        borderRadius: "20px",
        outline:'0px !important',
        border: "0px solid black !important",
        boxShadow: "none !important"
      },
      "& > input:focus": {
        paddingTop: "-5px",
        position: "relative",
        top: "-5px"
      },

  })
  
};

const ActivityList = (props) => {
    const { callsMap, activityData, categoryData }  = useContext(ActivityContext);

    const [showCreateModal, setShowCreateModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

    const [currentId, setCurrentId] = useState(undefined);
    const [currentItem, setCurrentItem] = useState(undefined);

    const [month, setMonth] = useState(undefined);

    const setMonthFilter = (month) => {
      setMonth(month);
      const from =  month + "-01";
      const fr = DateTime.fromISO(from);
      const to = fr.plus({months: 1}).toFormat('yyyy-MM-dd');
      const filter = {from: from, to: to};

      callsMap.setFilter(filter)
      callsMap.listActivities(filter);
    }

    useEffect(() => {
      const now = DateTime.now();
      const first = now.startOf('month');
      setMonthFilter(first.toFormat('yyyy-MM'));

      callsMap.listCategories();
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

    console.log(month);

    return (
      <div {...attrs}>

        <h1>Activity page</h1>

        <div className={Css.createButton()}>
          <Uu5Forms.Month.Input size="l" value={month} className={Css.cal()} clearIcon={null} onChange={(event)=> setMonthFilter(event.data.value)} />
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