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
        this.setState({visible: true});
        console.log('enter')
    }

    handleMouseLeave = (e) => {
        this.setState({visible: false});
        console.log('leave')
    }

    render() {
        return (
            <DropdownButton 
                className="HoverDropdown"
                onHover={() => this.handleMouseEnter}
                show={this.state.visible}
                title={this.props.button}
            >
                {this.state.visible && 
                <div className={"HoverDropdownContent" + (this.props.aside ? " HoverDropdownAside" : "")}>
                    {this.props.children}
                </div>}
            </DropdownButton>
        );
    }
}

export default HoverDropdown;