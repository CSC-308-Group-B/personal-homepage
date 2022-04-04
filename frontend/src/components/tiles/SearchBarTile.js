import Card from "react-bootstrap/Card";
import InputGroup from "react-bootstrap/InputGroup";
import Dropdown from 'react-bootstrap/Dropdown'
import DropdownButton from 'react-bootstrap/DropdownButton'
import React from 'react';


class SearchBarTile extends React.Component {

    constructor(){
      super();
      this.state = {searchEngine: "Search"};
    }

    selectSearch = engine => () => {
        
        if (engine === "google"){
          this.setState({searchEngine: "Google"});
        }
        if (engine === "yahoo"){
          this.setState({searchEngine: "Yahoo"});
        }
        if (engine === "bing"){
          this.setState({searchEngine: "Bing"});
        }
        if (engine === "baidu"){
          this.setState({searchEngine: "Baidu"});
        }
        if (engine === "duckduckgo"){
          this.setState({searchEngine: "DuckDuckGo"});
        }
    }

    eventhandler = (event) => {

      if (event.key === "Enter"){
        var searchTerm = encodeURIComponent(document.getElementById('searchField').value);
        if (this.state.searchEngine === "Google"){
          window.open('http://www.google.com/search?q=' + searchTerm, '_blank');
        }
        if (this.state.searchEngine === "Yahoo"){
          window.open('http://search.yahoo.com/search?p=' + searchTerm, '_blank');
        }
        if (this.state.searchEngine === "Bing"){
          window.open('https://www.bing.com/search?q=' + searchTerm, '_blank');
        }
        if (this.state.searchEngine === "Baidu"){
          window.open('https://www.baidu.com/s?wd=' + searchTerm, '_blank');
        }
        if (this.state.searchEngine === "DuckDuckGo"){
          window.open('https://duckduckgo.com/?q=' + searchTerm, '_blank');
        }
      }
    }
    

  render() {
    return (
      <Card className='Card'>
        <Card.Body>
          <InputGroup>
          <DropdownButton className="my-2" title={this.state.searchEngine}>
                <Dropdown.Item onClick={this.selectSearch("google")}>Google</Dropdown.Item>
                <Dropdown.Item onClick={this.selectSearch("yahoo")}>Yahoo</Dropdown.Item>
                <Dropdown.Item onClick={this.selectSearch("bing")}>Bing</Dropdown.Item>
                <Dropdown.Item onClick={this.selectSearch("baidu")}>Baidu</Dropdown.Item>
                <Dropdown.Item onClick={this.selectSearch("duckduckgo")}>DuckDuckGo</Dropdown.Item>
            </DropdownButton>
          <input onKeyPress = {this.eventhandler} id = 'searchField' type="search" className="inputbar" placeholder="Search" aria-label="Search" aria-describedby="search-addon"/>
          </InputGroup>
        </Card.Body>
      </Card>
    );
  }
}

export default SearchBarTile;
