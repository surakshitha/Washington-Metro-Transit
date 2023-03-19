import React, { Component } from 'react'

class TrainRow extends Component {
    render() {
        let dwelltime = this.props.train.SecondsAtLocation >= 60 ? Math.floor(this.props.train.SecondsAtLocation/60)+'mins' : this.props.train.SecondsAtLocation+'secs' ;
        let carValue = this.props.train.CarCount !== 0 ? this.props.train.CarCount : '0';
        let carImage = '../../img/cargo_'+carValue+'.png';

        return (
            <tr>
                <td>{this.props.id}</td>
                <td>{this.props.train.TrainId}</td>
                <td>{this.props.train.TrainNumber}</td>
                <td>{this.props.train.CircuitId}</td>
                <td>{this.props.train.DestinationStationCode || '-' }</td>
                <td>{dwelltime}</td>
                <td className={`train-line_` + this.props.train.LineCode}>
                    <span className='circle'>
                        {this.props.train.LineCode || '-'}
                    </span>
                </td>
                <td>{this.props.train.ServiceType}</td>
                <td className='image-cell'>
                    <img src={carImage} alt='train-car' width="40" height="30" />
                    <span className='text-overlay'>
                        {carValue}
                    </span>
                </td>
            </tr>
        );
    }
}

export default TrainRow; 