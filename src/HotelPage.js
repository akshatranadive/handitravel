import './HotelPage.css';
import React, { useState } from 'react';
import axios from 'axios';
import { Card, Button, ListGroup, ListGroupItem } from "react-bootstrap";
import { BiDownArrow, BiUpArrow } from 'react-icons/bi';
import { Dropdown, DropdownButton } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';


function HotelPage() {
  let counter = 0;
  const [destination, setDestination] = useState('');
  const [checkin, setCheckin] = useState('');
  const [checkout, setCheckout] = useState('');
  const [numOfPeople, setNumOfPeople] = useState(1);
  const [budget, setBudget] = useState('');
  const [disability, setDisability] = useState([]);
  let [selectedDisability, setSelectedDisability] = useState([]);
  const [hotels, setHotels] = useState([]);
  const [selectedValue, setSelectedValue] = useState('Hotel');
  const [selectedCountry, setCountryValue] = useState('France');
  const [errorMessage, setErrorMessage] = useState("");


  const handleCheckboxChange = (event) => {
    const { value, checked } = event.target;
    if (checked) {
      setSelectedDisability([...selectedDisability, value]);
    } else {
      setSelectedDisability(selectedDisability.filter((disability) => disability !== value));
    }
  };
  

  const handleDropdownSelect = (eventKey) => {
    setSelectedValue(eventKey);
  }  
  const handleCountryDropdownSelect = (eventKey) => {
    setCountryValue(eventKey);
  }  

  let handleSubmit = (e) => {
    counter++;
    e.preventDefault();
  if (!destination || !checkout || !checkin || !numOfPeople) {
    setErrorMessage("Please fill in all fields.");
  } 
  else if(selectedDisability.length <= 0){
    setErrorMessage("Please select at least one ammenity.");
  }
  else{
    setErrorMessage("");
    let searchParams = {
      // destination: destination,
      // checkin: checkin,
      // checkout: checkout,
      // numOfPeople: numOfPeople,
      budget: budget,
      disability:selectedDisability,
      // country:selectedCountry,
      // selectedValue: selectedValue
    };
    
  
    // let hotels = [
    //   {
    //     Accomodations: 'Hotel A',
    //     Type:'Hotel',
    //     bestPrice: 100,
    //     price1:100,
    //     price2:300,
    //     price3:600,
    //     Ammenities:["paraplegic", "deaf"],
    //     Country:'UAE',
    //     Location:'Nova scotia'
  
    //   },
    //   {
    //     Accomodations: 'Hotel B',
    //     Type:'Hotel',
    //     bestPrice: 200,
    //     price1:300,
    //     price2:700,
    //     price3:100,
    //     Ammenities:["deaf"],
    //     Country:'France',
    //     Location:'Nova scotia'
    //   },
    //   {
    //     Accomodations: 'Hotel C',
    //     Type:'Motel',
    //     bestPrice: 150,
    //     price1:800,
    //     price2:200,
    //     price3:100,
    //     Ammenities:["paraplegic"],
    //     Country:'Canada',
    //     Location:'Nova scotia'
    //   }
    // ];

      //hotels = filterHotelsByAccommodationType(hotels, selectedValue);
      
      //filteredHotels = hotels.filter((hotel) => selectedDisability.every((disability) => hotel.disability.includes(disability)) );
      // let disabilityFilteredHotels = [];
      // for (let j = 0; j < hotels.length; j++) {
      //   for (let i = 0; i < selectedDisability.length; i++) {
      //     let disabilities = hotels[0].disability;
      //     if (!disabilities.includes(selectedDisability[i])) {
      //       continue;
      //     }
      //     else{
      //       disabilityFilteredHotels.push()
      //     }
      // }
      // }
    

    //setHotels(filteredHotels);

    axios.get('http://localhost:2023/hotel', { params: searchParams })
    .then(response => {
      let res = response.data;
      //change
      let filteredHotels = res.filter(hotel => hotel.type == selectedValue && hotel.country == selectedCountry);
      let sorted = [...filteredHotels].sort((b ,a) => b.bestPrice - a.bestPrice);
      setHotels(sorted);
    })
    .catch(error => {
      console.log(error);
    });
  }
  };

  // const handleDisabilityChange = (e) => {
  //   const value = e.target.value;
  //   if (!e.target.value) {
  //     setDisability([...disability, value]);
  //   } else {
  //     setDisability(disability.filter(v => v !== value));
  //   }
  // };
  // function filterHotelsByAccommodationType(hotels, accommodationType) {
  //   setHotels(hotels.filter(hotel => hotel.accommodationType === accommodationType));
  // }
  

  return (
    <div className="container">
      
      <form onSubmit={handleSubmit}>
        <div className="row">
          <div className="col-md-1 ">
            <div className='fw-bolder text-primary'>Type</div>
            <DropdownButton className='text-white' id="my-dropdown" title={selectedValue} onSelect={handleDropdownSelect}>
            <Dropdown.Item eventKey="Hotel">Hotel</Dropdown.Item>
            <Dropdown.Item eventKey="Motel">Motel</Dropdown.Item>
            <Dropdown.Item eventKey="Zostel">Zostel</Dropdown.Item>
            <Dropdown.Item eventKey="Homestays">Homestays</Dropdown.Item>
            </DropdownButton>
          </div>
          <div className="col-md-1 ">
            <div className='fw-bolder text-primary'>Country</div>
            <DropdownButton className='text-white' id="my-dropdown" title={selectedCountry} onSelect={handleCountryDropdownSelect}>
            <Dropdown.Item eventKey="UAE">UAE</Dropdown.Item>
            <Dropdown.Item eventKey="Canada">Canada</Dropdown.Item>
            <Dropdown.Item eventKey="France">France</Dropdown.Item>
            </DropdownButton>
          </div>
          <div className="col-md-2">
            <div className='fw-bolder text-primary'>Location</div>
            <input type="text" className="form-control" placeholder="Where to?" value={destination} onChange={(e) => setDestination(e.target.value)} />
          </div>
          <div className="col-md-2">
          <div className='fw-bolder text-primary'>Check in</div>
            <input type="date" className="form-control" placeholder="Checkin" value={checkin} onChange={(e) => setCheckin(e.target.value)} />
          </div>
          <div className="col-md-2">
          <div className='fw-bolder text-primary'>Check out</div>
            <input type="date" className="form-control" placeholder="Checkout" value={checkout} onChange={(e) => setCheckout(e.target.value)} />
          </div>
          <div className="col-md-2">
            <div className='fw-bolder text-primary'>Number of people</div>
            <input type="number" className="form-control" placeholder="1,2,3..." value={numOfPeople} onChange={(e) => setNumOfPeople(e.target.value)} />
          </div>
          <div className="col-md-2">
            <div className='fw-bolder text-primary'>Budget/night</div>
            <input type="number" className="form-control" placeholder="€100, €200..." value={budget} onChange={(e) => setBudget(e.target.value)} />
          </div>
        </div>
        <div className='row my-3'>
        <button type="submit" className="btn btn-primary">Search</button>
        {errorMessage && <p className='text-danger'>{errorMessage}</p>}
        </div>
      </form>
      <div className='row'>
      <div className="form-group col-md-2 my-3">
            <label className='fw-bolder text-primary'>Amenities</label>
            <div>
              <div className="form-check">
                <input type="checkbox" className="form-check-input" id="Visual" value="Visual alarm clocks" checked={selectedDisability.includes("Visual alarm clocks")} onChange={handleCheckboxChange}/>
                <label className="form-check-label" htmlFor="Visual" >Visual alarm clocks</label>
              </div>
              <div className="form-check">
                <input type="checkbox" className="form-check-input" id="Portable" value="Portable hearing" checked={selectedDisability.includes("Portable hearing")} onChange={handleCheckboxChange} />
                <label className="form-check-label" htmlFor="Portable" >Portable hearing</label>
              </div>
              <div className="form-check">
                <input type="checkbox" className="form-check-input" id="Video" value="Video remote interpreting (VRI)" checked={selectedDisability.includes("Video remote interpreting (VRI)")} onChange={handleCheckboxChange}/>
                <label className="form-check-label" htmlFor="Video" >Video remote interpreting (VRI)</label>
              </div>
              <div className="form-check">
                <input type="checkbox" className="form-check-input" id="Staff" value="Staff trained in American Sign Language" checked={selectedDisability.includes("Staff trained in American Sign Language")} onChange={handleCheckboxChange} />
                <label className="form-check-label" htmlFor="Staff" >Staff trained in American Sign Language</label>
              </div>
              <div className="form-check">
                <input type="checkbox" className="form-check-input" id="Portable1" value="Portable hearing amplifier" checked={selectedDisability.includes("Portable hearing amplifier")} onChange={handleCheckboxChange}/>
                <label className="form-check-label" htmlFor="Portable1" >Portable hearing amplifier</label>
              </div>
              <div className="form-check">
                <input type="checkbox" className="form-check-input" id="TTY" value="TTY phones" checked={selectedDisability.includes("TTY phones")} onChange={handleCheckboxChange} />
                <label className="form-check-label" htmlFor="TTY" >TTY phones</label>
              </div>
              <div className="form-check">
                <input type="checkbox" className="form-check-input" id="Closed" value="Closed-captioned television" checked={selectedDisability.includes("Closed-captioned television")} onChange={handleCheckboxChange}/>
                <label className="form-check-label" htmlFor="Closed" >Closed-captioned television</label>
              </div>
              <div className="form-check">
                <input type="checkbox" className="form-check-input" id="Elevators" value="Elevators or ramps" checked={selectedDisability.includes("Elevators or ramps")} onChange={handleCheckboxChange} />
                <label className="form-check-label" htmlFor="Elevators" >Elevators or ramps</label>
              </div>
              <div className="form-check">
                <input type="checkbox" className="form-check-input" id="Bed" value="Bed rails" checked={selectedDisability.includes("Bed rails")} onChange={handleCheckboxChange}/>
                <label className="form-check-label" htmlFor="Bed" >Bed rails</label>
              </div>
              <div className="form-check">
                <input type="checkbox" className="form-check-input" id="Shower" value="Shower chairs" checked={selectedDisability.includes("Shower chairs")} onChange={handleCheckboxChange} />
                <label className="form-check-label" htmlFor="Shower" >Shower chairs</label>
              </div>
              <div className="form-check">
                <input type="checkbox" className="form-check-input" id="Accessible" value="Accessible parking spots" checked={selectedDisability.includes("Accessible parking spots")} onChange={handleCheckboxChange}/>
                <label className="form-check-label" htmlFor="Accessible" >Accessible parking spots</label>
              </div>
              <div className="form-check">
                <input type="checkbox" className="form-check-input" id="Roll" value="Roll-in showers with grab bars" checked={selectedDisability.includes("Roll-in showers with grab bars")} onChange={handleCheckboxChange} />
                <label className="form-check-label" htmlFor="Roll" >Roll-in showers with grab bars</label>
              </div>
              <div className="form-check">
                <input type="checkbox" className="form-check-input" id="Wide" value="Wide doorways" checked={selectedDisability.includes("Wide doorways")} onChange={handleCheckboxChange} />
                <label className="form-check-label" htmlFor="Wide" >Wide doorways</label>
              </div>
            </div>
          </div>
        <div className="col-md-10">
      {(hotels.length ) ? hotels.map(hotel => (
        <HotelCard
          key={hotel.accomodations}
          hotelName={hotel.accomodations}
          accomodationType={hotel.type}
          bestPrice={hotel.bestPrice}
          price1={hotel.price1}
          price2={hotel.price2}
          price3={hotel.price3}
          country={hotel.country}
          location={destination}
          days={Math.ceil(((new Date(checkout)).getTime()-new Date(checkin).getTime())/(1000*60*60*24))}
          people={numOfPeople}
          ammenities={hotel.ammenities}
        />
       )) : 
      //  <p className="col-md-10">No records found!</p>
      null
        }
        </div>
    </div>
    </div>
  );
}

