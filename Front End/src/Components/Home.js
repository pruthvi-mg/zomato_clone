import React from 'react';
import '../Styles/home.css';
import Wallpaper from './Wallpaper';
import QuickSearch from './QuickSeach';

import axios from 'axios';

class Home extends React.Component {
    constructor() {
        super();
        this.state = {
            locations: [],
            mealtypes: []
        }
    }

    componentDidMount() {
        sessionStorage.clear();
        axios({
            method: 'GET',
            url: 'http://localhost:8080/locations',
            headers: { 'Content-Type': 'application/json' }
        })
            .then(response => {
                this.setState({ locations: response.data.locations })
            })
            .catch()

        axios({
            method: 'GET',
            url: 'http://localhost:8080/mealtypes',
            headers: { 'Content-Type': 'application/json' }
        })
            .then(response => {
                this.setState({ mealtypes: response.data.mealtypes })
            })
            .catch()
    }

    render() {
        const { locations, mealtypes } = this.state;
        return (
            <div>
                <Wallpaper locationsData={locations} />
                <QuickSearch mealtypesData={mealtypes} />
            </div>
        )
    }
}

export default Home;