import React, {Component, Fragment} from 'react'
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
  Toggle,
  Radio,
  Autocomplete
} from '../components'

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

    for (const key in struct) {
      form[key] = {
        ...this.parseField(struct[key]),
        name: key,
        value: defaultValues[key] || ''
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
      placeholder: '',
      type: '',
    }

    let parsed = field.split('|').map(rule => rule.split(':')).find(rule => rule[0] === 'form')

    if (parsed) {
      try {
        parsed = JSON.parse(atob(parsed[1]))
        result = {
          ...result,
          ...parsed
        }
      } catch (e) {

      }
    }

    return result
  }

  onSearch = field => {
    const {client} = this.context

    return async text => {
      if (Array.isArray(field.values)) {
        return field.values.filter(value => value.name.toLowerCase().indexOf(text.toLowerCase()) > -1);
      }

      if (typeof field.values === 'string') {
        const {data, errors} = await client[field.values]({
          text
        });

        if (errors) {
          return [];
        }

        return data;
      }

      return [];
    }
  };

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

  _renderField = (field, props, autoFocus = false) => {
    const {errors} = this.state
    const {client} = this.context

    if (!field || field.name === 'id') {
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
            name={field.name}
            onChange={this.onChange(field.name)}
            as={'select'}
            {...props}
          >
            {
              (field.values || []).map((value, key) => {
                let name = client.i18n.t(value.name)
                name = name !== '[empty string]' ? name : value.name;

                return (
                  <option key={key} value={value.value}>
                    {name}
                  </option>
                )
              })
            }
          </Input>
        )

      case 'autocomplete':
        return (
          <Autocomplete
            placeholder={placeholder}
            onSearch={this.onSearch(field)}
            error={errors[field.name]}
            name={field.name}
            onChange={this.onChange(field.name)}
            value={field.value}
            multi={field.multi}
            {...props}
          />
        );

      case 'toggle':
        return (
          <Toggle
            label={placeholder}
            onChange={this.onChange(field.name, true)}
            checked={+field.value === 1}
            name={field.name}
            {...props}
          />
        );

      case 'radio':
        return (
          <Fragment>
            {
              field.values.map((value, key) => {
                let name = client.i18n.t(value.name)
                name = name !== '[empty string]' ? name : value.name

                return (
                  <Radio
                    key={key}
                    label={name}
                    onChange={this.onChange(field.name)}
                    value={value.value}
                    checked={value.value === field.value}
                    {...props}
                  />
                )
              })
            }
          </Fragment>
        );

      case 'file':
        return (
          <Input
            as={'file'}
            placeholder={placeholder}
            error={errors[field.name]}
            name={field.name}
            onChange={this.onChange(field.name)}
            {...props}
          />
        )

      case 'textarea':
        return (
          <Input
            autoFocus={autoFocus}
            placeholder={placeholder}
            value={field.value}
            as={'textarea'}
            name={field.name}
            error={errors[field.name]}
            onChange={this.onChange(field.name)}
            {...props}
          />
        )

      default:
        return (
          <Input
            autoFocus={autoFocus}
            placeholder={placeholder}
            value={field.value}
            type={field.type}
            name={field.name}
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

        let fieldValue = value;

        if (isToggle) {
          fieldValue = checked ? 1 : 0;
        } else if (typeof value === 'object' && !Array.isArray(value)) {
          fieldValue = value.value;
        } else if (typeof value === 'object' && Array.isArray(value)) {
          fieldValue = value.map(item => item.value);
        }

        state.form[field].value = fieldValue;
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

  _renderHandleBtn = (props, key = '') => {
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
    const {render = {}, focusFirst} = this.props
    const {form, errors} = this.state

    let rendered = render[field] ? render[field]({
      onChange: this.onChange(field),
      state: this.state,
      error: errors[field],
      value: form[field].value,
      label: this.getLabel(form[field]),
      key
    }) : [
      this._renderLabel(form[field], this._makeProps(props, 'label', field)),
      this._renderField(form[field], this._makeProps(props, 'input', field), focusFirst ? key === 0 : false),
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

  _renderDebug = () => {
    const {form} = this.state;
    const css = `
        width: 100%;
        max-height: 340px;
        overflow: scroll;
        word-break: inherit;
        background: #292828;
        color: #4dff85;
        padding: 10px;
        border-radius: 4px;
    `;

    const info = {
      values: this.getValues(),
      form,
      props: this.props
    };

    return (
      <Sigma as={'pre'} css={css}>
        {JSON.stringify(info, null, 4)}
      </Sigma>
    );
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
      return this._renderAlert(props, key)
    }

    if (name === '_handle_') {
      return this._renderHandleBtn(props, key)
    }

    if (name === '_cancel_') {
      return this._renderCancelBtn(props, key)
    }

    return this._renderFormGroup(name, key, props)
  }

  render() {
    const {form} = this.state
    const layout = this._getLayout()
    const {onCancel, props = {}, debug = false} = this.props

    if (!layout) {
      return (
        <Form onSubmit={this.handle}>
          {debug && this._renderDebug()}
          {this._renderAlert(props)}
          {Object.keys(form).map((field, key) => {
            return this._renderFormGroup(field, key, props);
          })}
          <Sigma d={'flex'}>
            {onCancel && this._renderCancelBtn(props)}
            {this._renderHandleBtn(props)}
          </Sigma>
        </Form>
      )
    }

    return (
      <Container fluid>
        {debug && this._renderDebug()}
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
