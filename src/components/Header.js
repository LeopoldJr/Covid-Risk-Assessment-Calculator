import React, {Component} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Navbar, Nav} from 'react-bootstrap';
import Calculator from "./Calculator";
import Home from "./Home";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

class Header extends Component {

    render(){
        return(
            <Router>
                <div className="header">
                <Navbar bg="light" variant="light">
                    <Navbar.Brand as={Link} to="/">Covid-19 Risk Assessor</Navbar.Brand>
                    <Nav className="mr-auto">
                        <Nav.Link as={Link} to="/">Home</Nav.Link>
                        <Nav.Link as={Link} to="/Calculator">Calculator</Nav.Link>
                        {/* <Nav.Link as={Link} to="/Data">Data</Nav.Link> */}
                    </Nav>
                </Navbar>
                </div>

                <Switch>
                    <Route path="/Calculator">
                        <Calculator />
                    </Route>
                    {/* <Route path="/Data">
                        <Data />
                    </Route> */}
                    <Route path="/">
                        <Home />
                    </Route>
                </Switch>

            </Router>

            
        )
    }
}
export default Header;