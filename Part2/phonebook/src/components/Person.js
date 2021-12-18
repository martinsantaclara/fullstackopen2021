import React from 'react'

const Person = ({person, deletePerson}) => {
    const {id, name, number} = person
    return(
        <div>{name} {number}
            <button onClick={()=>deletePerson(id,name)}>delete</button>
        </div>
    )    
}

export default Person