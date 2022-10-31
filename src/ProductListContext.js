import * as React from 'react'

const ProductListContext = React.createContext({
    query_object : {},
    setQuery : () => {}
});

export default ProductListContext;