import React, {Component, Fragment} from 'react';
import Card from './Card';
import Dropdown from './Dropdown';
import Button from './Button';
import Sigma from './Sigma';
import {Input, Group, Label, Form} from './Form';
import {Col, Row, Container} from './Grid';

export default class Filters extends Component {
  constructor(props) {
    super(props)
    this.state = {
      fields: [],
      values: {}
    }
  }

  getFilters = () => {
    const {values} = this.state;
    return values;
  };

  onChange = field => {
    return e => {
      const {value} = e.target

      this.setState(state => {
        state.values[field] = value
        return state
      })
    }
  }

  async componentDidMount() {
    const {fields = [], onFilter} = this.props;
    const parsed = this.parseQueryString();
    const values = fields.reduce((all, current) => {
      all[current.name] = parsed[current.name] ? parsed[current.name] : (current.defaultValue ? current.defaultValue : '');
      return all;
    }, {});

    this.setState({
      fields,
      values
    });

    onFilter && await onFilter(this.getFilters())
    this.setQuery(values);
  }

  renderField = (field, key) => {
    const {values} = this.state;
    const {props = { input: {}, col: {}, label: {} }, label, name, placeholder} = field;
    let fieldEl;

    switch (field.type) {
      case 'select':
        fieldEl = (
          <Input
            placeholder={placeholder}
            onChange={this.onChange(field.name)}
            as={'select'}
            value={values[name]}
            key={key}
            {...props.input}
          >
            {
              (field.values || []).map((value, key) => {
                return (
                  <option key={key}>
                    {value}
                  </option>
                );
              })
            }
          </Input>
        );

      default:
        fieldEl = (
          <Input
            key={key}
            value={values[name]}
            placeholder={field.name}
            onChange={this.onChange(field.name)}
            {...props.input}
          />
        );
    }

    return (
      <Col p={0} {...props.col}>
        <Group>
          {label && <Label {...props.label}>{label}</Label>}
          {fieldEl}
        </Group>
      </Col>
    );
  };

  handle = async e => {
    e.preventDefault();
    const {values} = this.state;
    const {onFilter} = this.props;
    onFilter && await onFilter(values);
    console.log(values);
    this.setQuery(values);
    this.dropdown.toggle();
  };

  setQuery = (obj = {}) => {
    let str = [];
    for (let key in obj) {
      if (obj[key] === '') {
        continue;
      }

      if (obj.hasOwnProperty(key)) {
        str.push(`${encodeURIComponent(key)}=${encodeURIComponent(obj[key])}`);
      }
    }

    str = str.join('&');
    str = !str ? '/' : `?${str}`;

    if (str === window.location.search) {
      return;
    }

    window.history.pushState('', '', str);
  };

  parseQueryString = () => {
    const qs = window.location.search.replace('?', '');
    const items = qs.split('&');

    return items.reduce((data, item) => {
      const [key, value] = item.split('=');

      if(data[key] !== undefined) {
        if(!Array.isArray(data[key])) {
          data[key] = [ data[key] ]
        }

        data[key].push(value)
      }
      else {
        data[key] = value
      }

      return data
    }, {});
  };

  clearFilters = e => {
    e.preventDefault();
    const {onFilter} = this.props;
    this.setState(prevState => {
      for (let key in prevState.values) {
        prevState.values[key] = '';
      }

      return prevState;
    }, async () => {
      this.setQuery({});
      onFilter && await onFilter({});
    });
  };

  render() {
    const {fields} = this.state;
    const {
      title = 'Filter',
      btnText = 'Filter',
      withClear = true,
      handleText = 'Filter',
      clearFiltersText = 'Clear Filters',
      props = {
        dropdown: {},
        trigger: {},
        content: {}
      }
    } = this.props;

    return (
      <Dropdown ref={ref => this.dropdown = ref} position={'static'} {...props.dropdown}>
        {
          open => (
            <Fragment>
              <Button {...props.trigger}>{btnText}</Button>
              <Card width={'100%'} pt={12} {...props.content}>
                <Sigma alignItems={'center'} d={'flex'}>
                  {title && <h3>{title}</h3>}
                  <Sigma
                    fontSize={32}
                    color={'#f7f7f7'}
                    onClick={() => this.dropdown.toggle()}
                    cursor={'pointer'}
                    dangerouslySetInnerHTML={{__html: '&times'}} ml={'auto'}
                  />
                </Sigma>
                <Form onSubmit={this.handle}>
                  <Container mb={10} fluid>
                    <Row alignItems={'flex-end'}>
                      {fields.map((field, key) => this.renderField(field, key))}
                    </Row>
                  </Container>
                  <Sigma d={'flex'} justifyContent={'flex-end'}>
                    {withClear && <Button inverted mr={5} onClick={this.clearFilters}>{clearFiltersText}</Button>}
                    <Button onClick={this.handle}>{handleText}</Button>
                  </Sigma>
                </Form>
              </Card>
            </Fragment>
          )
        }
      </Dropdown>
    );
  }
}
