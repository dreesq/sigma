import React, {Component} from 'react';
import ActionAlert from './ActionAlert';

class GlobalAlert extends Component {
  state = {
    render: false
  }

  componentDidMount() {
    this.timeout = setTimeout(() => {
      this.setState({
        render: true
      })
    }, 2000);
  }

  componentWillUnmount() {
    clearTimeout(this.timeout);
  }

  render() {
    const {delayRender = true} = this.props;
    const {render} = this.state;

    if (!render && delayRender) {
      return null;
    }

    return (
      <ActionAlert
        actions={['*']}
        listenError
        listenSuccess
        {...this.props}
      />
    );
  }
}

GlobalAlert.contextTypes = {
  client: () => null
};

export default GlobalAlert;
