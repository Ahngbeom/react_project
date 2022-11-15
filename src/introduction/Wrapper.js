import React from 'react';

function Wrapper({title, children}) {
	const style = {
		border: '2px solid blue',
		// display: 'flex',
		padding: '16px',
	};

	return (
		<div style={style}>
			<h1>{title}</h1>
			{children}
		</div>
	)
}

export default Wrapper;