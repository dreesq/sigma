import React, {Component} from 'react';
import {ACTION_CONFIRM, ACTION_CONFIRM_RESOLVE} from "../../constants";
import {S} from "../components";
import ConfirmModal from "../components/ConfirmModal";

class ActionConfirm extends Component {
  state = {
    action: '',
    payload: {}
  };

  componentDidMount() {
    const {client} = this.context;
    this.removeListener = client.events.on(ACTION_CONFIRM, ([id, action, payload]) => {
      this.setState({
        action,
        payload
      }, () => {
        this.confirmModal.confirm(
          () => client.events.emit(ACTION_CONFIRM_RESOLVE, [id, true]),
          () => client.events.emit(ACTION_CONFIRM_RESOLVE, [id, false])
        );
      });
    });
  }

  componentWillUnmount() {
    this.removeListener && this.removeListener();
  }

  render() {
    const {action, payload} = this.state;
    const {formatTitle, formatMessage} = this.props;

    const props = {
      title: formatTitle ? formatTitle(action, payload) : 'Confirm Action',
      message: formatMessage ? formatMessage(action, payload) : `Are you sure you want to ${action.replace( /([A-Z])/g, " $1" ).toLowerCase()}?`
    };
    
    return (
      <ConfirmModal
        ref={ref => this.confirmModal = ref}
        {...props}
      />
    );
  }
}

ActionConfirm.contextTypes = {
  client: () => null
};

export default ActionConfirm;
