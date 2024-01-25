//@@viewOn:imports
import { createComponent, useSession, useState } from "uu5g05";
import { Children, cloneElement } from "react";
import Config from "../config/config.js";
import Calls from "calls";
import HomeContext from "./home-context.js";
import { useAlertBus } from "uu5g05-elements";
import { DateTime } from "luxon"; 
//@@viewOff:imports

//@@viewOn:constants
//@@viewOff:constants

//@@viewOn:helpers
//@@viewOff:helpers

const STATUS_DONE = "DONE";
const STATUS_WAITING = "WAITING";
const STATUS_ERROR = "ERROR";

const HomeDataProvider = createComponent({
  //@@viewOn:statics
  uu5Tag: Config.TAG + "ChallengeDataProvider",
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
    const [challengeData, setChallengeData] = useState([]);
    const [categoryData, setCategoryData] = useState([]);
    const [activityData, setActivityData] = useState([]);
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

    async function listCategories() {
      try {
        setStatus(STATUS_WAITING);
        let res = await Calls.listCategories();
        setCategoryData(res.itemList);
        setStatus(STATUS_DONE);
      } catch (error) {
        setStatus(STATUS_ERROR);
        alertMsg({message: 'Cannot get categories.'})
      }
    }

    async function listChallenges() {
      try {
        setStatus(STATUS_WAITING);
        let res = await Calls.listChallenges();
        setChallengeData(res.itemList);
        setStatus(STATUS_DONE);
      } catch (error) {
        setStatus(STATUS_ERROR);
        alertMsg({message: 'Cannot get challenges.'})
      }
    }

    
    async function listActivities() {

      const now = DateTime.now();
      const first = now.startOf('month');
      const from = first.toFormat('yyyy-MM-dd');
      const to = first.plus({months: 1}).toFormat('yyyy-MM-dd');
      const filter = {from: from, to: to};

      try {
        setStatus(STATUS_WAITING);
        let res = await Calls.listActivities(filter);
        setActivityData(res.itemList);
        setStatus(STATUS_DONE);
      } catch (error) {
        setStatus(STATUS_ERROR);
        alertMsg({message: 'Cannot get activities.'})
      }
    }

    //@@viewOff:private

    //@@viewOn:interface
    //@@viewOff:interface

    //@@viewOn:render
    const newValue = {
      status: status,
      challengeData, 
      categoryData,
      activityData,
      callsMap: {
        listCategories,
        listChallenges,
        listActivities
      }
    };

    return (<HomeContext.Provider value={ newValue }>
      {children}
    </HomeContext.Provider>);

    //@@viewOff:render
  },
});

//@@viewOn:exports
export { HomeDataProvider };
export default HomeDataProvider;
//@@viewOff:exports
