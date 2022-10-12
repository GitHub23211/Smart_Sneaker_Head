import Carousel from 'react-bootstrap/Carousel';

function UncontrolledExample() {
  return (
    <Carousel fade>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src="https://www.91-img.com/gallery_images_uploads/3/d/3df5ca6a9b470f715b085991144a5b76e70da975.JPG?tr=h-550,w-0,c-at_max"
          alt="First slide"
        />
        <Carousel.Caption>
          <h3>First slide label</h3>
          <button onclick="log()">View Product</button>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src="https://www.91-img.com/gallery_images_uploads/3/d/3df5ca6a9b470f715b085991144a5b76e70da975.JPG?tr=h-550,w-0,c-at_max"
          alt="Second slide"
        />

        <Carousel.Caption>
          <h3>Second slide label</h3>
          <button onclick="log()">View Product</button>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src="https://www.91-img.com/gallery_images_uploads/3/d/3df5ca6a9b470f715b085991144a5b76e70da975.JPG?tr=h-550,w-0,c-at_max"
          alt="Third slide"
        />

        <Carousel.Caption>
          <h3>Third slide label</h3>
          <button onclick="log()">View Product</button>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
}



export default UncontrolledExample;