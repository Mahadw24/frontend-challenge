import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';
import { RecoilRoot } from 'recoil';
import App from './pages/app';
import './styles.css'

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <RecoilRoot>
    <App />
  </RecoilRoot>
);
