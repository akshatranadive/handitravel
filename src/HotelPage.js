import './HotelPage.css';
import React, { useState, useContext } from 'react';
import axios from 'axios';
import { Card, Button, ListGroup, ListGroupItem } from "react-bootstrap";
import { BiDownArrow, BiUpArrow } from 'react-icons/bi';
import { Dropdown, DropdownButton } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { InputContext } from './InputContext';
import { useTranslation } from "react-i18next";
import i18n from 'i18next';



function HotelPage() {
  const { t } = useTranslation();
  const currentLanguage = i18n.language;

  let counter = 0;
  const {departureIn, setDepartureIn,arrivalIn, setArrivalIn,departDateIn, setDepartDateIn,returnDateIn, setReturnDateIn,numPeopleIn, setNumPeopleIn} = useContext(InputContext);
  const [destination, setDestination] = useState(departureIn);
  const [checkin, setCheckin] = useState(departDateIn);
  const [checkout, setCheckout] = useState(returnDateIn);
  const [numOfPeople, setNumOfPeople] = useState(numPeopleIn);
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

  let handleSubmit = (e) => {
    counter++;
    e.preventDefault();

    // setDepartureIn(departure);
    setArrivalIn(destination);
    setDepartDateIn(checkin);
    setReturnDateIn(checkout);
    setNumPeopleIn(numOfPeople);

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
            <div className='fw-bolder text-primary'>{t("Hotel")}</div>
            <DropdownButton className='text-white' id="my-dropdown" title={selectedValue} onSelect={handleDropdownSelect}>
            <Dropdown.Item eventKey={t("Hotel")}>{t("Hotel")}</Dropdown.Item>
            <Dropdown.Item eventKey={t("Motel")}>{t("Motel")}</Dropdown.Item>
            <Dropdown.Item eventKey={t("Zotel")}>{t("Zostel")}</Dropdown.Item>
            <Dropdown.Item eventKey={t("Homestays")}>{t("Homestays")}</Dropdown.Item>
            </DropdownButton>
          </div>
          <div className="col-md-1 ">
            <div className='fw-bolder text-primary'>{t("country")}</div>
            <DropdownButton className='text-white' id="my-dropdown" title={selectedCountry} onSelect={handleCountryDropdownSelect}>
            <Dropdown.Item eventKey="UAE">UAE</Dropdown.Item>
            <Dropdown.Item eventKey="Canada">Canada</Dropdown.Item>
            <Dropdown.Item eventKey="France">France</Dropdown.Item>
            </DropdownButton>
          </div>
          <div className="col-md-2">
            <div className='fw-bolder text-primary'>{t("Location")}</div>
            <input type="text" className="form-control" placeholder={t("where_to")} value={destination} onChange={(e) => {setDestination(e.target.value);}} />
          </div>
          <div className="col-md-2">
          <div className='fw-bolder text-primary'>{t("checkin")}</div>
            <input type="date" className="form-control" placeholder="Checkin" value={checkin} onChange={(e) => setCheckin(e.target.value)} />
          </div>
          <div className="col-md-2">
          <div className='fw-bolder text-primary'>{t("checkout")}</div>
            <input type="date" className="form-control" placeholder="Checkout" value={checkout} onChange={(e) => setCheckout(e.target.value)} />
          </div>
          <div className="col-md-2">
            <div className='fw-bolder text-primary'>{t("numofp")}</div>
            <input type="number" className="form-control" placeholder="1,2,3..." value={numOfPeople} onChange={(e) => setNumOfPeople(e.target.value)} />
          </div>
          <div className="col-md-2">
            <div className='fw-bolder text-primary'>{t("budget/night")}</div>
            <input type="number" className="form-control" placeholder="€100, €200..." value={budget} onChange={(e) => setBudget(e.target.value)} />
          </div>
        </div>
        <div className='row my-3'>
        <button type="submit" className="btn btn-primary">{t("search")}</button>
        {errorMessage && <p className='text-danger'>{errorMessage}</p>}
        </div>
      </form>
      <div className='row'>
      <div className="form-group col-md-2 my-3">
            <label className='fw-bolder text-primary'>{t("amenities")}</label>
            <div>
              <div className="form-check">
                <input type="checkbox" className="form-check-input" id="Visual" value="Visual alarm clocks" checked={selectedDisability.includes("Visual alarm clocks")} onChange={handleCheckboxChange}/>
                <label className="form-check-label" htmlFor="Visual" >{t("visualalarmclcks")}</label>
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
  