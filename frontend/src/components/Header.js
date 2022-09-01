import React from 'react'
import { Link } from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
// import Button from 'react-bootstrap/Button';
// import Container from 'react-bootstrap/Container';
// import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { LinkContainer } from 'react-router-bootstrap'
import { logout } from '../actions/userActions'

function Header() {

  const dispatch = useDispatch()
  const userLogin = useSelector(state => state.userLoginReducer)
  const {userInfo} = userLogin



  const logoutHandler = () => {
    dispatch(logout())
  }


  return (
    <header>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">eDay</Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarColor02" aria-controls="navbarColor02" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarColor02">
          <ul className="navbar-nav me-auto">

            {userInfo ?(
              <NavDropdown title={userInfo.name} id='username'>


                {userInfo.is_staff &&
                  <LinkContainer to='/admin'>
                    <NavDropdown.Item>
                      Admin Page
                    </NavDropdown.Item>
                  </LinkContainer>  
                } 

                <LinkContainer to='/profile'>
                  <NavDropdown.Item>
                    Profile
                  </NavDropdown.Item>
                </LinkContainer>

                <LinkContainer to='/myProducts'>
                  <NavDropdown.Item>
                    My Products
                  </NavDropdown.Item>
                </LinkContainer>


                <LinkContainer to='/myBids'>
                  <NavDropdown.Item>
                    My Bids
                  </NavDropdown.Item>
                </LinkContainer>

                <NavDropdown.Item onClick={logoutHandler}>
                  Log Out
                </NavDropdown.Item>
                
              </NavDropdown>
            ) : (
              <>
                <li className="nav-item">
                <Link className="nav-link" to="/register/">Sign Up</Link>
                </li>  
                
                <li className="nav-item">
                  <Link className="nav-link" to="/login/">Sign In</Link>
                </li>  
              </>
            )}

          </ul>
          <form className="d-flex">
            <input className="form-control me-sm-2" type="text" placeholder="Search"/>
            <button className="btn btn-secondary my-2 my-sm-0" type="submit">Search</button>
          </form>
        </div>
      </div>
    </nav>
      </header>
  )
}

export default Header