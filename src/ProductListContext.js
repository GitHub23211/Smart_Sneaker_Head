import * as React from 'react'

const ProductListContext = React.createContext({
    query_params : "",
    setQuery : () => {}
});

export default ProductListContext;