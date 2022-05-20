import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";

function SignIn(props) {
    //To login via google, we redirect the user to our sign in endpoint, which redirects to google's login, which eventually brings the user back to our homepage.
    //if the login was successful, the user will have a session cookie (see App.js for how that's handled)
    const googleLogin = () => {
        window.open(`${process.env.REACT_APP_BE_URL}/api/auth/google`, "_self");
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
                <img
                    className="SignInButton"
                    onClick={googleLogin}
                    alt="Sign in with Google"
                    src={require("../styling/img/btn_google_signin_light_normal_web@2x.png")}
                />
            </div>
        </div>
    );
}

export default SignIn;
