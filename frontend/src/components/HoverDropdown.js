import React from 'react';
import DropdownButton from 'react-bootstrap/DropdownButton';

class HoverDropdown extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: false
        }
    }

    handleMouseEnter = () => {
        console.log('enter');
        this.setState({visible: true});
    }

    handleMouseLeave = () => {
        console.log('leave');
        this.setState({visible: false});
    }

    render() {
        return (
            <div
            onMouseEnter={this.handleMouseEnter}
            onMouseLeave={this.handleMouseLeave}>
                <DropdownButton 
                    className="HoverDropdown"
                    show={this.state.visible}
                    title={this.props.button}
                >
                    {this.props.children}
                </DropdownButton>
            </div>
        );
    }
}

class HoverDropdownItem extends React.Component {
    render() {
        return (
            <div className="HoverDropdownItem" onClick={this.props.onClick}>
                {this.props.children}
            </div>
        );
    }
}

export {HoverDropdown, HoverDropdownItem};