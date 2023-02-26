import axios from 'axios';
import React, { useState } from 'react';
import { Tabs, Tab, Card, Row, Col } from 'react-bootstrap';
import { FaExchangeAlt, FaPlaneArrival, FaPlaneDeparture, FaBusAlt } from 'react-icons/fa';
import 'bootstrap/dist/css/bootstrap.min.css';

function FlightPage() {
  const [key, setKey] = useState('flight');
  const [departure, setDeparture] = useState('');
  const [arrival, setArrival] = useState('');
  const [departDate, setDepartDate] = useState('');
  const [returnDate, setReturnDate] = useState('');
  const [numPeople, setNumPeople] = useState(1);
  const [tripType, setTripType] = useState('round-trip');
  const [flights, setFlight] = useState([]);
  const [departureBus, setDepartureBus] = useState('');
  const [arrivalBus, setArrivalBus] = useState('');
  const [departDateBus, setDepartDateBus] = useState('');
  const [returnDateBus, setReturnDateBus] = useState('');
  const [numPeopleBus, setNumPeopleBus] = useState(1);
  const [buses, setBuses] = useState([]);


//   let flights = [
//     {
//         "_id": "63f99bdd04d4598210edbd1a",
//         "airlines": "Lufthansa",
//         "ammenities": "Extra legroom, In-flight medical assistance",
//         "arrival": "Paris",
//         "arrivalTime1": "10:45",
//         "arrivalTime2": "18:45",
//         "cost": 222,
//         "departure": "Berlin",
//         "departureTime1": "08:00",
//         "departureTime2": "16:00",
//         "duration": "2h 45m",
//         "__v": 0
//     },
//     {
//         "_id": "63f99bdd04d4598210edbd56",
//         "airlines": "Lufthansa",
//         "ammenities": "Special seating arrangements, Accessible check-in counters, Special meals, Braille safety cards, Sign language interpretation",
//         "arrival": "Paris",
//         "arrivalTime1": "10:45",
//         "arrivalTime2": "18:45",
//         "cost": 221,
//         "departure": "Berlin",
//         "departureTime1": "08:00",
//         "departureTime2": "16:00",
//         "duration": "2h 45m",
//         "__v": 0
//     }
// ];
  const handleExchangeClick = () => {
    const temp = departure;
    setDeparture(arrival);
    setArrival(temp);
  };

  const handleTripTypeChange = (e) => {
    setTripType(e.target.value);
    if (e.target.value === 'one-way') {
      setReturnDate('');
    }
  };

  const handleExchangeClickBus = () => {
    const temp = departureBus;
    setDepartureBus(arrivalBus);
    setArrivalBus(temp);
  };

  const handleTripTypeChangeBus = (e) => {
    setTripType(e.target.value);
    if (e.target.value === 'one-way') {
      setReturnDateBus('');
    }
  };

  let handleSearchSubmit = (e) => {
    e.preventDefault();
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



  return (
    <div className="container">
            <Tabs
        id="search-tabs"
        activeKey={key}
        onSelect={(k) => setKey(k)}
      >
        <Tab eventKey="flight" title="Flights">
          <form onSubmit={handleSearchSubmit}>
            <div className="row my-3">
              <div className="form-group col-md-2">
                <label htmlFor="departure" className='fw-bolder text-primary'>Departure</label>
                  <input type="text" id="departure" name="departure" className="form-control" placeholder="e.g. New York" value={departure} onChange={(e) => setDeparture(e.target.value)} />
              </div>
              <div className="form-group col-md-1 mt-4">
                    <button type="button" className="btn btn-outline-primary" onClick={handleExchangeClick}>
                      <FaExchangeAlt />
                    </button>
                  </div>
              <div className="form-group col-md-2">
                <label htmlFor="arrival" className='fw-bolder text-primary'>Arrival</label>
                  <input type="text" id="arrival" name="arrival" className="form-control" placeholder="e.g. Los Angeles" value={arrival} onChange={(e) => setArrival(e.target.value)} />
                </div>
              <div className="form-group col-md-2">
                <label htmlFor="depart-date" className='fw-bolder text-primary'>Depart Date</label>
                <input type="date" id="depart-date" name="depart-date" className="form-control" value={departDate} onChange={(e) => setDepartDate(e.target.value)} />
              </div>
              <div className="form-group col-md-2">
                <label htmlFor="return-date" className='fw-bolder text-primary'>Return Date</label>
                <input type="date" id="return-date" name="return-date" className="form-control" value={returnDate} onChange={(e) => setReturnDate(e.target.value)} disabled={tripType === 'one-way'} />
              </div>
              <div className="form-group col-md-2">
                <label htmlFor="num-people" className='fw-bolder text-primary'>Num of People</label>
                <input type="number" id="num-people" name="num-people" className="form-control" value={numPeople} onChange={(e) => setNumPeople(e.target.value)} />
              </div>
            </div>
            <div className='row'>
            <div classname="mb-2">
              <label className='fw-bolder text-primary'>Trip Type</label>
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
                <label classname="form-check-label" htmlFor="round-trip">
                  Round Trip
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
                <label classname="form-check-label" htmlFor="one-way">
                  One Way
                </label>
              </div>
            </div>
            </div>
            <button type="submit" className="btn btn-primary my-2">Search</button>
          </form>
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
        <Tab eventKey="bus" title="Buses">
          <form onSubmit={handleSearchSubmit}>
            <div className="row my-3">
              <div className="form-group col-md-2">
                <label htmlFor="departureBus" className='fw-bolder text-primary'>From</label>
                  <input type="text" id="departureBus" name="departureBus" className="form-control" placeholder="e.g. New York" value={departureBus} onChange={(e) => setDepartureBus(e.target.value)} />
              </div>
              <div className="form-group col-md-1 mt-4">
                    <button type="button" className="btn btn-outline-primary" onClick={handleExchangeClickBus}>
                      <FaExchangeAlt />
                    </button>
                  </div>
              <div className="form-group col-md-2">
                <label htmlFor="arrivalBus" className='fw-bolder text-primary'>To</label>
                  <input type="text" id="arrivalBus" name="arrivalBus" className="form-control" placeholder="e.g. Los Angeles" value={arrivalBus} onChange={(e) => setArrivalBus(e.target.value)} />
                </div>
              <div className="form-group col-md-2">
                <label htmlFor="depart-date" className='fw-bolder text-primary'>Depart Date</label>
                <input type="date" id="depart-date" name="depart-date" className="form-control" value={departDateBus} onChange={(e) => setDepartDateBus(e.target.value)} />
              </div>
              <div className="form-group col-md-2">
                <label htmlFor="return-date" className='fw-bolder text-primary'>Return Date</label>
                <input type="date" id="return-date" name="return-date" className="form-control" value={returnDateBus} onChange={(e) => setReturnDateBus(e.target.value)} />
              </div>
              <div className="form-group col-md-2">
                <label htmlFor="num-people" className='fw-bolder text-primary'>Num of People</label>
                <input type="number" id="num-people" name="num-people" className="form-control" value={numPeopleBus} onChange={(e) => setNumPeopleBus(e.target.value)} />
              </div>
            </div>
            <div className='row'>
            {/* <div classname="mb-2">
              <label className='fw-bolder text-primary'>Trip Type</label>
              <div classname="form-check">
                <input
                  classname="form-check-input"
                  type="radio"
                  name="trip-type"
                  id="round-trip"
                  value="round-trip"
                  onClick={handleTripTypeChangeBus}
                  defaultChecked
                />
                <label classname="form-check-label" htmlFor="round-trip">
                  Round Trip
                </label>
              </div>
              <div classname="form-check">
                <input
                  classname="form-check-input"
                  type="radio"
                  name="trip-type"
                  id="one-way"
                  value="one-way"
                  onClick={handleTripTypeChangeBus}
                />
                <label classname="form-check-label" htmlFor="one-way">
                  One Way
                </label>
              </div>
            </div> */}
            </div>
            <button type="submit" className="btn btn-primary my-2">Search</button>
          </form>
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
          people={numPeopleBus}
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
  );
}

let FlightCard = ({ airline, departure, arrival, duration, disabledAmenities, cost, departureTime, arrivalTime, departureReturnTime, arrivalReturnTime, returnFlight, people }) => {
  if(returnFlight == 'one-way'){
    return (
      <div className='row'>
        <div className='col-md-1'>
      
        </div>
        <div className='col-md-10'>

        <Card className='my-2 marginone'>
          <Card.Body>
            <Row>
              <Col>
              <Card.Title>{airline}</Card.Title>
              </Col>
              <Col></Col>
              <Col></Col>
              <Col></Col>
              <Col></Col>
              <Col></Col>
              <Col></Col>
              <Col></Col>
              <Col>
                <h5>${cost}/person </h5>
              </Col>
            </Row>
            <Row>
              <Col>
                <p><FaPlaneDeparture/>&nbsp;&nbsp;{departure}</p>
                <p>Departure time: {departureTime}</p>
              </Col>
              <Col>
                <svg height="40" width="500">
                  <line x1="-20" y1="25" x2="500" y2="25" stroke="black" strokeWidth="1" />
                  <circle cx="250" cy="25" r="6" fill="white" stroke="black" strokeWidth="1" />
                </svg>
                <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                  {duration}</p>
              </Col>
              <Col className='ms-5'>
                <p><FaPlaneArrival/>&nbsp;&nbsp;{arrival}</p>
                <p>Arrival time: {arrivalTime}</p>
              </Col>
            </Row>
            <Row>
            <Col>
            <Card.Text className='fw-bold'>Amenities:</Card.Text>
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
                <Col>
                Grand Total: {people * cost}
                </Col>
              </Row>
          </Card.Body>
        </Card>
        
        
        </div>
      </div>
    );
  }
  else{
    return(<div className="d-flex justify-content-between align-items-center my-2">
          <Card className="flex-grow-1">
            <Card.Body>
              <Row>
                <Col>
                  <h5>{airline} </h5>
                </Col>
                <Col></Col>
              <Col></Col>
              <Col></Col>
              <Col></Col>
              <Col></Col>
              <Col></Col>
                <Col>
                  <h5>${cost}/person</h5>
                </Col>
              </Row>
              <Row>
              <Col>
                <p><FaPlaneDeparture/>&nbsp;&nbsp;{departure}</p>
                <p>Departure time: {departureTime}</p>
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
                <p>Arrival time: {arrivalTime}</p>
              </Col>
              </Row>
              <Row>
                <Col>
                <Card.Text className='fw-bold'>Amenities:</Card.Text>
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
                <Col>
                Grand Total: {people * cost}
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
              <Col></Col>
              <Col></Col>
              <Col></Col>
                <Col>
                  <h5>${cost}/person</h5>
                </Col>
              </Row>
              <Row>
              <Col>
                <p><FaPlaneDeparture/>&nbsp;&nbsp;{arrival}</p>
                <p>Arrival time: {departureReturnTime}</p>
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
                <p>Departure time: {arrivalReturnTime}</p>
              </Col>
              </Row>
              <Row>
              <Col>
              <Card.Text className='fw-bold'>Amenities:</Card.Text>
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
                <Col>
                Grand Total: {people * cost}
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </div>
  );}
};

let BusCard = ({ airline, departureBus, arrivalBus, duration, disabledAmenities, cost, departureBusTime, arrivalBusTime, departureBusReturnTime, arrivalBusReturnTime, returnbus, people }) => {
  return (
      <div className='row'>
        <div className='col-md-1'>
        </div>
        <div className='col-md-10'>

        <Card className='my-2 marginone'>
          <Card.Body>
            <Row>
              <Col>
                <h4><FaBusAlt/>&nbsp;&nbsp;{departureBus}</h4>
                {/* <p>Departure time: {departureBusTime}</p> */}
              </Col>
              <Col>
                <svg height="40" width="500">
                  <line x1="-20" y1="25" x2="500" y2="25" stroke="black" strokeWidth="1" />
                  <circle cx="250" cy="25" r="6" fill="white" stroke="black" strokeWidth="1" />
                </svg>
                <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                  {duration}</p>
              </Col>
              <Col className='ms-5'>
                <h4><FaBusAlt/>&nbsp;&nbsp;{arrivalBus}</h4>
                {/* <p>Arrival time: {arrivalBusTime}</p> */}
              </Col>
            </Row>
            <Row>
            <Col>
            <Card.Text className='fw-bold'>Amenities:</Card.Text>
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
                <Col>
                Cost: ${cost}
                </Col>
              </Row>
            <Row>
                <Col>
                Grand Total: {people * cost}
                </Col>
              </Row>
          </Card.Body>
        </Card>
        
        
        </div>
      </div>
    );
};


export default FlightPage;
