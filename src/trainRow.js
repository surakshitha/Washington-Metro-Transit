import React, { Component } from 'react'

class TrainRow extends Component {
    render() {
        return (
            <tr>
                <td>{this.props.train.TrainId}</td>
                <td className={`train-line_`+this.props.train.LineCode}>{this.props.train.LineCode ? this.props.train.LineCode : '-'}</td>
                <td>{this.props.train.ServiceType}</td>
                <td><span className='circle'>{this.props.train.CarCount !== 0 ? this.props.train.CarCount : '-'}</span></td>
                <td>{this.props.train.TrainNumber}</td>
            </tr>
        );
    }
}

export default TrainRow; 