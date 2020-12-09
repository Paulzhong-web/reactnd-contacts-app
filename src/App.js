import React, { Component } from 'react';
import ListContacts from './ListContacts';

class App extends Component {
  state = {
    contacts: [
      {
        "id": "karen",
        "name": "Karen Isgrigg",
        "handle": "karen_isgrigg",
        "avatarURL": "http://localhost:5001/karen.jpg"
      },
      {
        "id": "richard",
        "name": "Richard Kalehoff",
        "handle": "richardkalehoff",
        "avatarURL": "http://localhost:5001/richard.jpg"
      },
      {
        "id": "tyler",
        "name": "Tyler McGinnis",
        "handle": "tylermcginnis",
        "avatarURL": "http://localhost:5001/tyler.jpg"
      }
     ]
  }

  // since the data is inside the App component,
  // the method which modifies the data is in the sam component
  // in the fellow method, we create a function called removeContact 
  // since the state is changed depends on the previous state
  // we pass the current state as in this.setState
  // contacts array will filter out whatever id we click and create a new array to update the states
  // and then we pass the method as props to ListContacts, which the buttons are located
  removeContact = (contact) => {
    this.setState((currentState) => ({
        contacts: currentState.contacts.filter((c) => {
          return c.id !== contact.id
        })
    }))
  }

  render() {
    return (
      <div>
        {/* the "contacts" inside {} represent the contacts list array above */}
        <ListContacts 
          contacts={this.state.contacts}
          onDeleteContact={this.removeContact}
        />
      </div>
    );
  }
}

export default App;
