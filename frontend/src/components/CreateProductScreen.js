import React, { useState, useEffect } from 'react'
import { Link , useNavigate, useLocation } from 'react-router-dom'
import { Form, Container, Button, Col, Row } from 'react-bootstrap'
import Spinner from 'react-bootstrap/Spinner';
import { useDispatch, useSelector } from 'react-redux'
import { register } from '../actions/userActions'
import { createProductAction } from '../actions/ProductActions';

function CreateProductScreen() {

    const location = useLocation()  
    const navigate = useNavigate()
    const redirect = location.search ? location.search.split('=')[1] : '/'

    const [name, setName] = useState('')
    const [brand, setBrand] = useState('')
    const [category, setCategory] = useState('')    
    const [description, setDescription] = useState('')   
    const [price, setPrice] = useState(0)   
    const [countInStock, setCountInStock] = useState(0)

    const dispatch = useDispatch()

    const createProduct = useSelector(state => state.createProductReducer)
    const {error, loading, success, product} = createProduct

    const userLogin = useSelector(state => state.userLoginReducer)
    const {userInfo} = userLogin

    useEffect(() =>{
        dispatch({type:'CREATE_PRODUCT_RESET'})
        if (userInfo == null) {
            navigate('/login/')
        }
        else {
            if (product != null) {
                navigate('/myProducts')
            }
        }
    }, [userInfo, navigate, product])


    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(createProductAction(name, brand, category, price, description, countInStock))
    }

    return (
    <Container>
        <Row className = "justify-content-md-center">
            <Col xs={12} md={6}>
                <h1>Create a Little Product</h1>

                {error && 
                    <div className="alert alert-dismissible alert-danger">
                    <strong>{error}</strong>
                    </div>
                }
                
                {loading &&
                    <Spinner 
                    animation="border" role="status" style={{ margin: 'auto',
                                                                display: 'block'
                                                            }}>
                        <span className="visually-hidden">Loading</span>
                    </Spinner>
                }
                
                <Form onSubmit={submitHandler}>
                    <Form.Group controlId='name' className='py-1'>
                        <Form.Label>Name</Form.Label>
                        <Form.Control 
                            required
                            type='name' 
                            placeholder='Enter Name' 
                            value={name}
                            onChange = {(e) => setName(e.target.value)}                            
                        >        
                        </Form.Control>
                    </Form.Group> 
                    
                    <Form.Group controlId='brand' className='py-1'>
                        <Form.Label>Brand</Form.Label>
                        <Form.Control 
                            required
                            type='brand' 
                            placeholder='Enter Brand' 
                            value={brand}
                            onChange = {(e) => setBrand(e.target.value)}                            
                        >        
                        </Form.Control>
                    </Form.Group> 

                    <Form.Group controlId='category' className='py-1'>
                        <Form.Label>Category</Form.Label>
                        <Form.Control 
                            required
                            type='Category' 
                            placeholder='Enter Category' 
                            value={category}
                            onChange = {(e) => setCategory(e.target.value)}                            
                        >        
                        </Form.Control>
                    </Form.Group> 
                    
                    <Form.Group controlId='price' className='py-1'>
                        <Form.Label>Price</Form.Label>
                        <Form.Control 
                            required
                            type='number' 
                            placeholder='Enter Bid' 
                            value={price}
                            onChange = {(e) => setPrice(e.target.value)}                            
                        >
                        </Form.Control>
                    </Form.Group> 

                    <Form.Group controlId='description' className='py-1'>
                        <Form.Label>Description</Form.Label>
                        <Form.Control 
                            required
                            type='text' 
                            placeholder='Enter Description' 
                            value={description}
                            onChange = {(e) => setDescription(e.target.value)}                            
                        >
                        </Form.Control>
                    </Form.Group> 

                    <Form.Group controlId='countInStock' className='py-1'>
                        <Form.Label>Count In Stock</Form.Label>
                        <Form.Control 
                            required
                            type='number' 
                            placeholder='Enter Count In Stock' 
                            value={countInStock}
                            onChange = {(e) => setCountInStock(e.target.value)}                            
                        >
                        </Form.Control>
                    </Form.Group> 

                    <Button type='submit' className="btn btn-dark btn-lg float-right" style={{float: 'right'}}>
                        Create
                    </Button>

                    <Link to='/myProducts'>
                            <Button type="button" className="btn btn-dark btn-lg">
                                Discard
                            </Button>
                    </Link>

                </Form>
            </Col>
        </Row>
    </Container>
  )
}

export default CreateProductScreen