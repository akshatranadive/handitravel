import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import HomePage from './HomePage';
// import LoginPage from './components/LoginPage';
// import GuidesPage from './components/GuidesPage';
// import CommunityPage from './components/CommunityPage';
// import AboutUsPage from './components/AboutUsPage';
// import SettingsPage from './components/SettingsPage';
import './App.css';
import { Navbar, Nav } from 'react-bootstrap';
import { FaCog } from 'react-icons/fa';
import HotelPage from './HotelPage';
//import { TiPlaneOutline, TiHotel, TiBus } from 'react-icons/ti';


function App() {
  return (
    <Router>
      <div className="App">
      <Navbar bg="primary" variant="dark" expand="lg" className="navbar">
          <Navbar.Brand as={Link} to="/" className='mx-3'>
          <span className="ml-5 handi-travel">Handi Travel</span>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-3">
              <Nav.Item>
                <Nav.Link as={Link} to="/" exact>Home</Nav.Link>
              </Nav.Item>
              {/* <Nav.Item>
                <Nav.Link as={Link} to="/guides">Guides</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link as={Link} to="/community">Community</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link as={Link} to="/aboutus">About Us</Nav.Link>
              </Nav.Item> */}
              <Nav.Item>
                <Nav.Link as={Link} to="/hotels">
                   Hotels
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link as={Link} to="/flights">
                   Flights
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link as={Link} to="/buses">
                   Buses
                </Nav.Link>
              </Nav.Item>

            </Nav>
            <Nav className=''>
              <Nav.Item>
                <Nav.Link as={Link} to="/login">Log In</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link as={Link} to="/signup">Sign Up</Nav.Link>
              </Nav.Item>
              <Nav.Item>
              <Nav.Link as={Link} to="/settings">
                  <FaCog className="settings-icon" />
                </Nav.Link>
              </Nav.Item>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
        <Switch>
          <Route exact path="/">
            <HomePage />
          </Route>
          <Route path="/login">
            {/* <LoginPage /> */}
          </Route>
          <Route path="/hotels">
            <HotelPage />
          </Route>
          <Route path="/community">
            {/* <CommunityPage /> */}
          </Route>
          <Route path="/aboutus">
            {/* <AboutUsPage /> */}
          </Route>
          <Route path="/settings">
            {/* <SettingsPage /> */}
          </Route>
        </Switch>
      </div>
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
