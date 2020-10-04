import React, { useEffect, useState } from 'react';
import './Chat.css';
import openSocket from 'socket.io-client';
const socket = openSocket('http://localhost:3005');

function Chat() {
	const [message, setMessage] = useState('');

	const sendMessage = (value) => {
		socket.emit('chat', value);
	};

	const submitForm = (e) => {
		e.preventDefault();
		sendMessage(message);
	};

	return (
		<div id='container'>
			<div id='chatSection'>
				<div class='chat-window'></div>
				<form class='chat-form' onSubmit={submitForm}>
					<label class='chat-label'>
						Enter a message:
						<input
							onChange={(e) => setMessage(e.target.value)}
							type='text'
							class='chat-input'
						/>
					</label>
					<input type='submit' class='chat-submit' value='enter' />
				</form>
			</div>
		</div>
	);
}

export default Chat;
