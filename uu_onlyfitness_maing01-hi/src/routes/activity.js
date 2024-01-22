//@@viewOn:imports
import { createVisualComponent, Utils } from "uu5g05";
import RouteBar from "../core/route-bar.js";
import ActivityDataProvider from "../bricks/activity/activity-data-provider.js";
import ActivityList from "../bricks/activity/activity-list.js";
import Config from "./config/config.js";
//@@viewOff:imports

//@@viewOn:constants
//@@viewOff:constants

//@@viewOn:css
const Css = {
  main: () =>
    Config.Css.css({
    }),
};
//@@viewOff:css

//@@viewOn:helpers
//@@viewOff:helpers

const Activity = createVisualComponent({
  //@@viewOn:statics
  uu5Tag: Config.TAG + "ActivityList",
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
    //@@viewOff:private

    //@@viewOn:interface
    //@@viewOff:interface

    //@@viewOn:render
    const attrs = Utils.VisualComponent.getAttrs(props, Css.main());
    const currentNestingLevel = Utils.NestingLevel.getNestingLevel(props, Activity);

    return currentNestingLevel ? (
      <div {...attrs}>
        <RouteBar />
        <ActivityDataProvider>
          <ActivityList />
        </ActivityDataProvider>
      </div>
    ) : null;
  },
});

//@@viewOn:exports
export { Activity };
export default Activity;
//@@viewOff:exports
