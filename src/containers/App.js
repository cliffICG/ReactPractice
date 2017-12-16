import React, { Component } from 'react';
import classes from './App.css';
import Persons from '../components/Persons/Persons';
import Cockpit from '../components/Cockpit/Cockpit';
import WithClass from '../hoc/WithClass';

class App extends Component {
  state = {
    persons: [
        { id: "aiens", name: "Cliff", age: "30"},
        { id: "einsl", name: "Max", age: "28"},
        { id: "aniel", name: "Manu", age: "29"}
      ],
      otherState: "some other value",
      showPersons: false
  }
  
  nameChangedHandler = (event, id) => {
    const personIndex = this.state.persons.findIndex(p => {
      return p.id === id;
    });
    
    const person = {
      ...this.state.persons[personIndex]
    };
    
    person.name = event.target.value;
    
    const persons = [...this.state.persons];
    persons[personIndex] = person;
    
    this.setState( {persons: persons} )
  }
  
  togglePersonsHandler = () => {
    const doesShow = this.state.showPersons;
    this.setState({showPersons: !doesShow});
  }
  
  deletePersonHandler = (personIndex) => {
    // const persons = this.state.persons.slice(); //the constant item is the pointer to the element not the element
    const persons = [...this.state.persons];
    persons.splice(personIndex, 1);      //thus this item can be modified.
    this.setState({persons: persons});
  }
  
  render() {
    
    let persons = null;
    if (this.state.showPersons) {
      persons = (
          <Persons 
            persons={this.state.persons}
            clicked={this.deletePersonHandler}
            changed={this.nameChangedHandler}
            />
        );
    }
    
    return (
      <WithClass classes={classes.App}>
        <Cockpit 
          showPersons={this.state.showPersons}
          persons={this.state.persons}
          clicked={this.togglePersonsHandler}
        />
        {persons}
      </WithClass>
    );
    // return React.createElement('div', {className: "App"},
    //   React.createElement('h1', null, "Does this work now?")
    // )
  }
}

export default App;