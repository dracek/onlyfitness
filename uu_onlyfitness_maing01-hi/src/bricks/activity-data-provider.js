//@@viewOn:imports
import { createComponent, useSession, useState } from "uu5g05";
import { Children, cloneElement } from "react";
import Config from "./config/config.js";
import Calls from "calls";
import ActivityContext from "./activity-context.js";
import { useAlertBus } from "uu5g05-elements";
//@@viewOff:imports

//@@viewOn:constants
//@@viewOff:constants

//@@viewOn:helpers
//@@viewOff:helpers

const STATUS_DONE = "DONE";
const STATUS_WAITING = "WAITING";
const STATUS_ERROR = "ERROR";

const ActivityDataProvider = createComponent({
  //@@viewOn:statics
  uu5Tag: Config.TAG + "ActivityDataProvider",
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
    const { addAlert } = useAlertBus();

    function infoMsg(msg){
      addAlert(Object.assign({
        priority: "success",
        durationMs: 3000,
      }, msg));
    }

    function alertMsg(msg){
      addAlert(Object.assign({
        header: "Error",
        priority: "error",
      }, msg));
    }

    async function getActivity() {
      try {
        setStatus(STATUS_WAITING);
        let res = await Calls.getActivity({ id: identity.uuIdentity });
        setStatus(STATUS_DONE);
        setData(res);
      } catch (error) {
        setStatus(STATUS_ERROR);
        alertMsg({message: 'Cannot get activity.'})
        //console.error("NOT GOOD", error);
      }
    }

    async function saveActivity(data) {
      try {
        setStatus(STATUS_WAITING);
        let res = await Calls.saveActivity({ id: identity.uuIdentity, ...data });
        setStatus(STATUS_DONE);
        setData(res);
        infoMsg({message: 'Successfully saved.'})
      } catch (error) {
        setStatus(STATUS_ERROR);
        alertMsg({message: 'Cannot save activity.'})
        //console.error("NOT GOOD", error);
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
        getActivity,
        saveActivity
      }
    };

    return (<ActivityContext.Provider value={ newValue }>
      {children}
    </ActivityContext.Provider>);

    //@@viewOff:render
  },
});

//@@viewOn:exports
export { ActivityDataProvider };
export default ActivityDataProvider;
//@@viewOff:exports
