import { Utils } from "uu5g05";
import React, { useEffect, useState, useContext } from 'react';
import Config from "../config/config.js";
import { Modal, Button } from "uu5g05-elements";

import ChallengeContext from "./challenge-context";
import ChallengeRow from "./challenge-row";
import ConfirmModal from "../confirm-modal";
import ChallengeForm from "./challenge-form";


function filterUsedCategories (categoryData, usedIds, currentItem) {
  return categoryData.filter(cat => !usedIds.includes(cat.id) || (currentItem && currentItem.categoryId === cat.id));
}

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
  challenges: () =>  
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
      "& button": {
        color: "white",
        padding: "25px",
        border: "1px solid orange",
        "&:hover": {
          color:'orange',
        }
      }
    }),    
};

const ChallengeList = (props) => {
    const { callsMap, categoryData, challengeData }  = useContext(ChallengeContext);

    const [showCreateModal, setShowCreateModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
    const [currentId, setCurrentId] = useState(undefined);
    const [currentItem, setCurrentItem] = useState(undefined);

    useEffect(() => {
      callsMap.listCategories();
      callsMap.listChallenges();
    }, []);

    // delete

    const onDeleteClick = (id) => {
      setCurrentId(id);
      setShowDeleteConfirm(true);
    }

    const handleDeleteSubmit = () => {
      callsMap.deleteChallenge(currentId);
      setShowDeleteConfirm(false);
      setCurrentId(undefined);
    };

    const handleDeleteCancel = () => {
      setShowDeleteConfirm(false);
      setCurrentId(undefined);
    };

    // create
  
    const onCreateClick = () => {
      setShowCreateModal(true);
    }

    const handleCreateSubmit = (data) => {
      callsMap.saveChallenge(data);
      setShowCreateModal(false);
    };

    const handleCreateCancel = () => {
        setShowCreateModal(false);
    };

    // edit

    const onEditClick = (item) => {
      setCurrentItem(item);
      setShowEditModal(true);
    }

    const handleEditSubmit = (data) => {
      callsMap.editChallenge({...data, id: currentItem.id});
      setShowEditModal(false);
      setCurrentItem(undefined);
    };

    const handleEditCancel = () => {
      setShowEditModal(false);
      setCurrentItem(undefined);
    };

    const confirmHeader = "Really delete this chalenge?";
    const createHeader = "Create challenge";
    const editHeader = "Edit challenge";

    const noData = challengeData.length === 0;

    const usedCategories = challengeData.map(ch => ch.categoryId);
    const availableCategories = filterUsedCategories(categoryData, usedCategories);
    const availableEditCategories = filterUsedCategories(categoryData, usedCategories, currentItem);

    const attrs = Utils.VisualComponent.getAttrs(props, Css.main());

    return (
      <div {...attrs}>

        <h1>Challenge page</h1>

        <div className={Css.createButton()}>
          {(availableCategories.length > 0) ? <Button onClick={onCreateClick}>create new challenge</Button> : <p>all categories occupied</p>}
        </div>

        {!noData && <div className={Css.challenges()} >
          {challengeData.map(ch => <ChallengeRow key={ch.id} data={ch} onDelete = {onDeleteClick} onEdit={onEditClick} />)}
        </div>}

        {noData && <div>
          No challenges yet :(
        </div>}

        <ConfirmModal open={showDeleteConfirm} header={confirmHeader} onSubmit={handleDeleteSubmit} onClose={handleDeleteCancel} />

        <Modal
          header={createHeader}
          open={showCreateModal}
          onClose={handleCreateCancel}
          collapsible={false}
          children={<ChallengeForm categoryData={availableCategories} onSave={handleCreateSubmit} onCancel={handleCreateCancel}/>}
        />

        <Modal
          header={editHeader}
          open={showEditModal}
          onClose={handleEditCancel}
          collapsible={false}
          children={<ChallengeForm data={currentItem} categoryData={availableEditCategories} onSave={handleEditSubmit} onCancel={handleEditCancel}/>}
        />

      </div>
    );
  };
  
  export default ChallengeList;