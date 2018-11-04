import * as React from 'react';

export interface IAppHeader {
  logo: '*.svg';
  title: string;
}

export const AppHeader = (props: IAppHeader) => (
  <header className="App-header">
    <img src={props.logo} className="App-logo" alt="logo" />
    <h1 className="App-title">{props.title}</h1>
  </header>
);
