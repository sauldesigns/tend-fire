import React, { useEffect, useState } from 'react';
import './App.css';
import Lottie from 'react-lottie';
import campfireOff from './lotties/campfire-off.json';
import campfireOn from './lotties/campfire-on.json';
// import openSocket from 'socket.io-client';
// import Chat from './components/Chat';
import AdSense from 'react-adsense';
import firebase from 'firebase';
import db, { auth } from './services/firebase';
import { useCookies } from 'react-cookie';

// const socket = openSocket('http://localhost:3005');

function App() {
	const [counter, setCounter] = useState(0);
	const [globalCounter, setGlobalCounter] = useState(0);
	const [loading, setLoading] = useState(true);
	const [cookies, setCookie] = useCookies(['tendFire_Counter']);
	const [error, setError] = useState('');
	const increment = firebase.firestore.FieldValue.increment(1);

	useEffect(() => {
		let _token = cookies.tendFire_Counter;
		if (_token === null || _token === undefined || _token === 'undefined') {
			setCookie('tendFire_Counter', counter);
		} else {
			setCounter(_token * 1);
		}

		const getCounter = db
			.collection('tendfire_counter')
			.doc('counter')
			.onSnapshot(
				(doc) => {
					setLoading(false);
					setGlobalCounter(doc.data().counter);
				},
				(err) => {
					setError(err);
				}
			);

		// returning the unsubscribe function will ensure that
		// we unsubscribe from document changes when our id
		// changes to a different value.
		return () => getCounter();
	}, [counter, cookies, setCookie]);

	const defaultOptions = {
		loop: true,
		autoplay: true,
		animationData: campfireOff,
		rendererSettings: {
			preserveAspectRatio: 'xMidYMid slice',
		},
	};

	const onOptions = {
		loop: true,
		autoplay: true,
		animationData: campfireOn,
		rendererSettings: {
			preserveAspectRatio: 'xMidYMid slice',
		},
	};

	const incrementCounter = () => {
		let dt = new Date();
		dt.setDate(dt.getDate() + 10);
		setCounter(counter + 1);
		setCookie('tendFire_Counter', counter + 1, {
			expires: dt,
		});
		if (auth.currentUser !== null) {
			db.collection('tendfire_counter')
				.doc('counter')
				.update({ counter: increment });
		}
	};

	return (
		<div className='App'>
			{/*  */}
			<header className='App-header'>
				<AdSense.Google
					client='ca-pub-1476711081418982'
					slot='9243293022'
					style={{ display: 'block' }}
					format='auto'
					responsive='true'
				/>
				<h1>Tend Fire</h1>
				<h4>Global Count: {loading ? 0 : globalCounter} times</h4>
				<h4>You have tended the fire {counter} times</h4>
				<div>
					{counter === 0 ? (
						<Lottie
							options={defaultOptions}
							isClickToPauseDisabled
							height={400}
							width={400}
						/>
					) : (
						<Lottie
							options={onOptions}
							isClickToPauseDisabled
							height={400}
							width={400}
						/>
					)}
				</div>
				<button onClick={() => incrementCounter()} className='app__mainButton'>
					Tend Fire
				</button>

				<p>{error}</p>
				{/* <Chat /> */}
			</header>
		</div>
	);
}

export default App;