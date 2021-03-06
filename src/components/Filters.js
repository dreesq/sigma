import React, {Component, Fragment} from 'react'
import Card from './Card'
import Dropdown from './Dropdown'
import Button from './Button'
import Sigma from './Sigma'
import Toggle from './Toggle'
import {Input, Group, Label, Form} from './Form'
import {Col, Row, Container} from './Grid'
import Autocomplete from './Autocomplete'
import {Radio} from "./index";

export default class Filters extends Component {
  constructor(props) {
    super(props)
    this.state = {
      fields: [],
      values: {}
    }
  }

  getFilters = () => {
    const {values} = this.state
    return values
  };

  onChange = (field, isCheckbox, isAutocomplete) => {
    return e => {
      const {target} = e
      const value = isCheckbox ? (target.checked ? 1 : 0) : (isAutocomplete ? target.value.value : target.value)

      this.setState(state => {
        state.values[field] = value
        return state
      })
    }
  }

  async componentDidMount() {
    const {fields = [], extra = [], onFilter} = this.props
    const parsed = this.parseQueryString()
    const values = [...fields, ...extra].reduce((all, current) => {
      current = typeof current === 'string' ? {
        name: current
      } : current

      all[current.name] = parsed[current.name] ? parsed[current.name] : (current.defaultValue ? current.defaultValue : '')
      return all
    }, {})

    this.setState({
      fields,
      values
    })

    onFilter && await onFilter(values, true)
    this.setQuery(values)
  }

  setFilter = (key, value, usePage = false) => {
    const {onFilter} = this.props

    this.setState(state => {
      state.values[key] = value
      return state
    }, async () => {
      const {values} = this.state

      if (!usePage) {
        delete values.page;
      }

      onFilter && await onFilter(values, usePage)
      this.setQuery(values)
    })
  };

  setFilters = async values => {
    const {onFilter} = this.props

    this.setState({
      values
    })

    onFilter && await onFilter(values)
    this.setQuery(values)
  };

  onSearch = field => {
    const {name} = field;
    const {onSearch} = this.props;

    if (!onSearch) {
      return;
    }

    return async text => {
      return await onSearch(name, text);
    };
  };

  renderField = (field, key) => {
    const {values} = this.state
    const {props = { input: {}, col: {}, label: {} }, label, name, placeholder} = field
    let fieldEl

    switch (field.type) {
      case 'select':
        fieldEl = (
          <Input
            placeholder={placeholder}
            onChange={this.onChange(field.name)}
            as={'select'}
            name={field.name}
            value={values[name]}
            {...props.input}
          >
            {
              (field.values || []).map((value, key) => {
                return (
                  <option key={key} value={value.value}>
                    {value.name}
                  </option>
                )
              })
            }
          </Input>
        )
        break

      case 'radio':
        fieldEl = (
          <Radio
            name={name}
            label={placeholder}
            onChange={this.onChange(field.name)}
            value={field.value}
            checked={field.value === values[name]}
            {...props}
          />
        )
        break

      case 'autocomplete':
        fieldEl = (
          <Autocomplete
            name={name}
            onChange={this.onChange(field.name, false, true)}
            placeholder={placeholder}
            onSearch={this.onSearch(field)}
            {...props.input}
          />
        )
        break

      case 'toggle':
        fieldEl = (
          <Toggle
            label={placeholder}
            name={name}
            onChange={this.onChange(field.name, true)}
            checked={+values[name] === 1}
            {...props.input}
          />
        )
        break

      default:
        fieldEl = (
          <Input
            name={name}
            value={values[name]}
            placeholder={placeholder}
            onChange={this.onChange(field.name)}
            {...props.input}
          />
        )
        break
    }

    return (
      <Col p={0} {...props.col} key={key}>
        <Group>
          {label && <Label {...props.label}>{label}</Label>}
          {fieldEl}
        </Group>
      </Col>
    )
  };

  handle = async e => {
    e.preventDefault()
    const {values} = this.state
    const {onFilter} = this.props
    delete values.page;
    onFilter && await onFilter(values)
    this.setQuery(values)
    this.dropdown.toggle()
  };

  setQuery = (obj = {}) => {
    let str = []
    for (let key in obj) {
      if (obj[key] === '') {
        continue
      }

      if (obj.hasOwnProperty(key)) {
        str.push(`${encodeURIComponent(key)}=${encodeURIComponent(obj[key]).replace(/%20/g, '+')}`)
      }
    }

    str = str.join('&')
    str = !str ? '' : `?${str}`

    if (str === window.location.search) {
      return
    }

    typeof window !== 'undefined' && window.history.pushState('', '', `${window.location.pathname}${str}`);
  };

  parseQueryString = () => {
    const qs = window.location.search.replace('?', '')
    const items = qs.split('&')

    return items.reduce((data, item) => {
      let [key, value] = item.split('=')
      value = decodeURIComponent(value && value.replace(/\+/g, '%20'))

      if (data[key] !== undefined) {
        if (!Array.isArray(data[key])) {
          data[key] = [data[key]]
        }

        data[key].push(value)
      } else {
        data[key] = value
      }

      return data
    }, {})
  };

  clearFilters = e => {
    e.preventDefault()
    const {onFilter, onClear} = this.props
    this.setState(prevState => {
      for (let key in prevState.values) {
        prevState.values[key] = ''
      }

      return prevState
    }, async () => {
      this.setQuery({})
      onFilter && await onFilter({})
      onClear && onClear()
      this.dropdown.toggle()
    })
  };

  render() {
    const {fields} = this.state
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
    } = this.props

    if (!fields.length) {
      return null;
    }

    return (
      <Dropdown ref={ref => this.dropdown = ref} position={'static'} {...props.dropdown}>
        {
          open => (
            <Fragment>
              <Button {...props.trigger}>{btnText}</Button>
              <Card width={'100%'} pt={12} mt={10} {...props.content}>
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
    )
  }
}
