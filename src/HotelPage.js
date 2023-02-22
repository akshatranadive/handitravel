import React, { useState } from 'react';
import axios from 'axios';
import './HotelPage.css';

function HotelPage() {
  const [destination, setDestination] = useState('');
  const [checkin, setCheckin] = useState('');
  const [checkout, setCheckout] = useState('');
  const [numOfPeople, setNumOfPeople] = useState('');
  const [hotels, setHotels] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const searchParams = {
      destination: destination,
      checkin: checkin,
      checkout: checkout,
      numOfPeople: numOfPeople
    };

    axios.get('http://example.com/hotels', { params: searchParams })
      .then(response => {
        setHotels(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  };

  return (
    <div className="container">
      <form onSubmit={handleSubmit}>
        <div className="row">
          <div className="col-md-3">
            <input type="text" className="form-control" placeholder="Destination" value={destination} onChange={(e) => setDestination(e.target.value)} />
          </div>
          <div className="col-md-2">
            <input type="date" className="form-control" placeholder="Checkin" value={checkin} onChange={(e) => setCheckin(e.target.value)} />
          </div>
          <div className="col-md-2">
            <input type="date" className="form-control" placeholder="Checkout" value={checkout} onChange={(e) => setCheckout(e.target.value)} />
          </div>
          <div className="col-md-2">
            <input type="number" className="form-control" placeholder="Number of people" value={numOfPeople} onChange={(e) => setNumOfPeople(e.target.value)} />
          </div>
          <div className="col-md-3">
            <button type="submit" className="btn btn-primary">Search</button>
          </div>
        </div>
      </form>
      {hotels.map((hotel, index) => (
        <div key={index}>
          <h3>{hotel.name}</h3>
          <p>{hotel.description}</p>
        </div>
      ))}
    </div>
  );
}

export default HotelPage;
