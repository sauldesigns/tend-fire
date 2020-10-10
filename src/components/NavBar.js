import React, { useEffect, useState } from 'react';
import './NavBar.css';
import TabItem from './TabItem';
import WhatshotIcon from '@material-ui/icons/Whatshot';
import EqualizerIcon from '@material-ui/icons/Equalizer';
import PersonIcon from '@material-ui/icons/Person';

function NavBar() {
	const [selectedTab, setSelectedTab] = useState(0);

	useEffect(() => {}, [selectedTab, setSelectedTab]);

	const changeTab = (index) => {
		console.log('clickec');
		setSelectedTab(index);
	};

	return (
		<div className='navbar'>
			<TabItem
				onClick={() => changeTab(0)}
				active={selectedTab === 0}
				Icon={WhatshotIcon}
			/>
			<TabItem
				onClick={() => changeTab(1)}
				active={selectedTab === 1}
				Icon={EqualizerIcon}
			/>
			<TabItem
				onClick={() => changeTab(2)}
				active={selectedTab === 2}
				Icon={PersonIcon}
			/>
		</div>
	);
}

export default NavBar;
