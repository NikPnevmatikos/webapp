import { logout } from '../actions/userActions'
import {useState} from 'react'
import Button from 'react-bootstrap/Button';
import { useNavigate, useLocation } from 'react-router-dom'
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import {useDispatch, useSelector} from 'react-redux'
import {FaHeart} from "react-icons/fa";

function Header() {

  const navigate = useNavigate()
  const location = useLocation()
  
  const[keyword, setKeyword] = useState('')

  const dispatch = useDispatch()
  const userLogin = useSelector(state => state.userLoginReducer)
  const {userInfo} = userLogin

  const logoutHandler = () => {
    dispatch(logout())
  }

  const submitHandler = (e) => {
    e.preventDefault()
    console.log(location)
    if(keyword){
      navigate(`/?keyword=${keyword}&page=1`)
    }
    else{
      navigate(location.pathname)
    }
  } 

  return (
    <Navbar bg="dark" expand="lg" variant="dark">
      <Container fluid>
        <Navbar.Brand href='/'>
          <FaHeart/>
          eDay
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: '100px' }}
            navbarScroll
          >
            {userInfo ?(
              <NavDropdown title={userInfo.name} id='username'>

              {/* <NavDropdown title="Link" id="navbarScrollingDropdown"> */}
                {userInfo.is_staff == true && 
                  <div>
                    <NavDropdown.Item href='/admin'>
                      Admin Page
                    </NavDropdown.Item>
                    <NavDropdown.Divider />
                  </div>
                }
                <NavDropdown.Item href='/profile'>
                  My Profile
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href='/myProducts'>
                  My Products
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href='/myBids'>
                  My Bids
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item onClick={logoutHandler}>
                  Log Out
                </NavDropdown.Item>
              </NavDropdown>
            ) : (
              <>
                <Nav.Link href='/login'>
                  Sign In
                </Nav.Link>
                <Nav.Link href='/register'>
                  Sign Up
                </Nav.Link>
              </> 
            )}  
          
          </Nav>
          
          <Form onSubmit={submitHandler} className="d-flex">
            <Form.Control
              type="search"
              placeholder="Search"
              className="me-2"
              aria-label="Search"
              onChange={(e) => setKeyword(e.target.value)}
            />
            <Button type='submit' variant="secondary">
              Search
            </Button>
          </Form>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;





// <3
// exw kanei comment out to palio mpas kai exw kanei kamia malakia kai thn doume meta mhn to sbhseiw plz thnx <3
// <3













// import React from 'react'
// import { Link } from 'react-router-dom'
// import {useDispatch, useSelector} from 'react-redux'
// // import Button from 'react-bootstrap/Button';
// // import Container from 'react-bootstrap/Container';
// // import Form from 'react-bootstrap/Form';
// import Nav from 'react-bootstrap/Nav';
// import Navbar from 'react-bootstrap/Navbar';
// import NavDropdown from 'react-bootstrap/NavDropdown';
// import { LinkContainer } from 'react-router-bootstrap'

// function Header() {

//   const dispatch = useDispatch()
//   const userLogin = useSelector(state => state.userLoginReducer)
//   const {userInfo} = userLogin



//   const logoutHandler = () => {
//     dispatch(logout())
//   }


//   return (
//     <header>
//       <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
//       <div className="container-fluid">
//         <Link className="navbar-brand" to="/">eDay</Link>
//         <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarColor02" aria-controls="navbarColor02" aria-expanded="false" aria-label="Toggle navigation">
//           <span className="navbar-toggler-icon"></span>
//         </button>
//         <div className="collapse navbar-collapse" id="navbarColor02">
//           <ul className="navbar-nav me-auto">

//             {userInfo ?(
//               <NavDropdown title={userInfo.name} id='username'>


//                 {userInfo.is_staff &&
//                   <LinkContainer to='/admin'>
//                     <NavDropdown.Item>
//                       Admin Page
//                     </NavDropdown.Item>
//                   </LinkContainer>  
//                 } 

//                 <LinkContainer to='/profile'>
//                   <NavDropdown.Item>
//                     Profile
//                   </NavDropdown.Item>
//                 </LinkContainer>

//                 <LinkContainer to='/myProducts'>
//                   <NavDropdown.Item>
//                     My Products
//                   </NavDropdown.Item>
//                 </LinkContainer>


//                 <LinkContainer to='/myBids'>
//                   <NavDropdown.Item>
//                     My Bids
//                   </NavDropdown.Item>
//                 </LinkContainer>

//                 <NavDropdown.Item onClick={logoutHandler}>
//                   Log Out
//                 </NavDropdown.Item>
                
//               </NavDropdown>
//             ) : (
//               <>
//                 <li className="nav-item">
//                 <Link className="nav-link" to="/register/">Sign Up</Link>
//                 </li>  
                
//                 <li className="nav-item">
//                   <Link className="nav-link" to="/login/">Sign In</Link>
//                 </li>  
//               </>
//             )}

//           </ul>
//           <form className="d-flex">
//             <input className="form-control me-sm-2" type="text" placeholder="Search"/>
//             <button className="btn btn-secondary my-2 my-sm-0" type="submit">Search</button>
//           </form>
//         </div>
//       </div>
//     </nav>
//       </header>
//   )
// }

// export default Header