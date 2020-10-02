import React, { useEffect, useState } from 'react';
import './App.css';
import Lottie from 'react-lottie';
import campfireOff from './lotties/campfire-off.json';
import campfireOn from './lotties/campfire-on.json';

function App() {
	const [counter, setCounter] = useState(0);
	const [counterDown, setCounterDown] = useState(0);

	useEffect(() => {
		if (counter > 0 && counter - counterDown !== 0) {
			setTimeout(() => {
				setCounterDown(counterDown + 1);
			}, 1000);
		}
	}, [counter, counterDown]);
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
		setCounter(counter + 1);
	};

	return (
		<div className='App'>
			<header className='App-header'>
				<h1>Tend Fire</h1>
				<h4>{counter - counterDown}</h4>
				<div>
					{counter - counterDown === 0 ? (
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
			</header>
		</div>
	);
}

export default App;
