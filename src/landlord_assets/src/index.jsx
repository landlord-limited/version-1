import React from "react";
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from "./components/App";
import { Provider } from './components/context/context'

// const CURRENT_USER_ID = Principal.fromText("2vxsx-fae");
// export default CURRENT_USER_ID;

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider>
        <App />
      </Provider>
    </BrowserRouter>
  </React.StrictMode>
)
