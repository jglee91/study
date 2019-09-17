import React from 'react';

export default function EventPractice() {
    const [state, setState] = React.useState({
        username: '',
        message: ''
    });

    const handleChange = e => {
        setState({ ...state, [e.target.name]: e.target.value });        
    }

    const handleClick = () => {
        alert(state.username + ' : ' + state.message);
        setState({ username: '', message: '' });
    }

    const handleKeyPress = e => {
        if (e.key === 'Enter') {
            handleClick();
        }
    }

    return (
        <div>
            <h1>이벤트 연습</h1>
            <input type="text" name="username" placeholder="유저명" value={state.username} onChange={handleChange} />
            <input type="text" name="message" placeholder="아무거나 입력해보세요." value={state.message} onChange={handleChange} onKeyPress={handleKeyPress} />
            <button type="button" onClick={handleClick}>확인</button>
        </div>
    );
}
