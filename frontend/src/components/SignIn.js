import axios from 'axios';
import Card from 'react-bootstrap/Card';
import GoogleLogin from 'react-google-login';

function SignIn(props) {
    async function handleLogin(googleData) {
        const response = await axios.post('http://localhost:5000/auth', {
            token: googleData.tokenId
        });
        console.log(response.data.user);
        props.updateUser(response.data.user);
    }

    return (
        <Card className={ "mx-auto" } style={{ "width":"18rem" }}>
            <Card.Body>
                <Card.Title>Sign In</Card.Title>
                <Card.Text>
                    <GoogleLogin
                        clientId={"8692478207-lqdu5ojcvnco4h0773bgjnmc3emoadud.apps.googleusercontent.com"}
                        buttonText="Log in with Google"
                        onSuccess={handleLogin}
                        onFailure={handleLogin}
                        cookiePolicy={'single_host_origin'}
                    />
                </Card.Text>
            </Card.Body>
        </Card>
    );
}

export default SignIn;