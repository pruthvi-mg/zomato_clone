import React from 'react';
import queryString from 'query-string';
import axios from 'axios';
import '../Styles/filter.css';

class Filter extends React.Component {
    constructor() {
        super();
        this.state = {
            restaurants: [],
            locations: [],
            mealtype: undefined,
            location: undefined,
            cuisine: [],
            lcost: undefined,
            hcost: undefined,
            sort: 1,
            page: 1,
            mealtypeName: undefined,
            pageCount: []
            
        }
    }

    componentDidMount() {
        const qs = queryString.parse(this.props.location.search);
        const { mealtype, location } = qs;
        const restaurants = this.state;

        const filterObj = {
            mealtype: Number(mealtype),
            location
        };

        axios({
            method: 'POST',
            url: 'http://localhost:8080/filter',
            headers: { 'Content-Type': 'application/json' },
            data: filterObj
        })
            .then(response => {
                this.setState({ restaurants: response.data.restaurants, mealtype, pageCount: response.data.pageCount })
            })
            .catch()

        axios({
            method: 'GET',
            url: 'http://localhost:8080/locations',
            headers: { 'Content-Type': 'application/json' }
        })
            .then(response => {
                this.setState({ locations: response.data.locations })
            })
            .catch()


            
        

            if (mealtype == 1){
                this.setState({mealtypeName: "BreakFast"})
            }else if (mealtype == 2){ 
                this.setState({mealtypeName: "Lunch"})
            }else if (mealtype == 3){ 
                this.setState({mealtypeName: "Dinner"})
            }else if (mealtype == 4){ 
                this.setState({mealtypeName: "Snacks"})
            }else if (mealtype == 5){ 
                this.setState({mealtypeName: "Drinks"})
            }else{
                this.setState({mealtypeName: "NightLIfe"})
            }




    }



       handleSortChange = (sort) => {

        const { mealtype, cuisine, location, lcost, hcost, page } = this.state;

        const filterObj = {
            mealtype: Number(mealtype),
            cuisine: cuisine.length == 0 ? undefined : cuisine,
            location,
            lcost,
            hcost,
            sort,
            page
        };

        axios({
            method: 'POST',
            url: 'http://localhost:8080/filter',
            headers: { 'Content-Type': 'application/json' },
            data: filterObj
        })
            .then(response => {
                this.setState({ restaurants: response.data.restaurants, sort, pageCount: response.data.pageCount })
            })
            .catch()
    }

    handleCostChange = (lcost, hcost) => {

        const { mealtype, cuisine, location, sort, page } = this.state;

        const filterObj = {
            mealtype: Number(mealtype),
            cuisine: cuisine.length == 0 ? undefined : cuisine,
            location,
            lcost,
            hcost,
            sort,
            page
        };

        axios({
            method: 'POST',
            url: 'http://localhost:8080/filter',
            headers: { 'Content-Type': 'application/json' },
            data: filterObj
        })
            .then(response => {
                this.setState({ restaurants: response.data.restaurants, lcost, hcost, pageCount: response.data.pageCount })
            })
            .catch()
    }

    handleLocationChange = (event) => {
        const location = event.target.value;

        const { mealtype, cuisine, lcost, hcost, sort, page } = this.state;

        const filterObj = {
            mealtype: Number(mealtype),
            cuisine: cuisine.length == 0 ? undefined : cuisine,
            location,
            lcost,
            hcost,
            sort,
            page
        };

        axios({
            method: 'POST',
            url: 'http://localhost:8080/filter',
            headers: { 'Content-Type': 'application/json' },
            data: filterObj
        })
            .then(response => {
                this.setState({ restaurants: response.data.restaurants, location, pageCount: response.data.pageCount })
            })
            .catch()
    }

