import axios from 'axios';
import {React,  useState, useContext } from 'react';
import { Tabs, Tab, Card, Row, Col } from 'react-bootstrap';
// import { FaExchangeAlt, FaPlaneArrival, FaPlaneDeparture, FaBusAlt } from 'react-icons/fa';
import 'bootstrap/dist/css/bootstrap.min.css';
import { InputContext } from './InputContext';
import { useTranslation, Translation } from "react-i18next";
import i18n from 'i18next';
import { Dropdown, DropdownButton } from 'react-bootstrap';


function BookingPage() {

    const { t } = useTranslation();
    const currentLanguage = i18n.language;
    const [key, setKey] = useState('flight');
    const {departureIn, setDepartureIn,arrivalIn, setArrivalIn,departDateIn, setDepartDateIn,returnDateIn, setReturnDateIn,numPeopleIn, setNumPeopleIn} = useContext(InputContext);
    const [departure, setDeparture] = useState(departureIn);
    const [arrival, setArrival] = useState(arrivalIn);
    const [departDate, setDepartDate] = useState(departDateIn);
    const [returnDate, setReturnDate] = useState(returnDateIn);
    const [numPeople, setNumPeople] = useState(numPeopleIn);
    const [tripType, setTripType] = useState('round-trip');
    const [flights, setFlight] = useState([]);
    const [departureBus, setDepartureBus] = useState(departureIn);
    const [arrivalBus, setArrivalBus] = useState(arrivalIn);
    const [departDateBus, setDepartDateBus] = useState(departDateIn);
    const [returnDateBus, setReturnDateBus] = useState(returnDate);
    const [numPeopleBus, setNumPeopleBus] = useState(numPeopleIn);
    const [selectedValue, setSelectedValue] = useState('Hotel');
    const [selectedCountry, setCountryValue] = useState('France');
    const [buses, setBuses] = useState([]);
    const [budget, setBudget] = useState('');

    
    const handleCountryDropdownSelect = (eventKey) => {
        setCountryValue(eventKey);
      }  
      
    let handleSearchSubmit = (e) => {
        e.preventDefault();
        if(key=='flight'){
          setDepartureIn(departure);
        setArrivalIn(arrival);
        setDepartDateIn(departDate);
        setReturnDateIn(returnDate);
        setNumPeopleIn(numPeople);
        setDepartureBus(departure);
        setArrivalBus(arrival);
        setDepartDateBus(departDate);
        setReturnDateBus(returnDate);
        setNumPeopleBus(numPeople);
      }
      else if(key=='bus'){
        setDepartureIn(departure);
        setArrivalIn(arrival);
        setDepartDateIn(departDate);
        setReturnDateIn(returnDate);
        setNumPeopleIn(numPeople);
        setArrival(arrivalBus);
        setDepartDate(departDateBus);
        setReturnDate(returnDateBus);
        setNumPeople(numPeopleBus);
      }
    
        console.log("departure", departure);
        console.log("IN", departureIn);
        // console.log("departure", depature);
        const searchType = key;
        if(key=='flight'){
          
          const searchParams = {
            departure,
            arrival,
            // departDate,
            // returnDate,
            // numPeople,
            type: key,
            returnTrip: tripType == 'round-trip' ? true : false 
          };
          axios.get('http://localhost:2023/commute', { params: searchParams })
          .then(response => {
            let res = response.data;
            //change
            let sorted = [...res].sort((b ,a) => b.cost - a.cost);
            
            setFlight(sorted);
          })
          .catch(error => {
            console.log(error);
          });  
        }
        else if(key=='bus'){
          const searchParams = {
            from: departureBus,
            to: arrivalBus,
            // departDateBus,
            // returnDateBus,
            // numPeopleBus,
            type: key,
            returnTrip: tripType == 'round-trip' ? true : false 
          };
          axios.get('http://localhost:2023/commute', { params: searchParams })
          .then(response => {
              let res = response.data;
              //change
              let sorted = [...res].sort((b ,a) => b.cost - a.cost);
        
              setBuses(sorted);
            })
            .catch(error => {
              console.log(error);
            }); 
        }
      };

    return(
        <div className="container">
            <form onSubmit={handleSearchSubmit}>
            <div className="row my-3">
            <div className="col-md-1 ">
            <div className='fw-bolder text-primary'>{t("country")}</div>
            <DropdownButton className='text-white' id="my-dropdown" title={selectedCountry} onSelect={handleCountryDropdownSelect}>
            <Dropdown.Item eventKey="UAE">UAE</Dropdown.Item>
            <Dropdown.Item eventKey="Canada">Canada</Dropdown.Item>
            <Dropdown.Item eventKey="France">France</Dropdown.Item>
            </DropdownButton>
          </div>
            </div>
            </form>
        </div>
    );
}

export default BookingPage;
