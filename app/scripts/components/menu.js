/**
 * This file will hold the Menu that lives at the top of the Page, this is all rendered using a React Component...
 * 
 */
import React from 'react';

class Menu extends React.Component {

    /**
     * Main constructor for the Menu Class
     * @memberof Menu
     */
    constructor() {
        super();
        this.state = {
            showingSearch: false,
            searchName: '',
            searchData: [],
        };
    }

    /**
     * Shows or hides the search container
     * @memberof Menu
     * @param e [Object] - the event from a click handler
     */
    showSearchContainer(e) {
        e.preventDefault();
        this.setState({
            showingSearch: !this.state.showingSearch,
            searchName: '',
            searchData: []
        });
    }

    /**
     * Calls upon search change
     * @memberof Menu
     * @param e [Object] - the event from a text change handler
     */
    onSearch(e) {
        
        // Start Here
        // ...
        e.preventDefault();
        this.setState({ searchName: e.target.value });
        if (e.target.value) {
            fetch(`http://localhost:3035/search?name=${e.target.value}`)
                .then(res => res.json())
                .then(searchData => {                    
                    const { data } = searchData;
                    this.setState({ searchData: data })
                });
        } else {
            this.setState({ searchData: [] });
        }

    }

    /**
     * Renders the default app in the window, we have assigned this to an element called root.
     * 
     * @returns JSX
     * @memberof App
    */
    render() {
        const { showingSearch, searchData } = this.state;
        return (
            <header className="menu">
                <div className="menu-container">
                    <div className="menu-holder">
                        <h1>ELC</h1>
                        <nav>
                            <a href="#" className="nav-item">HOLIDAY</a>
                            <a href="#" className="nav-item">WHAT'S NEW</a>
                            <a href="#" className="nav-item">PRODUCTS</a>
                            <a href="#" className="nav-item">BESTSELLERS</a>
                            <a href="#" className="nav-item">GOODBYES</a>
                            <a href="#" className="nav-item">STORES</a>
                            <a href="#" className="nav-item">INSPIRATION</a>

                            <a href="#" onClick={(e) => this.showSearchContainer(e)}>
                                <i className="material-icons search">search</i>
                            </a>
                        </nav>
                    </div>
                </div>
                <div className={(showingSearch ? "showing " : "") + "search-container"}>
                    <input type="text" onChange={(e) => this.onSearch(e)} />
                    <a href="#" onClick={(e) => this.showSearchContainer(e)}>
                        <i className="material-icons close">close</i>
                    </a>
                    {
                        searchData.length > 0 && 
                        <>
                            <p className="results-info">{`Search Results show ${searchData.length} products` }</p>
                            <div className="search-results">
                                {
                                    searchData.map((item) => {
                                        return (
                                            <div key={item._id} className="result-item">
                                                <img className="item-img" src={item.picture} alt={`Picture of ${item.name}`} />
                                                <p className="item-price">
                                                    <span>￥</span>
                                                    {item.price}
                                                </p>
                                                <h3 className="item-title">{item.name}</h3>
                                                <p className="item-description">{ item.about }</p>
                                                <div className='item-tag'>
                                                    {
                                                        item.tags.map((i, j) => {
                                                            return (
                                                                <div className="tag" key={j}>{i}</div>
                                                            );
                                                        })
                                                    }
                                                </div>
                                            </div>
                                        );
                                    })
                                }
                            </div>
                        </>
                    }
                </div>
            </header>
        );
    }


}

// Export out the React Component
module.exports = Menu;