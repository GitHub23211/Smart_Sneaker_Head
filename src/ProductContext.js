import * as React from 'react'

const ProductContext = React.createContext({
    product: {}, 
    setProduct: () => {}
});

export default ProductContext;