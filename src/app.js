
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';

import appRoutes from './routes';

ReactDOM.render(
  <BrowserRouter>
      {appRoutes}
  </BrowserRouter>
 ,
  document.getElementById('app-root')
);
