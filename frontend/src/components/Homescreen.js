import React, {useEffect} from 'react'
import {Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Spinner from 'react-bootstrap/Spinner';
import Product from './Product'
import Top5Carousel from './Top5Carousel'
import PageButtons from './PageButtons';
import { listProductsAction } from '../actions/ProductActions'
import { useLocation } from 'react-router-dom'
import { unreadMessageAction } from '../actions/MessagesActions'


function Homescreen() {

  const location = useLocation()

  const dispatch = useDispatch()
  const productList = useSelector(state => state.productListReducer)
  const {error, loading, products, page, pages} = productList

  const userLogin = useSelector(state => state.userLoginReducer)
  const {userInfo} = userLogin


  let keyword = location.search
  useEffect(() => {
    dispatch(listProductsAction(keyword))

    if(userInfo){
      dispatch(unreadMessageAction())
    }

  } , [dispatch , keyword, userInfo])

  return (
    <div>
        
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
            <div>
              {(!keyword || keyword.split("&")[0].endsWith("=") === true) &&
                <Row> 
                  <Top5Carousel/>
                </Row>
              }

              {(!keyword || keyword.split("&")[0].endsWith("=") === true) ?
                <div>
                  <h1 className='py-4'>Recently Uploaded</h1>              
                </div>
                :
                <div>
                  <h1>Showing Results for {keyword.split("&")[0].split("=")[1]}</h1>
                </div>
              }

              <Row>
                {products.map(product =>(
                  <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                    <Product product={product}/>
                  </Col> 
                ))}
              </Row>
              <PageButtons 
                      page={page}
                      pages={pages}
                      keyword={keyword}
              />
            </div>
        }
       
    </div>
  )
}

export default Homescreen


