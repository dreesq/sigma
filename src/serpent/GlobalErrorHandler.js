import React, {Component} from 'react';
import {ACTION_ERROR} from "../../constants";
import {S} from "../components";
import ActionAlert from "./ActionAlert";

class GlobalErrorHandler extends Component {
  render() {
    return null;
  }
}

GlobalErrorHandler.contextTypes = {
  client: () => null
};

export default GlobalErrorHandler;
