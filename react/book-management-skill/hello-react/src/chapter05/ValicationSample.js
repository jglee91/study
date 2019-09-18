import React from 'react';
import './ValidationSample.css';

export default function ValidationSample() {
    const [state, setState] = React.useState({
        password: '',
        clicked: false,
        validated: false
    });
    let passwordInput = React.createRef();

    const handleChange = e => {
        setState({ ...state, password: e.target.value });
    }
    const handleButtonClick = () => {
        setState({
            ...state,
            clicked: true,
            validated: state.password === '0000'
        });
        passwordInput.current.focus();
    }

    return (
        <div>
            <input
                type="password"
                ref={passwordInput}
                value={state.password}
                onChange={handleChange}
                className={state.clicked ? (state.validated ? 'success' : 'failure') : ''}
            />
            <button onClick={handleButtonClick}>검증하기</button>
        </div>
    );
}