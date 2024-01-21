import { Utils, createVisualComponent, Content, useSession, Lsi } from "uu5g05";
import React, { useEffect, useState, useContext } from 'react';
import UserProfileForm from '../user-profile-form';
import WelcomeRow from '../welcome-row';
import Uu5Elements from "uu5g05-elements";
import Plus4U5Elements from "uu_plus4u5g02-elements";
import importLsi from "../../lsi/import-lsi.js";
import Config from "../config/config.js";

import ChallengeContext from "./challenge-context";

const Css = {
  profileInfo: () =>
    Config.Css.css({
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      height:'100vh'
    }),
  
  
};

const ChallengeRow = (props) => {

    const { callsMap, categoryData }  = useContext(ChallengeContext);
    const {data} = props;

    const convertCat = (categoryId) => {
      const cat = categoryData.find(c => c.id === categoryId);
      return cat ? cat.name : "unknown";
    }

    return (
      <div>{convertCat(data.categoryId)} - {data.value} hours - <span onClick={() => props.onEdit(data)}>EDIT</span> - <span onClick={() => props.onDelete(data.id)}>DEL</span> </div>
    );
  };
  
  export default ChallengeRow;