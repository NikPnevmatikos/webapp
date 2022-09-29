import React, { useState, useEffect } from 'react'
import {Card} from 'react-bootstrap'
import {Link} from 'react-router-dom'
import "../image_style.css"


function Product({product}) {

    const [currentDate, setCurrent] = useState('')

    useEffect(() => {

        let mydate = new Date()
        let month = mydate.getMonth()+1 <10 ? `0${mydate.getMonth()+1}`:`${mydate.getMonth()+1}`
        let day = mydate.getDate() <10 ? `0${mydate.getDate()}`:`${mydate.getDate()}`
        let hours = mydate.getHours() <10 ? `0${mydate.getHours()}`:`${mydate.getHours()}`
        let minutes = mydate.getMinutes() <10 ? `0${mydate.getMinutes()}`:`${mydate.getMinutes()}`
        let seconds = mydate.getSeconds() <10 ? `0${mydate.getSeconds()}`:`${mydate.getSeconds()}`
        
        setCurrent(`${mydate.getFullYear()}-${month}-${day} ${hours}:${minutes}:${seconds}`)
    
      } , [])


    return (
        <Card className="my-3 p-3 rounded">
            <Link style={{color:'black'}} to={`/product/${product._id}`}>
                <Card.Img className="img-responsive image-resize" src={product.image}/>
            </Link>
            <Card.Body>
                <Link style={{color:'black'}} to={`/product/${product._id}`}>
                    <Card.Title as="div">
                        <strong>
                            {product.name.length > 31 ? 
                                (product.name).substring(0, 28) + '...'
                                :
                                (product.name)
                            }
                        </strong>
                    </Card.Title>
                </Link>
                    <Card.Text as="h3">
                        {product.currently}$
                    </Card.Text>

                    <Card.Text className='secondary'>
                        {product.number_of_bids} bids
                    </Card.Text>

                    <Card.Text className='secondary'>
                        {product.ended <= currentDate || product.payed === true 
                            ? 'expired'

                            : product.started < currentDate 
                                ? `Ending at ${product.ended}`

                                : `Starting at ${product.started}`
                        }
                    </Card.Text>
            </Card.Body>
        </Card>
    )
}

export default Product