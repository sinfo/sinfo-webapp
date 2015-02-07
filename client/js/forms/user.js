var FormView = require('ampersand-form-view');
var InputView = require('ampersand-input-view');
var CheckboxArray = require('ampersand-array-checkbox-view');
var options = require('options');
var templates = require('client/js/templates');

var ExtendedInput = InputView.extend({
    template: templates.includes.formInput()
});


module.exports = FormView.extend({
  fields: function () {
    return [
      new ExtendedInput({
        label: 'Id',
        name: 'id',
        value: this.model.id || '',
        required: false,
        placeholder: 'Id',
        parent: this
      }),
      new ExtendedInput({
        label: 'Name',
        name: 'name',
        value: this.model.name || '',
        required: false,
        placeholder: 'Name',
        parent: this
      }),
      new ExtendedInput({
        label: 'Image Url',
        name: 'img',
        value: this.model.img || '',
        required: false,
        placeholder: 'Img',
        parent: this
      }),
      new ExtendedInput({
        label: 'Mail',
        name: 'mail',
        value: this.model.mail || '',
        required: false,
        placeholder: 'Mail',
        parent: this
      }),
      new ExtendedInput({
        label: 'Role',
        name: 'role',
        value: this.model.role || '',
        required: false,
        placeholder: 'Role',
        parent: this
      }),
      new ExtendedInput({
        label: 'Area',
        name: 'area',
        value: this.model.area || '',
        required: false,
        placeholder: 'Area',
        parent: this
      }),
      new CheckboxArray({
        label: 'Skills',
        name: 'skills',
        template: templates.includes.formCheckboxGroup(),
        fieldTemplate: templates.includes.formCheckboxGroupElement(),
        value: this.model.skills || [],
        options: options.skills,
        minLength: 0,
        parent: this
      })
    ];
  }
});