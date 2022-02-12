import axios from 'axios';
import Card from 'react-bootstrap/Card';
import GoogleLogin from 'react-google-login';
import Button from 'react-bootstrap/Button';

function SignIn(props) {
    const googleLogin = () => {
        window.open("http://localhost:5000/api/auth/google", "_self");
    }

    return (
        <Card className={ "mx-auto" } style={{ "width":"18rem" }}>
            <Card.Body>
                <Card.Title>Sign In</Card.Title>
                <Card.Text>
                    <Button onClick={googleLogin}>Sign in to Google</Button>
                </Card.Text>
            </Card.Body>
        </Card>
    );
}

export default SignIn;