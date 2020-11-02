/* eslint-disable import/no-anonymous-default-export */
import React, { useState } from 'react';
import axios from 'axios';

export default ({ userId }) => {
	const [description, setDescription] = useState('');
	const [state, setState] = useState('');
	const onSubmit = async (event) => {
		event.preventDefault();
		await axios.post(`http://users.com/users/${userId}/tasks`, { description, state, userId });
		setDescription('');
		setState('');
	};
	return (
		<div>
			<form onSubmit={onSubmit}>
        <h4>New Task</h4>
				<div className='form-group'>
					<label>Description</label>
					<input
						value={description}
						type='text'
						className='form-control'
						onChange={(e) => setDescription(e.target.value)}
					/>
					<label>State</label>
					<input value={state} type='text' className='form-control' onChange={(e) => setState(e.target.value)} />
				</div>
				<button className='btn btn-primary'>Submit</button>
			</form>
		</div>
	);
};
