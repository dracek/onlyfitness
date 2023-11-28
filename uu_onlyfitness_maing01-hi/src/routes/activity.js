//@@viewOn:imports
import { createVisualComponent, Utils, Content } from "uu5g05";
import RouteBar from "../core/route-bar.js";
import Timer from "../bricks/timer.js";


import ActivityDataProvider from "../bricks/setting-data-provider.js";
import Settings from "../bricks/settings.js";
import Config from "./config/config.js";
import {useState} from "react";
//@@viewOff:imports

//@@viewOn:constants
//@@viewOff:constants

//@@viewOn:css
const Css = {
  main: () => Config.Css.css({
    backgroundColor:'black',
    color:'white'
  }),
};
//@@viewOff:css

//@@viewOn:helpers
//@@viewOff:helpers

const Activity = createVisualComponent({
  //@@viewOn:statics
  uu5Tag: Config.TAG + "Activity",
  nestingLevel: ["areaCollection", "area"],
  //@@viewOff:statics

  //@@viewOn:propTypes
  propTypes: {},
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {},
  //@@viewOff:defaultProps

  render(props) {
    //@@viewOn:private
    const { children } = props;
    //@@viewOff:private

    //@@viewOn:interface
    //@@viewOff:interface

    //@@viewOn:render
    const attrs = Utils.VisualComponent.getAttrs(props, Css.main());
    const currentNestingLevel = Utils.NestingLevel.getNestingLevel(props, Activity);
    const [selectedPlan, setSelectedPlan] = useState('');

    const handlePlanSelect = (plan) => {
      console.log(`Selected plan: ${plan}`);
      // Add your logic to handle the selected plan here
    };

    return currentNestingLevel ? (
      <div {...attrs}>
        <RouteBar />
        <ActivityDataProvider>

     <Timer />
        </ActivityDataProvider>
      </div>
    ) : null;
  },
});

//@@viewOn:exports
export { Activity };
export default Activity;
//@@viewOff:exports
