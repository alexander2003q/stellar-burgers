import { ChangeEvent, useRef, useState } from 'react';

type FormValues = Record<string, unknown>;

type InputChangeEvent = ChangeEvent<HTMLInputElement | HTMLTextAreaElement>;

export const useForm = <T extends FormValues>(initialValues: T) => {
  const initialValuesRef = useRef(initialValues);
  const [values, setValues] = useState<T>(initialValues);

  const handleInputChange = (event: InputChangeEvent) => {
    const { name, value } = event.target;
    setValues((prevValues) => ({
      ...prevValues,
      [name]: value
    }));
  };

  const setValue = <K extends keyof T>(name: K, value: T[K]) => {
    setValues((prevValues) => ({
      ...prevValues,
      [name]: value
    }));
  };

  const resetForm = (nextValues?: T) => {
    setValues(nextValues ?? initialValuesRef.current);
  };

  return {
    values,
    setValues,
    setValue,
    handleInputChange,
    resetForm
  };
};
