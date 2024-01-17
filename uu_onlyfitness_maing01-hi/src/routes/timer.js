//@@viewOn:imports
import React, { useState, useContext } from "react";
import PropTypes from 'prop-types'; 
import { createVisualComponent, Utils } from "uu5g05";
import RouteBar from "../core/route-bar.js";
import TimerClock from "../bricks/timer-clock.js";
import Config from "./config/config.js";
import ActivityContext from "../bricks/activity-context.js";
import { useSession } from "uu5g05";
import ActivityDataProvider from "../bricks/activity-data-provider.js";
//@@viewOff:imports

//@@viewOn:constants
//@@viewOff:constants

//@@viewOn:css
const Css = {
  main: () => Config.Css.css({
    backgroundColor: 'black',
    color: 'white'
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

  //@@viewOn:propTypes
  propTypes: {
    categories: PropTypes.array.isRequired,
  },
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {
    categories: [],
  },
  //@@viewOff:defaultProps

  render(props) {
    const { identity } = useSession();
    const { callsMap, categoryData } = useContext(ActivityContext);
    const predefinedCategories = [
        { id: 'Running', name: 'Running' },
        { id: 'Walking', name: 'Walking' },
        { id: 'Swimming', name: 'Swimming' },
        { id: 'Biking', name: 'Biking' }

      ];
      const [selectedCategory, setSelectedCategory] = useState(predefinedCategories[0].id);

      const handleCategoryChange = (event) => {
        setSelectedCategory(event.target.value);
      };
  
      const handleTimerStop = (elapsedTime) => {
        const activityDate = new Date().toISOString().split('T')[0];
        const activityData = {
          categoryId: selectedCategory,
          activityDate,
          time: elapsedTime,
          userId: identity?.uuIdentity 
        };
      
        if (callsMap && callsMap.saveActivity) {
          callsMap.saveActivity(activityData).then(() => {
            console.log("Activity saved successfully");
          }).catch(error => {
            console.error("Error saving activity:", error);
          });
        } else {
          console.error("saveActivity function is not available");
        }
      };
    //@@viewOff:private

    //@@viewOn:render
    const attrs = Utils.VisualComponent.getAttrs(props, Css.main());

    return (
        <div {...attrs}>
          <RouteBar />
          <ActivityDataProvider>
          <div>
            <label htmlFor={"categoryId"}>Category:</label>
            <select
              name="categoryId"
              value={selectedCategory}
              onChange={handleCategoryChange}
              className={Css.select()}
            >
              {predefinedCategories.map(cat => (
                <option key={cat.id} value={cat.id}>{cat.name}</option>
              ))}
            </select>
          </div>
          <TimerClock onTimerStop={handleTimerStop} />
          </ActivityDataProvider>
        </div>
        
      );
    },
  });
  


//@@viewOn:exports
export { Timer };
export default Timer;
//@@viewOff:exports
