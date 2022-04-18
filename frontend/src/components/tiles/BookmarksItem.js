import React from "react";
import CloseButton from "react-bootstrap/CloseButton";

class BookmarksItem extends React.Component {
    deleteBookmark(e) {
        e.preventDefault();
    }

    render () {
        return(
            <div className="BookmarksItem">
                <a href={this.props.url} target="_blank" rel="noreferrer">
                    <img src={`http://www.google.com/s2/favicons?domain=${this.props.domain}`} alt=" " /> {this.props.text}
                </a>
                {this.props.canEdit &&
                    <CloseButton
                        className="BookmarksCloseButton"
                        onClick={() => this.props.deleteBookmark(this.props._id)}
                    />
                }
            </div>
        )
    }
}

export default BookmarksItem;