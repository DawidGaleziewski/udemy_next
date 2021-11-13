next.js uses file based routing

traditional routing uses react router. Next js does not work this way. We do not install or configure react router.

next js will infer the routes from the folder structure

we use pages folder for that. Next js will automatically look into this folder and infer our route structure.

folder name is taken as a path, expect index.js. this will be assumed as root for the folder

/pages
    index.js -> infer this is main starting page for /
    about.js -> infer this is /about page. we could also create about folder with index.js inside of it

    /products
        index.js -> /products (products from folder name and / for index as it is the root)
        [id].js -> products detail page. /products/1. [] is used for dynamic routes


## dynamic routing
This is done by naming files with [variable] name.
next will proritize static files in the folder. Therefore if we have
[id].js nad list.js in the folder. when using /list url, the latter will be used

## nesting dynamic routes

We can use this syntax to nest dynamic routes inside folders i.e

http://localhost:3000/clients/:username/:projectid

clients/
        [id]/
            [clientprojectid].js
            

## catch all routes

we can use destructure syntax, this will catch all routers in this dir and in query, under the array name it will return all params:

blog/
    [...slug].js

for /blog/test1/test2 will return in query param ['test1', 'test2']

## Linking

done by Link from next/link. Works same as react dom router


## alternative way of building a slug

```js
            {clients.map(client => {
                return <Link href={{
                    pathname: '/clients/[id]', // same as in file structure
                    query: {id: client.id} // will be inserted into id
                }} key={client.id}>{client.name}</Link>
            })}
```