    handlePageChange = (page) => {

        const { mealtype, cuisine, location, lcost, hcost, sort } = this.state;

        const filterObj = {
            mealtype: Number(mealtype),
            cuisine: cuisine.length == 0 ? undefined : cuisine,
            location,
            lcost,
            hcost,
            sort,
            page
        };

        axios({
            method: 'POST',
            url: 'http://localhost:8080/filter',
            headers: { 'Content-Type': 'application/json' },
            data: filterObj
        })
            .then(response => {
                this.setState({ restaurants: response.data.restaurants, page, pageCount: response.data.pageCount })
            })
            .catch()
    }

    handleCuisineChange = (cuisineId) => {

        const { mealtype, cuisine, location, lcost, hcost, sort, page } = this.state;

        const index = cuisine.indexOf(cuisineId);

        if (index == -1) {
            cuisine.push(cuisineId);
        } else {
            cuisine.splice(index, 1);
        }

        const filterObj = {
            mealtype: Number(mealtype),
            cuisine: cuisine.length == 0 ? undefined : cuisine,
            location,
            lcost,
            hcost,
            sort,
            page
        };

        axios({
            method: 'POST',
            url: 'http://localhost:8080/filter',
            headers: { 'Content-Type': 'application/json' },
            data: filterObj
        })
            .then(response => {
                this.setState({ restaurants: response.data.restaurants, cuisine, pageCount: response.data.pageCount })
            })
            .catch()
    }

    handlePreNex = (page,value) => {
        const { mealtype, cuisine, location, lcost, hcost, sort } = this.state;

        if (value == 'pre'){
            // page--;
            const filterObj = {
                mealtype: Number(mealtype),
                cuisine: cuisine.length == 0 ? undefined : cuisine,
                location,
                lcost,
                hcost,
                sort,
                page : page-1
            };
    
            axios({
                method: 'POST',
                url: 'http://localhost:8080/filter',
                headers: { 'Content-Type': 'application/json' },
                data: filterObj
            })
                .then(response => {
                    this.setState({ restaurants: response.data.restaurants, page, pageCount: response.data.pageCount })
                })
                .catch()
        }else{
            // page ++;
            const filterObj = {
                mealtype: Number(mealtype),
                cuisine: cuisine.length == 0 ? undefined : cuisine,
                location,
                lcost,
                hcost,
                sort,
                page : page+1
            };
    
            axios({
                method: 'POST',
                url: 'http://localhost:8080/filter',
                headers: { 'Content-Type': 'application/json' },
                data: filterObj
            })
                .then(response => {
                    this.setState({ restaurants: response.data.restaurants, page, pageCount: response.data.pageCount })
                })
                .catch()
        }
        
    }

    handleNavigate = (resId) => {
        this.props.history.push(`/details?restaurant=${resId}`);
    }

