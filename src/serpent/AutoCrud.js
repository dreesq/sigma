import React, {Component} from 'react';
import Modal from '../components/Modal';
import ActionForm from './ActionForm';
import AutoFilter from './AutoFilter';

class AutoCrud extends Component {
  render() {
    const {collection, filters = [], fields = [], autoFilterProps = {}} = this.props;

    return (
      <div className={`autoCrud-${collection}`}>
        <ActionForm
          onHandled={e => this.autoFilter.reload(1, {}, {})}
          action={`autoCreate${collection}`}
        />

        <AutoFilter
          ref={ref => this.autoFilter = ref}
          action={`autoFind${collection}`}
          withSearch
          filters={filters}
          fields={fields}
          withPagination
          {...autoFilterProps}
        />
      </div>
    );
  }
}

AutoCrud.contextTypes = {
  client: () => null
};

export default AutoCrud;
