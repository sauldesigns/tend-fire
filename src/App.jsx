import React, { useEffect, useState } from 'react';
import './App.css';
import campfireOff from './lotties/campfire-off.json';
import campfireOn from './lotties/campfire-on.json';
import AdSense from 'react-adsense';
import db, { increment } from './services/firebase';
import { useCookies } from 'react-cookie';
import { Box, Fab } from '@material-ui/core';
import Fire from './components/Fire';
import NavBar from './components/NavBar';
import { Whatshot } from '@material-ui/icons';
import PublicIcon from '@material-ui/icons/Public';
import ChatBox from './components/ChatBox';

// const socket = openSocket('http://localhost:3005');

function App() {
	const [counter, setCounter] = useState(0);
	const [globalCounter, setGlobalCounter] = useState(0);
	const [loading, setLoading] = useState(true);
	const [cookies, setCookie] = useCookies(['tendFire_Counter']);
	const [health, setHealth] = useState(0);
	const [error, setError] = useState('');

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

		const getHealth = db
			.collection('tendfire_health')
			.doc('red')
			.onSnapshot(
				(doc) => {
					setLoading(false);
					setHealth(doc.data().health);
				},
				(err) => {
					setError(err);
				}
			);

		// returning the unsubscribe function will ensure that
		// we unsubscribe from document changes when our id
		// changes to a different value.
		return () => {
			getCounter();
			getHealth();
		};
	}, [counter, cookies, setCookie, health]);

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
		// if (auth.currentUser !== null) {
		db.collection('tendfire_counter')
			.doc('counter')
			.update({ counter: increment });
		// }

		if (health + 1 <= 100) {
			db.collection('tendfire_health').doc('red').update({ health: increment });
		}
	};

	return (
		<div className='app'>
			<Box display='flex' flexDirection='column' flex={1}>
				<nav className='app__nav'>
					<NavBar />
				</nav>
				<Box display='flex' justifyContent='center'>
					<Box display='flex'>
						<div className='app__globalstats'>
							<PublicIcon />
							{loading ? 0 : globalCounter}
						</div>

						<div className='app__localstats'>
							<Whatshot />
							{counter}
						</div>
					</Box>
				</Box>
				<div className='app__fire'>
					<div>
						{counter === 0 ? (
							<Fire options={defaultOptions} health={health} />
						) : (
							<Fire options={onOptions} health={health} />
						)}
					</div>
				</div>
				<div className='app__tendButton'>
					<Fab
						color='secondary'
						aria-label='add'
						onClick={() => incrementCounter()}
					>
						<Whatshot />
					</Fab>
				</div>
				<AdSense.Google
					client='ca-pub-1476711081418982'
					slot='9243293022'
					style={{ display: 'block' }}
					format='auto'
					responsive='true'
				/>
				{error !== '' ? null : <span>{error}</span>}
			</Box>
			<Box display='flex' marginTop='28px' justifyContent='center'>
				<ChatBox />
			</Box>
		</div>
		// <div className='App'>
		// 	{/*  */}
		// 	<header className='App-header'>

		// 		<h1>Tend Fire</h1>
		// 		<h4>Global Count: {loading ? 0 : globalCounter} times</h4>
		// 		<h4>You have tended the fire {counter} times</h4>
		// 		<div className='app__health'>
		// 			<h5>Health</h5>
		// 			<progress
		// 				className='app__healthbar'
		// 				value={health}
		// 				max={100}
		// 			></progress>
		// 		</div>

		// 		<div>
		// 			{counter === 0 ? (
		// 				<Lottie
		// 					options={defaultOptions}
		// 					isClickToPauseDisabled
		// 					height={400}
		// 					width={400}
		// 				/>
		// 			) : (
		// 				<Lottie
		// 					options={onOptions}
		// 					isClickToPauseDisabled
		// 					height={400}
		// 					width={400}
		// 				/>
		// 			)}
		// 		</div>
		// 		<button onClick={() => incrementCounter()} className='app__mainButton'>
		// 			Tend Fire
		// 		</button>

		// 		<p>{error}</p>
		// 		{/* <Chat /> */}
		// 	</header>
		// </div>
	);
}

export default App;