    render() {
        const { restaurants, locations, pageCount, mealtypeName, page } = this.state;
        return (
            <div>
                <div>

                    <div id="myId" className="heading">{mealtypeName} Places In</div>

                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-sm-4 col-md-4 col-lg-4 filter-options">
                                <div className="filter-heading">Filters / Sort</div>
                                <span className="fas fa-angle-double-down icon toggle-span" data-bs-toggle="collapse"
                                    data-bs-target="#filter"></span>
                                <div id="filter" className="collapse show">
                                    <div className="Select-Location">Select Location</div>
                                    <select className="Rectangle-2236" onChange={this.handleLocationChange}>
                                        <option value="0">Select</option>
                                        {locations.map((item) => {
                                            return <option value={item.location_id}>{`${item.name}, ${item.city}`}</option>
                                        })}
                                    </select>
                                    <div className="Cuisine">Cuisine</div>
                                    <div>
                                        <input type="checkbox" style={{cursor:'pointer'}} onChange={() => this.handleCuisineChange(1)} />
                                        <span className="checkbox-items">North Indian</span>
                                    </div>
                                    <div style={{ display: "block" }} >
                                        <input type="checkbox" onChange={() => this.handleCuisineChange(2)} style={{cursor:'pointer'}} />
                                        <span className="checkbox-items">South Indian</span>
                                    </div>
                                    <div>
                                        <input type="checkbox" onChange={() => this.handleCuisineChange(3)} style={{cursor:'pointer'}}/>
                                        <span className="checkbox-items">Chineese</span>
                                    </div>
                                    <div>
                                        <input type="checkbox" onChange={() => this.handleCuisineChange(4)} style={{cursor:'pointer'}}/>
                                        <span className="checkbox-items">Fast Food</span>
                                    </div>
                                    <div>
                                        <input type="checkbox" onChange={() => this.handleCuisineChange(5)} style={{cursor:'pointer'}}/>
                                        <span className="checkbox-items">Street Food</span>
                                    </div>
                                    <div className="Cuisine">Cost For Two</div>
                                    <div>
                                        <input type="radio" name="cost" onChange={() => this.handleCostChange(1, 500)} style={{cursor:'pointer'}}/>
                                        <span className="checkbox-items">Less than &#8377; 500</span>
                                    </div>
                                    <div>
                                        <input type="radio" name="cost" onChange={() => this.handleCostChange(500, 1000)} style={{cursor:'pointer'}}/>
                                        <span className="checkbox-items">&#8377; 500 to &#8377; 1000</span>
                                    </div>
                                    <div>
                                        <input type="radio" name="cost" onChange={() => this.handleCostChange(1000, 1500)}style={{cursor:'pointer'}} />
                                        <span className="checkbox-items">&#8377; 1000 to &#8377; 1500</span>
                                    </div>
                                    <div>
                                        <input type="radio" name="cost" onChange={() => this.handleCostChange(1500, 2000)} style={{cursor:'pointer'}}/>
                                        <span className="checkbox-items">&#8377; 1500 to &#8377; 2000</span>
                                    </div>
                                    <div>
                                        <input type="radio" name="cost" onChange={() => this.handleCostChange(2000, 50000)} style={{cursor:'pointer'}}/>
                                        <span className="checkbox-items">&#8377; 2000 +</span>
                                    </div>
                                    <div className="Cuisine">Sort</div>
                                    <div>
                                        <input type="radio" name="sort" onChange={() => this.handleSortChange(1)} style={{cursor:'pointer'}} />
                                        <span className="checkbox-items">Price low to high</span>
                                    </div>
                                    <div>
                                        <input type="radio" name="sort" onChange={() => this.handleSortChange(-1)} style={{cursor:'pointer'}} />
                                        <span className="checkbox-items">Price high to low</span>
                                    </div>
                                </div>
                            </div>
                            <div className="col-sm-8 col-md-8 col-lg-8">


                                {restaurants.length > 0 ? restaurants.map(item => {
                                    return <div className="Item" onClick={() => this.handleNavigate(item._id)}>
                                        <div>
                                            <div className="small-item vertical">
                                                <img className="img" src={`./${item.image}`} />
                                            </div>
                                            <div className="big-item">
                                                <div className="rest-name">{item.name}</div>
                                                <div className="rest-location">{item.locality}</div>
                                                <div className="rest-address">{item.city}</div>
                                            </div>
                                        </div>
                                        <hr />
                                        <div>
                                            <div className="margin-left">
                                                <div className="Bakery-700">CUISINES : {item.cuisine.map(cuisineItem => { return `${cuisineItem.name}, ` })}</div>
                                                <div className="Bakery-700">COST FOR TWO : &#8377; {item.min_price} </div>
                                            </div>
                                        </div>
                                    </div>
                                }) : <div className='no-records'>No Records Found ...</div>}


                                {restaurants.length > 0 ?
                                    <div className="pagination">
                                        <span className="page-num" onClick={() => this.handlePreNex(page, 'pre')}>&laquo;</span>
                                        {pageCount.map(pageNo => {
                                            return <span className="page-num" onClick={() => this.handlePageChange(pageNo)}>{pageNo}</span>
                                        })}
                                        <span className="page-num"  onClick={() => this.handlePreNex(page, 'nex')}>&raquo; </span>
                                    </div> : null}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Filter;