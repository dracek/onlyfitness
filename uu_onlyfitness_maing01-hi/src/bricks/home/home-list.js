import { Utils } from "uu5g05";
import React, { useEffect, useContext } from 'react';
import Config from "../config/config.js";
import HomeContext from "./home-context.js";
import { ProgressBar } from "uu5g04-bricks";

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
      },
      "& h1": {
        marginBottom: "45px"  
      }
    }),

  challengeRow: () =>  
    Config.Css.css({
      color:'orange',
      marginBottom: "45px",
      "& > div": {
        marginTop: "7px",
      }
    }),

  noChal: () =>  
    Config.Css.css({
      marginBottom: "45px"
    }),  
};

const HomeList = (props) => {
    const { callsMap, categoryData, challengeData, activityData }  = useContext(HomeContext);

    useEffect(() => {
      callsMap.listCategories();
      callsMap.listChallenges();
      callsMap.listActivities();
    }, []);

    const attrs = Utils.VisualComponent.getAttrs(props, Css.main());

    let activityMap = {};
    for (const data of activityData) {
      const currCount = activityMap[data.categoryId] ?? 0;
      activityMap[data.categoryId] = currCount + data.time;
    }

    const noData = challengeData.length == 0;
    
    const otherAct = Object.keys(activityMap).filter(catId => !challengeData.some(ch => ch.categoryId === catId));

    return (
      <div {...attrs}>
        <h1>Home</h1>

        {noData && <div className={Css.noChal()} >
          No challenges yet :(
        </div>}

        {!noData && <div>
          {challengeData.map(ch => <ChallengeRow key={ch.id} challenge={ch} category={categoryData.find(c => c.id === ch.categoryId)} activity={activityMap[ch.categoryId]} />)}
        </div>}

        {(otherAct.length > 0) && <div>
          {otherAct.map(cat => <UnChallengeRow key={cat} category={categoryData.find(c => c.id === cat)} activity={activityMap[cat]} />)}
        </div>}
        
      </div>
    );
  };

  function toHoursAndMinutes(totalMinutes) {
    const minutes = totalMinutes % 60;
    const hours = Math.floor(totalMinutes / 60);
    return (hours > 0) ? `${hours}h ${minutes}min` : `${minutes}min`;
  }

  const ChallengeRow = (props) => {
    const activitySum = props.activity || 0; // minutes
    const activityHours = toHoursAndMinutes(activitySum);
    const progress = Math.round(100 * activitySum / (60 * props.challenge.value));

    return (
      <div className={Css.challengeRow()}>
        {props.category ? props.category.name : "Undefined"}: {activityHours} / {props.challenge.value}h 
        <ProgressBar progress={progress > 100 ? 100 : progress} striped colorSchema="orange" />
        
      </div>
    );
  }

  const UnChallengeRow = (props) => {
    const activitySum = props.activity || 0; // minutes
    const activityHours = toHoursAndMinutes(activitySum);

    return (
      <div className={Css.challengeRow()}>
        {props.category ? props.category.name : "Undefined"}: {activityHours} 
      </div>
    );
  }
  
  export default HomeList;