import Card from "react-bootstrap/Card";
import InputGroup from "react-bootstrap/InputGroup";
import React from "react";
import HoverDropdown from "../HoverDropdown";

class SearchBarTile extends React.Component {
    constructor() {
        super();
        this.state = {
            searchEngine: "Google",
            searchImage:
                "https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/1024px-Google_%22G%22_Logo.svg.png",
        };
    }

    selectSearch = (engine, image) => () => {
        this.setState({ searchEngine: engine });
        this.setState({ searchImage: image });
    };

    highlightText = (event) => {
        event.target.select();
    };

    eventhandler = (event) => {
        if (event.key === "Enter") {
            var searchTerm = encodeURIComponent(
                document.getElementById("searchField").value
            );
            switch (this.state.searchEngine) {
                case "Google":
                    window.open(
                        "http://www.google.com/search?q=" + searchTerm,
                        "_blank"
                    );
                    break;
                case "Yahoo":
                    window.open(
                        "http://search.yahoo.com/search?p=" + searchTerm,
                        "_blank"
                    );
                    break;
                case "Bing":
                    window.open(
                        "https://www.bing.com/search?q=" + searchTerm,
                        "_blank"
                    );
                    break;
                case "Baidu":
                    window.open(
                        "https://www.baidu.com/s?wd=" + searchTerm,
                        "_blank"
                    );
                    break;
                case "DuckDuckGo":
                    window.open(
                        "https://duckduckgo.com/?q=" + searchTerm,
                        "_blank"
                    );
                    break;
                default:
                    window.open(
                        "http://www.google.com/search?q=" + searchTerm,
                        "_blank"
                    );
                    break;
            }
        }
    };

    render() {
        return (
            <Card
                className="Card"
                style={{
                    backgroundColor: `rgba(${this.props.tileColor.r}, ${this.props.tileColor.g}, ${this.props.tileColor.b}, ${this.props.tileColor.a})`,
                }}
            >
                <Card.Body>
                    <InputGroup className="SearchBarInputGroup">
                        <HoverDropdown className="searchEngineImg"
                            toggleContent={
                                <img alt="#" src={this.state.searchImage} />
                            }
                        >
                            <HoverDropdown.Item
                                onClick={this.selectSearch(
                                    "Google",
                                    "https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/1024px-Google_%22G%22_Logo.svg.png"
                                )}
                            >
                                Google
                            </HoverDropdown.Item>
                            <HoverDropdown.Item
                                onClick={this.selectSearch(
                                    "Yahoo",
                                    "https://cdn1.iconfinder.com/data/icons/smallicons-logotypes/32/yahoo-512.png"
                                )}
                            >
                                Yahoo
                            </HoverDropdown.Item>
                            <HoverDropdown.Item
                                onClick={this.selectSearch(
                                    "Bing",
                                    "https://cdn2.iconfinder.com/data/icons/social-icons-circular-color/512/bing-512.png"
                                )}
                            >
                                Bing
                            </HoverDropdown.Item>
                            <HoverDropdown.Item
                                onClick={this.selectSearch(
                                    "Baidu",
                                    "https://icons.iconarchive.com/icons/uiconstock/socialmedia/512/Baidu-icon.png"
                                )}
                            >
                                Baidu
                            </HoverDropdown.Item>
                            <HoverDropdown.Item
                                onClick={this.selectSearch(
                                    "DuckDuckGo",
                                    "http://assets.stickpng.com/images/5847f32fcef1014c0b5e4877.png"
                                )}
                            >
                                DuckDuckGo
                            </HoverDropdown.Item>
                        </HoverDropdown>
                        <input
                            onFocus={this.highlightText}
                            onKeyPress={this.eventhandler}
                            id="searchField"
                            type="search"
                            className={
                                "input" + (this.props.canEdit ? " canEdit" : "")
                            }
                            placeholder="  Search"
                            aria-label="Search"
                            aria-describedby="search-addon"
                        />
                    </InputGroup>
                </Card.Body>
            </Card>
        );
    }
}

export default SearchBarTile;
