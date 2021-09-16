import React, { Suspense, lazy } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import './index.css';
import reportWebVitals from './reportWebVitals';

const ListTasks = lazy(() => import("./pages/ListTasks"));
const CreateTask = lazy(() => import("./pages/CreateTask"));

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <Switch>
        <Suspense fallback="">
          <Route exact path={"/"} component={ListTasks} />
          <Route exact path={"/create"} component={CreateTask} />
        </Suspense>
      </Switch>
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
