function SignIn(props) {
    //To login via google, we redirect the user to our sign in endpoint, which redirects to google's login, which eventually brings the user back to our homepage.
    //if the login was successful, the user will have a session cookie (see App.js for how that's handled)
    const googleLogin = () => {
        window.open(`${process.env.REACT_APP_BE_URL}/api/auth/google`, "_self");
    };

    document.title = "Sign In - Personal Homepage";

    return (
        <div className="SignInPage">
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
            <div className="SignInTitle">About Personal Homepage</div>
            <div className="SignInDesc">
                Personal Homepage is a place to put all your frequented
                information, including bookmarks, notes, to-do lists, and even
                random cat gifs. Think of it as a website builder, where the
                target audience is <b>you</b>.
            </div>
            <div className="SignInDesc">
                Your page is modular; every piece of information is stored in a{" "}
                <b>tile</b>. You can add note tiles, twitch embed tiles, and so
                much more.
            </div>
            <div className="SignInDesc">
                In <b>edit mode</b> you can place tiles anywhere on the page,
                snapping to grid at your leisure. You can even resize tiles and
                customize their background color.
            </div>
            <div className="SignInDesc">
                You can even set any image as your background, and the editing
                possibilities are endless!
            </div>
            <img
                className="SignInPreview"
                src={require("../styling/img/pagePreview.png")}
                alt="Preview of page"
            />
            <div className="SignInTitle">About Us</div>
            <div className="SignInDesc">
                We're a group of five computer science and software engineering
                majors at Cal Poly San Luis Obispo, developing Personal Homepage
                as part of a school project.
            </div>
        </div>
    );
}

export default SignIn;
