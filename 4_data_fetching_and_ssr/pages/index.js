// This is node.js package. Next.js also will strip this from client side bundle. Code will be split for server and client
import fs from 'fs/promises';
import path from 'path';
import Link from 'next/link';

const HomePage = (props) => {


    return <div>hello from route
        <ul>
            {props.products.map(product => {
            console.log('###',product)
            return <li key={product.id}>
                <Link href={`/${product.id}`}>{product.title}</Link>
            </li>})}
        </ul>
    </div>
}

// Next.js will always execute this function first. Before executing the component.
// It WONT be shipped to client side
export const getStaticProps = async (context) => {
    console.log('honk, I will not be visible on client');

    // We have access to node utils here like process.cwd or path module.
    // process.cwd() path to the project folder, data - folder, db-1.json - name of the file
    const filePath = path.join(process.cwd(), 'data', 'db-1.json')
    const jsonData = await fs.readFile(filePath);
    const data = JSON.parse(jsonData)


    // This prepares props for the component
    return {
            props: {
                    products: data.products
            },
            revalidate: 10 // this is 10 seconds to re-generate the site
        }
    }

// component exported as default will be rendered as a page by next.js
export default HomePage
