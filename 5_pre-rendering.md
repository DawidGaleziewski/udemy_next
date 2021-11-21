next.js exposes two ways of Pre-rendering:


# static generation 
all are pregenerated in advance, before deployment.

all html code and all the data is generated in advance during build time

Thanks to the fact they are prepered ahead, they can be cached by the server/CDN serving the app.

Those pages, after getting created will be still hydrated by react. Still regular react app.

## getStaticProps
we use a specific function. This can be done ONLY from the components that are located in the /pages dir.

The name DOES matter. next.js will look for this function.

Inside this function we run server side code. We also do not have access to all APIs that are client (like window obj).
Also code here will NOT be included in the client bundle.

We can also use code that has things like credentials

```js
export async function getStaticProps(context){
    // will return promise
    // will run server side code
    // will NOT be send to client
    // will NOT have access to window API
}
```
It also confirms to next.js that this page should be pre-rendered. This behavoiur is also done by default.


getStaticProps needs also to return a object with a props key.
This function will prepare the props for the component, before it ever is rendered

```js
export const getStaticProps = async (context) => {
    console.log('honk, I will not be visible on client');

    // This prepares props for the component
    return {props: {}}
}
```

inside getStaticProps, we have access to all server side node libraries. We can operate therefore on file system in order to get our data from json:

```js
export const getStaticProps = async (context) => {
    console.log('honk, I will not be visible on client');

    // We have access to node utils here like process.cwd or path module.
    // process.cwd() path to the project folder, data - folder, db-1.json - name of the file
    const filePath = path.join(process.cwd(), 'data', 'db-1.json')
    const jsonData = await fs.readFile(filePath);
    const data = JSON.parse(jsonData)

    // This prepares props for the component
    return {props: {
        products: data.products
    }}
}
```
## npm run build

creating a optimized build of the server. prerendering the pages.
Production build will be put inside .next directory.
It will alsso how many pages are regarded as static or SSG (uses getStaticProps).

Pages generated will have ampty dot or filled dot. Empty dot is a symbol that the page was not pre-rerendered with data (not using getStaticProps).

data for hydration will be put inside script tag with __NEXT__DATA id

## npm run start

will start pregenarated site with a node.js server.
This would be done usually on remote server



# server-side rendering (ISR - Incremental Static Generation)

Used when data will frequently change.
If we add new product, we need to rebuild and re-deploy.

Site will be updated after build and re-deploying.
We can tell next.js that it should be re-generated on every request at most every X seconds.

I.E if 30 seconds passed since last request, user will get a statically generated page. This page may be out of date but it will be hydrated on the client side (i.e via useEffect hook).

But if uses request site in 61 second, next will re-generate the site once more.

Therefore we eaithe serve old page or generate a new one.

We do this by adding "revalidate" value on our return object in getStaticProps with number of seconds

```js
    return {
            props: {
                products: data.products
            },
            revalidate: 10, // this is 10 seconds to re-generate
            notFound: true, // will return 404 and not normal page. We can use it if i.e some data is lacking
            redirect: {
                destination:'https://google.pl'
            },

        }
    }
```

for development server, page will be re-generated on each request.

# understanding getStaticPaths for dynamic pages

we will get this error when setting up our dynamic page with fetch

"Error: getStaticPaths is required for dynamic SSG pages and is missing for '/[pid]'.
Read more: https://nextjs.org/docs/messages/invalid-getstaticpaths-value"

If we have a dynamic page (one with a name in a bracket like [id].js). Default behaviour is NOT to pre generate the page. This is due to the fact that next.js has no way of knowing how many kinds of page we will need and with what data.

We can tell however next.js, which paths should be pre-generated. I.e ids with ids 1,2,24,500 etc.

We declare it just like getStaticProps

```js
export const getStaticPaths = async () => {
    
}
```

We can define what pages and with which data should be pre-generated

```js
export const getStaticPaths = async () => {
    // tell next.js which instances of this page  should be pre-generated
    // we need to set fallback. Will throw error without it
    
    // Those p1-p3 pages will be pregeneartaed as ISR

    // Also, if we go to a parent site, where we have links to those pages, json files with p1.json p2.json etc will be send to the client for optimisation
    return {
        paths: [
                {params: {id: 'p1'}}, // More params could be defined if theis is nested folder we can define more dynamic params i.e /:offer/:location etc could be defined here as well
                 {params: {id: 'p2'}},
                 {params: {id: 'p3'}}
        ],
        fallback: false
    }
}

```


# understanding fallback

In some cases we do not want to pre-genearte pages. As those may be less visited pages we want to generate them just when there is a need for them. For such cases we use fallback: true.

We need to also remember that when using fallback: true, data will not be accessible instantly and we need to make a guard case for such case

```js
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
```

This is similar to useEffect way of fetching data.

we can also set fallback: 'blocking', this will make ssr wait for page to be generated

# fallbacks
by setting fallback to true. We tell next.js that even if we do not have any pre-rendered pages we may still want to render some page


# understanding getServerSideProps for ssr

code that is re-executed after each incoming request.
We should use eaither getStaticProps or getServerSideProps.

getServerSideProps can only be used on page components and just like other methods of this kind, it needs to be exported with this exact name as async function

## getServerSideProps context

we get access to full request object/response object.  Therefore we could even manipulate headers here.

Those will behave very similar to standard express req res on router paths

```js
const {params, req, res} = context;
```

## dynamic pages with getServerSideProps

we cannot use getStaticPath with getServerSideProps.
As it runs on the server only, and does not pre-generate any data, we simply do not need it and it would not make sense.

Therefore we just use getServerSideProps


## getServerSideProps during build

it will not pre-generate anything for those pages. This is marked as a lambda symbol in console.