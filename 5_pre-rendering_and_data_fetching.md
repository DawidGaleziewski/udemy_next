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

# server-side rendering 
created just in time