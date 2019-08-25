import React, {Component, Fragment} from 'react';
import Card from './Card';
import Dropdown from './Dropdown';
import Button from './Button';
import Input from './Input';

export default class Filters extends Component {
  render() {
    const {btnText = 'Filter', onFilter, fields, values} = this.props;

    return (
      <Dropdown>
        {
          open => (
            <Fragment>
              <Button>{btnText}</Button>
              <Card width={'100%'}>
                <h5>Filter</h5>
              </Card>
            </Fragment>
          )
        }
      </Dropdown>
    );
  }
}
