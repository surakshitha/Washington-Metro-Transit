import React, { Component } from 'react'
import TrainRow from './trainRow';
import ErrorMessage from './errorMessage';

class TrainTable extends Component {
    constructor(props) {
        super(props)
        this.state = {
        }
    }

    render() {
        let trainPositions = Object.keys(this.props.trains).map(id => this.props.trains[id]);
        let rows = [];
        let count = 1;

        trainPositions.forEach((train) => {
            rows.push(
                <TrainRow
                    train={train}
                    key={train.TrainId}
                    id={count++}
                />
            )
        })

        return (rows && rows.length ? (<div>
            <table className='train-table'>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>TrainID</th>
                        <th>Train Number</th>
                        <th>Train Line</th>
                        <th>Service Type</th>
                        <th>Cars</th>
                    </tr>
                </thead>
                <tbody>{rows}</tbody>
            </table>
        </div>) : <ErrorMessage message={'No trains'} />);
    }
}

export default TrainTable; 