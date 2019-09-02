import React, {Component, Fragment} from 'react';
import Modal from '../components/Modal';
import Text from '../components/Text';
import ActionForm from './ActionForm';
import ActionAlert from './ActionAlert'
import AutoFilter from './AutoFilter';
import Button from '../components/Button';
import Dropdown from '../components/Dropdown';
import Card from '../components/Card';
import Sigma from '../components/Sigma';
import ConfirmModal from '../components/ConfirmModal';
import {Col} from '../components/Grid';

class ActionModal extends Component {
  state = {
    data: false
  }

  toggle = (show = true, data = {}) => {
    this.setState({
      data
    });

    this.modal.toggle(show);
  };

  render() {
    const {data} = this.state;
    const edit = Object.keys(data).length > 0;

    const {action = {}, collection, props} = this.props;
    const handleText = action.handleText || (edit ? 'Save' : 'Create');
    const actionName = action.action || (edit ? `autoUpdate${collection}` : `autoCreate${collection}`);

    if (data._id) {
      data.id = data._id;
    }

    return (
      <Modal ref={ref => this.modal = ref} onClose={e => this.modal.toggle(false)} {...props}>
        <h2>{`${edit ? 'Update' : 'Create'} ${collection}`}</h2>
        <ActionForm
          withAlert
          withClose
          defaultValues={data}
          {...action}
          handleText={handleText}
          action={actionName}
        />
      </Modal>
    );
  }
}

class AutoCrud extends Component {
  onCreate = e => {
    this.modal.toggle(true);
  };

  onDelete = async row => {
    const {collection} = this.props;
    const {client} = this.context;
    const action = `autoRemove${collection}`;

    await client[action]({
      id: row._id
    });

    await this.autoFilter.reload(1, {}, {});
  }

  renderEdit = () => {
    const {
      withEdit = true,
      withDelete = true,
      extraOptions = []
    } = this.props;

    return [
      null,
      null,
      (row) => (
        <Dropdown md={'text-align: right;'} sm={'text-align: left'}>
          {
            (open) => (
              <Fragment>
                <Sigma fontSize={26} mt={-16} dangerouslySetInnerHTML={{__html: '&hellip;'}} cursor={'pointer'} />
                <Card p={[10, 20]} w={'140px !important'} textAlign={'left'}>
                  {withEdit && <Text cursor={'pointer'} onClick={() => this.modal.toggle(true, row)}>
                    Edit
                  </Text>}
                  {withDelete && <Text color={'danger'} cursor={'pointer'} onClick={() => this.confirm.confirm(e => this.onDelete(row))}>
                    Delete
                  </Text>}
                  {extraOptions.map((renderer, index) => renderer(row, index))}
                </Card>
              </Fragment>
            )
          }
        </Dropdown>
      ),
      false
    ]
  };

  render() {
    const {
      collection,
      filters = [],
      fields = [],
      autoFilterProps = {},
      withOptions = true,
      withActionAlert = true,
      withSearch = true,
      title,
      modalWidth = 420,
      ...others
    } = this.props;

    return (
      <Sigma className={`autoCrud-${collection}`} {...others}>
        <ConfirmModal ref={ref => this.confirm = ref}/>
        <ActionModal
          ref={ref => this.modal = ref}
          collection={collection}
          props={{
            modalWidth
          }}
          action={{
            focusFirst: true,
            onHandled: async e => {
              await this.autoFilter.reload(1, {}, {});
              this.modal.toggle(false);
            },
            onCancel: e => this.modal.toggle(false),
            props: {
              cancel: {
                inverted: true,
                mr: 5,
                ml: 'auto'
              }
            }
          }}
        />
        <AutoFilter
          title={title}
          ref={ref => this.autoFilter = ref}
          action={`autoFind${collection}`}
          withSearch={withSearch}
          filters={filters}
          fields={[
            ...fields,
            withOptions ? this.renderEdit() : null
          ].filter(i => !!i)}
          withPagination
          headerExtra={(
            <Button mr={5} color={'success'} onClick={this.onCreate} whiteSpace={'nowrap'}>{`Create ${collection}`}</Button>
          )}
          bodyExtra={[
            withActionAlert && (<Col>
              <ActionAlert
                m={[10, 0]}
                actions={[`autoCreate${collection}`, `autoRemove${collection}`, `autoUpdate${collection}`]}
                renderSuccess={([action, data]) => 'Action successfully done'}
                renderError={false}
              />
            </Col>)
          ]}
          {...autoFilterProps}
        />
      </Sigma>
    );
  }
}

AutoCrud.contextTypes = {
  client: () => null
};

export default AutoCrud;
