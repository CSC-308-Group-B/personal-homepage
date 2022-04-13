import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import InputGroup from "react-bootstrap/InputGroup";
import React from 'react';
import BookmarksItem from "./BookmarksItem";
import axios from 'axios';

class BookmarksTile extends React.Component {

  constructor(props) {
    //props
    super(props);
    //creating the ref and binding is for getting the text input value
    this.textInputRef = React.createRef();
    this.urlInputRef = React.createRef();
    this.getTextInput = this.getTextInput.bind(this);
    this.clearTextInput = this.clearTextInput.bind(this);
    //state
    this.state = {
      bookmarks: (this.props.list || []),
    };
  }

  getTextInput() {
    let urlString = this.urlInputRef.current.value;
    if (!urlString.includes("http")) {
      urlString = "http://" + urlString;
    }
    const url = new URL(urlString);
    return {
      text: this.textInputRef.current.value,
      url: url.href,
      domain: url.hostname
    };
  }

  clearTextInput() {
    this.textInputRef.current.value = "";
    this.urlInputRef.current.value = "";
  }

  addBookmark = async () => {
    //create the new bookmarks object
    const newBookmark = this.getTextInput();
    if (newBookmark.text === "" || newBookmark.url === "") return;
    //and try adding it to the backed
    const response = await axios.post(`http://localhost:5001/addBookmark`, {
      userId: this.props.userId,
      tileId: this.props._id,
      tile: newBookmark
    }, { withCredentials: true });
    //if we get a response...
    if (response && response.status === 200) {
      //and it's valid, add it to our list and update state to rerender
      if (this.state.bookmarks) {
        this.state.bookmarks.push(response.data);
      }
      this.setState({ bookmarks: this.state.bookmarks });
      //also clear the input
      this.clearTextInput();
    } else {
      //otherwise, log the error to the console
      console.log("Failed to add bookmark.");
    }
  }

  deleteBookmark = async (itemId) => {
    //send the delete request
    const response = await axios.delete('http://localhost:5001/removeBookmark', {
      data: {
        userId: this.props.userId,
        tileId: this.props._id,
        itemId: itemId
      },
      withCredentials: true
    });
    //if we get a response...
    if (response && response.status === 204) {
      //for a valid response, filter out the deleted item and update our state
      this.state.bookmarks = this.state.bookmarks.filter((item) => {
        return item._id !== itemId;
      });
      this.setState({ bookmarks: this.state.bookmarks });
    } else {
      //otherwise, log the error to the console
      console.log("Failed to delete bookmark: ", response);
    }
  }

  render() {
    let inputGroupClassName = "bookmarkInputs";
    if (this.props.canEdit) inputGroupClassName += " canEdit";

    return (
      <Card className='Card'>
        <Card.Body>
          <Card.Title>Bookmarks</Card.Title>
            <ListGroup className="bookmarkItems">
              {(this.state.bookmarks && this.state.bookmarks.map((bookmark) => {
                return (
                  <BookmarksItem key={bookmark._id} {...bookmark} canEdit={this.props.canEdit} deleteBookmark={this.deleteBookmark} />);
              }))}
            </ListGroup>
            <InputGroup className={inputGroupClassName}>
              <input className="input" placeholder="  bookmark text" ref={this.textInputRef}></input>
              <input className="input" placeholder="  new url" ref={this.urlInputRef}></input>
              <button className='addBookmark' onClick={() => this.addBookmark()}>Add</button>
            </InputGroup>
        </Card.Body>
      </Card>
    );
  }
}

export default BookmarksTile;
