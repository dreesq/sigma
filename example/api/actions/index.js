const {config, utils, action} = require('@dreesq/serpent')

const form = {
  name: {
    label: 'Name',
    placeholder: 'Name',
    validation: 'string|required',
    size: '3'
  },
  type: {
    type: 'text',
    label: 'Type',
    placeholder: 'Select a type',
    size: '7'
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
  nextField: {
    label: 'Autocomplete',
    type: 'autocomplete',
    validation: 'required|number',
    values: 'getStaticValues',
    size: '5'
  },
  lastField: {
    label: 'Autocomplete',
    type: 'autocomplete',
    validation: 'required|number',
    values: 'getDynamicValues',
    multi: true,
    size: '5'
  },
}

action('getStaticValues',[
  {
    name: 'a',
    value: 'b'
  },
  {
    name: 'b',
    value: 'c'
  }
]);

action('getDynamicValues', async ({input}) => {
  let values = [
    {
      name: 'a',
      value: 'b'
    },
    {
      name: 'b',
      value: 'c'
    }
  ];

  return values.filter(item => item.name.toLowerCase().indexOf(input.text.toLowerCase()) > -1);
});

config({
  name: 'testAction',
  input: utils.form(form)
})(
  async ({ input }) => {
    return utils.success(input)
  }
)

utils.autoCrud('Post', {
  schema: utils.form({
    title: {
      label: 'Title',
      placeholder: '',
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
