/* eslint-disable import/no-anonymous-default-export */
import React, { useState } from 'react';
import axios from 'axios';

export default () => {
	const [name, setName] = useState('');
	const onSubmit = async (event) => {
		event.preventDefault();
		await axios.post('http://users.com/users', { name });
		setName('');
	};
	return (
		<div>
			<form onSubmit={onSubmit}>
				<div className='form-group'>
					<label>Name</label>
					<input value={name} type='text' className='form-control' onChange={(e) => setName(e.target.value)} />
				</div>
				<button className='btn btn-primary'>Submit</button>
			</form>
		</div>
	);
};
