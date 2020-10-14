import React, { useEffect, useState } from 'react';
import './ChatBox.css';

function ChatBox() {
	const [message, setMessage] = useState('');

	const submitForm = (e) => {
		e.preventDefault();
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

export default ChatBox;
