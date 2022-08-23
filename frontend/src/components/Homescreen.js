import React, {useState, useEffect} from 'react'
import {Row, Col} from 'react-bootstrap'
import Product from './Product'
import axios from 'axios'

function Homescreen() {
  const [products, setProduct] = useState([])

  useEffect(() => {
    async function fetch(){
      const { data } = await axios.get('api/product_list/')
      setProduct(data)
    }

    fetch()
  } , [])

  return (
    <div>
        <h1>Homescreen</h1>
        <Row>
            {products.map(product =>(
               <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                    <Product product={product}/>
               </Col> 
            ))}
        </Row>
    </div>
  )
}

export default Homescreen