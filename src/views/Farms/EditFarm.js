import React, { Component } from 'react';
import firebase from '../../Firebase';
import { Link } from 'react-router-dom';

class EditFarm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      key: '',
      title: '',
      description: '',
      id: ''
    };
  }

  componentDidMount() {
    const ref = firebase.firestore().collection('farms').doc(this.props.match.params.id);
    ref.get().then((doc) => {
      if (doc.exists) {
        const farm = doc.data();
        this.setState({
          key: doc.id,
          title: farm.title,
          description: farm.description,
          id: farm.id
        });
      } else {
        console.log("No such document!");
      }
    });
  }

  onChange = (e) => {
    const state = this.state
    state[e.target.name] = e.target.value;
    this.setState({farm:state});
  }

  onSubmit = (e) => {
    e.preventDefault();

    const { title, description, id } = this.state;

    const updateRef = firebase.firestore().collection('farms').doc(this.state.key);
    updateRef.set({
      title,
      description,
      id
    }).then((docRef) => {
      this.setState({
        key: '',
        title: '',
        description: '',
        id: ''
      });
      this.props.history.push("/showfarm/"+this.props.match.params.id)
    })
    .catch((error) => {
      console.error("Error adding document: ", error);
    });
  }

  render() {
    return (
      <div className="container">
        <div className="panel panel-default">
          <div className="panel-heading">
            <h3 className="panel-title">
              EDIT FARM
            </h3>
          </div>
          <div className="panel-body">
            <h4><Link to={`/showfarm/${this.state.key}`} className="btn btn-primary">Farm List</Link></h4>
            <form onSubmit={this.onSubmit}>
              <div className="form-group">
                <label htmlFor="title">Title:</label>
                <input type="text" className="form-control" name="title" value={this.state.title} onChange={this.onChange} placeholder="Title" />
              </div>
              <div className="form-group">
                <label htmlFor="description">Description:</label>
                <input type="text" className="form-control" name="description" value={this.state.description} onChange={this.onChange} placeholder="Description" />
              </div>
              <div className="form-group">
                <label htmlFor="id">ID:</label>
                <input type="text" className="form-control" name="id" value={this.state.id} onChange={this.onChange} placeholder="ID" />
              </div>
              <button type="submit" className="btn btn-success">Submit</button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default EditFarm;