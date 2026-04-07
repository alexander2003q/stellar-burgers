import { ChangeEvent, SyntheticEvent } from 'react';

export type InputChangeHandler = (e: ChangeEvent<HTMLInputElement>) => void;

export type PageUIProps = {
  errorText: string | undefined;
  email: string;
  handleInputChange: InputChangeHandler;
  handleSubmit: (e: SyntheticEvent) => void;
};
