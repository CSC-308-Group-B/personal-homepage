import Card from "react-bootstrap/Card";
import InputGroup from "react-bootstrap/InputGroup";
import Dropdown from 'react-bootstrap/Dropdown'
import DropdownButton from 'react-bootstrap/DropdownButton'
import React from 'react';


class SearchBarTile extends React.Component {

    constructor(){
      super();
      this.state = {searchEngine: "Google"};
    }

    selectSearch = engine => () => {
      this.setState({searchEngine: engine});
    }

    highlightText = (event) => {
      event.target.select();
    }

    eventhandler = (event) => {

      if (event.key === "Enter"){
        var searchTerm = encodeURIComponent(document.getElementById('searchField').value);
        switch(this.state.searchEngine) {
          case "Google":
            window.open('http://www.google.com/search?q=' + searchTerm, '_blank');
            break;
          case "Yahoo":
            window.open('http://search.yahoo.com/search?p=' + searchTerm, '_blank');
            break;
          case "Bing":
            window.open('https://www.bing.com/search?q=' + searchTerm, '_blank');
            break;
          case "Baidu":
            window.open('https://www.baidu.com/s?wd=' + searchTerm, '_blank');
            break;
          case "DuckDuckGo":
            window.open('https://duckduckgo.com/?q=' + searchTerm, '_blank');
            break;
          default:
            window.open('http://www.google.com/search?q=' + searchTerm, '_blank');
            break;
        }
      }
    }
    

  render() {
    return (
      <Card className='Card'>
        <Card.Body>
          <InputGroup className="SearchBarInputGroup">
            <DropdownButton className="my-2" title={this.state.searchEngine}>
                <Dropdown.Item onClick={this.selectSearch("Google")}>Google</Dropdown.Item>
                <Dropdown.Item onClick={this.selectSearch("Yahoo")}>Yahoo</Dropdown.Item>
                <Dropdown.Item onClick={this.selectSearch("Bing")}>Bing</Dropdown.Item>
                <Dropdown.Item onClick={this.selectSearch("Baidu")}>Baidu</Dropdown.Item>
                <Dropdown.Item onClick={this.selectSearch("DuckDuckGo")}>DuckDuckGo</Dropdown.Item>
            </DropdownButton>
            <input onFocus = {this.highlightText} onKeyPress = {this.eventhandler} id = 'searchField' type="search" className="input" placeholder="Search" aria-label="Search" aria-describedby="search-addon"/>
          </InputGroup>
        </Card.Body>
      </Card>
    );
  }
}

export default SearchBarTile;
