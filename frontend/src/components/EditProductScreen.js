import React, { useState, useEffect } from 'react'
import { Link , useNavigate, useLocation, useParams } from 'react-router-dom'
import { Form, Container, Button, Col, Row } from 'react-bootstrap'
import Spinner from 'react-bootstrap/Spinner';
import { useDispatch, useSelector } from 'react-redux'
import { register } from '../actions/userActions'
import { productsAction, editProductAction } from '../actions/ProductActions';


function EditProductScreen({ }) {


    const navigate = useNavigate()
    const match = useParams()
    
    const productId = match.id

    const [name, setName] = useState('')
    const [price, setPrice] = useState(0)
    //const [image, setImage] = useState('')
    const [brand, setBrand] = useState('')
    const [category, setCategory] = useState('')
    const [countInStock, setCountInStock] = useState(0)
    const [description, setDescription] = useState('')
    //const [uploading, setUploading] = useState(false)

    const dispatch = useDispatch()

    const singleproduct = useSelector(state => state.productReducer)
    const { error, loading, product } = singleproduct

    const productUpdate = useSelector(state => state.editProductReducer)
    const { error: Editerror, loading: Editloading, success: Editsuccess } = productUpdate


    useEffect(() => {

        if (Editsuccess) {
            dispatch({ type: 'EDIT_PRODUCT_RESET' })
            navigate('/login/')
        } else {
            if (!product.name || product._id !== Number(productId)) {
                dispatch(productsAction(productId))
            } else {
                setName(product.name)
                setPrice(product.price)
                // setImage(product.image)
                setBrand(product.brand)
                setCategory(product.category)
                setCountInStock(product.countInStock)
                setDescription(product.description)

            }
        }
    }, [dispatch, product, productId, navigate, Editsuccess])

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(editProductAction({
            _id: productId,
            name,
            price,
            //image,
            brand,
            category,
            countInStock,
            description
        }))
    }

    const uploadFileHandler = async (e) => {
        // const file = e.target.files[0]
        // const formData = new FormData()

        // formData.append('image', file)
        // formData.append('product_id', productId)

        // setUploading(true)

        // try {
        //     const config = {
        //         headers: {
        //             'Content-Type': 'multipart/form-data'
        //         }
        //     }

        //     const { data } = await axios.post('/api/products/upload/', formData, config)


        //     setImage(data)
        //     setUploading(false)

        // } catch (error) {
        //     setUploading(false)
        // }
    }

    return (
        <Row className = "justify-content-md-center">
            <Col xs={12} md={6}>
                <h1>Edit Your Little Product</h1>

                {Editerror && 
                    <div className="alert alert-dismissible alert-danger">
                    <strong>{Editerror}</strong>
                    </div>
                }
                
                {Editloading &&
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
                            <strong>{error}</strong>
                        </div>
                        
                        :(
                            <Form onSubmit={submitHandler}>
                                <Form.Group controlId='name' className='py-1'>
                                    <Form.Label>Name</Form.Label>
                                    <Form.Control 
                                        required
                                        type='name'
                                        placeholder = 'Enter Name' 
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
                                        placeholder = 'Enter Category'
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
                                        placeholder = 'Enter Price'
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
                                        placeholder='Write a Description' 
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
                                        placeholder = 'Enter Count '
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
                                            Discard
                                        </Button>
                                </Link>
            
                            </Form>
                    
                        
                        
                        )
                }
            </Col>
        </Row>    
    // </Container>
        

    )
}

export default EditProductScreen



























































// import React, { useState, useEffect } from 'react'
// import { Link , useNavigate, useLocation, useParams } from 'react-router-dom'
// import { Form, Container, Button, Col, Row } from 'react-bootstrap'
// import Spinner from 'react-bootstrap/Spinner';
// import { useDispatch, useSelector } from 'react-redux'
// import { register } from '../actions/userActions'
// import { productsAction, editProductAction } from '../actions/ProductActions';

// function EditProductScreen() {

//     const match = useParams()
//     const location = useLocation()  
//     const navigate = useNavigate()
//     const redirect = location.search ? location.search.split('=')[1] : '/'

//     const productId = match.id
    
//     const [name, setName] = useState('')
//     const [brand, setBrand] = useState('')
//     const [category, setCategory] = useState('')    
//     const [description, setDescription] = useState('')   
//     const [price, setPrice] = useState(0)   
//     const [countInStock, setCountInStock] = useState(0)

//     const dispatch = useDispatch()

