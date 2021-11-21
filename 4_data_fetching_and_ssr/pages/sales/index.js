import { useState, useEffect} from 'react';
import useSWR from 'swr';

const SalesPage = (props) => {
    // We can initially set the sales that we got from the ssr hook. After that we can fetch them on the client side
    const [sales, setSales] = useState(props.sales);

    const {data, error} = useSWR('https://next-test-c6e46-default-rtdb.firebaseio.com/sales.json', (url) => fetch(url).then(res => res.json()));

    useEffect(()=> {

        const salesData = data ? Object.keys(data).map(key => ({id: key, ...data[key]})) : null

        setSales(salesData)

    },[data])



    // We can also set up a useSWR fetcher function


    // this will be pre-rendered as the fetch action will happen on the client
    if(!sales) return <div>NO DATA YET</div>

    return <ul>
        {sales.map(sale => {
            return <li key={sale.id}>
                {sale.username}
            </li>
        })}
    </ul>
}

export default SalesPage;


export const getStaticProps = async() => {
   return fetch('https://next-test-c6e46-default-rtdb.firebaseio.com/sales.json').then(response => {
        return response.json()
    }).then(data => {
        const transformedData = Object.keys(data).map(key => ({id: key, ...data[key]}));

        return {props: {sales: transformedData}, revalidate: 10}
    }).catch( e => {
        return {props: {sales: []}}
    })
}