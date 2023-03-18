import React, { Component } from 'react';
import TrainTable from './trainTable';

class Trains extends Component {
    constructor(props) {
        super(props)
        this.state = {
            trains: [],
            selectedFilter: '',
            selectedValue: '',
            filters: ["", "Service Type", "Car Count", "Train Line"],
            values: {
                "Service Type": ["Normal", "NoPassengers", "Special", "Unknown"],
                "Car Count": ["5", "10", "15"],
                "Train Line": ["BL", "SV", 'RD', 'YL', 'OR', 'GR']
                // ["Blue", "Red", "Silver", "Yellow", "Orange", "Green"]
            }
        }
    }

    componentDidMount() {
        this.getData();
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.state.trains !== prevState.trains) {
            //   setInterval(this.getData(), 100000);
        }
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

    getFilteredData = (selectedFilter, selectedValue) => {
        let filteredTrains = [];
        if (selectedFilter === "Service Type") {
            filteredTrains = this.state.trains.filter(train => train.ServiceType === selectedValue)
            this.setState({
                trains: filteredTrains
            });
        }
        else if (selectedFilter === "Car Count") {
            filteredTrains = this.state.trains.filter(train => train.CarCount <= selectedValue)
            this.setState({
                trains: filteredTrains
            });
        }
        else {
            filteredTrains = this.state.trains.filter(train => train.LineCode === selectedValue)
            this.setState({
                trains: filteredTrains
            });
        }
    }

    setFilter = (e) => {
        this.setState({ selectedFilter: e.target.value });
    }

    setValue = (e) => {
        this.setState({ selectedValue: e.target.value });
    }

    render() {
        return (
            <div>
                <h1>WMATA Train positions</h1>
                <div className='filters'>
                    <label className='label_trains'>Filter by:</label>
                    <select className="filters" onChange={(e) => { this.setFilter(e) }}>
                        {
                            this.state.filters.map(filter => {
                                return <option>{filter}</option>
                            })
                        }
                    </select>
                    <label className='label_values'> Having value: </label>
                    {this.state.selectedFilter && <select className="filters" onChange={(e) => { this.setValue(e) }}>
                        {
                            this.state.values[this.state.selectedFilter].map(value => {
                                return <option>{value}</option>
                            })
                        }
                    </select>}
                    {this.state.selectedValue !== '' && <input type="submit" value="Submit" onClick={() => { this.getFilteredData(this.state.selectedFilter, this.state.selectedValue) }} />}
                </div>
                <div className='table-display'>
                    <TrainTable
                        trains={this.state.trains}
                    />
                </div>
            </div>
        )
    }
}

export default Trains