import React, {Component} from 'react';
import Alert from '../components/Alert';
import {Sigma} from "../components";
import {ACTION_ERROR, ACTION_SUCCESS} from '../../constants';

class ActionAlert extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      color: 'primary',
      messages: {},
      content: null
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
      events[ACTION_ERROR] = this.onError;
    }

    if (listenSuccess) {
      events[ACTION_SUCCESS] = this.onSuccess;
    }

    this.listeners = client.events.multi(events);
  }

  componentWillUnmount() {
    this.listeners.unbind();
  }

  onError = ([action, errors]) => {
    const {actions = [], renderError} = this.props;

    if ((!actions.includes(action) && !actions.includes('*')) || renderError === false) {
      return;
    }

    let content;

    if (renderError) {
      content = renderError([action, errors]);
    } else {
      content = this.renderMessages(errors);
    }

    this.setState({
      color: 'danger',
      visible: true,
      content
    });
  };

  onSuccess = ([action, result]) => {
    const {actions = [], renderSuccess} = this.props;

    if ((!actions.includes(action) && !actions.includes('*')) || renderSuccess === false) {
      return;
    }

    let content;

    if (renderSuccess) {
      content = renderSuccess([action, result]);
    }

    this.setState({
      color: 'success',
      content,
      visible: true
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
        <Sigma as={'ul'} m={[5, 0]} ml={5} pl={15} pr={0} listStyle={'circle'}>
          <Sigma as={'h4'} m={[10, 0, 5, 0]} fontSize={13}>{this.formatKey(key)}</Sigma>
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
      messages,
      content
    } = this.state;

    if (!visible) {
      return null;
    }

    return (
      <Alert color={color} d={'flex'} alignItems={'flex-start'} {...this.props}>
        <Sigma mt={13}>
          {content}
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
