import React, { Component } from 'react';
import firebase from '../../Firebase';
import { Link } from 'react-router-dom';

class CreateF extends Component {
  constructor() {
    super();
    this.ref = firebase.firestore().collection('farms');
    this.state = {
      title: '',
      description: '',
      id: ''
    };
  }
  onChange = (e) => {
    const state = this.state
    state[e.target.name] = e.target.value;
    this.setState(state);
  }

  onSubmit = (e) => {
    e.preventDefault();

    const { title, description, id } = this.state;

    this.ref.add({
      title,
      description,
      id
    }).then((docRef) => {
      this.setState({
        title: '',
        description: '',
        id: ''
      });
      this.props.history.push("/")
    })
    .catch((error) => {
      console.error("Error adding document: ", error);
    });
  }

  render() {
    const { title, description, id } = this.state;
    return (
      <div className="container">
        <div className="panel panel-default">
          <div className="panel-heading">
            <h3 className="panel-title">
              ADD FARM
            </h3>
          </div>
          <div className="panel-body">
            <h4><Link to="/" className="btn btn-primary">Farm List</Link></h4>
            <form onSubmit={this.onSubmit}>
              <div className="form-group">
                <label htmlFor="title">Title:</label>
                <input type="text" className="form-control" name="title" defaultValue={title} onChange={this.onChange} placeholder="Title" />
              </div>
              <div className="form-group">
                <label htmlFor="description">Description:</label>
                <textarea className="form-control" name="description" value={description} onChange={this.onChange} placeholder="Description" cols="80" rows="3"/>
              </div>
              <div className="form-group">
                <label htmlFor="id">ID:</label>
                <input type="text" className="form-control" name="id" defaultValue={id} onChange={this.onChange} placeholder="ID" />
              </div>
              <button type="submit" className="btn btn-success">Submit</button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default CreateF;