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
            revalidate: 10 // this is 10 seconds to re-generate the site
        }
    }
```

for development server, page will be re-generated on each request.