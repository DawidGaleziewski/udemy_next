import {useRouter} from 'next/router'


const SelectedClientProjectPage = () => {
    const router = useRouter();

    return <div>
        <h1>The project page for a specific project <strong>{router.query.id}</strong> for a selected client <strong>{router.query.clientprojectid}</strong></h1>
    </div>
}

export default SelectedClientProjectPage;