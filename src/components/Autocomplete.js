import React, {Component, Fragment} from 'react';
import Sigma from './Sigma';
import Card from './Card';
import Tag from './Tag';
import {Input} from './Form';
import Text from './Text';
import OutsideClick from './OutsideClick';
import {getValue, shadeColor} from "../utils";

const sizes = {
  small: {
    p: [6, 14],
    fontSize: 14
  },
  medium: {
    p: [9, 15],
    fontSize: 15
  },
  large: {
    p: [11, 17],
    fontSize: 16
  }
}

export default class Autocomplete extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: (props.value && !props.multi) ? props.value.name : '',
      selected: props.value || (props.multi ? [] : {}),
      items: [],
      loading: false,
      visible: false
    };
  };

  onChange = e => {
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
        newState.items = await this.getItems(value);
      } catch (e) {

      } finally {
        newState.loading = false;
      }

      this.setState(newState);
    }, 300)
  };

  getItems = async value => {
    const {selected} = this.state;
    const {onSearch, multi} = this.props;
    const values = multi ? selected.map(item => item.value) : [];
    let items = await onSearch(value);
    return items.filter(row => values.indexOf(row.value) === -1);
  };

  setValue = (value = {}) => {
    this.setState({
      value: value.name ? value.name : '',
      selected: value
    });
  };

  onFocus = async () => {
    const {value} = this.state;
    let items = await this.getItems(value);

    this.setState({
      visible: true,
      items
    })
  };

  handleKeyUp = e => {
    let {value, selected} = this.state;
    const {multi, name, onChange} = this.props;

    if ((e.keyCode === 46 || e.keyCode === 8) && multi && !value && selected.length) {
      return this.remove(null, selected.length - 1);
    }

    if (e.keyCode !== 9) {
      return;
    }

    this.setState({
      value: '',
      visible: false
    });
  };

  onOutsideClick = e => {
    const {onChange, name, multi} = this.props;
    let {visible, value, selected} = this.state;

    if (!visible) {
      return;
    }

    let newState = {};

    if (!multi) {
      if (value === '') {
        selected = null;
        onChange({
          _event: e,
          target: {
            name,
            value: null
          }
        });
      }

      value = selected ? selected.name : '';

      newState = {
        value,
        selected
      };
    } else {
      newState.value = '';
    }

    newState.visible = false;
    this.setState(newState);
  };

  onClick = async (item, key, event) => {
    let {selected, items} = this.state;
    const {onChange, name, multi = false} = this.props;

    items.splice(key, 1);
    selected = multi ? [...selected, item] : item;

    this.setState({
      value: multi ? '' : item.name,
      selected,
      items,
      visible: !!multi
    });

    onChange && await onChange({
      _event: event,
      target: {
        name,
        value: selected
      }
    });
  };

  remove = (event, index) => {
    event && event.stopPropagation();

    const {onChange, name} = this.props;
    const {selected} = this.state;
    selected.splice(index, 1);

    this.setState({
      selected,
    }, async () => {
      this.setState({
        items: await this.getItems('')
      })
    });

    onChange && onChange({
      _event: event,
      target: {
        name,
        value: selected
      }
    });
  };

  renderInput = () => {
    const {value, selected} = this.state;
    const {
      name,
      error,
      placeholder,
      size = 'medium',
      multi = false,
    } = this.props;

    if (multi) {
      return (
        <Sigma
          {...sizes[size]}
          border={props => `1px solid ${error ? getValue('colors.danger', props) : '#dedede'}`}
          bg={props => `${!error ? '#fff' : shadeColor(getValue('colors.danger', props), 200)}`}
          borderRadius={4}
          cursor={'text'}
          onClick={e => this.input.focus()}
        >
          {
            selected.map((item, index) => (
              <Tag m={2} ml={index === 0 ? 0 : 2} cursor={'pointer'} key={index} onClick={e => this.remove(e, index)}>
                <Sigma d={'flex'} alignItems={'center'}>
                  {item.name}
                  <Sigma ml={4} fontSize={18} dangerouslySetInnerHTML={{__html: '&times'}} />
                </Sigma>
              </Tag>
            ))
          }
          <Sigma
            ref={ref => this.input = ref}
            onFocus={this.onFocus}
            onChange={this.onChange}
            as={'input'}
            onKeyDown={this.handleKeyUp}
            h={'100%'}
            bg={props => `${!error ? '#fff' : shadeColor(getValue('colors.danger', props), 200)}`}
            border={'none'}
            outline={'none'}
            ml={selected.length ? 5 : ''}
            error={error}
            p={[6, 0]}
            maxWidth={'100%'}
            width={120}
            value={value}
            placeholder={!selected.length ? placeholder : '' }
            fontSize={15}
          />
        </Sigma>
      );
    }

    return (
      <Input
        name={name}
        error={error}
        value={value}
        size={size}
        onFocus={this.onFocus}
        onKeyDown={this.handleKeyUp}
        placeholder={placeholder}
        onChange={this.onChange} />
    );
  };

  render() {
    const {items, visible, loading, selected} = this.state;
    const {
      name,
      error,
      onChange,
      placeholder,
      renderLoading,
      renderNoItems,
      renderItem,
      multi = false,
      onSearch,
      ...others
    } = this.props;

    return (
      <Sigma position={'relative'} {...others}>
        <OutsideClick onOutsideClick={this.onOutsideClick}>
          <Fragment>
            {this.renderInput()}
            <Card
              position={'absolute'}
              d={visible ? 'block' : 'none'}
              maxHeight={165}
              mt={10}
              zIndex={'3'}
              overflowY={'auto'}
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
                  let isActive = selected && item.value === selected.value;

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
                      color={'#aba7a7'}
                      hover={'color: #000;'}
                      onClick={e => this.onClick(item, key, e)}
                      {...(isActive ? {color: '#000'} : {})}
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
