//@@viewOn:imports
import { createVisualComponent, Utils, Content } from "uu5g05";
import RouteBar from "../core/route-bar.js";

import SettingDataProvider from "../bricks/setting-data-provider.js";
import Settings from "../bricks/settings.js";
import Config from "./config/config.js";
//@@viewOff:imports

//@@viewOn:constants
//@@viewOff:constants

//@@viewOn:css
const Css = {
  main: () => Config.Css.css({}),
};
//@@viewOff:css

//@@viewOn:helpers
//@@viewOff:helpers

const UserSetting = createVisualComponent({
  //@@viewOn:statics
  uu5Tag: Config.TAG + "UserSetting",
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
    const currentNestingLevel = Utils.NestingLevel.getNestingLevel(props, UserSetting);

    return currentNestingLevel ? (
      <div {...attrs}>
        <RouteBar />
        <div>Visual Component {UserSetting.uu5Tag}</div>
        <div>já sem nová komponenta totiš!</div>
        <SettingDataProvider>
          <Settings />
        </SettingDataProvider>
        <Content nestingLevel={currentNestingLevel}>{children}</Content>
      </div>
    ) : null;
    //@@viewOff:render
  },
});

//@@viewOn:exports
export { UserSetting };
export default UserSetting;
//@@viewOff:exports
