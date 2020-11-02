/* eslint-disable import/no-anonymous-default-export */
import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default ({ userId }) => {
	const [tasks, setTasks] = useState({});

	const fetchTasks = async () => {
		const res = await axios.get(`http://users.com/users/${userId}/tasks`);
		setTasks(res.data);
	};

	useEffect(() => {
    fetchTasks();
    // eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const renderedTasks = Object.values(tasks).map((task) => {
		return <li key={task.id}><strong>{task.description}</strong> - {task.state}</li>;
	});

	return <ul>{renderedTasks}</ul>;
};
