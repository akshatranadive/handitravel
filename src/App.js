import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import HomePage from './HomePage';
import 'bootstrap/dist/css/bootstrap.min.css';
// import LoginPage from './components/LoginPage';
// import GuidesPage from './components/GuidesPage';
// import CommunityPage from './components/CommunityPage';
// import AboutUsPage from './components/AboutUsPage';
// import SettingsPage from './components/SettingsPage';
import './App.css';
import { Navbar, Nav } from 'react-bootstrap';
import HotelPage from './HotelPage';
import FlightPage from './FlightPage';
import logo from './assets/logo.jpeg';
import logotext from './assets/logotext.png';
import logoup from './assets/logoup.png';
import { InputProvider } from './InputContext';
import { CardPricesProvider } from './CardPricesContext';
import { useTranslation, Translation } from "react-i18next";
import i18n from 'i18next';
import BookingPage from './BookingPage';
  
  const handleLanguageChange = (event) => {
    console.log("language: "+event.target.value)
    i18n.changeLanguage(event.target.value);
  };


function App() {
  const { t } = useTranslation();
  const currentLanguage = i18n.language;

  return (
    <Router>
      <InputProvider>
      <CardPricesProvider>
      <div className="App">
      <Navbar sticky="top" bg="primary" variant="dark" expand="lg" className="navbar">
          <Navbar.Brand as={Link} to="/" className='mx-3'>
          <img
            src={logoup}
            height="50"
            className="d-inline-block align-top"
            alt="Logo"
          />
          <img
            src={logotext}
            height="30"
            className="d-inline-block align-top ms-3 mt-2"
            alt="Logo"
          />
          {/* <span className="ml-5 handi-travel">Handi Travel</span> */}
          </Navbar.Brand>
          {/* <select value={currentLanguage} onChange={handleLanguageChange}>
      <option value="en">{t('English')}</option>
      <option value="fr">{t('Français')}</option>
       </select> */}
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-3">
              {/* <Nav.Item>
                <Nav.Link as={Link} to="/" exact>Home</Nav.Link>
              </Nav.Item> */}
              {/* <Nav.Item>
                <Nav.Link as={Link} to="/guides">Guides</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link as={Link} to="/community">Community</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link as={Link} to="/aboutus">About Us</Nav.Link>
              </Nav.Item> */}
              {/* <Nav.Item>
                <Nav.Link as={Link} to="/accommodation">
                {t("Accommodation")}
                </Nav.Link>
              </Nav.Item> */}
              <Nav.Item>
                <Nav.Link as={Link} to="/tour">
                {t("Tour")}
                </Nav.Link>
              </Nav.Item>
              {/* <Nav.Item>
                <Nav.Link as={Link} to="/buses">
                   Book
                </Nav.Link>
              </Nav.Item> */}

            </Nav>
            {/* <Nav className=''>
              <Nav.Item>
                <Nav.Link as={Link} to login">Log In</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link as={Link} to="/signup">Sign Up</Nav.Link>
              </Nav.Item>
              <Nav.Item>
              <Nav.Link as={Link} to="/settings">
                  <FaCog className="settings-icon" />
                </Nav.Link>
              </Nav.Item>
            </Nav> */}
          </Navbar.Collapse>
          <Nav.Item>
              <Nav.Link >
              <select value={currentLanguage} onChange={handleLanguageChange}>
                    <option value="en">{t('English')}</option>
                   <option value="fr">{t('Français')}</option>
             </select> 
                </Nav.Link>
              
             </Nav.Item>
        </Navbar>
        <Switch>
          <Route exact path="/">
            <HomePage />
          </Route>
          <Route path="/login">
            {/* <LoginPage /> */}
          </Route>
          <Route path="/accommodation">
            <HotelPage />
          </Route>
          <Route path="/tour">
            <FlightPage/>
          </Route>
          <Route path="/buses">
          <BookingPage/>
          </Route>
          <Route path="/settings">
            {/* <SettingsPage /> */}
          </Route>
        </Switch>
      </div>
      </CardPricesProvider>
      </InputProvider>
    </Router>
  );
}

export default App;

// import logo from './logo.svg';
// import './App.css';
// import { Route } from 'react-router-dom';
// import HomePage from './HomePage';
// import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
// import { Navbar, Nav, NavDropdown, Container, Button } from 'react-bootstrap';


// function App() {
//   return (
//     <Router>
//     <Navbar sticky="top" expand="lg" variant="dark" bg="blue">
//         <Container>
//           <Navbar.Brand>Handi Travel</Navbar.Brand>
//           <Navbar.Toggle aria-controls="navbar-nav" />
//           <Navbar.Collapse id="navbar-nav" className="justify-content-end">
//             <Nav>
//             <div className="content">
//                 <Switch>
//                   <Route path="/">
//                   <Nav.Link>Home</Nav.Link>
//                   <HomePage/>
//                   </Route>
//                 </Switch>

//               </div>
              
//               <Nav.Link>Guides</Nav.Link>
//               <Nav.Link>Community</Nav.Link>
//               <Nav.Link>About Us</Nav.Link>
//               <div className="content">
//                 {/* <Switch>
//                   <Route path="/login">

//                   </Route>
//                   <Button variant="info">Log In</Button>{' '}

//                 </Switch> */}

//               </div>
//               <Button variant="info">Sign Up</Button>{' '}
//               <Nav.Link></Nav.Link>
//               <NavDropdown title="Settings">
//                 <NavDropdown.Item>Profile</NavDropdown.Item>
//                 <NavDropdown.Item>Account</NavDropdown.Item>
//                 <NavDropdown.Divider />
//                 <NavDropdown.Item>Logout</NavDropdown.Item>
//               </NavDropdown>
//             </Nav>
//           </Navbar.Collapse>
//         </Container>
//       </Navbar>
//       </Router>
//   );
// }

// export default App;
