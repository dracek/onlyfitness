import { Utils, createVisualComponent, Content, useSession, Lsi } from "uu5g05";
import React, { useEffect, useState, useContext } from 'react';
import WelcomeRow from '../welcome-row';
import Uu5Elements from "uu5g05-elements";
import Plus4U5Elements from "uu_plus4u5g02-elements";
import importLsi from "../../lsi/import-lsi.js";
import Config from "../config/config.js";
import { Modal } from "uu5g05-elements";

import ChallengeContext from "./challenge-context";
import ChallengeRow from "./challenge-row";
import ConfirmModal from "../confirm-modal";

import ChallengeForm from "./challenge-form";


function filterUsedCategories (categoryData, usedIds, currentItem) {
  return categoryData.filter(cat => !usedIds.includes(cat.id) || (currentItem && currentItem.categoryId === cat.id));
}

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

    //const { identity } = useSession();


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

    return (
      <div>
        <WelcomeRow>
          <h1>Challenge page</h1>
        </WelcomeRow>

        <WelcomeRow>
          { (availableCategories.length > 0) ? <p onClick={onCreateClick}>create new challenge</p> : <p>no available category</p>}
        </WelcomeRow>

        {!noData && <WelcomeRow>
          {challengeData.map(ch => <ChallengeRow key={ch.id} data={ch} onDelete = {onDeleteClick} onEdit={onEditClick} />)}
        </WelcomeRow>}

        {noData && <WelcomeRow>
          No data, sorry
        </WelcomeRow>}

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