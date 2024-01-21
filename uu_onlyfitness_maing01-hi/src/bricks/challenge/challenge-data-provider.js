//@@viewOn:imports
import { createComponent, useSession, useState } from "uu5g05";
import { Children, cloneElement } from "react";
import Config from "../config/config.js";
import Calls from "calls";
import ChallengeContext from "./challenge-context.js";
import { useAlertBus } from "uu5g05-elements";
//@@viewOff:imports

//@@viewOn:constants
//@@viewOff:constants

//@@viewOn:helpers
//@@viewOff:helpers

const STATUS_DONE = "DONE";
const STATUS_WAITING = "WAITING";
const STATUS_ERROR = "ERROR";

const ChallengeDataProvider = createComponent({
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

    async function saveChallenge(data) {
      try {
        setStatus(STATUS_WAITING);
        let res = await Calls.saveChallenge(data);
        setStatus(STATUS_DONE);
        infoMsg({message: 'Successfully saved.'})
      } catch (error) {
        setStatus(STATUS_ERROR);
        alertMsg({message: 'Cannot save challenge.'})
      }
      listChallenges();
    }

    async function editChallenge(data) {
      try {
        setStatus(STATUS_WAITING);
        let res = await Calls.editChallenge(data);
        setStatus(STATUS_DONE);
        infoMsg({message: 'Successfully edited.'})
      } catch (error) {
        setStatus(STATUS_ERROR);
        alertMsg({message: 'Cannot edit challenge.'})
      }
      listChallenges();
    }

    async function deleteChallenge(id) {
      try {
        setStatus(STATUS_WAITING);
        let res = await Calls.deleteChallenge({ id: id });
        setStatus(STATUS_DONE);
      } catch (error) {
        setStatus(STATUS_ERROR);
        alertMsg({message: 'Cannot delete challenge.'})
      }
      listChallenges();
    }

    //@@viewOff:private

    //@@viewOn:interface
    //@@viewOff:interface

    //@@viewOn:render
    const newValue = {
      status: status,
      challengeData, 
      categoryData,
      callsMap: {
        listCategories,
        listChallenges,
        saveChallenge,
        editChallenge,
        deleteChallenge
      }
    };

    return (<ChallengeContext.Provider value={ newValue }>
      {children}
    </ChallengeContext.Provider>);

    //@@viewOff:render
  },
});

//@@viewOn:exports
export { ChallengeDataProvider };
export default ChallengeDataProvider;
//@@viewOff:exports
