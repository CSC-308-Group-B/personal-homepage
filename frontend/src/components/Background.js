import React from 'react';


class Background extends React.Component {

    render() {
        return (
            <div className="Background" style = {{backgroundColor: this.props.color, backgroundImage: `url(${this.props.backgroundImage})`}}/>
        );
    }
}

export default Background;