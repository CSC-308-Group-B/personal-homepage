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
        <div className="SignInTile" style={{ "width": "25rem" }}>
            <h1 className="d-inline-block">Welcome to&nbsp;</h1>
            <h1 className="d-inline-block cool">&nbsp;Tiles&nbsp;</h1>
            <Button className="cool" onClick={googleLogin}>Sign in to Google</Button>
        </div>
    );
}

export default SignIn;