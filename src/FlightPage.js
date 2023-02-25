import axios from 'axios';
import React, { useState } from 'react';
import { Tabs, Tab } from 'react-bootstrap';
import { FaExchangeAlt } from 'react-icons/fa';
import 'bootstrap/dist/css/bootstrap.min.css';

function FlightPage() {
  const [key, setKey] = useState('flights');
  const [departure, setDeparture] = useState('');
  const [arrival, setArrival] = useState('');
  const [departDate, setDepartDate] = useState('');
  const [returnDate, setReturnDate] = useState('');
  const [numPeople, setNumPeople] = useState(1);
  const [tripType, setTripType] = useState('round-trip');


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

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    const searchParams = {
      departure,
      arrival,
      departDate,
      returnDate,
      numPeople,
      key
    };
    const searchType = key;
    axios.get('http://localhost:2023/hotel', { params: searchParams })
    .then(response => {
      //setHotels(sorted);
    })
    .catch(error => {
      console.log(error);
    });    console.log('Search params:', searchParams);
    console.log('Search type:', searchType);
  };



  return (
    <div className="container">
            <Tabs
        id="search-tabs"
        activeKey={key}
        onSelect={(k) => setKey(k)}
      >
        <Tab eventKey="flights" title="Flights">
          <form onSubmit={handleSearchSubmit}>
            <div className="row my-3">
              <div className="form-group col-md-2">
                <label htmlFor="departure">Departure:</label>
                  <input type="text" id="departure" name="departure" className="form-control" placeholder="e.g. New York" value={departure} onChange={(e) => setDeparture(e.target.value)} />
              </div>
              <div className="form-group col-md-1 mt-4">
                    <button type="button" className="btn btn-outline-primary" onClick={handleExchangeClick}>
                      <FaExchangeAlt />
                    </button>
                  </div>
              <div className="form-group col-md-2">
                <label htmlFor="arrival">Arrival:</label>
                  <input type="text" id="arrival" name="arrival" className="form-control" placeholder="e.g. Los Angeles" value={arrival} onChange={(e) => setArrival(e.target.value)} />
                </div>
              <div className="form-group col-md-2">
                <label htmlFor="depart-date">Depart Date:</label>
                <input type="date" id="depart-date" name="depart-date" className="form-control" value={departDate} onChange={(e) => setDepartDate(e.target.value)} />
              </div>
              <div className="form-group col-md-2">
                <label htmlFor="return-date">Return Date:</label>
                <input type="date" id="return-date" name="return-date" className="form-control" value={returnDate} onChange={(e) => setReturnDate(e.target.value)} disabled={tripType === 'one-way'} />
              </div>
              <div className="form-group col-md-2">
                <label htmlFor="num-people">Num of People:</label>
                <input type="number" id="num-people" name="num-people" className="form-control" value={numPeople} onChange={(e) => setNumPeople(e.target.value)} />
              </div>
            </div>
            <div className='row'>
            <div class="mb-2">
              <label>Trip Type:</label>
              <div class="form-check">
                <input
                  class="form-check-input"
                  type="radio"
                  name="trip-type"
                  id="round-trip"
                  value="round-trip"
                  onClick={handleTripTypeChange}
                  defaultChecked
                />
                <label class="form-check-label" for="round-trip">
                  Round Trip
                </label>
              </div>
              <div class="form-check">
                <input
                  class="form-check-input"
                  type="radio"
                  name="trip-type"
                  id="one-way"
                  value="one-way"
                  onClick={handleTripTypeChange}
                />
                <label class="form-check-label" for="one-way">
                  One Way
                </label>
              </div>
            </div>
            </div>
            <button type="submit" className="btn btn-primary">Search</button>
          </form>
        </Tab>
        <Tab eventKey="buses" title="Buses">
          <p>Bus search form goes here</p>
        </Tab>
        <Tab eventKey="cabs" title="Cabs">
          <p>Cab search form goes here</p>
        </Tab>
      </Tabs>
    </div>
  );
}

export default FlightPage;
