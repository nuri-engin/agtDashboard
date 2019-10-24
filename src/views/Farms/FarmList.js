import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Link } from 'react-router-dom';
import firebase from '../../Firebase';

import CreateFarm from './CreateFarm';
import EditFarm from './EditFarm';
import ShowFarm from './ShowFarm';


const h4Style = {display:"inline"};

class FarmList extends Component {
  constructor(props) {
    super(props);
    this.ref = firebase.firestore().collection('farms');
    this.unsubscribe = null;
    this.state = {
      farms: []
    };
  }

  onCollectionUpdate = (querySnapshot) => {
    const farms = [];
    querySnapshot.forEach((doc) => {
      const { title, description, id } = doc.data();
      farms.push({
        key: doc.id,
        doc, // DocumentSnapshot
        title,
        description,
        id,
      });
    });
    this.setState({
      farms
   });
  }

  componentDidMount() {
    this.unsubscribe = this.ref.onSnapshot(this.onCollectionUpdate);
  }

  render() {
    return (
        <Router basename={window.location.pathname || ''}>
            <div>
                <Route path='/createfarm' component={CreateFarm} />
                <Route path='/editfarm/:id' component={EditFarm} />  
                <Route path='/createfarm' component={CreateFarm} />
                <Route path='/showfarm/:id' component={ShowFarm} />
                
                <div className="container">
                  <div className="panel panel-default">
                    <div className="panel-heading">
                      <h3 className="panel-title"> FARM LISTUS </h3>
                    </div>
                    <div className="panel-body">
                      <div>
                        <h4 style={h4Style}><Link to="/createfarm" className="btn btn-primary">Add Farm</Link></h4>
                        <h4 style={h4Style}><Link to="/admin/dashboard" className="btn btn-info">Return Main</Link></h4>
                      </div>
                      <div className="card" style={{width: '18rem'}}>
                      {this.state.farms.map(farms =>
                        <div className="card-body" key={farms.key} >
                          <h5 className="card-title">{farms.title}</h5>
                          <p className="card-text">{farms.description}</p>
                          <p className="card-text">{farms.id}</p>
                          <p className="card-text">
                            <Link to={`/showfarm/${farms.key}`}>{farms.title}</Link>
                          </p>
                          </div>
                      )}
                      </div>
                    </div>
                  </div>
                </div>
            </div>
        </Router>
    );
  }
}

export default FarmList;
