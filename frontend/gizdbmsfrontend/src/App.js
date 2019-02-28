import React, { Component } from 'react';
import './App.css';
import {Provider} from 'react-redux';
import store from './services/store/store';
import {Switch,Route,Redirect} from 'react-router-dom';
import Dashboard from './scenes/dashboard/dashboard';
import 'semantic-ui-css/semantic.min.css';
import Tables from './scenes/tables/tables';
import Forms from './scenes/forms/forms';
import Reports from './scenes/reports/reports';

class App extends Component {
  render() {
    return (
      <Provider store={store}>
      <div className="App">
      <Switch>
        <Route path="/dashboard" component={Dashboard}/>
        <Route path="/tables" component={Tables}/>
        <Route path="/reports" component={Reports}/>
        <Route render={() => <Redirect to="/dashboard"/>}></Route>
      </Switch>
      </div>
      </Provider>
    );
  }
}

export default App;
