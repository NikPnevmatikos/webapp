import React, {useEffect} from 'react'
import {Row, Col} from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Spinner from 'react-bootstrap/Spinner';
import Product from './Product'
import { listProductsAction } from '../actions/ProductActions'


function Homescreen() {

  const dispatch = useDispatch()
  const productList = useSelector(state => state.productListReducer)
  const {error, loading, products} = productList
  

  useEffect(() => {
    dispatch(listProductsAction())

  } , [dispatch])

  return (
    <div>
        <h1>Best Sellers</h1>
        
        {loading ? 
          <Spinner 
          animation="border" role="status" style={{ margin: 'auto',
                                                    display: 'block'
                                                  }}>
            <span className="visually-hidden">Loading</span>
          </Spinner>
          : error ?
            <div className="alert alert-dismissible alert-danger">
              <strong>{error}</strong>
            </div>
            :
            <Row>
              {products.map(product =>(
                <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                      <Product product={product}/>
                </Col> 
              ))}
            </Row>
        }
       
    </div>
  )
}

export default Homescreen


