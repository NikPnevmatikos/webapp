import React from 'react'
import {Card} from 'react-bootstrap'
import {Link} from 'react-router-dom'

function Product({product}) {
  return (
    <Card className="my-3 p-3 rounded">
        <Link style={{color:'black'}} to={`/product/${product._id}`}>
            <Card.Img src={product.image}/>
        </Link>
        <Card.Body>
            <Link style={{color:'black'}} to={`/product/${product._id}`}>
                <Card.Title as="div">
                    <strong>{product.name}</strong>
                </Card.Title>
            </Link>
                <Card.Text as="h3">
                    {product.currently}$
                </Card.Text>

                <Card.Text className='secondary'>
                    {product.number_of_bids} bids
                </Card.Text>

                <Card.Text className='secondary'>
                   Ending in {product.ended}
                </Card.Text>
        </Card.Body>
    </Card>
  )
}

export default Product