import React, {Component} from 'react'
import deepmerge from 'deepmerge'
import {
  Input,
  Group,
  Button,
  Label,
  Form,
  Text,
  Row,
  Col,
  Container,
  Alert,
  Sigma,
  Toggle
} from '../components'

const e = React.createElement

class ActionForm extends Component {
  constructor(props) {
    super(props)

    this.state = {
      alert: false,
      loading: false,
      errors: {},
      data: {},
      form: {},
      base: {}
    }
  }

  componentDidMount() {
    const {action, structure = false, defaultValues = {}} = this.props
    const {client} = this.context

    let struct = structure || client.actions.getAction(action)
    let form = {}

    main: for (const key in struct) {
      for (let subKey in struct[key]) {
        if (typeof struct[key][subKey] === 'object') {
          continue main;
        }
      }

      form[key] = {
        name: key,
        value: defaultValues[key] || '',
        ...this.parseField(struct[key])
      }
    }

    this.setState({
      form,
      base: JSON.parse(JSON.stringify(form))
    })
  }

  parseField = field => {
    let result = {
      label: '',
      values: '',
      placeholder: '',
      type: ''
    }

    let parsed = field.split('|').map(rule => rule.split(':')).find(rule => rule[0] === 'form')

    if (parsed) {
      parsed = JSON.parse(atob(parsed[1]))
      result.type = parsed[0]
      result.label = parsed[1]
      result.placeholder = parsed[2]
      result.values = parsed[3]
    }

    return result
  }

  getLabel = field => {
    const {client} = this.context
    let label = client.i18n.t(field.label)
    return label !== '[empty string]' ? label : field.label
  }

  _renderLabel = (field, props) => {
    const {errors} = this.state

    if (!field || !field.label) {
      return null
    }

    const label = this.getLabel(field)

    return (
      <Label error={!!errors[field.name]} {...props}>
        {label}
      </Label>
    )
  }

  _renderField = (field, props) => {
    const {errors} = this.state
    const {client} = this.context

    if (!field) {
      return null
    }

    let placeholder = client.i18n.t(field.placeholder)
    placeholder = placeholder !== '[empty string]' ? placeholder : field.placeholder

    switch (field.type) {
      case 'select':
        return (
          <Input
            placeholder={placeholder}
            value={field.value}
            error={errors[field.name]}
            onChange={this.onChange(field.name)}
            as={'select'}
            {...props}
          >
            {
              (field.values || []).map((value, key) => {
                return (
                  <option key={key}>
                    {value}
                  </option>
                )
              })
            }
          </Input>
        )

      case 'toggle':
        return (
          <Toggle
            label={placeholder}
            onChange={this.onChange(field.name, true)}
            checked={+field.value === 1}
            {...props}
          />
        );

      case 'file':
        return (
          <Input
            as={'file'}
            placeholder={placeholder}
            error={errors[field.name]}
            onChange={this.onChange(field.name)}
            {...props}
          />
        )

      case 'textarea':
        return (
          <Input
            placeholder={placeholder}
            value={field.value}
            as={'textarea'}
            error={errors[field.name]}
            onChange={this.onChange(field.name)}
            {...props}
          />
        )

      default:
        return (
          <Input
            placeholder={placeholder}
            value={field.value}
            error={errors[field.name]}
            onChange={this.onChange(field.name)}
            {...props}
          />
        )
    }
  };

  onChange = (field, isToggle = false) => {
    return e => {
      const {value, checked} = e.target

      this.setState(state => {
        state.errors[field] = ''
        state.form[field].value = isToggle ? (checked ? 1 : 0) : value;
        return state
      })
    }
  }

  _makeProps = (props, type, field) => {
    const result = {}

    if (!props[type]) {
      return {}
    }

    for (const k in props[type]) {
      if (typeof props[type][k] === 'function') {
        result[k] = props[type][k](field, this.state)
        continue
      }

      result[k] = props[type][k]
    }

    return result
  }

  getValues = () => {
    const {form} = this.state
    let payload = {}

    for (let k in form) {
      payload[k] = form[k].value
    }

    return payload
  }

  handle = async e => {
    e.preventDefault()

    const {client} = this.context
    const {base} = this.state;
    const {
      action,
      onError,
      onHandled,
      onSuccess,
      onHandle,
      withLoading,
      withValidation = true,
      actionOptions
    } = this.props

    let payload = this.getValues()

    if (!client.hasOwnProperty(action)) {
      return console.error(`Action ${action} is not registered.`)
    }

    if (typeof onHandle === 'function' && !onHandle(this)) {
      return
    }

    const {errors, data} = await client[action](payload, {
      loading: withLoading,
      validate: withValidation,
      ...actionOptions
    })

    if (errors) {
      onError && onError(errors)
      onHandled && onHandled()
      return this.setState({
        errors,
        loading: false,
        ...(errors.message ? {
          alert: {
            color: 'danger',
            message: errors.message
          }
        } : {})
      })
    }

    this.setState({
      data,
      form: base,
      loading: false,
      ...(typeof data === 'string' ? {
        alert: {
          color: 'success',
          message: data
        }
      } : {})
    })

    onSuccess && onSuccess(data)
    onHandled && onHandled()
  }

