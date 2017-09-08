import React from 'react';
import { Link } from 'react-router-dom';

class Lookup extends React.Component {
    constructor() {
        super();
        this.getInput = this.getInput.bind(this);
    }
    getInput(e) {
        e.preventDefault();
        this.props.handleSubmit(this.input.value);
    }
    render() {
        return (
            <div>
                <form onSubmit={this.getInput}>
                    <div>
                        <input type="text" ref={(input) => this.input = input} placeholder="Username" /> 
                        <button className="btn" type="submit">Submit</button>
                    </div>
                </form>
            </div>
            );
        }
}


export default Lookup;