import React, { useState, useEffect } from 'react'
import { LinkContainer } from 'react-router-bootstrap';
import { useNavigate, useLocation, useParams } from 'react-router-dom'
import { Table, Container, Button, Row, Col, Image} from 'react-bootstrap'
import Spinner from 'react-bootstrap/Spinner';
import { useDispatch, useSelector } from 'react-redux'
import { userListProductsAction, deleteProductAction} from '../actions/ProductActions'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

function MyProductScreen() {
  
    const match = useParams()
    const location = useLocation()  
    const navigate = useNavigate()

    const dispatch = useDispatch()
    
    const userProducts = useSelector(state => state.userProductListReducer)
    const {error, loading, products} = userProducts 
    
    const deleteProduct = useSelector(state => state.deleteProductReducer)
    const {error: delete_error, loading: delete_load, success } = deleteProduct

    const singleuser = useSelector(state => state.userLoginReducer)
    const { userInfo } = singleuser
    
    useEffect(() => {
        if (userInfo != null) {
            dispatch(userListProductsAction())
        }
        else {
            navigate('/login')
        }
    }, [dispatch , navigate, userInfo, success])

    const deleteHandler = (id) => {

        if (window.confirm('Are you sure you want to delete this Product?')) {
            dispatch(deleteProductAction(id))
        }
    }



    const createProduct = (product) => {
        
    }

    
    return (
        <div>
            <Row className="align-items-center my-3">
                <Col>
                    <h5>uwu my little kawaii product list uwu</h5>
                </Col>
                <Col className='text-right'>
                    <Button className="btn btn-dark btn-lg float-right" style={{float: 'right'}} onClick={() => createProduct}>
                        Create Product    
                    </Button>    
                </Col>
            </Row>

            {delete_load && 
                <Spinner 
                animation="border" role="status" style={{ margin: 'auto',
                                                            display: 'block'
                                                        }}>
                    <span className="visually-hidden">Loading</span>
                </Spinner>
            }

            {delete_error && 
                <div className="alert alert-dismissible alert-danger">
                    <strong>{error}</strong>
                </div>
            }


            {loading ? (
                <Spinner 
                animation="border" role="status" style={{ margin: 'auto',
                                                            display: 'block'
                                                        }}>
                    <span className="visually-hidden">Loading</span>
                </Spinner>
            ) : error   
                ? ( 
                    <div className="alert alert-dismissible alert-danger">
                    <strong>{error}</strong>
                    </div>
                ) : products.length > 0 
                ? (
                    <Table striped bordered hover responsive className='table-sm'>
                        <thead>
                            <tr>
                                <th>IMAGE</th>
                                <th>NAME</th>
                                <th>BRAND</th>
                                <th>CATEGORY</th>
                                <th>CURRENT BID</th>
                                <th></th>
                            </tr>
                        </thead>

                        <tbody>

                            {Array.isArray(products)
                                ?
                                (products.map(product => (
                                    <tr key={product._id}>
                                        <td>
                                            <Image 

                                                src={product.image} 
                                                alt= {product.name} 
                                                width={150} 
                                                height={150} 
                                                fluid 
                                                rounded
                                            />
                                        </td>
                                        <td>{product.name}</td>
                                        <td>{product.brand}</td>
                                        <td>{product.category}</td>
                                        <td>{product.price}</td>
                                        <td>
                                            <LinkContainer to={`/product/${product._id}/`}>
                                                <Button variant='light' className='btn-sm'>
                                                    {/* <i className='fas fa-edit'></i> */}
                                                    <h5>Edit</h5>
                                                </Button>
                                            </LinkContainer>

                                            <Button variant='danger' className='btn-sm' onClick={() => deleteHandler(product._id)}>
                                                {/* <i className='fas fa-trash'></i> */}
                                                <h5>X</h5>
                                            </Button>
                                        </td>
                                    </tr>
                            
                                ))
                                ):
                                    null
                            }
                        </tbody>
                
                    </Table>       
                
                ):
                <h1>You Have No Products Yet :(</h1> 
            }
    </div>
    )
}

export default MyProductScreen