  getMessage = (errors) => {
    const {client} = this.context
    let message = client.i18n.t(errors[0])

    if (message === '[empty string]') {
      return errors[0]
    }

    return message
  }

  _getLayout = () => {
    const {layout} = this.props
    let currentBp = false

    if (!layout) {
      return false
    }

    for (const bp in bps) {
      let size = bps[bp]

      if (window.innerWidth >= size) {
        currentBp = bp
      }
    }

    return layout[currentBp] || false
  }

  _renderHandleBtn = props => {
    const {loading} = this.state
    const {handleText = 'Handle', withLoading} = this.props

    return (
      <Button
        onClick={this.handle}
        key={'handle-btn'}
        className={'handle-btn'}
        {...(withLoading ? {loading} : {})}
        {...this._makeProps(props, 'handle')}
      >
        {handleText}
      </Button>
    )
  }

  _renderAlert = props => {
    const {alert} = this.state
    const {withAlert} = this.props

    if (!withAlert || !alert) {
      return null
    }

    return (
      <Alert
        mb={12}
        color={alert.color}
        d={'flex'}
        alignItems={'center'}
        {...this._makeProps(props, 'alert')}
      >
        {alert.message}
        <Sigma ml={'auto'} cursor={'pointer'}>
          <Sigma fontSize={18} dangerouslySetInnerHTML={{__html: '&times'}} />
        </Sigma>
      </Alert>
    )
  }

  _renderCancelBtn = props => {
    const {cancelText = 'Cancel', onCancel} = this.props

    if (!onCancel) {
      return null
    }

    return (
      <Button
        onClick={onCancel}
        color={'secondary'}
        className={'cancel-btn'}
        key={'cancel-btn'}
        {...this._makeProps(props, 'cancel')}
      >
        {cancelText}
      </Button>
    )
  }

  _renderFormGroup = (field, key, props) => {
    const {render = {}} = this.props
    const {form, errors} = this.state

    let rendered = render[field] ? render[field]({
      onChange: this.onChange(field),
      state: this.state,
      error: errors[field],
      value: form[field].value,
      label: this.getLabel(form[field])
    }) : [
      this._renderLabel(form[field], this._makeProps(props, 'label', field)),
      this._renderField(form[field], this._makeProps(props, 'input', field)),
      errors[field] && (
        <Text color={'danger'}>
          {this.getMessage(errors[field])}
        </Text>
      )
    ]

    return (
      <Group key={key} {...this._makeProps(props, 'group', field)}>
        {rendered}
      </Group>
    )
  };

  _renderFormElement = (entry, key, props = {}, globalProps = {}) => {
    let name = entry

    if (typeof entry === 'object') {
      name = entry.name
      props = entry.props
    }

    props = deepmerge(globalProps, props)

    if (name.indexOf('|') > -1) {
      return name.split('|').map((splitted, index) => this._renderFormElement(splitted, `${key}-${index}`, props, globalProps))
    }

    if (name === '_alert_') {
      return this._renderAlert(props)
    }

    if (name === '_handle_') {
      return this._renderHandleBtn(props)
    }

    if (name === '_cancel_') {
      return this._renderCancelBtn(props)
    }

    return this._renderFormGroup(name, key, props)
  }

  render() {
    const {form} = this.state
    const layout = this._getLayout()
    const {onCancel, props = {}} = this.props

    if (!layout) {
      return (
        <Form onSubmit={this.handle}>
          {this._renderAlert(props)}
          {Object.keys(form).map((field, key) => this._renderFormGroup(field, key, props))}
          {onCancel && this._renderCancelBtn(props)}
          {this._renderHandleBtn(props)}
        </Form>
      )
    }

    return (
      <Container fluid>
        <Form onSubmit={this.handle}>
          {
            layout.map((row, rowKey) => (
              <Row key={rowKey}>
                {
                  row.map((entry, key) => (
                    <Col key={key} width={`${row.length === 1 ? '100%' : 100 / row.length + '%'}`}>
                      {this._renderFormElement(entry, `${rowKey}-${key}`, {}, props)}
                    </Col>
                  ))
                }
              </Row>
            ))
          }
        </Form>
      </Container>
    )
  }
}

ActionForm.contextTypes = {
  client: () => null
}

export default ActionForm
