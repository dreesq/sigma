import React, {Component, Fragment} from 'react';
import Sigma from './Sigma';
import Card from './Card';
import {Input} from './Form';
import Text from './Text';
import OutsideClick from './OutsideClick';

export default class Autocomplete extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
      selected: props.defaultValue || {
        index: false,
        row: false
      },
      items: [],
      loading: false,
      visible: false
    };
  };

  onChange = e => {
    const {onSearch} = this.props;
    const {value} = e.target

    this.setState({
      value
    });

    if (this.timeout) {
      clearTimeout(this.timeout)
    }

    this.timeout = setTimeout(async () => {
      this.setState({
        loading: true
      });

      let newState = {};

      try {
        newState.items = await onSearch(value);
      } catch (e) {

      } finally {
        newState.loading = false;
      }

      this.setState(newState);
    }, 300)
  };

  onFocus = async () => {
    const {onSearch} = this.props;
    const {value} = this.state;

    const items = await onSearch(value);

    this.setState({
      visible: true,
      items
    })
  };

  onBlur = e => {
    const {onChange, name} = this.props;
    let {items, value, selected} = this.state;

    if (value === '') {
      selected = false;
      onChange({
        _event: e,
        target: {
          name,
          value: false
        }
      });
    }

    this.setState({
      visible: false,
      value: selected ? selected.row.name : '',
      selected
    });
  };

  onClick = (item, key, event) => {
    const {onChange, name} = this.props;

    this.setState({
      value: item.name,
      selected: {
        index: key,
        row: item
      },
      visible: false
    });

    onChange && onChange({
      _event: event,
      target: {
        name,
        value: item
      }
    });
  };

  render() {
    const {value, items, visible, loading, selected} = this.state;
    const {name, error, onChange, placeholder, renderLoading, renderNoItems, renderItem, ...others} = this.props;

    return (
      <Sigma position={'relative'} {...others}>
        <OutsideClick onOutsideClick={this.onBlur}>
          <Fragment>
            <Input
              name={name}
              value={value}
              error={error}
              onFocus={this.onFocus}
              placeholder={placeholder}
              onChange={this.onChange} />
            <Card
              position={'absolute'}
              d={visible ? 'block' : 'none'}
              maxHeight={165}
              mt={10}
              zIndex={'3'}
              overflow={'scroll'}
              p={[10, 30]}
            >
              {
                loading && (renderLoading ? renderLoading() : <Text>Loading...</Text>)
              }
              {
                !loading && items.length === 0 && (renderNoItems ? renderNoItems() : <Text>There are no items to display</Text>)
              }
              {
                !loading && items.map((item, key) => {
                  let isActive = selected && item.value === selected.row.value;

                  if (renderItem) {
                    return renderItem({
                      item,
                      key,
                      isActive,
                      onClick: e => this.onClick(item, key, e)
                    });
                  }

                  return (
                    <Text
                      cursor={'pointer'}
                      key={key}
                      hover={'color: #cccccc;'}
                      onClick={e => this.onClick(item, key, e)}
                      {...(isActive ? {color: '#cccccc'} : {})}
                    >
                      {item.name}
                    </Text>
                  );
                })
              }
            </Card>
          </Fragment>
        </OutsideClick>
      </Sigma>
    );
  }
}
