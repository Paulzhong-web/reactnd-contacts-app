import React, { Component } from 'react';
import ListContacts from './ListContacts';
// * means everything
import * as ContactsAPI from './utils/ContactsAPI';
import CreateContact from './CreateContact';


class App extends Component {

  state = {
    contacts: [],
    screen: 'list'
  };
  
  // lifecyle method to make API requests
  componentDidMount() {
    ContactsAPI.getAll() 
      .then((contacts) => {
        this.setState(() => ({
          contacts
        }));
      });
  };

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

    // use the Contacts API's remove() method to update the backend.
    ContactsAPI.remove(contact)
  }

  render() {
    return (
      <div>
        {/* short-circuit evaluation. If the first expression evaluates to true, then the second expression is run. 
        However, if the first expression evaluates to false, then the second expression is skipped.  */}
        {/* if this.state.screen === 'list' , show <LisContacts /> */}
        {this.state.screen === 'list' && (
          <ListContacts 
          contacts={this.state.contacts}
          onDeleteContact={this.removeContact}
          onNavigate={() => {
            this.setState(() => ({
              screen: 'create'
            }))
          }}
        />
        )}
        {/* if this.state.screen === 'create' , show <CreateContact /> */}
        {this.state.screen === 'create' && (
          <CreateContact />
        )}
      </div>
    );
  }
}

export default App;
