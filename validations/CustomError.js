import { errors } from "@vinejs/vine";

export class CustomErrorReporter {
  hasErrors = false;
  errors = {};


  report(message, rule, field, meta) {
    this.hasErrors = true;

    const fieldName = field?.wildCardPath || field?.fieldName || "data";

    if (!this.errors[fieldName]) {
      this.errors[fieldName] = [];
    }
    this.errors[fieldName].push(message);
  }

  createError() {
    const validationError = new errors.E_VALIDATION_ERROR("Validation failed");
    validationError.messages = this.errors;
    return validationError;
  }
}
