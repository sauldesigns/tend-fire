import React, { useEffect, useState } from 'react';
import './App.css';
import Lottie from 'react-lottie';
import campfireOff from './lotties/campfire-off.json';
import campfireOn from './lotties/campfire-on.json';
// import openSocket from 'socket.io-client';
// import Chat from './components/Chat';
import AdSense from 'react-adsense';
import { useCookies } from 'react-cookie';

// const socket = openSocket('http://localhost:3005');

function App() {
	const [counter, setCounter] = useState(0);
	const [cookies, setCookie] = useCookies(['tendFire_Counter']);

	useEffect(() => {
		let _token = cookies.tendFire_Counter;
		if (_token === null || _token === undefined || _token === 'undefined') {
			setCookie('tendFire_Counter', counter);
		} else {
			setCounter(_token * 1);
		}
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
					layoutKey='-gw-1+2a-9x+5c'
				/>
				<h1>Tend Fire</h1>
				<h4>{counter}</h4>
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
				{/* <Chat /> */}
			</header>
		</div>
	);
}

export default App;
