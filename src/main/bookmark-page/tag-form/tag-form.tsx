import * as React from 'react';

import { IPreventEvent } from '../../../App.type';
import { AppForm } from '../../../widgets/app-form/app-form';

export interface ITagFormProps {
  onTagFormSubmit: (tag: string) => (event: IPreventEvent) => void;
}

export const TagForm = (props: ITagFormProps) => (
  <AppForm
    buttonName="Add"
    formId="tag-form"
    inputLabel="tag"
    onAppFormSubmit={props.onTagFormSubmit}
  />
);
