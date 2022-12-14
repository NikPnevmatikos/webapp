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


function Header() {

  const navigate = useNavigate()
  const location = useLocation()
  
  const[keyword, setKeyword] = useState('')

  const dispatch = useDispatch()
  const userLogin = useSelector(state => state.userLoginReducer)
  const {userInfo} = userLogin

  const unreadMessages = useSelector(state => state.unreadMessageReducer)
  const {message:unread} = unreadMessages
  
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
          <img style={{width:"40px", height:"40px"}} src="/eDayLogo.png" alt="" ></img>
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
              <>
                <NavDropdown title={userInfo.name} id='username'>

                  {userInfo.is_staff === true && 
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
                  <NavDropdown.Item href='/myProducts'>
                    My Products
                  </NavDropdown.Item>
                  <NavDropdown.Item href='/myBids'>
                    My Bids
                  </NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item onClick={logoutHandler}>
                    Log Out
                  </NavDropdown.Item>
                </NavDropdown>


                <NavDropdown title={unread > 0 ? `MyMessages (${unread})` : `MyMessages` } id='messages'>

                    <NavDropdown.Item href='/received'>
                      Received {unread > 0 && <strong>({unread})</strong>}
                    </NavDropdown.Item>

                    <NavDropdown.Divider />

                    <NavDropdown.Item href='/sended'>
                      Sent
                    </NavDropdown.Item>

                  </NavDropdown>
              </>
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