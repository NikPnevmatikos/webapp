import React from 'react'
import { Link , useParams} from 'react-router-dom'
import { Row, Col, Image, ListGroup, Button, Cards } from 'react-bootstrap'
import products from '../products'

function ProductScreens() {
  const match = useParams()
  const product = products.find((p) => p._id == match.id)
  return (
    <div>{product.name}</div>
  )
}

export default ProductScreens