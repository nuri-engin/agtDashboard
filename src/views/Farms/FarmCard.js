import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import firebase from '../../Firebase';
import "./FarmCard.scss";

import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import CardGroup from 'react-bootstrap/CardGroup'

class FarmCard extends Component {
  constructor(props) {
      super(props);
      this.ref = firebase.firestore().collection('farms');
      this.unsubscribe = null;
      this.state = {
        farms: [],
        order_collection: []
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

    addOrderFn = (farm) => {
      this.setState(state => {
        const order_collection = [...state.order_collection, farm];
        return {
          order_collection
        };
      });
            
      console.log(this.state.order_collection)
    }
    
  render() {
    return (
        <div>
            <Button variant="primary">
              <Link to={`/createfarm`}>Add New Farm</Link>
            </Button>
            <div> <br/> </div>
            <CardGroup>
                {this.state.farms.map(farms =>
                    <Card key={farms.key} style={{ width: '18rem' }}>
                    <Card.Img variant="top" src="https://via.placeholder.com/150" />
                    <Card.Body key={farms.key}>
                        <Card.Title>
                          <Link to={`/showfarm/${farms.key}`}>{farms.title}</Link>
                        </Card.Title>
                        <Card.Text>
                        {farms.description}
                        </Card.Text>
                    </Card.Body>
                    <Card.Footer>
                        <small className="text-muted">Farm ID: {farms.id}</small>
                        <Button onClick={ () => this.addOrderFn(farms)} variant="outline-info" className='detail_btn'>
                          +
                        </Button>
                    </Card.Footer>
                    </Card>
                )}
                </CardGroup>
        </div>
    );
  }
}

export default FarmCard;
