import ListGroup from "react-bootstrap/ListGroup";
import FormCheck from "react-bootstrap/FormCheck";
import React from "react";

class BookmarksItem extends React.Component {
    render () {
        return(
            <a className="bookmark" href={this.props.url} target="_blank" rel="noreferrer">
                {this.props.text}
            </a>
        )
    }
}

export default BookmarksItem;