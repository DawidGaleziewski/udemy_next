# Client-side data fetching

Some deta does not need to be pre-rendered:
- high frequency changing data (i.e stock)
- user specific data (i.e shop cart order)
- partial data (i.e dashboard)


we can fetch data just like in any other react app:

```js
    useEffect( () => {
        setIsloading(true);
        fetch('https://next-test-c6e46-default-rtdb.firebaseio.com/sales.json').then(response => {
            return response.json()
        }).then(data => {
            console.log(data)
            setSales(Object.keys(data).map(key => ({id: key, ...data[key]})));
            setIsloading(false)
        })
    }, [])

```

## useSWR

useSWR(<request-url>, (url) => fetch(url).then(res => res.json()))

SWR is a react hook developed by next.js team.
It uses fetch api but has some nice features like re-bounde, caching, re-tries on a error

```js
    const {data, error} = useSWR('https://next-test-c6e46-default-rtdb.firebaseio.com/sales.json', (url) => fetch(url).then(res => res.json()));

    // We can also set up a useSWR fetcher function
    const sales = data ? Object.keys(data).map(key => ({id: key, ...data[key]})) : null
```

## combine server side fatching with client side fetching

We can first fetch data on ssr

```js
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

```

After that we can use this data as a initial state

```js
    const [sales, setSales] = useState(props.sales);
```

And it can be updated with useSWR hook

```js
    const {data, error} = useSWR('https://next-test-c6e46-default-rtdb.firebaseio.com/sales.json', (url) => fetch(url).then(res => res.json()));

    useEffect(()=> {

        const salesData = data ? Object.keys(data).map(key => ({id: key, ...data[key]})) : null

        setSales(salesData)

    },[data])


```

Thanks to this useSWR will try to hydrate the site i.e while user focuses on it. Also user has the data from the start and it is SEO friendly