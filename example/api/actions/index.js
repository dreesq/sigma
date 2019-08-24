const {config, utils} = require('@dreesq/serpent')

const form = {
  name: {
    label: 'Name',
    placeholder: 'Name',
    validation: 'string|required'
  },
  type: {
    type: 'text',
    label: 'Type',
    placeholder: 'Select a type'
  },
  description: {
    label: 'Description',
    type: 'textarea',
    placeholder: 'Field 23',
    validation: `required|string|min:1`
  },
  otherField: {
    label: 'Description 2',
    type: 'textarea',
    validation: 'required|string|min:1'
  }
}

config({
  name: 'testAction',
  input: utils.form(form)
})(
  async ({ input }) => {
    return utils.success(input)
  }
)

utils.autoCrud('Post')
