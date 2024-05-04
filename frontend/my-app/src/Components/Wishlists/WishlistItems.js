import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { startGetWishlists } from '../Actions/wishlist'
import { Card } from 'react-bootstrap'
import'../../index.css'
const WishlistItems = () => {
  const dispatch = useDispatch()
  const wishlistItems = useSelector(state => state.wishlist.data)
  console.log(wishlistItems)

  useEffect(() => {
    dispatch(startGetWishlists())
  }, [dispatch])

  return (
    <div style={{ paddingTop: '200px', paddingBottom: '100px' }}>      
      <div className="row" style={{ paddingTop: '200px' }}>
        {wishlistItems.map((item, index) => (
          <div key={index} className="col-md-4 mb-4">
            <Card style={{ marginTop: '220px', marginBottom: '230px' }}>
              <Card.Img variant="top" src={`http://localhost:3009/${item.images}`}style={{ height: '500px' }} />
              <Card.Body>
                <Card.Title>{item.caption}</Card.Title>
                <Card.Text>
                  Price: {item.price}
                </Card.Text>
              </Card.Body>
            </Card>
          </div>
        ))}
      </div>
    </div>
  )
}

export default WishlistItems
