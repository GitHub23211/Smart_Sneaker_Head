import React , {useContext , useState} from "react";
import '../Styles/homepageproduct.css';
import ProductContext from '../ProductContext';
import { Navigate } from "react-router-dom";
import Carousel from 'react-bootstrap/Carousel';

const HomePageProduct = ({data:{name, price, seller,description,quantity, picture}}) => {
    const {setProduct} = useContext(ProductContext);
    const [productNavgn, setProductNavgn] = useState(false);

    const handleView = (event) => {
        event.preventDefault()
        console.log("handleview")
        setProduct({
            name: name,
            price: price,
            description: description, 
            quantity: quantity,
            seller: seller,
            picture: picture
        });
        setProductNavgn(true);
    }

    if(productNavgn === true){
       return(
             <Navigate to = "/product"></Navigate>
       )
    }else{
        return(
            <section className="card-container">
                <section className="image-container">
                   <img  className="product-img"  src={`/product/image/${picture}`} alt='unable to find' />
                </section> 
                <section className="card-title">
                 <h3>{name}</h3>
                </section>
                <section className="card-button">
                <Carousel.Caption>
                    <button onClick = {handleView}>View Product</button>
                </Carousel.Caption>
                </section>
            </section>
        )
    }

}
export default HomePageProduct;