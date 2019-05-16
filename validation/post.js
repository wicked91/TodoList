const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validatePostInput(data) {
  let errors = {};

  data.title = !isEmpty(data.title) ? data.title : '';
  data.content = !isEmpty(data.content) ? data.content : '';

  if (!Validator.isLength(data.title, { min: 10, max: 50 })) {
    errors.text = 'Title must be between 2 and 10 characters';
  }

  if (!Validator.isLength(data.content, { min: 10, max: 50 })) {
    errors.text = 'Post must be between 10 and 50 characters';
  }

  if (Validator.isEmpty(data.text)) {
    errors.text = 'Text field is required';
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
