import fs from 'fs/promises';
import path from 'path';

const ProductDetail = (props) => {
    const {productDetailData} = props;

    return (
    <div>
        <h1>{productDetailData.title}</h1>
        <p>{productDetailData.description}</p>
    </div>
    )
}

export const getStaticPaths = async () => {
    // tell next.js which instances of this page  should be pre-generated
    // we need to set fallback. Will throw error without it
    
    return {
        paths: [
                {params: {id: 'p1'}},
                 {params: {id: 'p2'}},
                 {params: {id: 'p3'}}
        ],
        fallback: false
    }
}

export const getStaticProps = async (context) => {
    // we can get params like id of the product on our context
    const {params} = context;
    const productId = params.id;

    const filePath = path.join(process.cwd(), 'data', 'db-1.json')
    const jsonData = await fs.readFile(filePath);
    const data = JSON.parse(jsonData);

    const productDetailData = data.products.find(({id})=> id === productId)


    return {
        props: {
            productDetailData: productDetailData
        }
    }

}

export default ProductDetail;