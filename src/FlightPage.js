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
  const [selectedCountry, setCountryValue] = useState('Canada');
  const [buses, setBuses] = useState([]);
  const [budget, setBudget] = useState('');
  let [selectedDisability, setSelectedDisability] = useState([]);
  const [hotels, setHotels] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");

  let handleHotelSelection = (hotelName) => {
    setSelectedHotel(hotelName);
    console.log("sel hotel"+selectedHotel);

    // let hotel = this.hotels.find(hotel => hotel.accomodations === hotelName);
    // setHotelPrice(hotel.bestPrice);
  };

  let dataChange = () =>{
    let hotel = hotels.find(hotel => hotel.accomodations === selectedHotel);
    console.log("csa"+selectedHotel);
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
              <div className="form-check">
                <input type="checkbox" className="form-check-input" id="Visual" value="Visual alarm clocks" checked={selectedDisability.includes("Visual alarm clocks")} onChange={handleCheckboxChange}/>
                <label className="form-check-label" htmlFor="Visual" >{t("visualalarmclcks")}</label>
              </div>
              <div className="form-check">
                <input type="checkbox" className="form-check-input" id="Visual11" value="Accessible business center" checked={selectedDisability.includes("Accessible business center")} onChange={handleCheckboxChange}/>
                <label className="form-check-label" htmlFor="Visual11" >{t("Accessiblebusinesscenter")}</label>
              </div>
              <div className="form-check">
                <input type="checkbox" className="form-check-input" id="Visual12" value="Service animals welcome" checked={selectedDisability.includes("Service animals welcome")} onChange={handleCheckboxChange}/>
                <label className="form-check-label" htmlFor="Visual12" >{t("Serviceanimalswelcome")}</label>
              </div>
              <div className="form-check">
                <input type="checkbox" className="form-check-input" id="Visual1" value="Accessible Shower" checked={selectedDisability.includes("Accessible Shower")} onChange={handleCheckboxChange}/>
                <label className="form-check-label" htmlFor="Visual1" >{t("AccessibleShower")}</label>
              </div>
              <div className="form-check">
                <input type="checkbox" className="form-check-input" id="Visual2" value="Accessible Bathroom" checked={selectedDisability.includes("Accessible Bathroom")} onChange={handleCheckboxChange}/>
                <label className="form-check-label" htmlFor="Visual2" >{t("AccessibleBathroom")}</label>
              </div>
              <div className="form-check">
                <input type="checkbox" className="form-check-input" id="Portable" value="Portable hearing" checked={selectedDisability.includes("Portable hearing")} onChange={handleCheckboxChange} />
                <label className="form-check-label" htmlFor="Portable" >{t("portablehearing")}</label>
              </div>
              <div className="form-check">
                <input type="checkbox" className="form-check-input" id="Video" value="Video remote interpreting (VRI)" checked={selectedDisability.includes("Video remote interpreting (VRI)")} onChange={handleCheckboxChange}/>
                <label className="form-check-label" htmlFor="Video" >{t("vri")}</label>
              </div>
              <div className="form-check">
                <input type="checkbox" className="form-check-input" id="Staff" value="Staff trained in American Sign Language" checked={selectedDisability.includes("Staff trained in American Sign Language")} onChange={handleCheckboxChange} />
                <label className="form-check-label" htmlFor="Staff" >{t("Stf_am")}</label>
              </div>
              <div className="form-check">
                <input type="checkbox" className="form-check-input" id="Portable1" value="Portable hearing amplifier" checked={selectedDisability.includes("Portable hearing amplifier")} onChange={handleCheckboxChange}/>
                <label className="form-check-label" htmlFor="Portable1" >{t("Pha")}</label>
              </div>
              <div className="form-check">
                <input type="checkbox" className="form-check-input" id="TTY" value="TTY phones" checked={selectedDisability.includes("TTY phones")} onChange={handleCheckboxChange} />
                <label className="form-check-label" htmlFor="TTY" >{t("ttyphones")}</label>
              </div>
              <div className="form-check">
                <input type="checkbox" className="form-check-input" id="Closed" value="Closed-captioned television" checked={selectedDisability.includes("Closed-captioned television")} onChange={handleCheckboxChange}/>
                <label className="form-check-label" htmlFor="Closed" >{t("cct")}</label>
              </div>
              <div className="form-check">
                <input type="checkbox" className="form-check-input" id="Elevators" value="Elevators or ramps" checked={selectedDisability.includes("Elevators or ramps")} onChange={handleCheckboxChange} />
                <label className="form-check-label" htmlFor="Elevators" >{t("Elevators")}</label>
              </div>
              <div className="form-check">
                <input type="checkbox" className="form-check-input" id="Bed" value="Bed rails" checked={selectedDisability.includes("Bed rails")} onChange={handleCheckboxChange}/>
                <label className="form-check-label" htmlFor="Bed" >{t("search")}</label>
              </div>
              <div className="form-check">
                <input type="checkbox" className="form-check-input" id="Shower" value="Shower chairs" checked={selectedDisability.includes("Shower chairs")} onChange={handleCheckboxChange} />
                <label className="form-check-label" htmlFor="Shower" >{t("shwChairs")}</label>
              </div>
              <div className="form-check">
                <input type="checkbox" className="form-check-input" id="Accessible" value="Accessible parking spots" checked={selectedDisability.includes("Accessible parking spots")} onChange={handleCheckboxChange}/>
                <label className="form-check-label" htmlFor="Accessible" >{t("parking")}</label>
              </div>
              <div className="form-check">
                <input type="checkbox" className="form-check-input" id="Roll" value="Roll-in showers with grab bars" checked={selectedDisability.includes("Roll-in showers with grab bars")} onChange={handleCheckboxChange} />
                <label className="form-check-label" htmlFor="Roll" >{t("showerBars")}</label>
              </div>
              <div className="form-check">
                <input type="checkbox" className="form-check-input" id="Wide" value="Wide doorways" checked={selectedDisability.includes("Wide doorways")} onChange={handleCheckboxChange} />
                <label className="form-check-label" htmlFor="Wide" >{t("w_doorways")}</label>
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

    ammenitiesContent = (  <div>
      <div className="form-check">
        <input type="checkbox" className="form-check-input" id="wheelchairassistance" value="Wheelchair Assistance" checked={selectedDisability.includes("Wheelchair Assistance")} onChange={handleCheckboxChange}/>
        <label className="form-check-label" htmlFor="wheelchairassistance" >{t("wheelchairassistance")}</label>
      </div>
      <div className="form-check">
        <input type="checkbox" className="form-check-input" id="Priorityboarding" value="Priority boarding" checked={selectedDisability.includes("Priority boarding")} onChange={handleCheckboxChange} />
        <label className="form-check-label" htmlFor="Priorityboarding" >{t("Priorityboarding")}</label>
      </div>
      <div className="form-check">
        <input type="checkbox" className="form-check-input" id="extralegroom" value="Extra legroom" checked={selectedDisability.includes("Extra legroom")} onChange={handleCheckboxChange}/>
        <label className="form-check-label" htmlFor="extralegroom" >{t("extralegroom")}</label>
      </div>
      <div className="form-check">
        <input type="checkbox" className="form-check-input" id="accessiblelavatories" value="Accessible lavatories" checked={selectedDisability.includes("Accessible lavatories")} onChange={handleCheckboxChange} />
        <label className="form-check-label" htmlFor="accessiblelavatories" >{t("accessiblelavatories")}</label>
      </div>
      <div className="form-check">
        <input type="checkbox" className="form-check-input" id="braillesafetycards" value="Braille safety cards" checked={selectedDisability.includes("Braille safety cards")} onChange={handleCheckboxChange}/>
        <label className="form-check-label" htmlFor="braillesafetycards" >{t("braillesafetycards")}</label>
      </div>
      <div className="form-check">
        <input type="checkbox" className="form-check-input" id="signlanguageinterpretation" value="Sign language interpretation" checked={selectedDisability.includes("Sign language interpretation")} onChange={handleCheckboxChange} />
        <label className="form-check-label" htmlFor="signlanguageinterpretation" >{t("signlanguageinterpretation")}</label>
      </div>
      <div className="form-check">
        <input type="checkbox" className="form-check-input" id="specialmeals" value="Special meals" checked={selectedDisability.includes("Special meals")} onChange={handleCheckboxChange}/>
        <label className="form-check-label" htmlFor="specialmeals" >{t("specialmeals")}</label>
      </div>
      <div className="form-check">
        <input type="checkbox" className="form-check-input" id="medicalassistance" value="In-flight medical assistance" checked={selectedDisability.includes("In-flight medical assistance")} onChange={handleCheckboxChange} />
        <label className="form-check-label" htmlFor="medicalassistance" >{t("medicalassistance")}</label>
      </div>
      <div className="form-check">
        <input type="checkbox" className="form-check-input" id="visualauditoryaids" value="Visual and auditory aids" checked={selectedDisability.includes("Visual and auditory aids")} onChange={handleCheckboxChange}/>
        <label className="form-check-label" htmlFor="visualauditoryaids" >{t("visualauditoryaids")}</label>
      </div>
      <div className="form-check">
        <input type="checkbox" className="form-check-input" id="prioritybaggagehandling" value="Priority baggage handling" checked={selectedDisability.includes("Priority baggage handling")} onChange={handleCheckboxChange} />
        <label className="form-check-label" htmlFor="prioritybaggagehandling" >{t("prioritybaggagehandling")}</label>
      </div>
      <div className="form-check">
        <input type="checkbox" className="form-check-input" id="Accessiblecheckincounters" value="" checked={selectedDisability.includes("Accessible parking spots")} onChange={handleCheckboxChange}/>
        <label className="form-check-label" htmlFor="Accessiblecheckincounters" >{t("Accessiblecheckincounters")}</label>
      </div>
      <div className="form-check">
        <input type="checkbox" className="form-check-input" id="seatarrangement" value="Special seating arrangements" checked={selectedDisability.includes("Special seating arrangements")} onChange={handleCheckboxChange} />
        <label className="form-check-label" htmlFor="seatarrangement" >{t("seatarrangement")}</label>
      </div>
     
  </div>);
  } else if(key === 'bus') {
    content = (
      <div></div>
    );
    ammenitiesContent = (
      <div>
      <div className="form-check">
        <input type="checkbox" className="form-check-input" id="wheelchairlift" value="Wheelchair lift" checked={selectedDisability.includes("Wheelchair lift")} onChange={handleCheckboxChange}/>
        <label className="form-check-label" htmlFor="wheelchairlift" >{t("wheelchairlift")}</label>
      </div>
      <div className="form-check">
        <input type="checkbox" className="form-check-input" id="accessibleseating" value="Accessible seating" checked={selectedDisability.includes("Accessible seating")} onChange={handleCheckboxChange} />
        <label className="form-check-label" htmlFor="accessibleseating" >{t("accessibleseating")}</label>
      </div>
      <div className="form-check">
        <input type="checkbox" className="form-check-input" id="audioannouncements" value="Audio announcements" checked={selectedDisability.includes("Audio announcements")} onChange={handleCheckboxChange}/>
        <label className="form-check-label" htmlFor="audioannouncements" >{t("audioannouncements")}</label>
      </div>
      <div className="form-check">
        <input type="checkbox" className="form-check-input" id="onboardrestroom" value="On-board restroom" checked={selectedDisability.includes("On-board restroom")} onChange={handleCheckboxChange} />
        <label className="form-check-label" htmlFor="onboardrestroom" >{t("onboardrestroom")}</label>
      </div>

  </div>
    );
  }

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
    else if(selectedDisability.length <= 0){
      setErrorMessage("Please select at least one ammenity.");
    } 
    else{
      setErrorMessage("");
    }

    
    if(key=='hotels'){
      
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
      axios.get('http://localhost:2023/hotel', { params: searchParams })
      .then(response => {
        let res = response.data;
        //change
        let filteredHotels = res.filter(hotel =>hotel.type == selectedValue && hotel.country == selectedCountry);
        let sorted = [...filteredHotels].sort((b ,a) => b.bestPrice - a.bestPrice);
        setHotels(sorted);
      })
      .catch(error => {
        console.log(error);
      });  
    }
    else if(key=='flight'){
      
      const searchParams = {
        departure,
        arrival,
        // departDate,
        // returnDate,
        // numPeople,
        type: key,
        returnTrip: tripType == 'round-trip' ? true : false,
        budget: budget/2,
      };
      // setFlightPrice(0);
      axios.get('http://localhost:2023/flights', { params: searchParams })
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
        to: arrival,
        from: departure,
        // departDateBus,
        // returnDateBus,
        // numPeopleBus,
        budget: budget*(0.2),
        //returnTrip: tripType == 'round-trip' ? true : false 
      };

      // setBusesPrice(0);
      axios.get('http://localhost:2023/buses', { params: searchParams })
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



  return (
    <div className="container">
       <form onSubmit={handleSearchSubmit}>
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
                  <input type="text" id="departure" name="departure" className="form-control" placeholder={t("egNY")} value={departure} onChange={(e) => setDeparture(e.target.value)} />
              </div>
              {/* <div className="form-group col-md-1 mt-4">
                    <button type="button" className="btn btn-outline-primary" onClick={handleExchangeClick}>
                      <FaExchangeAlt />
                    </button>
                  </div> */}
              <div className="form-group col-md-2">
                <label htmlFor="arrival" className='fw-bolder text-primary'>{t("Arrival")}</label>
                  <input type="text" id="arrival" name="arrival" className="form-control" placeholder={t("egLA")} value={arrival} onChange={(e) => setArrival(e.target.value)} />
                </div>
              <div className="form-group col-md-2">
                <label htmlFor="depart-date" className='fw-bolder text-primary'>{t("Departdate")}</label>
                <input type="date" id="depart-date" name="depart-date" className="form-control" value={departDate} onChange={(e) => setDepartDate(e.target.value)} />
              </div>
              <div className="form-group col-md-2">
                <label htmlFor="return-date" className='fw-bolder text-primary'>{t("returndate")}</label>
                <input type="date" id="return-date" name="return-date" className="form-control" value={returnDate} onChange={(e) => setReturnDate(e.target.value)} />
              </div>
              <div className="form-group col-md-1">
                <label htmlFor="num-people" className='fw-bolder text-primary'>{t("numofp")}</label>
                <input type="number" id="num-people" name="num-people" className="form-control" value={numPeople} onChange={(e) => {setNumPeople(e.target.value); dataChange();}} />
              </div>
              <div className="mb-2 col-md-2">
            <label className='fw-bolder text-primary'>{t("budget/night")}</label>
            <input type="number" className="form-control" placeholder="€100, €200..." value={budget} onChange={(e) => setBudget(e.target.value)} />
            </div>
            </div>
            
          <div className="row my-3">
          <div>
            {content}
          </div>
            </div>
            <button type="submit" className="btn btn-primary my-2"> {t("search")}</button>
            {errorMessage && <p className='text-danger'>{errorMessage}</p>}
          </form>
          <div className='row'>
            <div className='col-md-2'>
            <label className='fw-bolder text-primary'>{t("amenities")}</label>
            <div>
              {ammenitiesContent}
          </div>
            </div>
            <div className='col-md-8'>

            <Tabs
        id="search-tabs"
        activeKey={key}
        onSelect={(k) => setKey(k)}
      >
        <Tab eventKey="hotels" title={t("hotels")}>
        <div className='row my-2'>
        {(hotels.length ) ? hotels.map(hotel => (
        <HotelCard
          key={hotel.accomodations}
          hotelName={hotel.accomodations}
          accomodationType={selectedValue}
          // accomodationType={hotel.type}
          bestPrice={hotel.bestPrice}
          price1={hotel.price1}
          price2={hotel.price2}
          price3={hotel.price3}
          country={hotel.country}
          location={arrival}
          days={Math.ceil(((new Date(returnDate)).getTime()-new Date(departDate).getTime())/(1000*60*60*24))}
          people={numPeople}
          ammenities={hotel.amenities}
          isSelected={selectedHotel === hotel.name}
          onSelect={() => handleHotelSelection(hotel.name)}
          hospital={hotel.hospital}
          distance={hotel.distance}
        />
       )) : 
      //  <p className="col-md-10">No records found!</p>
      null
        }
          </div>
          </Tab>
        <Tab eventKey="flight" title={t("flight")}>
          
          <div className='row my-2'>
            
          {(flights.length && (tripType == 'one-way')) ? flights.map(flight => (
            
            <div className='ms-5'>
          <FlightCard 
          airline={flight.airlines}
          departure={flight.departure}
          departureTime={flight.departureTime}
          //departureAirport={flight.departureAirport}
          arrival={flight.arrival}
          arrivalTime={flight.arrivalTime}
          // arrivalAirport={flight.arrivalAirport}
          duration={flight.duration}
          disabledAmenities={flight.ammenities}
          cost={flight.cost}
          returnFlight={tripType}
          people={numPeople}
        />

        </div>
      )) : 
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
      />))}
        
             </div>
             
        </Tab>
        <Tab eventKey="bus" title={t("buses")}>
         
          <div className='row my-2'>
            
          {(buses.length) ? buses.map(flight => (
            
            <div className='ms-5'>
          <BusCard 
          airline={flight.airlines}
          departureBus={flight.from}
          departureBusTime={flight.departureBusTime}
          //departureBusAirport={flight.departureBusAirport}
          arrivalBus={flight.to}
          arrivalBusTime={flight.arrivalBusTime}
          // arrivalBusAirport={flight.arrivalBusAirport}
          duration={flight.duration}
          disabledAmenities={flight.amenities}
          cost={flight.cost}
          returnFlight={tripType}
          people={numPeople}
        />

        </div>
      )) : 
      null}
        
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
  let {hotelPrice=0, flightPrice=0, busesPrice=0, totalPrice = 0, setTotalPrice, setBusesPrice, setFlightPrice, setHotelPrice, isSelected, onSelect} = useContext(CardPricesContext);
  let [borderColor, setBorderColor] = useState('light');
  totalPrice = Number(hotelPrice) + Number(flightPrice) + Number(busesPrice);
  let showPrice = totalPrice > 0;
  const { t } = useTranslation();
  const currentLanguage = i18n.language;


  let handleClick = () => {
    const cardDetails = {
      hotelPrice,
      flightPrice,
      busesPrice,
      totalPrice
    };
    console.log(cardDetails);
    setBorderColor('primary');
  };

  


  return (
    <Card className='my-2' border={isSelected ? "primary" : ""} onClick={onSelect} style={{ cursor: 'pointer' }}>
      <Card.Header>{t("Total Price")}</Card.Header>
      <Card.Body>
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
  
  
  debugger
  return (
    <Card>
      <Card.Header>{t("BannedMedicinesin")} {country}</Card.Header>
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

function HotelCard({ hotelName, accomodationType, bestPrice, price1, price2, price3, country, location, ammenities, days, people, hospital, distance }) {
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
  <Card className='my-3 shadow-inner' onClick={handleSelection} style={{ cursor: 'pointer' }}> 
  <Card.Body>
    <Card.Title>{hotelName}</Card.Title>
    <Card.Subtitle className="mb-2 text-muted">
    {t("bestPrice_night")}: €{bestPrice}<br></br>
    {t("accomodationtype")}: {accomodationType}
    </Card.Subtitle>
    <Card.Text className='fw-bold'>{t("amenities")}:</Card.Text>
    <ul>
            {ammenities.split(',').map((amenity, index) => (
              <li key={index}>{amenity}</li>
            ))}
          </ul>
    <Card.Text className='fw-bold' >{t("destination")}: <span className='fw-light'>{location}, {country}</span></Card.Text>
    <Card.Text className='fw-bold' >{t("hospital")}: <span className='fw-light'>{hospital}</span></Card.Text>
    <Card.Text className='fw-bold' >{t("dhospital")}: <span className='fw-light'>{distance}</span></Card.Text>
    <Card.Text className='fw-bold'>{t("grndtotal")}: <span  onChange={(e) => { handleDataChange(); return e.target.value; }} className='fw-light'><span className='fw-bold'>{bestPrice}</span>(Best Price)*<span className='fw-bold'>{days}</span>(Number of nights)*<span className='fw-bold'>{people}</span>(Number of people) = </span><span className='fw-bold'>€{grandtotal}</span></Card.Text>
    <Button variant="primary" onClick={handleExpansion}>
      {isExpanded ? <BiUpArrow/> : <BiDownArrow/>}
    </Button>
    {isExpanded && (
      <ListGroup className="mt-3">
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

let FlightCard = ({ airline, departure, arrival, duration, disabledAmenities, cost, departureTime, arrivalTime, departureReturnTime, arrivalReturnTime, returnFlight, people }) => {
  let {hotelPrice=0, flightPrice=0, busesPrice=0, totalPrice = 0, setTotalPrice, setBusesPrice, setFlightPrice, setHotelPrice, isSelected, onSelect} = useContext(CardPricesContext);
  const { t } = useTranslation();
  const currentLanguage = i18n.language;

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

        <Card className='my-2 marginone'  onClick={handleSelection} style={{ cursor: 'pointer' }}>
          <Card.Body>
            <Row>
              <Col>
              <Card.Title>{airline}</Card.Title>
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
                  {disabledAmenities.split(',').map((amenity, index) => (
                    <li key={index}>{amenity}</li>
                  ))}
                </ul>}
                </Col>
            </Row>
            <Row>
                <Col>
                {t("booknow")}: <a href={"https://www.booking.com/"+{airline}} target="_blank" rel="noreferrer">
                {"https://www.booking.com/"+airline}
              </a>
                </Col>
              </Row>
            <Row>
                <Col className='fw-bolder'>
                {t("grndtotal")}: €{people * cost}
                </Col>
              </Row>
          </Card.Body>
        </Card>
        
        
        </div>
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
                  {disabledAmenities.split(',').map((amenity, index) => (
                    <li key={index}>{amenity}</li>
                  ))}
                </ul>}
                </Col>
              </Row>
              <Row>
                <Col>
                {t("booknow")}: <a href={"https://www.booking.com/"+{airline}}target="_blank" rel="noreferrer">
                {"https://www.booking.com/"+airline}
              </a>
                </Col>
              </Row>
              <Row>
                <Col className='fw-bolder'>
                {/* Grand Total: €{people * cost} */}
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
                  {disabledAmenities.split(',').map((amenity, index) => (
                    <li key={index}>{amenity}</li>
                  ))}
                </ul>}
                </Col>
              </Row>
              <Row>
                <Col>
                Book Now: <a href={"https://www.booking.com/"+{airline}} target="_blank" rel="noreferrer">
                {"https://www.booking.com/"+airline}
              </a>
                </Col>
              </Row>
              <Row>
                <Col className='fw-bolder'>
                {t("grndtotal")}: €{people * cost}
                </Col>
              </Row>
            </Card.Body>
          </Card>
          </div>
  );}
};

let BusCard = ({ airline, departureBus, arrivalBus, duration, disabledAmenities, cost, departureBusTime, arrivalBusTime, departureBusReturnTime, arrivalBusReturnTime, returnbus, people }) => {
  let {hotelPrice=0, flightPrice=0, busesPrice=0, totalPrice = 0, setTotalPrice, setBusesPrice, setFlightPrice, setHotelPrice, isSelected, onSelect} = useContext(CardPricesContext);
  const { t } = useTranslation();
  const currentLanguage = i18n.language;

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
                  {disabledAmenities.split(',').map((amenity, index) => (
                    <li key={index}>{amenity}</li>
                  ))}
                </ul>}
                </Col>
            </Row>
            <Row>
                <Col>
                {t("booknow")}: <a href={"https://www.booking.com/"} target="_blank" rel="noreferrer">
                {"https://www.booking.com"}
              </a>
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
          </Card.Body>
        </Card>
        
        
        </div>
      </div>
    );
};


export default FlightPage;
