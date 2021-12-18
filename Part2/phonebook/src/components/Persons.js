import React from "react";
import Person from "./Person";

const Persons = ({filteredPersons, deletePerson}) => {
    return (
        <div>
          {filteredPersons.map(
            person=>
              <Person key={person.id} person={person} deletePerson={deletePerson}/>
            )
          }
        </div>
    )
}

export default Persons