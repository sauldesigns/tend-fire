import React from 'react';
import './Message.css';
function Message({ message, username }) {
	return (
		<div className={`${username === 'testuser' ? 'message' : 'message__main'}`}>
			<div className='message__container'>
				<div className='message_userdetails'>{username}</div>
				<div className='message__item'>
					<p>{message}</p>
				</div>
			</div>
		</div>
	);
}

export default Message;
