const UserProfilePage = (props) => {


    return <h1>{props.username}</h1>
}

export default UserProfilePage;



export const getServerSideProps = async (context) => {
    /**
     * We cannot pre-render this page, we need to know for what user it is beeing rendered
     
    The structure is identical to getStaticProps. We cannot set revalidate however. As it will generate page for each request

    Important thing to remember is that this function executes ONLY on the server, and only AFTER deployment. It will NOT get statically pre-generated
     *  */ 

    const {params, req, res} = context;

    return {
        props: {
            username: "Dawid"
        }
    }
}