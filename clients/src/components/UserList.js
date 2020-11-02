/* eslint-disable import/no-anonymous-default-export */
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TaskList from './TaskList';
import TaskCreate from './TaskCreate';

export default () => {
	const [users, setUsers] = useState({});

	const fetchUsers = async () => {
		const res = await axios.get('http://users.com/users');
		setUsers(res.data);
	};

	useEffect(() => {
		fetchUsers();
	}, []);

	const renderedUsers = Object.values(users).map((user) => {
		return (
			<div className='card' style={{ width: '30%', marginBottom: '20px' }} key={user.id}>
				<div className='card-body'>
					<h3>{user.name}</h3>
          <h4>Tasks:</h4>
          <TaskList userId={user.id}/>
          <hr/>
          <TaskCreate userId={user.id}/>
				</div>
			</div>
		);
	});

	return <div className='d-flex flex-row flex-wrap justify-content-between'>{renderedUsers}</div>;
};
