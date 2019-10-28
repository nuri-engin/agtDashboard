import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import CreateFarm from './CreateFarm';
import EditFarm from './EditFarm';
import ShowFarm from './ShowFarm';
import FarmCard from './FarmCard';
import CheckoutForm from './CheckoutForm';

class FarmList extends Component {  
  render() {
    return (
        <Router basename={window.location.pathname || ''}>
          <Switch>
                  <Route path='/editfarm/:id' component={EditFarm} />  
                  <Route path='/createfarm' component={CreateFarm} />
                  <Route path='/checkoutform' component={CheckoutForm} />
                  <Route path='/showfarm/:id' component={ShowFarm} />
                  <Route exact path='/' component={FarmCard} />
          </Switch>
        </Router>
    );
  }
}

export default FarmList;