export default HotelPage;

function HotelCard({ hotelName, accomodationType, bestPrice, price1, price2, price3, country, location, ammenities, days, people }) {
    const [isExpanded, setIsExpanded] = useState(false);
  const [hotelLinks, setHotelLinks] = useState([
    { website: "www.bestprice.com/"+hotelName, cost: "       €" + bestPrice },
    { website: "www.booking.com/"+hotelName, cost: "       €" + price1 },
    { website: "www.expedia/"+hotelName, cost: "       €" + price2 },
    { website: "www.tripAdvisor/"+hotelName, cost: "       €" + price3 }
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
  let grandtotal = days*people*bestPrice;

  const handleExpansion = () => {
    setIsExpanded(!isExpanded);
  };

  return (  
    <Card className='my-3 shadow-inner'>
    <Card.Body>
      <Card.Title>{hotelName}</Card.Title>
      <Card.Subtitle className="mb-2 text-muted">
        Best Price/night: €{bestPrice}<br></br>
        Accomodation Type: {accomodationType}
      </Card.Subtitle>
      <Card.Text className='fw-bold'>Amenities:</Card.Text>
      <ul>
              {ammenities.split(',').map((amenity, index) => (
                <li key={index}>{amenity}</li>
              ))}
            </ul>
      <Card.Text className='fw-bold' >Destination: <span className='fw-light'>{location}, {country}</span></Card.Text>
      <Card.Text className='fw-bold'>Grand Total: <span className='fw-light'><span className='fw-bold'>{bestPrice}</span>(Best Price)*<span className='fw-bold'>{days}</span>(Number of nights)*<span className='fw-bold'>{people}</span>(Number of people) = </span><span className='fw-bold'>€{grandtotal}</span></Card.Text>
      <Button variant="primary" onClick={handleExpansion}>
        {isExpanded ? <BiUpArrow/> : <BiDownArrow/>}
      </Button>
      {isExpanded && (
        <ListGroup className="mt-3">
          <Card.Text ><span className='fw-bold'>Compare prices : </span></Card.Text>
          {hotelLinks.map((link, index) => (
            <ListGroupItem key={index}>
              <a href={"https://"+link.website} target="_blank" rel="noreferrer">
                {link.website}
              </a>
              <span className="float-right">{link.cost}</span>
            </ListGroupItem>
          ))}
        </ListGroup>
      )}
    </Card.Body>
  </Card>

  );
}

// function HotelList({ hotels }) {
//   return (
//     <div>
//       {hotels.map(hotel => (
//         <HotelCard
//           key={hotel.name}
//           name={hotel.name}
//           cost={hotel.cost}
//           bookingLink={hotel.bookingLink}
//         />
//       ))}
//     </div>
//   );
// }

// const hotels = [
//     {
//       name: 'Hotel A',
//       cost: 100,
//       bookingLink: 'https://www.booking.com/hotel-a'
//     },
//     {
//       name: 'Hotel B',
//       cost: 200,
//       bookingLink: 'https://www.booking.com/hotel-b'
//     },
//     {
//       name: 'Hotel C',
//       cost: 150,
//       bookingLink: 'https://www.booking.com/hotel-c'
//     }
//   ];
  