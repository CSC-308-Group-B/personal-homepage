import React from 'react';

class HoverDropdownItem extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            
        }
    }

    render() {
        return (
            <div className="HoverDropdownItem" onClick={this.props.onClick}>
                {this.props.children}
            </div>
        );
    }
}

export default HoverDropdownItem;