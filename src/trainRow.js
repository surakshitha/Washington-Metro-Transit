import React, { Component } from 'react'

class TrainRow extends Component {
    render() {
        return (
            <tr>
                <td>{this.props.train.TrainId}</td>
                <td>{this.props.train.LineCode ? this.props.train.LineCode : '-'}</td>
                <td>{this.props.train.ServiceType}</td>
                <td>{this.props.train.CarCount !== 0 ? this.props.train.CarCount : '-'}</td>
                <td>{this.props.train.TrainNumber}</td>
            </tr>
        );
    }
}

export default TrainRow; 