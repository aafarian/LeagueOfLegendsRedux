import React from 'react';
import { Link } from 'react-router';

class Results extends React.Component {
 
    render() {
        return (
            <div className="container">
                <div className="text">{this.props.info.name} - {this.props.info.title}</div>
                <div className="image-container">
                    <img className="image" src={this.props.info.url} />
                </div>
            </div>
        )
    }
}

export default Results;