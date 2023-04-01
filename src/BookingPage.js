import './BookingPage.css';
import React, { useState, useContext } from 'react';
import { Form, Button, Card } from 'react-bootstrap';
import { BsCheckCircle } from 'react-icons/bs';
import { CardPricesContext } from './CardPricesContext';

function BookingPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [seats, setSeats] = useState(1);
  const [showConfirmation, setShowConfirmation] = useState(false);
  let {hotelPrice, flightPrice, busesPrice, totalPrice, selectedHotel, transportName,departureB,arrivalB,time1,time2,time3,transportType, settransportType, settime3,time4, settime4, settime2, settime1, setArrivalB, setDepartureB, settransportName, setSelectedHotel, setTotalPrice, setBusesPrice, setFlightPrice, setHotelPrice, isSelected, onSelect} = useContext(CardPricesContext);

  const handleConfirmBooking = (event) => {
    event.preventDefault();
    setShowConfirmation(true);
  };

  const handleResetForm = () => {
    setName('');
    setEmail('');
    setPhone('');
    setSeats(1);
    setShowConfirmation(false);
  };

  return (
    <div className="booking-page">
      {showConfirmation ? (
        <Card className="confirmation-card">
          <Card.Body>
            <div className="confirmation-icon"><BsCheckCircle size={60} /></div>
            <Card.Title>Booking Confirmed</Card.Title>
            <Card.Text>
              Name: {name}
              <br />
              Email: {email}
              <br />
              Phone: {phone}
              <br />
              <br />
              {/* Seats: {seats} */}
              {/* Transport name: {transportName} */}
              {transportName && (
                <>
                  Transport name: {transportName}
                  <br />
                </>
              )}
              Transport type: {transportType}
              <br />
              Departure: {departureB}
              <br />
              Arrival: {arrivalB}
              <br />
              {time1 && (
                <>
                  Departure Time: {time1}
                  <br />
                </>
              )}
              {time2 && (
                <>
                  Arrival Time: {time2}
                  <br />
                </>
              )}
              {time3 && (
                <>
                  Return Departure Time: {time3}
                  <br />
                </>
              )}
              {time4 && (
                <>
                  Return Arrival Time: {time4}
                  <br />
                </>
              )}
              

            </Card.Text>
            <Button variant="primary" onClick={handleResetForm}>Book Again</Button>
          </Card.Body>
        </Card>
      ) : (
        <>
          <h2>Enter traveler details:</h2>
          <Form onSubmit={handleConfirmBooking}>
            <Form.Group controlId="formName" className='my-2'>
              <Form.Label>Name:</Form.Label>
              <Form.Control type="text" value={name} onChange={(event) => setName(event.target.value)} required />
            </Form.Group>
            <Form.Group controlId="formEmail" className='my-2'>
              <Form.Label>Email:</Form.Label>
              <Form.Control type="email" value={email} onChange={(event) => setEmail(event.target.value)} required />
            </Form.Group>
            <Form.Group controlId="formPhone" className='my-2'>
              <Form.Label>Phone:</Form.Label>
              <Form.Control type="tel" value={phone} onChange={(event) => setPhone(event.target.value)} required />
            </Form.Group>
            {/* <Form.Group controlId="formSeats" className='my-2'>
              <Form.Label>Seats:</Form.Label>
              <Form.Control type="number" value={seats} onChange={(event) => setSeats(event.target.value)} min="1" max="10" required />
            </Form.Group> */}
            <Button variant="primary" type="submit" className='my-2'>
              Confirm Booking
            </Button>
          </Form>
        </>
      )}
    </div>
  );
}

export default BookingPage;
