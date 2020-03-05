import React, {Component} from 'react';
import {ACTIONS_LOADED} from '../../constants';

class Context extends Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: true
    }
  }

  async componentDidMount() {
    const {client} = this.props
    await client.setup();

    if (typeof window === 'undefined') {
      return;
    }

    client.remount = () => {
      this.setState({
        loading: true
      }, () => {
        this.setState({
          loading: false
        });
      });
    };

    this.setState({ loading: false })
    this.removeListener = client.events.on(ACTIONS_LOADED, client.remount);
  }

  componentWillUnmount() {
    this.removeListener && this.removeListener();
  }

  getChildContext() {
    const {client} = this.props

    return {
      client
    }
  }

  render() {
    const {loading} = this.state
    const {children} = this.props

    if (typeof window !== 'undefined' && loading) {
      return null
    }

    return children
  }
}

Context.childContextTypes = {
  client: () => null
}

export default Context
