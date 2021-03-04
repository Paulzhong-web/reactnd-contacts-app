import React, { Component } from 'react';
import PropTypes from 'prop-types';

class ListContacts extends Component {
    // propTypes on class Component:
    static propTypes = {
        contacts: PropTypes.array.isRequired,
        onDeleteContact: PropTypes.func.isRequired
    };

    state = {
        query: ''
    };

    updateQuery = (query) => {
        this.setState(() => ({
            // trim() : removes whitespace from both ends of a string
            query: query.trim()
        }));
    };

    // function to reset the query
    clearQuery = () => {
        this.updateQuery('')
    }

    render() {
        const { query } = this.state;
        const { contacts, onDeleteContact, onNavigate } = this.props;

        // below
        // if query is an empty string, show the original contact list
        // if query is not just an empty string, instead the user has tryped in the input field
        // as user types into the input field
        // will only get the users or the contacts that have the specific characters inside of their name
        const showingContacts = query === ''
            ? contacts
            : contacts.filter((c) => (
                c.name.toLowerCase().includes(query.toLowerCase())
            ))

        return(
            <div className='list-contacts'>
                {/* {JSON.stringify(this.state)} */}
                <div className='list-contacts-top'>
                    <input 
                        className='search-contacts'
                        type='text'
                        placeholder='Search Contacts'
                        value={query}
                        onChange={(event) => this.updateQuery(event.target.value)}
                    />
                    <a
                        href='#create'
                        onClick={onNavigate}
                        className='add-contact'
                    >Add Contact</a>
                </div>

                {showingContacts.length !== contacts.length && ( 
                    <div className='showing-contacts'>
                        <span>
                            Now showing {showingContacts.length} of {contacts.length}
                        </span>
                        <button onClick={this.clearQuery}>Show all</button>
                    </div>
                )} 

                 <ol className='contact-list'>
                    {showingContacts.map((contact) => (
                        <li key={contact.id} className='contact-list-item'>
                            <div
                                className='contact-avatar'
                                style={{
                                    backgroundImage: `url(${contact.avatarURL})`
                                }}
                            ></div>
                            <div className='contact-details'>
                                <p>{contact.name}</p>
                                <p>{contact.handle}</p>
                            </div> 
                            <button 
                                onClick={() => onDeleteContact(contact)}
                                className='contact-remove'
                            >
                                Remove
                            </button>
                        </li>
                    ))}
                </ol>
            </div>
        )
    }
};

export default ListContacts;