import React, { useEffect, useState } from 'react';
import db from '../services/firebase';
import './ChatBox.css';
import Message from './Message';

function ChatBox() {
	const [messageInput, setMessageInput] = useState('');
	const [messages, setMessages] = useState([]);
	const [error, setError] = useState('');

	useEffect(() => {
		const getMessages = db
			.collection('tendfire_messages')
			.orderBy('createdAt', 'desc')
			.onSnapshot(
				(data) => {
					const messageData = [];
					data.forEach((doc) =>
						messageData.push({ ...doc.data(), id: doc.id })
					);
					setMessages(messageData);
				},
				(err) => {
					setError(err);
					console.log(error);
				}
			);

		return () => getMessages();
	}, [messageInput, setMessageInput, error]);

	const handleChange = (e) => {
		setMessageInput(e.target.value);
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		const data = {
			createdAt: new Date(),
			message: messageInput,
			uid: 1,
			username: 'testuser',
		};
		db.collection('tendfire_messages').add(data);
		setMessageInput('');
	};

	return (
		<div className='chatbox'>
			<div>
				<div className='chatbox__messagebox'>
					{messages.map((data) => {
						return (
							<Message
								key={data.id}
								message={data?.message}
								username={data?.username}
							/>
						);
					})}
				</div>
				<form className='chatbox__inputbox' onSubmit={handleSubmit}>
					<input
						placeholder='Enter message here'
						type='text'
						className='chatbox__input'
						value={messageInput}
						onChange={handleChange}
					/>
				</form>
			</div>
		</div>
	);
}

export default ChatBox;
