import Link from 'next/link';

const clients = [{
    id: 1,
    name: "Max"
},  {
    id: 2,
    name: "Dave"
}]

const ClientsPage = () => {
    return <div>
        <h1>Clients page</h1>
        
        <h2>Our clients</h2>
        <ul>
            {clients.map(client => {
                return <Link href={{
                    pathname: '/clients/[id]',
                    query: {id: client.id}
                }} key={client.id}>{client.name}</Link>
            })}
        </ul>
    </div>

}

export default ClientsPage;