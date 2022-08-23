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
                    {product.price}$
                </Card.Text>
        </Card.Body>
    </Card>
  )
}

export default Product