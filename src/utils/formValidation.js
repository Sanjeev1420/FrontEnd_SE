import Joi from "joi";

export const validateSignInForm = (formData) => {
  const schema = {
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    email: Joi.string()
      .email({ tlds: { allow: false } })
      .required(),
    password: Joi.string().min(5).required(),
    mobileNumber: Joi.string()
      .regex(/^[0-9-+() ]+$/)
      .required(),
  };

  const { error } = Joi.object(schema).validate(formData, {
    abortEarly: false,
  });
  if (!error) return null;

  const validationErrors = {};
  for (let item of error.details) {
    validationErrors[item.path[0]] = item.message;
  }

  return validationErrors;
};

export const validateLogInForm = (formData) => {
  const schema = {
    email: Joi.string()
      .email({ tlds: { allow: false } })
      .required(),
    password: Joi.string().min(5).required(),
  };

  const { error } = Joi.object(schema).validate(formData, {
    abortEarly: false,
  });
  if (!error) return null;

  const validationErrors = {};
  for (let item of error.details) {
    validationErrors[item.path[0]] = item.message;
  }

  return validationErrors;
};

export const userEditFormValidation = (formData) => {
  const schema = {
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    email: Joi.string()
      .email({ tlds: { allow: false } })
      .required(),
    mobileNumber: Joi.string()
      .regex(/^[0-9-+() ]+$/)
      .required(),
    preferedLanguage: Joi.string().valid("en", "fr", "ta", "hi").required(),
    theme: Joi.string().valid("light", "dark").required(),
  };

  const { error } = Joi.object(schema).validate(formData, {
    abortEarly: false,
  });
  if (!error) return null;

  const validationErrors = {};
  for (let item of error.details) {
    validationErrors[item.path[0]] = item.message;
  }

  return validationErrors;
};

export const userAddressFormValidation = (formData) => {
  const schema = {
    addressName: Joi.string().trim().required().label("Address name"),
    doorNo: Joi.string().trim().required().label("Door Number"),
    street: Joi.string().trim().required().label("Street name"),
    townOrVillage: Joi.string().trim().required().label("Town/village name"),
    district: Joi.string().trim().required().label("District name"),
    state: Joi.string().trim().required().label("State name"),
    country: Joi.string().trim().required().label("Country name"),
    pincode: Joi.string()
      .trim()
      .pattern(/^\d{6}$/)
      .required()
      .label("Pincode"),
    geoLocation: Joi.object({
      type: Joi.string().valid("Point").default("Point"),
      coordinates: Joi.array()
        .items(Joi.number())
        .length(2)
        .required()
        .label("Geolocation"),
    })
      .required()
      .label("Geolocation"),
  };

  const { error } = Joi.object(schema).validate(formData, {
    abortEarly: false,
  });
  if (!error) return null;

  const validationErrors = {};
  for (let item of error.details) {
    validationErrors[item.path[0]] = item.message;
  }

  return validationErrors;
};
