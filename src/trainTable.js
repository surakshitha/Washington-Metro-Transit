import React, { Component } from 'react'
import TrainRow from './trainRow';

class TrainTable extends Component {
    constructor(props) {
        super(props)
        this.state = {
        }
    }

    render() {
        let trainPositions = Object.keys(this.props.trains).map(id => this.props.trains[id]);
        let rows = [];

        trainPositions.forEach(train => {
            rows.push(
                <TrainRow
                    train={train}
                    key={train.TrainId}
                />
            )
        })

        return (rows && rows.length ? (<div>
            <table className='train-table'>
                <thead>
                    <tr>
                        <th>TrainID</th>
                        <th>Train Line</th>
                        <th>Service Type</th>
                        <th>Cars</th>
                        <th>Train Number</th>
                    </tr>
                </thead>
                <tbody>{rows}</tbody>
            </table>
        </div>) : 'No trains');
    }
}

export default TrainTable; 