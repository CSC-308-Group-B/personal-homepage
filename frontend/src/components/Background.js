import React from 'react';


class Background extends React.Component {

    render() {

        if (this.props.user != undefined) {
            return (
                <div className="Background" style={{ backgroundColor: this.props.color, backgroundImage: `url(${this.props.backgroundImage})` }} />
            );
        } else {
            return (
                <div className="Background SignInBackground" />

                );
        }
       
    }
}

export default Background;