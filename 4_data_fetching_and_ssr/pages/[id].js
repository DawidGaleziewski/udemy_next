import fs from 'fs/promises';
import path from 'path';

const ProductDetail = (props) => {
    const {productDetailData} = props;

    // When using fallback we need to be prepared for the fact that the data may not be available here
    if(!productDetailData){
        return <p>Loading....</p>
    }

    return (
    <div>
        <h1>{productDetailData.title}</h1>
        <p>{productDetailData.description}</p>
    </div>
    )
}
const getData = async () => {
    
    const filePath = path.join(process.cwd(), 'data', 'db-1.json')
    const jsonData = await fs.readFile(filePath);
    const data = JSON.parse(jsonData);

    return data
}


export const getStaticPaths = async () => {
    const data = await getData();

    const ids = data.products.map(product => product.id);
    const params = ids.map(id => ({params: {id}}))

    return {
        paths: [
            ... params
        ],
        // fallback: 'blocking'; // will wait for page to be rendered
        fallback: true // pospone not defined pages to be generated just in time. 
    }
}


export const getStaticProps = async (context) => {
    // we can get params like id of the product on our context
    const {params} = context;
    const productId = params.id;

    const data = await getData();

    const productDetailData  = data.products.find(({id})=> id === productId);

    if(!productDetailData){
        return {notFound: true}
    }

    return {
        props: {
            productDetailData: productDetailData
        }
    }

}

export default ProductDetail;