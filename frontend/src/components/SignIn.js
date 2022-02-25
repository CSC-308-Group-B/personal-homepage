import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

function SignIn(props) {
    //To login via google, we redirect the user to our sign in endpoint, which redirects to google's login, which eventually brings the user back to our homepage.
    //if the login was successful, the user will have a session cookie (see App.js for how that's handled)
    const googleLogin = () => {
        window.open("http://localhost:5001/api/auth/google", "_self");
    }

    document.title = "Sign In - Personal Homepage";

    return (
        <Card className={ "mx-auto" } style={{ "width":"18rem" }}>
            <Card.Body>
                <Card.Title>Sign In</Card.Title>
                <Button onClick={googleLogin}>Sign in to Google</Button>
            </Card.Body>
        </Card>
    );
}

export default SignIn;