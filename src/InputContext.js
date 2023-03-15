import React, {useState, useContext, createContext} from 'react';

export const InputContext = createContext();

export const InputProvider = props => {
    const [departureIn, setDepartureIn] = useState('');
    const [arrivalIn, setArrivalIn] = useState('');
    const [departDateIn, setDepartDateIn] = useState('');
    const [returnDateIn, setReturnDateIn] = useState('');
    const [numPeopleIn, setNumPeopleIn] = useState(1);
    
    return (
        <InputContext.Provider value={{departureIn, setDepartureIn,arrivalIn, setArrivalIn,departDateIn, setDepartDateIn,returnDateIn, setReturnDateIn,numPeopleIn, setNumPeopleIn}}>
            {props.children}
        </InputContext.Provider>
    )
  }