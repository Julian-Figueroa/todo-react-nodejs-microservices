/* eslint-disable import/no-anonymous-default-export */
import React from 'react';

import UserCreate from './components/UserCreate';
import UserList from './components/UserList';

export default () => {
	return (
		<div className='container'>
			<h1>Create User</h1>
			<UserCreate />
			<br/>
			<h1>Users</h1>
			<UserList />
		</div>
	);
};
