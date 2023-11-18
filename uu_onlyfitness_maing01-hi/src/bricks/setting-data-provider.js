//@@viewOn:imports
import { createComponent, useSession, useState } from "uu5g05";
import { Children, cloneElement } from "react";
import Config from "./config/config.js";
import Calls from "calls";
import SettingsContext from "./settings-context.js";
//@@viewOff:imports

//@@viewOn:constants
//@@viewOff:constants

//@@viewOn:helpers
//@@viewOff:helpers

const STATUS_DONE = "DONE";
const STATUS_WAITING = "WAITING";
const STATUS_ERROR = "ERROR";

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
    const [status, setStatus] = useState(STATUS_DONE);
    const [data, setData] = useState({});

    async function getUserSetting() {
      try {
        setStatus(STATUS_WAITING);
        let res = await Calls.getUserSetting({ id: identity.uuIdentity });
        setStatus(STATUS_DONE);
        console.log("FETCHED", res);
        setData(res);

      } catch (error) {
        setStatus(ERROR);
        console.error("NOT GOOD", error);
      }
    }

    async function saveUserSetting(data) {
      try {
        setStatus(STATUS_WAITING);
        let res = await Calls.saveUserSetting({ id: identity.uuIdentity, ...data });
        setStatus(STATUS_DONE);
        console.log("FETCHED", res);
        setData(res);

      } catch (error) {
        setStatus(ERROR);
        console.error("NOT GOOD", error);
      }
    }
    //@@viewOff:private

    //@@viewOn:interface
    //@@viewOff:interface

    //@@viewOn:render
    const newValue = {
      status: status, 
      data,
      callsMap: {
        getUserSetting,
        saveUserSetting
      }
    };

    return (<SettingsContext.Provider value={ newValue }>
      {children}
    </SettingsContext.Provider>);

    //@@viewOff:render
  },
});

//@@viewOn:exports
export { SettingDataProvider };
export default SettingDataProvider;
//@@viewOff:exports
