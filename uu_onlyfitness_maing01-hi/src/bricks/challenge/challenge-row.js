import React, { useContext } from 'react';
import { Button, Icon } from "uu5g05-elements";
import Config from "../config/config.js";

import ChallengeContext from "./challenge-context";

const Css = {
  row: () => 
    Config.Css.css({
      display: 'flex', 
      justifyContent: 'space-between', 
      alignItems: 'center', 
      borderRadius: '30px',
      padding: '10px 15px 0px 15px',
      boxShadow: '0 2px 4px rgba(255, 255, 255, 0.2)',
      outline: 'none', 
      '&:focus': {
        boxShadow: '0 0 5px rgba(255, 255, 255, 0.4)',
      }
    }),
    buttonsContainer: () => 
    Config.Css.css({
      display: 'flex',
      flexDirection: 'row',
    }),
  button: () => 
    Config.Css.css({
      color: "orange",
      marginLeft: '10px',
    }),
  editButton: () =>
    Config.Css.css({
      marginLeft: "10px",
      color: "orange"
    }),

  deleteButton: () =>
    Config.Css.css({
      marginLeft: "10px",
      color: "orange"
    }),
    text: () => 
    Config.Css.css({
     
    }),
};

const ChallengeRow = (props) => {

    const { categoryData }  = useContext(ChallengeContext);
    const {data} = props;

    const convertCat = (categoryId) => {
      const cat = categoryData.find(c => c.id === categoryId);
      return cat ? cat.name : "unknown";
    }

    return (
      <div className={Css.row()}>
        <div className={Css.text()}>
          {convertCat(data.categoryId)} {data.value} hours
        </div>
        <div className={Css.buttonsContainer()}>
          <Button className={Css.button()} onClick={() => props.onEdit(data)}>
            <Icon icon="mdi-pencil" />
          </Button>
          <Button className={Css.button()} onClick={() => props.onDelete(data.id)}>
            <Icon icon="mdi-trash-can" />
          </Button>
        </div>
      </div>
    );
};

  
  export default ChallengeRow;