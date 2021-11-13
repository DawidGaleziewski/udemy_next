import {useRouter} from 'next/router'

const PortfolioProjctDetail = () => {

    const router = useRouter();

    return <div>
        <h1>The Porfolio Project Page {router.query.id}</h1>
    </div>
}

export default PortfolioProjctDetail