//@@viewOn:imports
import { createComponent } from "uu5g05";
import { Children, cloneElement } from "react";
import Config from "./config/config.js";
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

    //@@viewOff:private

    //@@viewOn:interface
    //@@viewOff:interface

    //@@viewOn:render
    const value = { name: "data test"}; // data propagation test

    return (<>
      {Children.map(children, (child, index) =>
        cloneElement(child, value)
      )}
    </>);

    //@@viewOff:render
  },
});

//@@viewOn:exports
export { SettingDataProvider };
export default SettingDataProvider;
//@@viewOff:exports
