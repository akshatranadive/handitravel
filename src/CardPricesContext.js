import React, {useState, createContext} from 'react';

export const CardPricesContext = createContext();

export const CardPricesProvider = props => {
    const [hotelPrice, setHotelPrice] = useState(0);
    const [flightPrice, setFlightPrice] = useState(0);
    const [busesPrice, setBusesPrice] = useState(0);
    const [totalPrice, setTotalPrice] = useState(0);
    let [selectedHotel, setSelectedHotel] = useState('');
    
    
    return (
        <CardPricesContext.Provider value={{hotelPrice, flightPrice, busesPrice, totalPrice, selectedHotel, setSelectedHotel, setTotalPrice, setBusesPrice, setFlightPrice, setHotelPrice}}>
            {props.children}
        </CardPricesContext.Provider>
    )
  }