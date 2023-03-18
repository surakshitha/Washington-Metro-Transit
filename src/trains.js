import React, { Component } from 'react';
import TrainTable from './trainTable';

class Trains extends Component {
    constructor(props) {
        super(props)
        this.state = {
            trains: []
        }
    }

    componentDidMount() {
        this.getData();
    }

    getData = () => {
        const url = 'https://api.wmata.com/TrainPositions/TrainPositions?contentType={json}&api_key=5c5c537b010d4164aae7d5315ad57942';
            fetch(url
                // , {
                // mode: 'no-cors',
                // method: 'GET',
                // headers: {
                //     "Content-Type": "application/json",
                //     "X-Auth-Token": '5c5c537b010d4164aae7d5315ad57942'
                // }
            // }
            )
                .then(res => res.json())
                .then(
                    
                    result => {
                        this.setState({
                            trains: result.TrainPositions
                            //receive as TrainPositions[int n]
                        })
                    },
                    error => {
                        console.log('Fetch Error: ', error)
                    }
                )
    }

    render() {
        return (
            <div>
                <h1>WMATA Train positions</h1>
                <TrainTable
                trains={this.state.trains}
                />
            </div>
        )
    }
}

export default Trains