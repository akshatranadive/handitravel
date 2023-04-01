import React, {useState, createContext} from 'react';

export const CardPricesContext = createContext();

export const CardPricesProvider = props => {
    const [hotelPrice, setHotelPrice] = useState(0);
    const [flightPrice, setFlightPrice] = useState(0);
    const [busesPrice, setBusesPrice] = useState(0);
    const [totalPrice, setTotalPrice] = useState(0);
    let [selectedHotel, setSelectedHotel] = useState('');
    
    const [transportName, settransportName] = useState();
    const [transportType, settransportType] = useState();
    const [departureB, setDepartureB] = useState();
    const [arrivalB, setArrivalB] = useState();
    const [time1, settime1] = useState();
    const [time2, settime2] = useState();
    const [time3, settime3] = useState();
    const [time4, settime4] = useState();

    
    return (
        <CardPricesContext.Provider value={{hotelPrice, flightPrice, busesPrice, totalPrice, selectedHotel, transportName,departureB,arrivalB,time1,time2,time3, transportType, settransportType, settime3,time4, settime4, settime2, settime1, setArrivalB, setDepartureB, settransportName, setSelectedHotel, setTotalPrice, setBusesPrice, setFlightPrice, setHotelPrice}}>
            {props.children}
        </CardPricesContext.Provider>
    )
  }