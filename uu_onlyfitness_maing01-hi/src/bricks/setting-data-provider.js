//@@viewOn:imports
import { createComponent, useSession, useState } from "uu5g05";
import { Children, cloneElement } from "react";
import Config from "./config/config.js";
import Calls from "calls";
//@@viewOff:imports

//@@viewOn:constants
//@@viewOff:constants

//@@viewOn:helpers
//@@viewOff:helpers

const SettingDataProvider = createComponent({
  //@@viewOn:statics
  uu5Tag: Config.TAG + "SettingDataProvider",
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

    const { identity } = useSession();
    const [data, setData] = useState(null);

    //console.log(identity, "---");


    async function getUserSetting() {
      try {
        let res = await Calls.getUserSetting({ id: identity.uuIdentity });
        console.log("FETCHED", res);
        setData(res);

      } catch (error) {
        console.error("NOT GOOD", error);
      }
    }
    //@@viewOff:private

    //@@viewOn:interface
    //@@viewOff:interface

    //@@viewOn:render
    const newProps = { 
      data,
      callsMap: {
        getUserSetting,
      }
    };



    return (<>
      {Children.map(children, (child) =>
        cloneElement(child, newProps)
      )}
    </>);

    //@@viewOff:render
  },
});

//@@viewOn:exports
export { SettingDataProvider };
export default SettingDataProvider;
//@@viewOff:exports
