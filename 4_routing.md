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