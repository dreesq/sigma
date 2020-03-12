import React, {Component, Fragment} from 'react';
import Modal from './Modal'
import Sigma from './Sigma'
import Button from './Button'

export default class ConfirmModal extends Component {
  static OK = 0;
  static CANCEL = 1;

  state = {
    ok: null,
    cancel: null
  }

  confirm = (ok, cancel) => {
    this.setState({
      ok,
      cancel
    });

    this.modal.toggle(true);
  }

  onAction = async (type) => {
    const {ok, cancel} = this.state;

    if (type === ConfirmModal.OK && ok) {
      await ok();
    }

    if (type === ConfirmModal.CANCEL && cancel) {
      await cancel();
    }

    this.setState({
      ok: null,
      cancel: null
    });

    this.modal.toggle(false);
  };

  render() {
    const {
      message = 'Are you sure you want to do this action?',
      title = 'Confirm'
    } = this.props;

    return (
      <Modal ref={ref => this.modal = ref} onClose={this.onCancel}>
        <h2>{title}</h2>
        <p>{message}</p>
        <Sigma mt={24} d={'flex'}>
          <Button onClick={e => this.onAction(ConfirmModal.CANCEL)} mr={6} ml={'auto'} color={'secondary'} unstyled>Cancel</Button>
          <Button onClick={e => this.onAction(ConfirmModal.OK)} color={'primary'}>Confirm</Button>
        </Sigma>
      </Modal>
    );
  }
}
