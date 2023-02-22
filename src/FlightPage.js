import React, { useState } from 'react';
import axios from 'axios';


function Hotels() {
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
    <div>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Destination" value={destination} onChange={(e) => setDestination(e.target.value)} />
        <input type="date" placeholder="Checkin" value={checkin} onChange={(e) => setCheckin(e.target.value)} />
        <input type="date" placeholder="Checkout" value={checkout} onChange={(e) => setCheckout(e.target.value)} />
        <input type="number" placeholder="Number of people" value={numOfPeople} onChange={(e) => setNumOfPeople(e.target.value)} />
        <button type="submit">Search</button>
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

export default Hotels;