//     const singleProduct = useSelector(state => state.productReducer)
//     const {error, loading, product} = singleProduct

//     // const editProduct = useSelector(state => state.editProductReducer)
//     // const {error, loading, success, product} = editProduct

//     const userLogin = useSelector(state => state.userLoginReducer)
//     const {userInfo} = userLogin

//     useEffect(() =>{
//         //dispatch({type:'EDIT_PRODUCT_RESET'})
//         if (userInfo == null) {
//             navigate('/login/')
//         }
//         else {
//             if (product.name == null || product._id !== productId) {
//                 dispatch(productsAction(productId))
//             }
//             else {
//                 setName(product.name)
//                 setBrand(product.brand)
//                 setCategory(product.category)
//                 setPrice(product.price)
//                 setDescription(product.description)
//                 setCountInStock(product.countInStock)
//             }
//             // if (success == true) {
//             //     navigate('/myProducts')
//             // }
//         }
//     }, [dispatch, userInfo, navigate, product, productId])


//     const submitHandler = (e) => {
//         e.preventDefault()
//         //dispatch(editProductAction(productId, name, brand, category, price, description, countInStock))
//     }

//     return (
//     <Container>
//         <Row className = "justify-content-md-center">
//             <Col xs={12} md={6}>
//                 <h1>Edit Your Little Product</h1>

//                 {error && 
//                     <div className="alert alert-dismissible alert-danger">
//                     <strong>{error}</strong>
//                     </div>
//                 }
                
//                 {loading &&
//                     <Spinner 
//                     animation="border" role="status" style={{ margin: 'auto',
//                                                                 display: 'block'
//                                                             }}>
//                         <span className="visually-hidden">Loading</span>
//                     </Spinner>
//                 }
                
//                 <Form onSubmit={submitHandler}>
//                     <Form.Group controlId='name' className='py-1'>
//                         <Form.Label>Name</Form.Label>
//                         <Form.Control 
//                             required
//                             type='name'
//                             placeholder = 'Enter Name' 
//                             value={name}
//                             onChange = {(e) => setName(e.target.value)}                            
//                         >        
//                         </Form.Control>
//                     </Form.Group> 
                    
//                     <Form.Group controlId='brand' className='py-1'>
//                         <Form.Label>Brand</Form.Label>
//                         <Form.Control 
//                             required
//                             type='brand' 
//                             placeholder='Enter Brand'
//                             value={brand}
//                             onChange = {(e) => setBrand(e.target.value)}                            
//                         >        
//                         </Form.Control>
//                     </Form.Group> 

//                     <Form.Group controlId='category' className='py-1'>
//                         <Form.Label>Category</Form.Label>
//                         <Form.Control 
//                             required
//                             type='Category' 
//                             placeholder = 'Enter Category'
//                             value={category}
//                             onChange = {(e) => setCategory(e.target.value)}                            
//                         >        
//                         </Form.Control>
//                     </Form.Group> 
                    
//                     <Form.Group controlId='price' className='py-1'>
//                         <Form.Label>Price</Form.Label>
//                         <Form.Control 
//                             required
//                             type='number' 
//                             placeholder = 'Enter Price'
//                             value={price}
//                             onChange = {(e) => setPrice(e.target.value)}                            
//                         >
//                         </Form.Control>
//                     </Form.Group> 

//                     <Form.Group controlId='description' className='py-1'>
//                         <Form.Label>Description</Form.Label>
//                         <Form.Control 
//                             required
//                             type='text'
//                             placeholder='Write a Description' 
//                             value={description}
//                             onChange = {(e) => setDescription(e.target.value)}                            
//                         >
//                         </Form.Control>
//                     </Form.Group> 

//                     <Form.Group controlId='countInStock' className='py-1'>
//                         <Form.Label>Count In Stock</Form.Label>
//                         <Form.Control 
//                             required
//                             type='number' 
//                             placeholder = 'Enter Count '
//                             value={countInStock}
//                             onChange = {(e) => setCountInStock(e.target.value)}                            
//                         >
//                         </Form.Control>
//                     </Form.Group> 

//                     <Button type='submit' className="btn btn-dark btn-lg float-right" style={{float: 'right'}}>
//                         Save Changes
//                     </Button>

//                     <Link to='/myProducts'>
//                             <Button type="button" className="btn btn-dark btn-lg">
//                                 Discard
//                             </Button>
//                     </Link>

//                 </Form>
//             </Col>
//         </Row>
//     </Container>
//   )
// }

// export default EditProductScreen