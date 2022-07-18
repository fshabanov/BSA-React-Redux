import React from 'react';

interface Props {}

const Loading: React.FC<Props> = () => {
	return (
		<div className='loader_container'>
			<div className='loader'></div>
		</div>
	);
};

export default Loading;
