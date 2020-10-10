import { Box, Card, LinearProgress } from '@material-ui/core';
import React from 'react';
import Lottie from 'react-lottie';
import './Fire.css';

function Fire({ options, height = 400, width = 400, health }) {
	return (
		<Card className='fire'>
			<Box>
				<Box display='flex' justifyContent='center' alignItems='center'>
					<Lottie
						options={options}
						isClickToPauseDisabled
						height={height}
						width={width}
					/>
				</Box>

				<Box
					display='flex'
					justifyContent='center'
					textAlign='center'
					alignItems='center'
				>
					<div className='fire__containerHealth'>
						<LinearProgress
							variant='determinate'
							color='secondary'
							value={health}
						/>
						<span>{health}%</span>
					</div>
				</Box>
			</Box>
		</Card>
	);
}

export default Fire;
