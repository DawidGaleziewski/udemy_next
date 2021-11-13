import Link from 'next/link'
import {useRouter} from 'next/router'

const HomePage = () => {

    const router = useRouter();

    const redirectHandler = () => {
        router.push('/clients/max/projects')
    }

    return <div>hello from route
        <ul>
            <li> 
                <Link href="/portfolio">Portfolio</Link>
            </li>
            <li><Link href="/clients">Clients</Link></li>
            <li><button onClick={redirectHandler}>Programatic redirect</button></li>
        </ul>
    </div>
}

// component exported as default will be rendered as a page by next.js
export default HomePage
