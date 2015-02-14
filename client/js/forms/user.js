var FormView = require('ampersand-form-view');
var InputView = require('ampersand-input-view');
var CheckboxArray = require('ampersand-array-checkbox-view');
var CheckboxView = require('ampersand-checkbox-view');
var DateView = require('ampersand-pikaday-view');
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
      }),
      new DateView({
        label: 'Job Start Date Avalability',
        value: this.model && this.model.job && this.model.job.start || new Date(),
        name: 'job-start'
      }),
      new CheckboxView({
        label: 'Interested in startup jobs?',
        name: 'job-startup',
        template: templates.includes.formCheckbox(),
        value: this.model && this.model.job && this.model.job.startup,
        parent: this
      }),
      new CheckboxView({
        label: 'Interested in internships?',
        name: 'job-internship',
        template: templates.includes.formCheckbox(),
        value: this.model && this.model.job && this.model.job.internship,
        parent: this
      }),
      new ExtendedInput({
        name: 'file',
        label: 'CV pdf file',
        type: 'file',
        accept: '.pdf',
        placeholder: 'Insert new file',
        required: false,
        parent: this
      })
    ];
  }
});