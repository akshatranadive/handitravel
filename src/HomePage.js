import { Card, Col, Container, Row } from 'react-bootstrap';
import './HomePage.css'; // Import custom styles for the App component
import hotels from './assets/hotels.jpg';
import commute from './assets/commute.jpg';
// import logoup from './assets/logoup.png';
// import happy from './assets/happy.jpg';
import { useTranslation, Translation } from "react-i18next";
import i18n from 'i18next';
import comp from './assets/comp.jpg';
import easy from './assets/easy.png';
import explore from './assets/explore.jpg';


const Homepage = () =>{
  const { t } = useTranslation();
  const currentLanguage = i18n.language;

  const handleLanguageChange = (event) => {
    console.log("language: "+event.target.value)
    i18n.changeLanguage(event.target.value);
  };


  return (
    <div className='bimage'>
    <div className="container" >
      {/* <div className="bg-image bg-image p-5 text-center shadow-1-strong rounded mb-5 text-white"  src={happy}>
        asffsdfwf
        </div> */}
{/* 
      <div class="has-bg-img bg-purple bg-blend-multiply">
        <h2>Hero Section</h2>
        <h4>It's easy to set background image with Torus Kit</h4>
        <img class="bg-image p-5 text-center shadow-1-strong rounded mb-5 text-white" style={{ height: '50rem' }} src={happy} />
      </div> */}
         {/* Background imaage of happy disabled people */}
      
      
      <div className='mx-3'>
        <div className="img">
       <br></br>
          {/* <h1>Welcome to Handi Travel!!</h1> */}
          <h1 className='greethead'>{t("greeting")}</h1>
          <p className='dedii'>{t("We are dedicated")}</p>
          {/* <p>We are dedicated to providing the best travel options for people with disabilities.</p> */}
        </div>
        
        <div>

        <Container>
          <Row className='ms-5'>
            <Col className="card-col">
              <a href="/tour">
              <Card style={{ width: '100%', height: '20rem' }}>
                  <Card.Img variant="top" style={{ height: '20rem' }} src={hotels} />
                  <Card.Body>
                  <Card.Title><h3 className='text-center'>{t("Tour")}</h3></Card.Title>
                  </Card.Body>
                </Card>
              </a>
            </Col>
            
            
            
           
          </Row>
        </Container>
        
        </div>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <div className='my-5'>
        {/* <h2>Our Features</h2> */}
        <h2 className='ourf'>{t("our features")}</h2>
        <div className="container">
      <Row>
      
        <Col className="card-col">
          <Card style={{ width: '20rem' }}>
            <Card.Img variant="top" style={{height:'12rem'}} src={easy}/>
            <Card.Body>
              <Card.Title><p className='text-center'>{t("easy")}</p></Card.Title>
              {/* <b-button href="#" variant="primary">Go somewhere</b-button> */}
              {/* <Card.Text>
                Some quick example text to build on the card title and make up the bulk of the card's content.
              </Card.Text> */}
              
            </Card.Body>
          </Card>
        </Col>
        <Col className="card-col">
          <Card style={{ width: '20rem' }}>
            <Card.Img variant="top" style={{height:'12rem'}} src= {comp}/>
            <Card.Body>
              <Card.Title><p className='text-center'>{t("srch")}</p></Card.Title>
              {/* <b-button href="#" variant="primary">Go somewhere</b-button> */}
    
              {/* <Card.Text>
                Some quick example text to build on the card title and make up the bulk of the card's content.
              </Card.Text> */}
              
            </Card.Body>
          </Card>
        </Col>
        <Col className="card-col">
          <Card style={{ width: '20rem' , height:'10'}}>
            <Card.Img variant="top" style={{height:'12rem'}}  src={explore} />
            <Card.Body>
              
               <Card.Title><p className='text-center'>{t("options")}</p></Card.Title> 
              {/* <b-button href="#" variant="primary">Go somewhere</b-button> */}
    
              {/* <Card.Text>
                Some quick example text to build on the card title and make up the bulk of the card's content.
              </Card.Text> */}
              
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
          {/* <ul className='threef'> */}
            {/* <li>Easy-to-use interface</li> */}
            {/* <p>{t("easy")}</p> */}
            {/*<li>Search and compare prices for hotels, flights, and buses</li> */}
            {/* <p>{t("srch")}</p> */}
            {/*<li>Customizable options for accessibility needs</li> */}
            {/* <p>{t("options")}</p> */}
          {/* </ul> */}
          {/* <br /> */}
          {/*<h2>Booking for Disabled</h2> */}
          {/* <h2>{t("booking")}</h2> */}
          {/*<p>We understand the unique challenges that people with disabilities face when traveling, and we strive to make the process as smooth and stress-free as possible. Our website offers a variety of features specifically tailored to the needs of people with disabilities, including:</p> */}
          {/* <p>{t("understand")}</p> */}
          {/* <ul> */}
            {/*<li>Wheelchair accessibility options for hotels, flights, and buses</li> */}
            {/* <li>{t("wheelchair")}</li> */}
            {/*<li>Assistance for hearing or visually impaired travelers</li> */}
            {/* <li>{t("assistance")}</li> */}
            {/*<li>Special needs assistance, such as service animals and mobility equipment rental</li> */}
            {/* <li>{t("special")}</li> */}
          {/* </ul> */}
  </div>


  {/* <div> */}
  {/*<h2>Price Comparison</h2> */}
  {/* <h2>{t("price")}</h2> */}
  {/*<p>We are committed to providing our users with the best prices for their travel needs. Our website allows you to easily compare prices from different providers, so you can be sure you're getting the best deal. </p> */}
  {/* <p>{t("commited")}</p> */}
  {/* </div> */}
  </div>
  </div>
  </div>)}

  export default Homepage;