import React from 'react';
import './TabItem.css';

function TabItem({ Icon, active, onClick }) {
	return (
		<div onClick={onClick} className={`tabitem ${active && 'tabitem__active'}`}>
			<Icon className='tabitem__icon' />
		</div>
	);
}

export default TabItem;
