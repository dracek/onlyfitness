//@@viewOn:imports
import { createComponent } from "uu5g05";
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

    async function handleTest(values) {

      console.log("testin' time!", values);

      try {
        let res = await Calls.test();
        console.log("FETCHED");
        console.log(res);
        return res;

      } catch (error) {
        console.log("NOT GOOD");
        console.error(error);
      }
    }


    //@@viewOff:private

    //@@viewOn:interface
    //@@viewOff:interface

    //@@viewOn:render
    const data = { 
      name: "data test",
      callsMap: {
        handleTest: handleTest
      }
      
    }; // data propagation test



    return (<>
      {Children.map(children, (child) =>
        cloneElement(child, data)
      )}
    </>);

    //@@viewOff:render
  },
});

//@@viewOn:exports
export { SettingDataProvider };
export default SettingDataProvider;
//@@viewOff:exports
