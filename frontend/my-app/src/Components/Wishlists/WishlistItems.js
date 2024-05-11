import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { startGetWishlists } from '../Actions/wishlist'
import { Card } from 'react-bootstrap'
import'../../index.css'
const WishlistItems = () => {
  const dispatch = useDispatch()
  const wishlistItems = useSelector(state => state.wishlist.data)
  const [priceRange, setPriceRange] = useState([0, 10000])

  console.log(wishlistItems)

  useEffect(() => {
    dispatch(startGetWishlists())
  }, [dispatch])

  const filteredJewels = wishlistItems.filter((jewel) => {
    return jewel.price >= priceRange[0]
})
  return (
    <div style={{ paddingTop: '80px', paddingBottom: '100px' }}> 
          <div style={{ display: 'flex', justifyContent: 'left', marginBottom: '20px' }}>
                <input
                    type="range"
                    min="0"
                    max="10000000"
                    value={priceRange[0]}
                    onChange={(e) => setPriceRange([parseInt(e.target.value), priceRange[1]])}
                    style={{ backgroundColor: 'maroon', width: '300px', marginRight: '10px' }}

                /><br/>
    <div style={{ fontSize: '14px', color: 'maroon', justifyContent: 'left' }}>
        Price Range:RS:{priceRange[0]}
    </div>
            </div>     
      <div className="row" style={{ paddingTop: '200px' }}>
        {filteredJewels.map((item, index) => (
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

