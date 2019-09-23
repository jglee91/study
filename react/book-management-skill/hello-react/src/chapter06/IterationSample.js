import React, { Component } from 'react';

export default class IterationSample extends Component {

    state = {
        names: ['눈사람', '얼음', '눈', '바람'],
        name: ''
    };

    handleChange = e => {
        this.setState({ name: e.target.value });
    }
    handleInsert = () => {
        this.setState({
            names: this.state.names.concat(this.state.name),
            name: ''
        });
    }
    handleRemove = index => {
        const { names } = this.state;

        this.setState({
            // names: [...names.slice(0, index), ...names.slice(index + 1, names.length)]
            names: names.filter((name, i) => i !== index)
        });
    }

    render() {
        const nameList = this.state.names.map((name, index) => (
            <li key={`${index}-${name}`} onDoubleClick={() => this.handleRemove(index)}>{name}</li>
        ));

        return (
            <div>
                <input type="text" value={this.state.name} onChange={this.handleChange} />
                <button onClick={this.handleInsert}>추가</button>
                <ul>
                    {nameList}
                </ul>
            </div>
        );
    }
}