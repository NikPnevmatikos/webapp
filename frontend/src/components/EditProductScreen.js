import React, { useState, useEffect } from 'react'
import { Link , useNavigate ,useParams} from 'react-router-dom'
import { Form, Container, Button, Col, Row } from 'react-bootstrap'
import Spinner from 'react-bootstrap/Spinner';
import { useDispatch, useSelector } from 'react-redux'
import { productsAction , editProductAction} from '../actions/ProductActions';

function EditProduct() {

    const match = useParams()
    const navigate = useNavigate()

    const [name, setName] = useState('')
    const [brand, setBrand] = useState('')
    const [category, setCategory] = useState('')    
    const [description, setDescription] = useState('')   
    const [price, setPrice] = useState(0)   
    const [countInStock, setCountInStock] = useState(0)

    const dispatch = useDispatch()

    const singleProduct = useSelector(state => state.productReducer)
    const {error, loading, product} = singleProduct

    const editproduct = useSelector(state => state.editProductReducer)
    const { error: errorEdit, loading: loadingEdit, success: successEdit } = editproduct

    // const userLogin = useSelector(state => state.userLoginReducer)
    // const {userInfo} = userLogin

    useEffect(() =>{

        if(successEdit == true){
            dispatch({ type: 'EDIT_PRODUCT_RESET' })
            navigate('/myProducts')
        }
        if(!product || product._id !== Number(match.id)){
            dispatch(productsAction(match.id))
        }
        else{
            setName(product.name)
            setBrand(product.brand)
            setCategory(product.category)
            setDescription(product.description)
            setPrice(product.price)
            setCountInStock(product.countInStock)
        }
    }, [dispatch, product, match, navigate, successEdit])


    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(editProductAction({
            _id: match.id,
            name,
            price,
            //image,
            brand,
            category,
            countInStock,
            description
        }))
    }

    return (
    <Container>
        <Row className = "justify-content-md-center">
            <Col xs={12} md={6}>
                <h1>Edit a Little Product</h1>

                {errorEdit && 
                    <div className="alert alert-dismissible alert-danger">
                    <strong>{errorEdit}</strong>
                    </div>
                }
                
                {loadingEdit &&
                    <Spinner 
                    animation="border" role="status" style={{ margin: 'auto',
                                                                display: 'block'
                                                            }}>
                        <span className="visually-hidden">Loading</span>
                    </Spinner>
                }
                

                {loading ? 
                    <Spinner 
                    animation="border" role="status" style={{ margin: 'auto',
                                                                display: 'block'
                                                            }}>
                        <span className="visually-hidden">Loading</span>
                    </Spinner>
                    : error ?
                        <div className="alert alert-dismissible alert-danger">
                            <strong>{errorEdit}</strong>
                        </div>   
                        : (
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
                                    Save Changes
                                </Button>
            
                                <Link to='/myProducts'>
                                        <Button type="button" className="btn btn-dark btn-lg">
                                            Discard Changes
                                        </Button>
                                </Link>
            
                            </Form>
                        )                     
                    }
            </Col>
        </Row>
    </Container>
  )
}

export default EditProduct