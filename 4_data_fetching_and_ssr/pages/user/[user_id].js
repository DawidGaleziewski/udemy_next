const UserDetailPage = (props) => {


    return <div>{props.id}</div>
}

export default UserDetailPage;

export const getServerSideProps = async (context) => {
    const {params} = context;

    const userID = params.user_id;

    console.log('Server side code')

    return {
        props: {
            id: `userid-##-${userID}`
        }
    }
}
