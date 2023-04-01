import './FlightPage.css';
import { useHistory, Link, BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import axios from 'axios';
import React, { useState, useContext, useEffect } from 'react';
import { Tabs, Tab, Card, Row, Col, DropdownButton, Form } from 'react-bootstrap';
import { Button, ListGroup, ListGroupItem } from "react-bootstrap";
import { BiDownArrow, BiUpArrow } from 'react-icons/bi';
import { FaExchangeAlt, FaPlaneArrival, FaPlaneDeparture, FaBusAlt } from 'react-icons/fa';
import 'bootstrap/dist/css/bootstrap.min.css';
import { InputContext } from './InputContext';
import { useTranslation, Translation } from "react-i18next";
import i18n from 'i18next';
import { Dropdown } from 'react-bootstrap';
import { CardPricesContext } from './CardPricesContext';
import { MdFlight } from "react-icons/fa";
import { BsFillAirplaneFill ,BsFillBusFrontFill,BsFillQuestionCircleFill} from "react-icons/bs";
import { FaHotel ,FaFlagUsa } from "react-icons/fa";
import { ImPriceTag } from "react-icons/im";
import { AiFillMedicineBox } from "react-icons/ai";
import { MdTravelExplore } from "react-icons/md";
import BookingPage from './BookingPage';
var data = require("./assets/ReturnFlightsData.json");


function FlightPage() {
  const { t } = useTranslation();
  const currentLanguage = i18n.language;
  const [key, setKey] = useState('hotels');
  let {hotelPrice=0, flightPrice=0, busesPrice=0, totalPrice=0, setTotalPrice, setBusesPrice, setFlightPrice, setHotelPrice} = useContext(CardPricesContext);
  const {departureIn, setDepartureIn,arrivalIn, setArrivalIn,departDateIn, selectedHotel, setSelectedHotel, setDepartDateIn,returnDateIn, setReturnDateIn,numPeopleIn, setNumPeopleIn} = useContext(InputContext);
  const [departure, setDeparture] = useState(departureIn);
  const [arrival, setArrival] = useState(arrivalIn);
  const [hospital, setHospital] = useState(arrivalIn);
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
  let [selectedDisability, setSelectedDisability] = useState([]);
  let [selectedFlightsDisability, setSelectedFlightsDisability] = useState([]);
  let [selectedBusesDisability, setSelectedBusesDisability] = useState([]);
  const [hotels, setHotels] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [showArrivalSearch, setshowArrivalSearch] = useState(false);
  const [showDepartureSearch, setshowDepartureSearch] = useState(false);
  
  const [nodataText, setnodataText] = useState("");
  const [nodataTextNotify, setnodataTextNotify] = useState("");

  const history = useHistory();


  //budget percent changing region

  
  const onArrivalClick = (event) => {
    setshowArrivalSearch(true);
    // setDeparture(event.target.value);
  };
  const onDepartureClick = (event) => {
    setshowDepartureSearch(true);
    // setDeparture(event.target.value);
  };

  const onChange = (event) => {
    setDeparture(event.target.value);
  };

  // const handleTabChanges = (k) => {
  //   setKey(k);
  //   if(key=='hotels'){
  //     callHotelDetails();
  //   }
  //   else if(key=='flight'){
  //     callFlightDetails();
  //   }
  //   else if(key=='bus'){
  //     callBusDetails();
  //   }
  // };



  //handle select all/remove all

  const handleSelectAllFlights = () => {
    setSelectedFlightsDisability([
	  "Special meals",
	  "Wheelchair assistance",
	  "Priority boarding",
	  "Extra legroom",
	  "Accessible lavatories",
	  "Braille safety cards",
	  "Sign language interpretation",
	  "In-flight medical assistance",
	  "Visual and auditory aids",
	  "Priority baggage handling",
	  "Accessible check-in counters",
	  "Special seating arrangements"
    ]);
    // callFlightDetails();
  };
  const handleSelectAllHotels = () => {
    setSelectedDisability([
      "Visual alarm clocks",
	  "Lowered light switches and peepholes",
	  "Video remote interpreting (VRI)",
	  "Staff trained in American Sign Language",
	  "Portable hearing amplifier",
	  "TTY phones",
	  "Closed-captioned television",
	  "Elevators or ramps",
	  "Bed rails",
	  "Shower chairs",
	  "Accessible parking spots",
	  "Roll-in showers with grab bars",
	  "Wide doorways"
    ]);
    // callHotelDetails();
  };
  const handleSelectAllBuses = () => {
    setSelectedBusesDisability([
      "Wheelchair lift",
	  "Accessible seating",
	  "Audio announcements",
	  "On-board restroom",
	  "Air conditioning",
	  "Bookable assistance",
	  "On-board entertainment",
	  "On-board refreshments"
    ]);
    // callBusDetails();
  };

  const handleRemoveAllFlights = () => {
    setSelectedFlightsDisability([]);
    // callFlightDetails();
  };
  const handleRemoveAllHotels = () => {
    setSelectedDisability([]);
    // callHotelDetails();
  };
  const handleRemoveAllBuses = () => {
    setSelectedBusesDisability([]);
    // callBusDetails();
  };



  const onSearchDeparture = (searchTerm) => {
    setDeparture(searchTerm);
  };
  const onSearchArrival = (searchTerm) => {
    setArrival(searchTerm);
  };

  let handleHotelSelection = (hotelName) => {
    setSelectedHotel(hotelName);
    console.log("sel hotel"+selectedHotel);
    

    // let hotel = this.hotels.find(hotel => hotel.accomodations === hotelName);
    // setHotelPrice(hotel.bestPrice);
  };

  let dataChange = () =>{
    let hotel = hotels.find(hotel => hotel.country === selectedCountry && hotel.accomodations === selectedHotel);
    setHotelPrice(hotel);
  };

  const handleExchangeClick = () => {
    const temp = departure;
    setDeparture(arrival);
    setArrival(temp);
    // setDepartureIn(arrival);
    // setArrivalIn(temp);
  };
  const handleLanguageChange = (event) => {
    console.log("language: "+event.target.value)
    i18n.changeLanguage(event.target.value);
  };
  const handleDropdownSelect = (eventKey) => {
    setSelectedValue(eventKey);
  }  
  const handleCountryDropdownSelect = (eventKey) => {
    setCountryValue(eventKey);
  }  

  const handleTripTypeChange = (e) => {
    setTripType(e.target.value);
    // if (e.target.value === 'one-way') {
    //   setReturnDate('');
    //   setReturnDateIn('');
    // }
    setFlight([]);
  };

  const handleExchangeClickBus = () => {
    const temp = departureBus;
    setDepartureBus(arrivalBus);
    setArrivalBus(temp);
    // setDepartureIn(arrivalBus);
    // setArrivalIn(temp);
  };
  
  const handleCheckboxChange = (event) => {
    const { value, checked } = event.target;
    if (checked) {
      setSelectedDisability([...selectedDisability, value]);
    } else {
      setSelectedDisability(selectedDisability.filter((disability) => disability !== value));
    }

    // callHotelDetails();
  }
  let handleFlightCheckboxChange = (event) => {
    const { value, checked } = event.target;
    if (checked) {
      setSelectedFlightsDisability([...selectedFlightsDisability, value]);
    } else {
      setSelectedFlightsDisability(selectedFlightsDisability.filter((disability) => disability !== value));
    }

    // callFlightDetails();
  }
  const handleBusesCheckboxChange = (event) => {
    const { value, checked } = event.target;
    if (checked) {
      setSelectedBusesDisability([...selectedBusesDisability, value]);
    } else {
      setSelectedBusesDisability(selectedBusesDisability.filter((disability) => disability !== value));
    }

    // callBusDetails();
  }
  let content;
  let ammenitiesContent;
  if (key === 'hotels') {
    content = (
      <div className="col-md-2">
            <div className='fw-bolder text-primary'>{t("Hotel")}</div>
            <DropdownButton className='text-white' id="my-dropdown" title={selectedValue} onSelect={handleDropdownSelect}>
            <Dropdown.Item eventKey={t("Hotel")}>{t("Hotel")}</Dropdown.Item>
            <Dropdown.Item eventKey={t("Motel")}>{t("Motel")}</Dropdown.Item>
            <Dropdown.Item eventKey={t("Zostel")}>{t("Zostel")}</Dropdown.Item>
            <Dropdown.Item eventKey={t("Homestays")}>{t("Homestays")}</Dropdown.Item>
            </DropdownButton>
            </div>
    );
    ammenitiesContent = (
      <div>
        <div>
        <Card>
      <Card.Header className='bann'> <AiFillMedicineBox  style={{ marginRight: '5px' }} /> {t("amenities")} </Card.Header>
      <Card.Body>
      <ListGroup>
       
      <div className="checkbox-container1">
  <div style={{ display: 'flex'}} className='my-2'>
    <button type="button" className="btn btn-outline-success btn-sm" onClick={handleSelectAllHotels}>
      {t("selectall")}
    </button>
    <button type="button" className="btn btn-outline-danger btn-sm" style={{ marginLeft: '5px' }} onClick={handleRemoveAllHotels}>
      {t("removeall")}
    </button>
  </div>

<div class="checkbox">
<div className="form-check">

<input type="checkbox" className="form-check-input" id="Visual" value="Visual alarm clocks" checked={selectedDisability.includes("Visual alarm clocks")} onChange={handleCheckboxChange}/>
<label className="form-check-label" style={{  display: 'flex', flexWrap: 'wrap' }} htmlFor="Visual" >{t("visualalarmclcks")}</label>
</div>     

<div className="form-check">
<input type="checkbox" className="form-check-input" id="llpeepholes" value="Lowered light switches and peepholes" checked={selectedDisability.includes("Lowered light switches and peepholes")} onChange={handleCheckboxChange} />
<label className="form-check-label" style={{  display: 'flex', flexWrap: 'wrap' }} htmlFor="llpeepholes" >{t("llpeepholes")}</label>
</div>
<div className="form-check">
<input type="checkbox" className="form-check-input" id="Video" value="Video remote interpreting (VRI)" checked={selectedDisability.includes("Video remote interpreting (VRI)")} onChange={handleCheckboxChange}/>
<label className="form-check-label" style={{  display: 'flex', flexWrap: 'wrap' }} htmlFor="Video" >{t("vri")}</label>
</div>
<div className="form-check">
<input type="checkbox" className="form-check-input" id="Staff" value="Staff trained in American Sign Language" checked={selectedDisability.includes("Staff trained in American Sign Language")} onChange={handleCheckboxChange} />
<label className="form-check-label" style={{  display: 'flex', flexWrap: 'wrap' }} htmlFor="Staff" >{t("Stf_am")}</label>
</div>
<div className="form-check">
<input type="checkbox" className="form-check-input" id="Portable1" value="Portable hearing amplifier" checked={selectedDisability.includes("Portable hearing amplifier")} onChange={handleCheckboxChange}/>
<label className="form-check-label" style={{  display: 'flex', flexWrap: 'wrap' }} htmlFor="Portable1" >{t("Pha")}</label>
</div>
<div className="form-check">
<input type="checkbox" className="form-check-input" id="TTY" value="TTY phones" checked={selectedDisability.includes("TTY phones")} onChange={handleCheckboxChange} />
<label className="form-check-label" style={{  display: 'flex', flexWrap: 'wrap' }} htmlFor="TTY" >{t("ttyphones")}</label>
</div>
<div className="form-check">
<input type="checkbox" className="form-check-input" id="Closed" value="Closed-captioned television" checked={selectedDisability.includes("Closed-captioned television")} onChange={handleCheckboxChange}/>
<label className="form-check-label" style={{  display: 'flex', flexWrap: 'wrap' }} htmlFor="Closed" >{t("cct")}</label>
</div>
<div className="form-check">
<input type="checkbox" className="form-check-input" id="Elevators" value="Elevators or ramps" checked={selectedDisability.includes("Elevators or ramps")} onChange={handleCheckboxChange} />
<label className="form-check-label" style={{  display: 'flex', flexWrap: 'wrap' }} htmlFor="Elevators" >{t("Elevators")}</label>
</div>
<div className="form-check">
<input type="checkbox" className="form-check-input" id="Bed" value="Bed rails" checked={selectedDisability.includes("Bed rails")} onChange={handleCheckboxChange}/>
<label className="form-check-label" style={{  display: 'flex', flexWrap: 'wrap' }} htmlFor="Bed" >{t("Bed")}</label>
</div>
<div className="form-check">
<input type="checkbox" className="form-check-input" id="Shower" value="Shower chairs" checked={selectedDisability.includes("Shower chairs")} onChange={handleCheckboxChange} />
<label className="form-check-label" style={{  display: 'flex', flexWrap: 'wrap' }} htmlFor="Shower" >{t("shwChairs")}</label>
</div>
<div className="form-check">
<input type="checkbox" className="form-check-input" id="Accessible" value="Accessible parking spots" checked={selectedDisability.includes("Accessible parking spots")} onChange={handleCheckboxChange}/>
<label className="form-check-label" style={{  display: 'flex', flexWrap: 'wrap' }} htmlFor="Accessible" >{t("parking")}</label>
</div>
<div className="form-check">
<input type="checkbox" className="form-check-input" id="Roll" value="Roll-in showers with grab bars" checked={selectedDisability.includes("Roll-in showers with grab bars")} onChange={handleCheckboxChange} />
<label className="form-check-label" style={{  display: 'flex', flexWrap: 'wrap' }} htmlFor="Roll" >{t("showerBars")}</label>
</div>
<div className="form-check">
<input type="checkbox" className="form-check-input" id="Wide" value="Wide doorways" checked={selectedDisability.includes("Wide doorways")} onChange={handleCheckboxChange} />
<label className="form-check-label" style={{  display: 'flex', flexWrap: 'wrap' }} htmlFor="Wide" >{t("w_doorways")}</label>
</div>
</div>
</div>

</ListGroup>
</Card.Body>
</Card>
</div>
</div>

    );
  } else if (key === 'flight') {
    content = (
      <div className="col-md-2">
            <div className='fw-bolder text-primary'>{t("triptype")}</div>
              <div classname="form-check">
                <input
                  classname="form-check-input"
                  type="radio"
                  name="trip-type"
                  id="round-trip"
                  value="round-trip"
                  onClick={handleTripTypeChange}
                  defaultChecked
                />
                <label classname="form-check-label" >
                {t("roundtrip")}
                </label>
              </div>
              <div classname="form-check">
                <input
                  classname="form-check-input"
                  type="radio"
                  name="trip-type"
                  id="one-way"
                  value="one-way"
                  onClick={handleTripTypeChange}
                />
                <label classname="form-check-label" >
                {t("oneway")}
                </label>
              </div>
            </div>
    );
  
    ammenitiesContent = (  
      <div>
<div>
<Card>
<Card.Header className='bann'> <AiFillMedicineBox  style={{ marginRight: '5px' }} />  {t("amenities")}</Card.Header>
<Card.Body>
<ListGroup>
<div className="checkbox-container1">
  <div style={{ display: 'flex'}} className='my-2'>
    <button type="button" className="btn btn-outline-success btn-sm" onClick={handleSelectAllFlights}>
      {t("selectall")}
    </button>
    <button type="button" className="btn btn-outline-danger btn-sm" style={{ marginLeft: '5px' }} onClick={handleRemoveAllFlights}>
      {t("removeall")}
    </button>
  </div>
<div className="form-check"> 
<input type="checkbox" className="form-check-input" id="specialmeals" value="Special meals" checked={selectedFlightsDisability.includes("Special meals")} onChange={handleFlightCheckboxChange}/>
<label className="form-check-label" style={{  display: 'flex', flexWrap: 'wrap' }} htmlFor="specialmeals" >{t("specialmeals")}</label>
</div>
<div className="form-check">
<input type="checkbox" className="form-check-input" id="wheelchairassistance" value="Wheelchair assistance" checked={selectedFlightsDisability.includes("Wheelchair assistance")} onChange={handleFlightCheckboxChange}/>
<label className="form-check-label" style={{  display: 'flex', flexWrap: 'wrap' }} htmlFor="wheelchairassistance" >{t("wheelchairassistance")}</label>
</div>
<div className="form-check">
<input type="checkbox" className="form-check-input" id="Priorityboarding" value="Priority boarding" checked={selectedFlightsDisability.includes("Priority boarding")} onChange={handleFlightCheckboxChange} />
<label className="form-check-label" style={{  display: 'flex', flexWrap: 'wrap' }} htmlFor="Priorityboarding" >{t("Priorityboarding")}</label>
</div>
<div className="form-check">
<input type="checkbox" className="form-check-input" id="extralegroom" value="Extra legroom" checked={selectedFlightsDisability.includes("Extra legroom")} onChange={handleFlightCheckboxChange}/>
<label className="form-check-label" style={{  display: 'flex', flexWrap: 'wrap' }} htmlFor="extralegroom" >{t("extralegroom")}</label>
</div>
<div className="form-check">
<input type="checkbox" className="form-check-input" id="accessiblelavatories" value="Accessible lavatories" checked={selectedFlightsDisability.includes("Accessible lavatories")} onChange={handleFlightCheckboxChange} />
<label className="form-check-label" style={{  display: 'flex', flexWrap: 'wrap' }} htmlFor="accessiblelavatories" >{t("accessiblelavatories")}</label>
</div>
<div className="form-check">
<input type="checkbox" className="form-check-input" id="braillesafetycards" value="Braille safety cards" checked={selectedFlightsDisability.includes("Braille safety cards")} onChange={handleFlightCheckboxChange}/>
<label className="form-check-label" style={{  display: 'flex', flexWrap: 'wrap' }} htmlFor="braillesafetycards" >{t("braillesafetycards")}</label>
</div>
<div className="form-check">
<input type="checkbox" className="form-check-input" id="signlanguageinterpretation" value="Sign language interpretation" checked={selectedFlightsDisability.includes("Sign language interpretation")} onChange={handleFlightCheckboxChange} />
<label className="form-check-label" style={{  display: 'flex', flexWrap: 'wrap' }} htmlFor="signlanguageinterpretation" >{t("signlanguageinterpretation")}</label>
</div>
<div className="form-check">
<input type="checkbox" className="form-check-input" id="medicalassistance" value="In-flight medical assistance" checked={selectedFlightsDisability.includes("In-flight medical assistance")} onChange={handleFlightCheckboxChange} />
<label className="form-check-label" style={{  display: 'flex', flexWrap: 'wrap' }} htmlFor="medicalassistance" >{t("medicalassistance")}</label>
</div>
<div className="form-check">
<input type="checkbox" className="form-check-input" id="visualauditoryaids" value="Visual and auditory aids" checked={selectedFlightsDisability.includes("Visual and auditory aids")} onChange={handleFlightCheckboxChange}/>
<label className="form-check-label" style={{  display: 'flex', flexWrap: 'wrap' }} htmlFor="visualauditoryaids" >{t("visualauditoryaids")}</label>
</div>
<div className="form-check">
<input type="checkbox" className="form-check-input" id="prioritybaggagehandling" value="Priority baggage handling" checked={selectedFlightsDisability.includes("Priority baggage handling")} onChange={handleFlightCheckboxChange} />
<label className="form-check-label" style={{  display: 'flex', flexWrap: 'wrap' }} htmlFor="prioritybaggagehandling" >{t("prioritybaggagehandling")}</label>
</div>
<div className="form-check">
<input type="checkbox" className="form-check-input" id="Accessiblecheckincounters" value="Accessible check-in counters" checked={selectedFlightsDisability.includes("Accessible check-in counters")} onChange={handleFlightCheckboxChange}/>
<label className="form-check-label" style={{  display: 'flex', flexWrap: 'wrap' }} htmlFor="Accessiblecheckincounters" >{t("Accessiblecheckincounters")}</label>
</div>
<div className="form-check">
<input type="checkbox" className="form-check-input" id="seatarrangement" value="Special seating arrangements" checked={selectedFlightsDisability.includes("Special seating arrangements")} onChange={handleFlightCheckboxChange} />
<label className="form-check-label" style={{  display: 'flex', flexWrap: 'wrap' }} htmlFor="seatarrangement" >{t("seatarrangement")}</label>
</div>
</div>
</ListGroup>
</Card.Body>
</Card>
</div>
</div>);

  } else if(key === 'bus') {
    content = (
      <div></div>
    );
    ammenitiesContent = (
      <div>
        <div>
  <Card>
<Card.Header className='bann'> <AiFillMedicineBox  style={{ marginRight: '5px' }} />  {t("amenities")}</Card.Header>
<Card.Body>
<ListGroup>
<div className="checkbox-container1">
  <div style={{ display: 'flex'}} className='my-2'>
    <button type="button" className="btn btn-outline-success btn-sm" onClick={handleSelectAllBuses}>
      {t("selectall")}
    </button>
    <button type="button" className="btn btn-outline-danger btn-sm" style={{ marginLeft: '5px' }} onClick={handleRemoveAllBuses}>
      {t("removeall")}
    </button>
  </div>
<div className="form-check">

<input type="checkbox" className="form-check-input" id="wheelchairlift" value="Wheelchair lift" checked={selectedBusesDisability.includes("Wheelchair lift")} onChange={handleBusesCheckboxChange}/>
<label className="form-check-label" style={{  display: 'flex', flexWrap: 'wrap' }} htmlFor="wheelchairlift" >{t("wheelchairlift")}</label>
</div>
<div className="form-check">

<input type="checkbox" className="form-check-input" id="accessibleseating" value="Accessible seating" checked={selectedBusesDisability.includes("Accessible seating")} onChange={handleBusesCheckboxChange} />
<label className="form-check-label" style={{  display: 'flex', flexWrap: 'wrap' }} htmlFor="accessibleseating" >{t("accessibleseating")}</label>
</div>
<div className="form-check">

<input type="checkbox" className="form-check-input" id="audioannouncements" value="Audio announcements" checked={selectedBusesDisability.includes("Audio announcements")} onChange={handleBusesCheckboxChange}/>
<label className="form-check-label" style={{  display: 'flex', flexWrap: 'wrap' }} htmlFor="audioannouncements" >{t("audioannouncements")}</label>
</div>
<div className="form-check">

<input type="checkbox" className="form-check-input" id="onboardrestroom" value="On-board restroom" checked={selectedBusesDisability.includes("On-board restroom")} onChange={handleBusesCheckboxChange} />
<label className="form-check-label" style={{  display: 'flex', flexWrap: 'wrap' }} htmlFor="onboardrestroom" >{t("onboardrestroom")}</label>
</div>
<div className="form-check">

<input type="checkbox" className="form-check-input" id="AC" value="Air conditioning" checked={selectedBusesDisability.includes("Air conditioning")} onChange={handleBusesCheckboxChange} />
<label className="form-check-label" style={{  display: 'flex', flexWrap: 'wrap' }} htmlFor="AC" >{t("AC")}</label>
</div>
<div className="form-check">

<input type="checkbox" className="form-check-input" id="Bassistance" value="Bookable assistance" checked={selectedBusesDisability.includes("Bookable assistance")} onChange={handleBusesCheckboxChange} />
<label className="form-check-label" style={{  display: 'flex', flexWrap: 'wrap' }} htmlFor="Bassistance" >{t("Bassistance")}</label>
</div>
<div className="form-check">

<input type="checkbox" className="form-check-input" id="onboardentertainment" value="On-board entertainment" checked={selectedBusesDisability.includes("On-board entertainment")} onChange={handleBusesCheckboxChange} />
<label className="form-check-label" style={{  display: 'flex', flexWrap: 'wrap' }} htmlFor="onboardentertainment" >{t("onboardentertainment")}</label>
</div>
<div className="form-check">

<input type="checkbox" className="form-check-input" id="onboardrefreshments" value="On-board refreshments" checked={selectedBusesDisability.includes("On-board refreshments")} onChange={handleBusesCheckboxChange} />
<label className="form-check-label" style={{  display: 'flex', flexWrap: 'wrap' }} htmlFor="onboardrefreshments" >{t("onboardrefreshments")}</label>
</div>
</div>


</ListGroup>

</Card.Body>
</Card>
</div>
</div>

    );
  }

  const callHotelDetails = () => {
    
      
    let searchParams = {
      // destination: destination,
      // checkin: checkin,
      // checkout: checkout,
      // numOfPeople: numOfPeople,
      location:arrival,
      budget: budget*(0.3),
      disability:selectedDisability,
      // country:selectedCountry,
      // selectedValue: selectedValue
    };
    
    // setHotelPrice(0);
    axios.get('https://handitravel-server-git-testserverbr-akshatranadive.vercel.app/hotel', { params: searchParams })
    .then(response => {
      let res = response.data;
      //change
      let sorted = [];
      let filteredHotels = [];
      filteredHotels = res.filter(hotel => hotel.type == selectedValue && hotel.country == selectedCountry);
      sorted = [...filteredHotels].sort((b ,a) => b.bestPrice - a.bestPrice);

      if(sorted.length === 0){
        setnodataText("No data found for required destination, budget and amenities.");
        setnodataTextNotify("We have notified server for your requirements! Try with different parameters.");
      }
      else{
        setnodataText("");
        setnodataTextNotify("");
      }
      sorted.forEach(hotel => {
        let amenitiesSet = new Set(hotel.amenities.split(', '));
        // let newAmenities = ["amenity1", "amenity2", "amenity3"]; // replace with your own amenities data
        // selectedDisability.forEach(amenity => {
        //   if (!amenitiesSet.has(amenity)) {
        //     amenitiesSet.add(amenity);
        //   }
        // });
        hotel.location = arrival;
        // hotel.amenities = Array.from(amenitiesSet).join(', ');
      });
  
      setHotels(sorted);
    })
    .catch(error => {
      console.log(error);
    });  

  };
  const callFlightDetails = () => {

      
    const searchParams = {
      departure,
      arrival,
      // departDate,
      // returnDate,
      // numPeople,
      amenities:selectedFlightsDisability,
      type: key,
      returnTrip: tripType == 'round-trip' ? true : false,
      budget: budget/2,
    };
    // setFlightPrice(0);
    axios.get('https://handitravel-server-git-testserverbr-akshatranadive.vercel.app/flights', { params: searchParams })
    .then(response => {
      let res = [];
      res = response.data;
      if(res.length === 0){
        setnodataText("No data found for required destination, budget and amenities.");
        setnodataTextNotify("We have notified server for your requirements! Try with different parameters.");
      }
      else{
        setnodataText("");
        setnodataTextNotify("");
      }
      //change
      let sorted = [];
      sorted = [...res].sort((b ,a) => b.cost - a.cost);
      
      sorted.forEach(flight => {
        let amenitiesSet = new Set(flight.ammenities.split(','));
        // let newAmenities = ["amenity1", "amenity2", "amenity3"]; // replace with your own amenities data
        selectedFlightsDisability.forEach(amenity => {
          if (!amenitiesSet.has(amenity)) {
            amenitiesSet.add(amenity);
          }
        });
        flight.ammenities = Array.from(amenitiesSet).join(',');
      });
      setFlight(sorted);
    })
    .catch(error => {
      console.log(error);
    });  
  
  };
  const callBusDetails = () => {

    const searchParams = {
      to: arrival,
      from: departure,
      amenities:selectedBusesDisability,
      // departDateBus,
      // returnDateBus,
      // numPeopleBus,
      budget: budget*(0.2),
      //returnTrip: tripType == 'round-trip' ? true : false 
    };

    // setBusesPrice(0);
    axios.get('https://handitravel-server-git-testserverbr-akshatranadive.vercel.app/buses', { params: searchParams })
    .then(response => {
        let res = response.data;
        if(res.length === 0){
          setnodataText("No data found for required destination, budget and amenities.");
          setnodataTextNotify("We have notified server for your requirements! Try with different parameters.");
        }
        else{
          setnodataText("");
          setnodataTextNotify("");
        }
        //change
        let sorted = [...res].sort((b ,a) => b.cost - a.cost);
  
        sorted.forEach(bus => {
          let amenitiesSet = new Set(bus.amenities.split(','));
          // let newAmenities = ["amenity1", "amenity2", "amenity3"]; // replace with your own amenities data
          selectedBusesDisability.forEach(amenity => {
            if (!amenitiesSet.has(amenity)) {
              amenitiesSet.add(amenity);
            }
          });
          bus.amenities = Array.from(amenitiesSet).join(',');
        });
        setBuses(sorted);
      })
      .catch(error => {
        console.log(error);
      }); 
  };

  const handleTripTypeChangeBus = (e) => {
    setTripType(e.target.value);
    if (e.target.value === 'one-way') {
      setReturnDateBus('');
      setReturnDateIn('');
    }
  };


  let handleSearchSubmit = (e) => {
    e.preventDefault();

    if ( !arrival || !departure || !departDate || !returnDate || !numPeople ||!budget) {
      setErrorMessage("Please fill in all fields.");
    } 
    else{
      setErrorMessage("");
    }

    
    if(key=='hotels'){
      callHotelDetails();
    }
    else if(key=='flight'){
      callFlightDetails();
    }
    else if(key=='bus'){
      callBusDetails();
    }
  };



  return (
    <div className="container">
    
       <form onSubmit={handleSearchSubmit}>
       <div class="jumbotron jumbotron-fluid">
       <Card>
       <Card.Header className='bann'><MdTravelExplore/> Explore Options </Card.Header>
      <Card.Body>

       <div className="row my-3">
      
          <div className="col-md-1 ">
            <div className='fw-bolder text-primary'>{t("country")}</div>
            <DropdownButton className='text-white' id="my-dropdown" title={selectedCountry} onSelect={handleCountryDropdownSelect}>
            <Dropdown.Item eventKey="UAE">UAE</Dropdown.Item>
            <Dropdown.Item eventKey="Canada">Canada</Dropdown.Item>
            <Dropdown.Item eventKey="France">France</Dropdown.Item>
            <Dropdown.Item eventKey="USA">USA</Dropdown.Item>
            <Dropdown.Item eventKey="UK">UK</Dropdown.Item>
            <Dropdown.Item eventKey="Australia">Australia</Dropdown.Item>
            </DropdownButton>
          </div>
          <div className="form-group col-md-2">
                <label htmlFor="departure" className='fw-bolder text-primary'>{t("Departure")}</label>
                  <input type="text" id="departure" name="departure" className="form-control" placeholder={t("egNY")} value={departure} onClick={onDepartureClick} onChange={onChange} autoComplete="off" />
                <div className="search-inner">
                <div className="dropdown1">
                    {showDepartureSearch && [...new Set(data
                      .filter((item) => {
                        let searchTerm = departure.toLowerCase();
                        let location = item.departure.toLowerCase();
                        return location.includes(searchTerm) && location !== searchTerm;
                      })
                      .map((item) => item.departure)
                    )]
                    .map((departureLocation) => (
                      <div onClick={()=>onSearchDeparture(departureLocation)} key={departureLocation} className="dropdown1-row">{departureLocation}</div>
                    ))}
                </div>

                </div>
              </div>
              <div className="form-group col-md-2">
                <label htmlFor="arrival" className='fw-bolder text-primary'>{t("Arrival")}</label>
                  <input type="text" id="arrival" name="arrival" className="form-control" placeholder={t("egLA")} value={arrival} onClick={onArrivalClick} onChange={(e) => setArrival(e.target.value)} autoComplete="off" />
                  <div className="search-inner">
                <div className="dropdown1">
                    {showArrivalSearch && [...new Set(data
                      .filter((item) => {
                        let searchTerm = arrival.toLowerCase();
                        let location = item.arrival.toLowerCase();
                        let depart = item.departure.toLowerCase();
                        return location.includes(searchTerm) && location !== searchTerm  && depart === departure.toLowerCase();
                      })
                      .map((item) => item.arrival)
                    )]
                    .map((arrivalLocation) => (
                      <div onClick={()=>onSearchArrival(arrivalLocation)} key={arrivalLocation} className="dropdown1-row">{arrivalLocation}</div>
                    ))}
                </div>
                </div>
                </div>
              <div className="form-group col-md-2">
                <label htmlFor="depart-date" className='fw-bolder text-primary'>{t("Departdate")}</label>
                <input type="date" id="depart-date" name="depart-date" className="form-control" value={departDate} max={returnDate ? returnDate : undefined} min={new Date().toISOString().slice(0, 10)}
 onChange={(e) => setDepartDate(e.target.value)} />
              </div>
              <div className="form-group col-md-2">
                <label htmlFor="return-date" className='fw-bolder text-primary'>{t("returndate")}</label>
                <input type="date" id="return-date" name="return-date" className="form-control" value={returnDate} min={departDate ? departDate : undefined} onChange={(e) => setReturnDate(e.target.value)} />
              </div>
              <div className="form-group col-md-1">
                <label htmlFor="num-people" className='fw-bolder text-primary'>Travellers</label>
                <input type="number" id="num-people" name="num-people" className="form-control" value={numPeople} onChange={(e) => {setNumPeople(e.target.value); dataChange();}} />
              </div>
              <div className="mb-2 col-md-2">
              <div>
              <label htmlFor="num-people" className='fw-bolder text-primary'>{t("budget/night")} </label>

        {/* <Popup trigger={<a className='fw-bolder text-primary' data-toggle="tooltip" data-placement="right"  title="">     <BsFillQuestionCircleFill/></a>} position="bottom center"> */}
        <Popup trigger={<a className='fw-bolder text-primary' data-toggle="tooltip" data-placement="right"  title="">     <BsFillQuestionCircleFill/></a>} position="bottom center">
        
          <div className="mb-2">
            <p>The trip budget indicates budget of whole trip which includes Hotels, Flights and Buses</p>
            <p>We have taken budget for individual components as follows:</p>
            <p>Hotels: 30%</p>
            <p>Flights: 50%</p>
            <p>Buses: 20%</p>
          {/* <form className='popup'>
          <label for="hotels">Hotels:</label>
          <input className="hotls" type="text" id="hotels" name="hotels" required></input>
          <label for="flights">Flights:</label>
          <input className="flgt" type="text" id="flights" name="flights" required></input>
          <label for="bus">Bus:</label>
          <input className="buss" type="text" id="bus" name="bus" required></input>

 
</form> */}

          </div>
          {/* <button type="submit">Submit</button> */}
        </Popup>
     
    </div>
          
            <input type="number" className="form-control" placeholder="€10000, €20000..." value={budget} onChange={(e) => setBudget(e.target.value)} />
            </div>
            </div>  
                        
          <div className="row my-3">
          <div>
            {content}
          </div>

            </div>
            </Card.Body>
           </Card>  
           </div>
            <button type="submit" className="btn btn-outline-primary my-3">{t("search")}</button>
            {/* <button type="submit" className="btn btn-primary my-2"> {t("search")}</button> */}
            {errorMessage && <p className='text-danger'>{errorMessage}</p>}
          </form>
          <div className='row'>
            <div className='col-md-2'>
            <label className='fw-bolder text-primary'></label>
            <div>
              {ammenitiesContent}
          </div>
            </div>
            <div className='col-md-8' >

            <Tabs
        id="search-tabs"
        // onChange={ handleTabChanges }
        onSelect={(k) => setKey(k)}
        activeKey={key}
      >
        <Tab eventKey="hotels" title={<><FaHotel /> {t("hotels")}</>} > 
        <div className='row my-2'>
  {hotels.length > 0 ? (
    <div className='ms-1'>
      {hotels.map(hotel => (
        <HotelCard
        key={hotel._id}
        hotelName={hotel.accomodations}
        // accomodationType={selectedValue}
        accomodationType={hotel.type}
        bestPrice={hotel.bestPrice}
        price1={hotel.price1}
        price2={hotel.price2}
        price3={hotel.price3}
        country={hotel.country}
        location={hotel.location}
        //location={arrival}
        days={Math.ceil(((new Date(returnDate)).getTime()-new Date(departDate).getTime())/(1000*60*60*24))}
        people={numPeople}
        ammenities={hotel.amenities}
        places={hotel.touristPlaces}
        isSelected={selectedHotel === hotel.name}
        onSelect={() => handleHotelSelection(hotel.name)}
        hospital={hotel.hospital}
        distance={hotel.distance}
        amenitiesF={hotel.amenitiesF}
        language={currentLanguage}
        />
      ))}
    </div>
  ) : (
    <p>{nodataText} <br/>{nodataTextNotify}</p>
  )}
</div>

          </Tab>
        <Tab eventKey="flight"  title={<><BsFillAirplaneFill /> {t("flight")}</>} > 
    
        <div className='row my-2' >
  {flights.length > 0 ? (
    <div className=''>
      {tripType === 'one-way' ? (
        flights.map(flight => (
          <FlightCard 
            airline={flight.airlines}
            departure={flight.departure}
            departureTime={flight.departureTime}
            arrival={flight.arrival}
            arrivalTime={flight.arrivalTime}
            duration={flight.duration}
            disabledAmenities={flight.ammenities}
            cost={flight.cost}
            returnFlight={tripType}
            people={numPeople}
            amenitiesF={flight.amenitiesF}
            language={currentLanguage}
          />
        ))
      ) : (
        flights.map(flight => (
          <FlightCard 
            airline={flight.airlines}
            departure={flight.departure}
            departureTime={flight.departureTime1}
            departureReturnTime={flight.departureTime2}
            arrival={flight.arrival}
            arrivalTime={flight.arrivalTime1}
            arrivalReturnTime={flight.arrivalTime2}
            duration={flight.duration}
            disabledAmenities={flight.ammenities}
            cost={flight.cost} 
            returnFlight={tripType}
            people={numPeople}
            amenitiesF={flight.amenitiesF}
            language={currentLanguage}
          />
        ))
      )}
    </div>
  ) : (
    <p>{nodataText} <br/>{nodataTextNotify}</p>
  )}
</div>

             
        </Tab>
        <Tab eventKey="bus"  title={<><BsFillBusFrontFill /> {t("buses")}</>} >
         
        <div className='row my-2' >
  {buses.length > 0 ? (
    <div className=''>
      {buses.map(bus => (
        <BusCard 
          airline={bus.airlines}
          departureBus={bus.from}
          departureBusTime={bus.departureBusTime}
          arrivalBus={bus.to}
          arrivalBusTime={bus.arrivalBusTime}
          duration={bus.duration}
          disabledAmenities={bus.amenities}
          cost={bus.cost}
          returnFlight={tripType}
          amenitiesF={bus.amenitiesF}
          people={numPeople}
          language={currentLanguage}
        />
      ))}
    </div>
  ) : (
    <p>{nodataText} <br/>{nodataTextNotify}</p>
  )}
</div>

             
        </Tab>
{/*         
        <Tab eventKey="cab" title="Cabs">
          <p>Cab search form goes here</p>
        </Tab> */}
      </Tabs>
          </div>
          <div className='col-md-2'>
          <TotalCard
          // hotelPrice={Math.ceil(((new Date(returnDate)).getTime()-new Date(departDate).getTime())/(1000*60*60*24))*numPeople*12} 
          // flightPrice={656}
          // busPrice={112}
        />
        <BannedMedicinesCard
          country = {selectedCountry}
        />
            </div>
          
            </div>
    </div>
  );
}

function TotalCard() {
  // const [hotelPrice, setHotelPrice] = useState('');
  // const [flightPrice, setFlightPrice] = useState('');
  // const [busPrice, setBusPrice] = useState('');
  let {hotelPrice, flightPrice, busesPrice, totalPrice, selectedHotel, transportName,departureB,arrivalB,time1,time2,time3, transportType, settransportType, settime3,time4, settime4, settime2, settime1, setArrivalB, setDepartureB, settransportName, setSelectedHotel, setTotalPrice, setBusesPrice, setFlightPrice, setHotelPrice, isSelected, onSelect} = useContext(CardPricesContext);
  let [borderColor, setBorderColor] = useState('light');
  totalPrice = Number(hotelPrice) + Number(flightPrice) + Number(busesPrice);
  let showPrice = totalPrice > 0;
  const { t } = useTranslation();
  const currentLanguage = i18n.language;


  // let handleClick = () => {
  //   const cardDetails = {
  //     hotelPrice,
  //     flightPrice,
  //     busesPrice,
  //     totalPrice
  //   };
  //   console.log(cardDetails);
  //   setBorderColor('primary');
  // };

  


  return (
    <Card className='my-2' border={isSelected ? "primary" : ""} onClick={onSelect} style={{ cursor: 'pointer' }}>
      <Card.Header  className='tt'><ImPriceTag  style={{ marginRight: '15px' }} />{t("totalprice")}</Card.Header>
      <Card.Body className='bb'>
      <div>
          <p>{t("HotelPrice")}: €{hotelPrice}</p>
          <p>{t("FlightPrice")}: €{flightPrice}</p>
          <p>{t("BusPrice")}: €{busesPrice}</p>
          {<p>{t("GrandTotal")}: €{totalPrice}</p>}
        </div>
      </Card.Body>
    </Card>
  );
}

function BannedMedicinesCard({country}) {
  const { t } = useTranslation();
  const currentLanguage = i18n.language;

  const medicines = [
    { "country": "Canada", "medicine": "Acrylamide,Acrylonitrile,Catechol,chloramphenicol,Clenbuterol,Diethystilbestrol" },
    { "country": "USA", "medicine": "Oxyphenbutazone,Nimesulide,Propoxyhene,Nitrofurazone,Nandrolone _Decanoate,Valdecoxib,Pemoline" },
    { "country": "UAE", "medicine": "Aripiprazole,Triprolidine,Pseudoephedrine,Biperiden,Clomipramine,Benzhexol,Meclobemide,Buspirone" },
    { "country": "UK", "medicine": "Wildnil,Palfium,Adderall,Synalgos_DC,Codethyline,Doriden,Mephedrone" },
    { "country": "France", "medicine": "Dolirhume,Maxilase,Thiovalone,Voltarene,Onglyza,Biocalyptol" },
    { "country": "Australia", "medicine": "Mifepristone,Yohimbine,Amidopyrine,Dipyrone,Laetrile,Benzodiazepines,Nitrazepam" }
  ];  
  
  function getMedicine(country) {
    const item = medicines.find(item => item.country === country);
    return item ? item.medicine : null;
  }
  
    const [medArray, setMedArray] = useState([]);
  
    useEffect(() => {
      const medicine = getMedicine(country);
      const medicineArray = medicine ? medicine.split(",") : [];
      setMedArray(medicineArray);
    }, [country]);
  
  
  return (
    <Card>
      <Card.Header className='bann'> <AiFillMedicineBox  style={{ marginRight: '5px' }} /> {t("BannedMedicinesin")} {country}</Card.Header>
      <Card.Body>
        <ListGroup>
        {medArray.map((medicine, index) => (
            <ListGroup.Item key={index}>{medicine}</ListGroup.Item>
          ))}
        </ListGroup>
      </Card.Body>
    </Card>
  );
}

function HotelCard({ hotelName, accomodationType, bestPrice, price1, price2, price3, country, location, ammenities, amenitiesF, days, people, hospital, distance, language, places }) {
  const [isExpanded, setIsExpanded] = useState(false);
  let [borderColor, setBorderColor] = useState('light');
  const [isSelected, setIsSelected] = useState(false);
  const { t } = useTranslation();
  const currentLanguage = i18n.language;



  let {hotelPrice=0, flightPrice=0, busesPrice=0, totalPrice=0, setTotalPrice, setBusesPrice, setFlightPrice, setHotelPrice} = useContext(CardPricesContext);
  let grandtotal = days*people*bestPrice;
  let grandtotal1 = days*people*price1;
  let grandtotal2 = days*people*price2;
  let grandtotal3 = days*people*price3;

let [hotelLinks, setHotelLinks] = useState([
  { website: "www.bestprice.com/"+hotelName, cost: "       Grand Total: €" },
  { website: "www.booking.com/"+hotelName, cost: "       Grand Total: €" },
  { website: "www.expedia.com/"+hotelName, cost: "       Grand Total: €" },
  { website: "www.tripAdvisor.com/"+hotelName, cost: "       Grand Total: €" }
]);
// let amenities = test.split(',');
// amenities = [
//   "Free Wi-Fi",
//   "Swimming pool",
//   "Fitness center",
//   "Restaurant",
//   "Bar/Lounge",
//   "24-hour front desk",
//   "Business center",
//   "Meeting rooms",
//   "Laundry facilities",
//   "Free parking",
// ];
let handleClick = () => {
  const cardDetails = {
    hotelPrice,
    flightPrice,
    busesPrice,
    totalPrice
  };
  console.log(cardDetails);
  setBorderColor('primary');
  setHotelPrice(grandtotal);

};

const handleExpansion = () => {
  setIsExpanded(!isExpanded);
};

const handleSelection = (e) => {
  e.preventDefault();
  setHotelPrice(days*people*bestPrice);
};

const handleDataChange = () => {
  const hotelObj = {
    hotelName,
    bestPrice,
  };
  console.log(hotelObj);
};


return (  
  <Card className='my-3 shadow-inner'> 
  <Card.Body>
    <div onClick={handleSelection} style={{ cursor: 'pointer' }}>

    <Card.Title>{hotelName}</Card.Title>
    <Card.Subtitle className="mb-2 text-muted">
    {t("bestPrice_night")}: €{bestPrice}<br></br>
    {t("accomodationtype")}: {accomodationType}
      <Card.Text className='fw-bold'>{t("grndtotal")}: <span  onChange={(e) => { handleDataChange(); return e.target.value; }} className='fw-light'><span className='fw-bold'>{bestPrice}</span>(Best Price)*<span className='fw-bold'>{days}</span>(Number of nights)*<span className='fw-bold'>{people}</span>(Number of people) = </span><span className='fw-bold'>€{grandtotal}</span></Card.Text>
    </Card.Subtitle>
    </div>
    <Button variant="primary" onClick={handleExpansion}>
      {isExpanded ? <BiUpArrow/> : <BiDownArrow/>}
    </Button>
    {isExpanded && (
      
      <ListGroup className="mt-3">
            <Card.Text className='fw-bold'>{t("amenities")}:</Card.Text>
            <ul>
  {language === 'en'
    ? ammenities.split(',').map((amenity, index) => (
        <li key={index}>{amenity}</li>
      ))
    : language === 'fr'
    ? amenitiesF.split(',').map((amenity, index) => (
        <li key={index}>{amenity}</li>
      ))
    : null}
</ul>

    <Card.Text className='fw-bold' >{t("destination")}: <span className='fw-light'>{location}</span></Card.Text>

    <Card.Text className='fw-bold'>{t("touristplaces")}:</Card.Text>
    <ul>
            {places.split(',').map((amenity, index) => (
              <li key={index}>{amenity}</li>
            ))}
          </ul>
    <Card.Text className='fw-bold' >{t("hospital")}: <span className='fw-light'>{hospital}</span></Card.Text>
    <Card.Text className='fw-bold' >{t("dhospital")}: <span className='fw-light'>{distance}km</span></Card.Text>

        
        <Card.Text ><span className='fw-bold'>Compare prices : </span></Card.Text>
        {/* {hotelLinks.map((link, index) => ( */}
          <ListGroupItem >
            <a href={"https://www.bestprice.com/"+{hotelName}} target="_blank" rel="noreferrer">
              www.bestprice.com/{hotelName}
            </a>
            <span className="float-right">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Grand Total:  €{grandtotal}</span>
          </ListGroupItem>
          <ListGroupItem >
            <a href={"https://www.booking.com/"+{hotelName}} target="_blank" rel="noreferrer">
            www.booking.com/{hotelName}
            </a>
            <span className="float-right">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Grand Total:  €{grandtotal1}</span>
          </ListGroupItem>
          <ListGroupItem >
            <a href={"https://www.expedia.com/"+{hotelName}} target="_blank" rel="noreferrer">
            www.expedia.com/{hotelName}
            </a>
            <span className="float-right">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Grand Total:  €{grandtotal2}</span>
          </ListGroupItem>
          <ListGroupItem >
            <a href={"https://www.tripAdvisor.com/"+{hotelName}} target="_blank" rel="noreferrer">
            www.tripAdvisor.com/{hotelName}
            </a>
            <span className="float-right">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Grand Total:  €{grandtotal3}</span>
          </ListGroupItem>
         {/* ))} */}
      </ListGroup>
    )}
  </Card.Body>
</Card>

);
};

let FlightCard = ({ airline, departure, arrival, duration, disabledAmenities, cost, departureTime, arrivalTime, departureReturnTime, arrivalReturnTime, returnFlight, people, amenitiesF, language }) => {
  let {hotelPrice, flightPrice, busesPrice, totalPrice, selectedHotel, transportName,departureB,arrivalB,time1,time2,time3, settime3,time4, transportType, settransportType, settime4, settime2, settime1, setArrivalB, setDepartureB, settransportName, setSelectedHotel, setTotalPrice, setBusesPrice, setFlightPrice, setHotelPrice, isSelected, onSelect} = useContext(CardPricesContext);
  const { t } = useTranslation();
  const currentLanguage = i18n.language;

  const handleBookNowSelection = () => {
    // history.push('/booking');
    setDepartureB(departure);
    setArrivalB(arrival);
    settime1(departureTime);
    settime2(arrivalTime);
    if(returnFlight == 'one-way'){
      settime3('');
      settime4('');
    }
    else{
      settime3(departureReturnTime);
      settime4(arrivalReturnTime);
    }
    settransportName(airline);
    settransportType('Flight');
  };

  const handleSelection = (e) => {
    e.preventDefault();
    setFlightPrice(cost*people);
  };

  if(returnFlight == 'one-way'){
    return (
      <div className='row'>
        <div className='col-md-1'>
      
        </div>
        <div className='col-md-10'>

        <Card className='my-2 marginone' onClick={handleSelection} style={{ cursor: 'pointer' }}>
          <Card.Body>
            <Row>
              <Col>
              <Card.Title >{airline}</Card.Title>
              </Col>
              <Col></Col>
              <Col></Col>
              <Col></Col>
              <Col></Col>
              
              <Col>
                <h5>€{cost}/{t("person")} </h5>
              </Col>
            </Row>
            <Row>
              <Col>
                <p><FaPlaneDeparture/>&nbsp;&nbsp;{departure}</p>
                <p>{t("departuretime")}: {departureTime}</p>
              </Col>
              <Col>
                <svg height="40" width="300">
                  <line x1="-20" y1="25" x2="300" y2="25" stroke="black" strokeWidth="1" />
                  <circle cx="150" cy="25" r="6" fill="white" stroke="black" strokeWidth="1" />
                </svg>
                <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                  {duration}</p>
              </Col>
              <Col className='ms-5'>
                <p><FaPlaneArrival/>&nbsp;&nbsp;{arrival}</p>
                <p>{t("arrivaltime")}: {arrivalTime}</p>
              </Col>
            </Row>
            <Row>
            <Col>
            <Card.Text className='fw-bold'>{t("amenities")}:</Card.Text>
                  {disabledAmenities && 
                  <ul>
                  {language === 'en'
                    ? disabledAmenities.split(',').map((amenity, index) => (
                        <li key={index}>{amenity}</li>
                      ))
                    : language === 'fr'
                    ? amenitiesF.split(',').map((amenity, index) => (
                        <li key={index}>{amenity}</li>
                      ))
                    : null}
                </ul>}
                </Col>
            </Row>
            <Row>
                <Col className='fw-bolder'>
                {t("grndtotal")}: €{people * cost}
                </Col>
              </Row>
            <Row>
                <Col>
                {/* {t("booknow")}: <a href={"https://www.booking.com/"+{airline}} target="_blank" rel="noreferrer">
                {"https://www.booking.com/"+airline}
              </a> */}
              <Link to="/book" onClick={handleBookNowSelection}>

                <Button variant="primary" onClick={handleSelection}>
              {t("booknow")}
            </Button>
            </Link>
                </Col>
              </Row>
            
          </Card.Body>
        </Card>
        </div>
        <Switch>
          <Route exact path="/book">
            <BookingPage />
          </Route>
        </Switch>
      </div>
    );
  }
  else{
    return(<div className="d-flex justify-content-between align-items-center my-2" onClick={handleSelection} style={{ cursor: 'pointer' }}>
          <Card className="flex-grow-1"  >
            <Card.Body>
              <Row>
                <Col>
                  <h5>{airline} </h5>
                </Col>
                <Col></Col>
              <Col></Col>
              <Col></Col>
              
                {/* <Col>
                  <h5>€{cost}/person</h5>
                </Col> */}
              </Row>
              <Row>
              <Col>
                <p><FaPlaneDeparture/>&nbsp;&nbsp;{departure}</p>
                <p>{t("departuretime")}: {departureTime}</p>
              </Col>
                <Col>
                  <svg height="50" width="50">
                    <line x1="0" y1="25" x2="50" y2="25" stroke="black" strokeWidth="1" />
                    <circle cx="25" cy="25" r="6" fill="white" stroke="black" strokeWidth="1" />
                  </svg>
                  <p>{duration}</p>
                </Col>
                <Col>
                <p><FaPlaneArrival/>&nbsp;&nbsp;{arrival}</p>
                <p>{t("arrivaltime")}: {arrivalTime}</p>
              </Col>
              </Row>
              <Row>
                <Col>
                <Card.Text className='fw-bold'>{t("amenities")}:</Card.Text>
                {disabledAmenities && 
                  <ul>
                  {language === 'en'
                    ? disabledAmenities.split(',').map((amenity, index) => (
                        <li key={index}>{amenity}</li>
                      ))
                    : language === 'fr'
                    ? amenitiesF.split(',').map((amenity, index) => (
                        <li key={index}>{amenity}</li>
                      ))
                    : null}
                </ul>}
                </Col>
              </Row>
              <Row>
                <Col>
                {/* {t("booknow")}: <a href={"https://www.booking.com/"+{airline}}target="_blank" rel="noreferrer">
                {"https://www.booking.com/"+airline}
              </a> */}
              {/* <Button variant="primary" onClick={handleSelection}>
              {t("booknow")}
            </Button> */}
                </Col>
              </Row>
              
            </Card.Body>
          </Card>
          <svg height="50" width="50">
            <line x1="0" y1="25" x2="50" y2="25" stroke="black" strokeWidth="1" />
            <circle cx="25" cy="25" r="6" fill="white" stroke="black" strokeWidth="1" />
          </svg>
          <Card className="flex-grow-1">
            <Card.Body>
              <Row>
                <Col>
                  <h5>{airline}</h5>
                </Col>
                <Col></Col>
              <Col></Col>
              
              
                <Col>
                  <h5>€{cost}/{t("person")}</h5>
                </Col>
              </Row>
              <Row>
              <Col>
                <p><FaPlaneDeparture/>&nbsp;&nbsp;{arrival}</p>
                <p>{t("arrivaltime")}: {departureReturnTime}</p>
              </Col>
                <Col>
                  <svg height="50" width="50">
                    <line x1="0" y1="25" x2="50" y2="25" stroke="black" strokeWidth="1" />
                    <circle cx="25" cy="25" r="6" fill="white" stroke="black" strokeWidth="1" />
                  </svg>
                  <p>{duration}</p>
                </Col>
              <Col>
                <p><FaPlaneArrival/>&nbsp;&nbsp;{departure}</p>
                <p>{t("departuretime")}: {arrivalReturnTime}</p>
              </Col>
              </Row>
              <Row>
              <Col>
              <Card.Text className='fw-bold'>{t("amenities")}:</Card.Text>
              {disabledAmenities && 
                  <ul>
                  {language === 'en'
                    ? disabledAmenities.split(',').map((amenity, index) => (
                        <li key={index}>{amenity}</li>
                      ))
                    : language === 'fr'
                    ? amenitiesF.split(',').map((amenity, index) => (
                        <li key={index}>{amenity}</li>
                      ))
                    : null}
                </ul>}
                </Col>
              </Row>
              <Row>
                <Col className='fw-bolder'>
                {t("grndtotal")}: €{people * cost}
                </Col>
              </Row>
              <Row>
                <Col>
                {/* Book Now: <a href={"https://www.booking.com/"+{airline}} target="_blank" rel="noreferrer">
                {"https://www.booking.com/"+airline}
              </a> */}
             <Link to="/book" onClick={handleBookNowSelection}>

<Button variant="primary">
{t("booknow")}
</Button>
</Link>
                </Col>
              </Row>
             
            </Card.Body>
          </Card>
          <Switch>
          <Route exact path="/book">
            <BookingPage />
          </Route>
        </Switch>
          </div>
  );}
};

let BusCard = ({ airline, departureBus, arrivalBus, duration, disabledAmenities, cost, departureBusTime, arrivalBusTime, departureBusReturnTime, arrivalBusReturnTime, returnbus, people, amenitiesF, language }) => {
  let {hotelPrice, flightPrice, busesPrice, totalPrice, selectedHotel, transportName,departureB,arrivalB,time1,time2,time3,transportType, settransportType, settime3,time4, settime4, settime2, settime1, setArrivalB, setDepartureB, settransportName, setSelectedHotel, setTotalPrice, setBusesPrice, setFlightPrice, setHotelPrice, isSelected, onSelect} = useContext(CardPricesContext);
  const { t } = useTranslation();
  const currentLanguage = i18n.language;
  const history = useHistory();


  const handleBookNowSelection = (e) => {
    // history.push('/booking');
    setDepartureB(departureBus);
    setArrivalB(arrivalBus);
    settime1('');
    settime2('');
    settime3('');
    settime4('');
    settransportName('');
    settransportType('Bus');
  };

  const handleSelection = (e) => {
    e.preventDefault();
    setBusesPrice(cost*people);
  };

  return (
      <div className='row'>
        <div className='col-md-1'>
        </div>
        <div className='col-md-10' onClick={handleSelection} style={{ cursor: 'pointer' }}>

        <Card className='my-2 marginone'>
          <Card.Body>
            <Row>
              <Col>
                <h4><FaBusAlt/>&nbsp;&nbsp;{departureBus}</h4>
                {/* <p>Departure time: {departureBusTime}</p> */}
              </Col>
              <Col>
                <svg height="40" width="200">
                  <line x1="-20" y1="25" x2="200" y2="25" stroke="black" strokeWidth="1" />
                  <circle cx="100" cy="25" r="6" fill="white" stroke="black" strokeWidth="1" />
                </svg>
                <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                  {duration}</p>
              </Col>
              <Col className='ms-5'>
                <h4><FaBusAlt/>&nbsp;&nbsp;{arrivalBus}</h4>
                {/* <p>Arrival time: {arrivalBusTime}</p> */}
              </Col>
            </Row>
            <Row>
            <Col>
            <Card.Text className='fw-bold'>{t("amenities")}:</Card.Text>
            {disabledAmenities && 
                  <ul>
                  {language === 'en'
                    ? disabledAmenities.split(',').map((amenity, index) => (
                        <li key={index}>{amenity}</li>
                      ))
                    : language === 'fr'
                    ? amenitiesF.split(',').map((amenity, index) => (
                        <li key={index}>{amenity}</li>
                      ))
                    : null}
                </ul>}
                </Col>
            </Row>
            
            <Row>
                <Col>
                Cost: €{cost}
                </Col>
              </Row>
            <Row>
                <Col className='fw-bolder'>
                {t("grndtotal")}: €{cost*people}
                </Col>
              </Row>
              <Row>
                <Col>
                <Link to="/book" onClick={handleBookNowSelection}>

<Button variant="primary" >
{t("booknow")}
</Button>
</Link>
                </Col>
              </Row>
          </Card.Body>
        </Card>
        
        
        </div>
        <Switch>
          <Route exact path="/book">
            <BookingPage />
          </Route>
        </Switch>
      </div>
    );
};


export default FlightPage;
