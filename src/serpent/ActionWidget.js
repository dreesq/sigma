import React, { Component } from 'react';
import {ACTION_SUCCESS} from '../../constants';

class ActionWidget extends Component {
  state = {
    widget: {}
  };

  componentDidMount() {
    const {action: widgetAction, client} = this.props;
    this.removeListener = client.events.on(ACTION_SUCCESS, ([action, result]) => {
      if (result.widget && widgetAction === action) {
        this.setState({
          widget: result.widget
        }, () => {
          if (result.widget.onMount) {
            try {
              eval(result.widget.onMount)
            } catch(e) {

            }
          }
        });
      }
    });
  }

  componentWillUnmount() {
    const {widget} = this.state;
    this.removeListener && this.removeListener();

    if (widget.onUnmount) {
      try {
        eval(widget.onUnmount);
      } catch(e) {

      }
    }
  }

  render() {
    const {widget} = this.state;

    return (
      <div
        dangerouslySetInnerHTML={{__html: widget.html || ''}}
        style={widget.style || {}}
      />
    );
  }
}

ActionWidget.contextTypes = {
  client: () => null
};

export default ActionWidget;
