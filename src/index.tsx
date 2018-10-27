import * as React from 'react';
import * as ReactDOM from 'react-dom';
import App from './App';
import './index.css';
import registerServiceWorker from './registerServiceWorker';
import * as bookmarkService from './bookmark.service';

ReactDOM.render(
  <App fetch={fetch} bookmarkService={bookmarkService} />,
  document.getElementById('root') as HTMLElement,
);
registerServiceWorker();
