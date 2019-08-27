import React, {Component} from 'react';
import Alert from '../components/Alert';
import {Sigma} from "../components";

let Constants = {}

try {
  const Serpent = require('@dreesq/serpent-client')
  Constants = Serpent.Constants
} catch (e) {

}

class ActionAlert extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      color: 'primary',
      messages: {}
    };
  }

  componentDidMount() {
    const {
      listenSuccess = true,
      listenError = true
    } = this.props;

    const {client} = this.context;
    const events = {};

    if (listenError) {
      events[Constants.ACTION_ERROR] = this.onError;
    }

    if (listenSuccess) {
      events[Constants.ACTION_SUCCESS] = this.onSuccess;
    }

    this.listeners = client.events.multi(events);
  }

  componentWillUnmount() {
    this.listeners.unbind();
  }

  onError = ([action, errors]) => {
    const {actions = []} = this.props;

    if (!actions.includes(action) && !actions.includes('*')) {
      return;
    }

    this.setState({
      color: 'danger',
      visible: true,
      messages: errors
    });
  };

  onSuccess = ([action, result]) => {
    const {actions = []} = this.props;

    if (!actions.includes(action) && !actions.includes('*')) {
      return;
    }

    this.setState({
      color: 'success',
      messages: {}
    });
  };

  toggle = (visible = true) => {
    this.setState({
      visible
    });
  };

  formatKey = str => str.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase());

  renderMessages = (messages = {}) => {
    let compiled = [];

    for (const key in messages) {
      let result = [];

      if (typeof messages[key] === 'object' && !Array.isArray(messages[key])) {
        result.push(this.renderMessages(messages[key]));
      } else if (Array.isArray(messages[key])) {
        for (let message of messages[key]) {
          result.push(<li>{message}</li>);
        }
      }

      compiled.push(
        <Sigma as={'ul'} m={[5, 0]} ml={5}>
          <Sigma as={'h4'} m={[10, 0, 5, 0]}>{this.formatKey(key)}:</Sigma>
          {result}
        </Sigma>
      );
    }

    return compiled;
  };

  render() {
    const {
      color,
      visible,
      messages
    } = this.state;

    if (!visible) {
      return null;
    }

    return (
      <Alert color={color} d={'flex'} alignItems={'flex-start'}>
        <Sigma>
          {this.renderMessages(messages)}
        </Sigma>
        <Sigma ml={'auto'} cursor={'pointer'}>
          <Sigma fontSize={18} onClick={e => this.toggle(false)} dangerouslySetInnerHTML={{__html: '&times'}} />
        </Sigma>
      </Alert>
    );
  }
}

ActionAlert.contextTypes = {
  client: () => null
};

export default ActionAlert;
