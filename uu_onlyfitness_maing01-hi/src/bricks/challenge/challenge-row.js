import React, { useContext } from 'react';
import { Button, Icon } from "uu5g05-elements";
import Config from "../config/config.js";

import ChallengeContext from "./challenge-context";

const Css = {
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
};

const ChallengeRow = (props) => {

    const { categoryData }  = useContext(ChallengeContext);
    const {data} = props;

    const convertCat = (categoryId) => {
      const cat = categoryData.find(c => c.id === categoryId);
      return cat ? cat.name : "unknown";
    }

    return (
      <div>{convertCat(data.categoryId)} {data.value} hours 
        <Button className={Css.editButton()} onClick={() => props.onEdit(data)}>
          <Icon icon="mdi-pencil" />
        </Button>
        <Button className={Css.deleteButton()} onClick={() => props.onDelete(data.id)}>
          <Icon icon="mdi-trash-can" />
        </Button>
      </div>
    );
  };
  
  export default ChallengeRow;