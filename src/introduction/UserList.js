import React, {useEffect} from 'react';

const User = React.memo(function User({ user, onRemove, onToggle }) {
	useEffect(() => {
		// console.log('user 값이 설정됨');
		console.log("After: ", user);
		return () => {
			// console.log('user 가 바뀌기 전...');
			console.log("Before:", user);
		};
	}, [user]);

	return (
		<div className='user-select-none'>
			<b style={{
				cursor: 'pointer',
				color: user.active ? 'green' : 'black',
				fontSize: 'x-large',
				WebkitUserSelect: 'none',
				MozUserSelect: 'none',
				msUserSelect: 'none',
				userSelect: 'none'
			}}
				onClick={() => onToggle(user.id)}
			>
				{user.username}
			</b>
			<span>({user.email})</span>
			<button type='button' onClick={() => onRemove(user.id)}>삭제</button>
		</div>
	);
});

function UserList({ users, onRemove, onToggle }) {
	return (
		<div>
			{users.map(user => (
				<User key={user.id} user={user} onRemove={onRemove} onToggle={onToggle} />
			))}
		</div>
	);
}

export default React.memo(UserList);