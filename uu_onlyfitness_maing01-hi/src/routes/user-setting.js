//@@viewOn:imports
import { createVisualComponent, Utils, Content } from "uu5g05";
import RouteBar from "../core/route-bar.js";
import UserProfile from "../bricks/user-settings/user-profile.js";
import { withRoute } from "uu_plus4u5g02-app";
import SettingDataProvider from "../bricks/user-settings/setting-data-provider.js";
import Settings from "../bricks/user-settings/settings.js";
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

let UserSetting = createVisualComponent({
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
        <SettingDataProvider>
          <UserProfile />
        </SettingDataProvider>
      </div>
    ) : null;
  },
});

UserSetting = withRoute(UserSetting, { authenticated: true });

//@@viewOn:exports
export { UserSetting };
export default UserSetting;
//@@viewOff:exports
