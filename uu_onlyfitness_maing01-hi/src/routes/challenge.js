//@@viewOn:imports
import { createVisualComponent, Utils } from "uu5g05";
import { withRoute } from "uu_plus4u5g02-app";
import ChallengeDataProvider from "../bricks/challenge/challenge-data-provider.js";
import ChallengeList from "../bricks/challenge/challenge-list.js";

import RouteBar from "../core/route-bar.js";
import Config from "./config/config.js";

//@@viewOff:imports

//@@viewOn:constants
//@@viewOff:constants

//@@viewOn:css
const Css = {
  main: () => Config.Css.css({
  }),
};
//@@viewOff:css

//@@viewOn:helpers
//@@viewOff:helpers

let Challenge = createVisualComponent({
  //@@viewOn:statics
  uu5Tag: Config.TAG + "Challenge",
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
    const currentNestingLevel = Utils.NestingLevel.getNestingLevel(props, Challenge);
   
    return currentNestingLevel ? (
      <div {...attrs}>
        <RouteBar />
        <ChallengeDataProvider>
          <ChallengeList />
        </ChallengeDataProvider>
      </div>
    ) : null;
  },
});

Challenge = withRoute(Challenge, { authenticated: true });

//@@viewOn:exports
export { Challenge };
export default Challenge;
//@@viewOff:exports
