//@@viewOn:imports
import React, { useState, useContext } from "react";
import PropTypes from 'prop-types';
import { createVisualComponent, Utils } from "uu5g05";
import RouteBar from "../core/route-bar.js";
import TimerClock from "../bricks/timer-clock.js";
import Config from "./config/config.js";
import { useSession } from "uu5g05";
import ActivityForm from "../bricks/activity-form.js";
import ActivityContext from "../bricks/activity-context.js";
import Calls from "../calls.js";
//@@viewOff:imports

//@@viewOn:constants
//@@viewOff:constants

//@@viewOn:css
const Css = {
  main: () => Config.Css.css({
    backgroundColor: 'black',
    color: 'white',
    height: '100rem'
  }),
  select: () => Config.Css.css({
    border: '1px solid orange',
    margin: '7px',
    borderRadius: '20px',
    padding: '5px',
    backgroundColor: 'black',
    color: 'white',
    width: '150px'
  }),
  
};
//@@viewOff:css

//@@viewOn:helpers
//@@viewOff:helpers

const Timer = createVisualComponent({
    //@@viewOn:statics
    uu5Tag: Config.TAG + "Timer",
    nestingLevel: ["areaCollection", "area"],
    //@@viewOff:statics
  
    propTypes: {
      categories: PropTypes.array.isRequired,
    },
  
    defaultProps: {
      categories: [],
    },
  
    render(props) {
        const { identity } = useSession();
        const { callsMap, categoryData } = useContext(ActivityContext);
        const [elapsedTime, setElapsedTime] = useState(null); // Define elapsedTime state
        const selectedCategory = categoryData && categoryData.length > 0 ? categoryData[0].id : null;
    
        const handleTimerStop = async (time) => {
          setElapsedTime(time); // Update elapsedTime state when timer stops
    
          if (selectedCategory) {
            const activityDate = new Date().toISOString().split('T')[0];
            const activityData = {
              categoryId: selectedCategory,
              activityDate,
              time,
              userId: identity?.uuIdentity 
            };
    
            try {
              const savedActivity = await Calls.saveActivity(activityData);
              console.log("Activity saved successfully", savedActivity);
            } catch (error) {
              console.error("Error saving activity:", error);
            }
          }
        };
  
      //@@viewOff:private
  
      //@@viewOn:render
      const attrs = Utils.VisualComponent.getAttrs(props, Css.main());
  
      return (
        <div {...attrs}>
          <RouteBar />
          <TimerClock onTimerStop={handleTimerStop} />
          <ActivityForm elapsedTime={elapsedTime} />
        </div>
      );
    },
  });
  
  //@@viewOn:exports
  export { Timer };
  export default Timer;
  //@@viewOff:exports