import React, { Component } from 'react'

class TrainRow extends Component {
    render() {
        let carValue = this.props.train.CarCount !== 0 ? this.props.train.CarCount : '0';
        let carImage = '../../img/cargo_'+carValue+'.png';

        return (
            <tr>
                <td>{this.props.id}</td>
                <td>{this.props.train.TrainId}</td>
                <td>{this.props.train.TrainNumber}</td>
                <td className={`train-line_` + this.props.train.LineCode}>
                    <span className='circle'>
                        {this.props.train.LineCode ? this.props.train.LineCode : '-'}
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