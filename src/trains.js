import React, { Component } from 'react';
import TrainTable from './trainTable';
import ErrorMessage from './errorMessage';

class Trains extends Component {
    constructor(props) {
        super(props)
        this.state = {
            trains: [],
            selectedFilter: '',
            selectedValue: '',
            filteredResults: [],
            noResults: false,
            filters: ['Service Type', 'Car Count', 'Train Line'],
            values: {
                'Service Type': ['Normal', 'NoPassengers', 'Special', 'Unknown'],
                'Train Line': ['BL', 'SV', 'RD', 'YL', 'OR', 'GR'],
            }
        }
    }

    componentDidMount() {
        this.getData();
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.state.trains !== prevState.trains) {
            setTimeout(() => { this.getData() }, 10000);
        }
    }

    /**
    * Fetches train positions data from the api
    * handles success or failure of request 
    * @param {string} writerId - The Id of the writer.
    */
    getData = () => {
        const url = 'https://api.wmata.com/TrainPositions/TrainPositions?contentType={json}&api_key=5c5c537b010d4164aae7d5315ad57942';
        fetch(url
            // , {
            // mode: 'no-cors',
            // method: 'GET',
            // headers: {
            //     'Content-Type': 'application/json',
            //     'X-Auth-Token': '5c5c537b010d4164aae7d5315ad57942'
            // }
            // }
        )
            .then(res => res.json())
            .then(
                result => {
                    this.setState({
                        trains: result.TrainPositions
                    });
                    this.getCars();
                },
                error => {
                    console.log('Fetch Error: ', error)
                    return <ErrorMessage message={'An error occured.'} />
                }
            )
    }

    /**
    * Filters train positions based on user's input 
    * @param {string} selectedFilter - The train parameter to filter by.
    * @param {string} selectedValue - The specific value of parameter to filter by.
    */
    getFilteredData = (selectedFilter, selectedValue) => {
        if (selectedFilter === 'Service Type') {
            let filteredTrains = this.state.trains.filter(train => train.ServiceType === selectedValue)
            this.setState({
                filteredResults: filteredTrains
            });
        }
        else if (selectedFilter === 'Car Count') {
            let filteredTrains = this.state.trains.filter(train => train.CarCount === parseInt(selectedValue))
            this.setState({
                filteredResults: filteredTrains
            });
        }
        else {
            let filteredTrains = this.state.trains.filter(train => train.LineCode === selectedValue)
            this.setState({
                filteredResults: filteredTrains
            });
        }
        if (!this.state.filteredResults.length) {
            this.setState({
                noResults: true,
            });
        }
    }

    /**
    * Returns trains array in event of api request or filter action
    */
    getTrains = () => {
        if (this.state.noResults && !this.state.filteredResults.length) {
            return [];
        }
        else if (this.state.filteredResults.length) {
            return this.state.filteredResults;
        }
        else {
            return this.state.trains;
        }
    }

    /**
    * Generates list of train car lengths currently available
    * values for car-count dropdown options*/
    getCars = () => {
        const uniqueCarCounts = [...new Set(this.state.trains.map(item => item.CarCount))].sort();
        this.setState({
            values: {
                ...this.state.values,
                'Car Count': uniqueCarCounts
            }
        });
    }

    /**
    * Capture and store filter parameter in state
    */
    setFilter = (e) => {
        this.setState({ selectedFilter: e.target.value });
    }

    /**
    * Capture and store filter parameter's value in state
    */
    setValue = (e) => {
        this.setState({ selectedValue: e.target.value });
    }

    render() {
        return (
            <div>
                <h1>WMATA Train positions</h1>
                <div className='input-container'>
                    <div className='filter-wrapper'>
                        <label className='label_parameters'>Filter by: </label>
                        <select
                            className='input_parameters'
                            onChange={(e) => { this.setFilter(e) }}>
                            <option value='' selected disabled hidden>Select value</option>
                            {
                                this.state.filters.map(filter => {
                                    return <option>{filter}</option>
                                })
                            }
                        </select>
                    </div>
                    <div className='value-wrapper'>
                        <label className='label_values'>Having value: </label>
                        <select className='input_value' onChange={(e) => { this.setValue(e) }}>
                            <option value='' disabled selected>Select value</option>
                            {this.state.selectedFilter &&
                                this.state.values[this.state.selectedFilter].map(value => {
                                    return <option >{value}</option>
                                })
                            }
                        </select>
                        <input
                            type='submit'
                            value='Submit'
                            disabled={this.state.selectedValue === ''}
                            onClick={() => { this.getFilteredData(this.state.selectedFilter, this.state.selectedValue) }}
                        />
                    </div>
                </div>
                <div className='table-display'>
                    <TrainTable
                        trains={this.getTrains()}
                    />
                </div>
            </div>
        )
    }
}

export default Trains