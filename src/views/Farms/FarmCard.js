import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import firebase from '../../Firebase';

import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import CardGroup from 'react-bootstrap/CardGroup'

class FarmCard extends Component {
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
        <div>
            <CardGroup>
                {this.state.farms.map(farms =>
                    <Card key={farms.key} style={{ width: '18rem' }}>
                    <Card.Img variant="top" src="https://via.placeholder.com/150" />
                    <Card.Body key={farms.key}>
                        <Card.Title>{farms.title}</Card.Title>
                        <Card.Text>
                        {farms.description}
                        </Card.Text>
                        <Button variant="primary">
                        <Link to={`/showfarm/${farms.key}`}>Details</Link>
                        </Button>
                    </Card.Body>
                    <Card.Footer>
                        <small className="text-muted">Farm ID: {farms.id}</small>
                    </Card.Footer>
                    </Card>
                )}
                </CardGroup>
        </div>
    );
  }
}

export default FarmCard;
