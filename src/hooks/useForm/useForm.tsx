import React, { FormEvent, useEffect, useState } from 'react';
import { UseForm } from './interfaces/useForm.interface';

export const useForm = ({ initialForm, validations, onSubmit }: UseForm) => {
  const [formData, setFormData] = useState(initialForm || {});
  const [formErrors, setFormErrors] = useState({} as Record<string, any>);
  const [formState, setFormState] = useState({} as Record<string, any>);
  const [isValidForm, setIsValidForm] = useState(true);

  useEffect(() => {
    const state = Object.keys(validations).reduce((states, formField) => ({
      ...states,
      [formField]: {
        isDirty: false,
      },
    }), {});

    setFormState(state);
  }, []);

  useEffect(() => {
    if (!onSubmit) {
      checkValidation();
    }
  }, [formData]);

  const handleChange = (formField: string) => ({ target }: FormEvent) => {
    const { value } = target as HTMLFormElement;

    setFormData({
      ...formData,
      [formField]: value,
    });

    setFormState((prevState) => ({
      ...prevState,
      [formField]: {
        isDirty: true,
      },
    }));
  };

  function checkValidation() {
    if (!validations) {
      return;
    }

    const newErrors = Object.entries(validations).reduce(
      (errors, [fieldName, validation]) => {
        const value = formData[fieldName];

        if (validation?.required?.value && !value) {
          return {
            ...errors,
            [fieldName]: validation?.required?.message,
          };
        }

        if (
          ((!validation?.required?.value && value)
            || validation?.required?.value)
          && validation?.custom?.isValid
          && !validation?.custom?.isValid(formData)
        ) {
          return {
            ...errors,
            [fieldName]: validation?.custom?.message,
          };
        }

        if (
          ((!validation?.required?.value && value)
            || validation?.required?.value)
          && validation?.pattern?.value
          && !RegExp(validation.pattern?.value).test(value)
        ) {
          return {
            ...errors,
            [fieldName]: validation?.pattern?.message,
          };
        }

        if (
          ((!validation?.required?.value && value)
            || validation?.required?.value)
          && Array.isArray(validation?.rules)
          && validation.rules.length
        ) {
          const messages = validation.rules
            .filter((rule) => !rule.isValid(formData))
            .map((rule) => rule.message);

          if (!messages.length) {
            return errors;
          }

          return {
            ...errors,
            [fieldName]: messages,
          };
        }

        return errors;
      },
      {},
    );

    if (Object.keys(newErrors).length) {
      setFormErrors({ ...newErrors });
      setIsValidForm(false);
      return;
    }

    setFormErrors({});
    setIsValidForm(true);
  }

  const handleSubmit = async (event: Event) => {
    if (!validations && !onSubmit) {
      return;
    }

    event.preventDefault();

    checkValidation();

    if (onSubmit && isValidForm) {
      onSubmit();
    }
  };

  return {
    formData,
    setFormData,
    formErrors,
    formState,
    isValidForm,
    handleChange,
    handleSubmit,
  };
};

export default useForm;
