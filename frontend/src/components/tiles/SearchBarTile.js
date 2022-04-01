import Card from "react-bootstrap/Card";
import InputGroup from "react-bootstrap/InputGroup";
import Dropdown from 'react-bootstrap/Dropdown'
import DropdownButton from 'react-bootstrap/DropdownButton'
import React from 'react';

class SearchBarTile extends React.Component {

    performSearch = engine => () => {
        var searchTerm = encodeURIComponent(document.getElementById('searchField').value);
        console.log(engine);
        if (engine === "google")
            window.open('http://www.google.com/search?q=' + searchTerm, '_blank');
        if (engine === "yahoo")
            window.open('http://search.yahoo.com/search?p=' + searchTerm, '_blank');
        if (engine === "bing")
            window.open('https://www.bing.com/search?q=' + searchTerm, '_blank');
        if (engine === "baidu")
            window.open('https://www.baidu.com/s?wd=' + searchTerm, '_blank');
        if (engine === "duckduckgo")
            window.open('https://duckduckgo.com/?q=' + searchTerm, '_blank');

    }
    

  render() {
    return (
      <Card className='Card'>
        <Card.Body>
          <InputGroup>
          <DropdownButton className="my-2" title="Search">
                <Dropdown.Item onClick={this.performSearch("google")}>Google</Dropdown.Item>
                <Dropdown.Item onClick={this.performSearch("yahoo")}>Yahoo</Dropdown.Item>
                <Dropdown.Item onClick={this.performSearch("bing")}>Bing</Dropdown.Item>
                <Dropdown.Item onClick={this.performSearch("baidu")}>Baidu</Dropdown.Item>
                <Dropdown.Item onClick={this.performSearch("duckduckgo")}>DuckDuckGo</Dropdown.Item>
            </DropdownButton>
          <input id = 'searchField' type="search" class="form-control rounded" placeholder="Search" aria-label="Search" aria-describedby="search-addon"/>
          </InputGroup>
        </Card.Body>
      </Card>
    );
  }
}

export default SearchBarTile;
