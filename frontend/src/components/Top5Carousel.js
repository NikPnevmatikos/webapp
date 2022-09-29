import React,{useEffect} from 'react'
import { Carousel, Image } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom';
import Spinner from 'react-bootstrap/Spinner';
import {recommendProductsAction } from '../actions/ProductActions'

function Top5Carousel() {

    const dispatch = useDispatch()

    const userLogin = useSelector(state => state.userLoginReducer)
    const { userInfo } = userLogin 
  
    const top5 = useSelector(state => state.recommendedProductReducer)
    const { error,loading, products } = top5

    useEffect(() => {
        if (userInfo != null){
            dispatch(recommendProductsAction())
        }
    
      } , [dispatch, userInfo])

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
                (products.length > 0 ?(
                    <div>
                        <h1 style = {{textAlign: 'center'}} className="mx-auto mt-2" >
                            Recommended For You
                        </h1>
                        <Carousel pause='hover' style={{background : "#d3d3d3"}}>
                            {products.map(product =>(
                                <Carousel.Item key={product._id}>
                                    <Link to={`/product/${product._id}`}>
                                        <Image 
                                            className="image-responsive image-resise" 
                                            src={product.image} 
                                            alt={product.name} 
                                            fluid />
                            
                                        <Carousel.Caption className='carousel.caption'>
                                            <h4>
                                                <strong>
                                                    {product.name.length > 35 ? 
                                                        (product.name).substring(0, 32) + '...'
                                                        :
                                                        (product.name)
                                                    }
                                                </strong>
                                            </h4>
                                        </Carousel.Caption>
                                    </Link>
                                </Carousel.Item>           
                            ))
                            }
                        </Carousel>
                        <hr className='py-2'/>
                    </div>)
                    
                    : null
                )
        }
    </div>
    )
}


export default Top5Carousel