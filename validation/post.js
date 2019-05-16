const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validatePostInput(data) {
  let errors = {};

  data.title = !isEmpty(data.title) ? data.title : '';
  data.content = !isEmpty(data.content) ? data.content : '';
  data.deadline = !isEmpty(data.deadline) ? data.deadline : '';

  if (!Validator.isLength(data.title, { min: 2, max: 30 })) {
    errors.title = 'Title must be between 2 and 30 characters';
  }

  if (!Validator.isLength(data.content, { min: 2, max: 50 })) {
    errors.content = 'Content must be between 2 and 50 characters';
  }

  if (Validator.toDate(data.deadline) === null) {
    errors.deadline = 'Deadline must be a valid date';
  }

  if (Validator.isEmpty(data.title)) {
    errors.title = 'Title field is required';
  }

  if (Validator.isEmpty(data.content)) {
    errors.content = 'Content field is required';
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
