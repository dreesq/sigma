const {config, utils, action} = require('@dreesq/serpent')

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
    type: 'toggle',
    validation: 'required|number'
  },

}

config({
  name: 'testAction',
  input: utils.form(form)
  }
})(
  async ({ input }) => {
    return utils.success(input)
  }
)

utils.autoCrud('Post', {
  schema: utils.form({
    title: {
      label: 'Title',
      validation: 'required|min:5'
    }
  })
})

action('getPosts', utils.autoFilter('Post', {
  pagination: true,
  limit: 10,
  before(query, filters) {
    filters.search && query.where('title', { $regex: new RegExp(filters.search), $options: 'i' })
  }
}))
