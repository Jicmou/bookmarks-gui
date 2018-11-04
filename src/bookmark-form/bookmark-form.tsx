import * as React from 'react';

import { IPreventEvent } from '../App.type';
import { AppForm } from '../widgets/app-form/app-form';

export interface IBookmarkFormProps {
  onBookmarkFormSubmit: (link: string) => (event: IPreventEvent) => void;
}

export const BookmarkForm = (props: IBookmarkFormProps) => (
  <AppForm
    buttonName="Add"
    formId="bookmark-form"
    inputLabel="link"
    onAppFormSubmit={props.onBookmarkFormSubmit}
  />
);
