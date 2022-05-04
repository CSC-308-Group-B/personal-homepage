import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { backendURL } from "../App.js";


function SignIn(props) {
    //To login via google, we redirect the user to our sign in endpoint, which redirects to google's login, which eventually brings the user back to our homepage.
    //if the login was successful, the user will have a session cookie (see App.js for how that's handled)
    const googleLogin = () => {
        window.open(`${backendURL}/api/auth/google`, "_self");
    };

    document.title = "Sign In - Personal Homepage";

    return (
        <div className="SignInDiv">
            <div className="SignInLeft">
                <h1 className="Logo">Personal Homepage</h1>
            </div>
            <div className="VerticalDivider"></div>
            <div className="SignInRight">
                <div className="pt-2 pb-2">
                    Create a personalized landing page for your web browser.
                </div>
                <Button className="SignInButton" onClick={googleLogin}>
                    Sign in with Google &#8594;
                </Button>
            </div>
        </div>
    );
}

export default SignIn;
