import React, { useState } from 'react';
import { useAuth } from '../../Context/AuthrorizeContext';
import { Container, Row, Col, Carousel, CarouselItem, CarouselControl, CarouselIndicators, CarouselCaption } from 'reactstrap';
import { Link } from 'react-router-dom';
import '../../../src/index.css'
import img1 from '../../Components/images-home/img.jpg';
import img2 from '../../Components/images-home/img2.jpg';
import img3 from '../../Components/images-home/img3.jpg';
import img4 from '../../Components/images-home/img4.jpg';
import img5 from '../../Components/images-home/img5.png'
const items = [
  {
    src: img5,
    altText: 'Image 1',
   
  },
  {
    src: img2,
    altText: 'Image 2',
  },
  {
    src: img3,
    altText: 'Image 3',
  },
  {
    src: img4,
    altText: 'Image 4',
  }
];

const Home = () => {
  const { user } = useAuth();
  const [activeIndex, setActiveIndex] = useState(0);
  const [animating, setAnimating] = useState(false);

  const next = () => {
    if (animating) return;
    const nextIndex = activeIndex === items.length - 1 ? 0 : activeIndex + 1;
    setActiveIndex(nextIndex);
  };

  const previous = () => {
    if (animating) return;
    const nextIndex = activeIndex === 0 ? items.length - 1 : activeIndex - 1;
    setActiveIndex(nextIndex);
  };

  const goToIndex = (newIndex) => {
    if (animating) return;
    setActiveIndex(newIndex);
  };

  const slides = items.map((item) => {
    return (
      <CarouselItem
        className="custom-carousel-item"
        onExiting={() => setAnimating(true)}
        onExited={() => setAnimating(false)}
        key={item.src}
      >
        <img src={item.src} alt={item.altText} className="carousel-image" />
        <CarouselCaption captionText={item.caption} />
      </CarouselItem>
    );
  });

  return (
    <div>
      <div style={{ backgroundColor: '#ffb6c1', color: '#fff', padding: '20px 0', textAlign: 'right' ,minHeight: '20vh' }}>
        <Link style={{ color: '#fff', marginRight: '50px', fontSize: '18px' }} to="/signup">Register</Link>
        <Link style={{ color: '#fff', marginRight: '50px', fontSize: '18px' }} to="/login">Login</Link>
      </div>

      <Container fluid>
        <Row className="mt-4">
          <Col>
            {!user ? (
              <p></p>
            ) : (
              <p>Welcome, {user.username}</p>
            )}
          </Col>
        </Row>

        <Row className="mt-4">
          <Col>
            <Carousel
              activeIndex={activeIndex}
              next={next}
              previous={previous}
              className="custom-carousel"
            >
              <CarouselIndicators items={items} activeIndex={activeIndex} onClickHandler={goToIndex} />
              {slides}
              <CarouselControl direction="prev" directionText="Previous" onClickHandler={previous} />
              <CarouselControl direction="next" directionText="Next" onClickHandler={next} />
            </Carousel>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Home;
