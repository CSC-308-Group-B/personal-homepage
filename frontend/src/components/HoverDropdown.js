import React from "react";
import DropdownButton from "react-bootstrap/DropdownButton";

class HoverDropdownItem extends React.Component {
    render() {
        return (
            <div
                className={"HoverDropdownItem " + this.props.className}
                onClick={this.props.onClick}
            >
                {this.props.children}
            </div>
        );
    }
}

class HoverDropdownDiv extends React.Component {
    render() {
        return (
            <div className={"HoverDropdownDiv " + this.props.className}></div>
        );
    }
}

class HoverDropdown extends React.Component {
    static Item = HoverDropdownItem;
    static Div = HoverDropdownDiv;

    constructor(props) {
        super(props);
        this.state = {
            visible: false,
        };
    }

    handleMouseEnter = () => {
        this.setState({ visible: true });
    };

    handleMouseLeave = () => {
        this.setState({ visible: false });
    };

    render() {
        return (
            <div
                className={"HoverDropdown " + this.props.className}
                onMouseEnter={this.handleMouseEnter}
                onMouseLeave={this.handleMouseLeave}
            >
                <DropdownButton
                    show={this.state.visible}
                    title={this.props.toggleContent}
                    key="end"
                    id={`dropdown-button-drop-end`}
                    drop="end"
                >
                    {this.props.children}
                </DropdownButton>
            </div>
        );
    }
}

export default HoverDropdown;
