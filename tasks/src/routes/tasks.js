const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const client = require('../db');

// @route GET /tasks/:id
// @desc Get tasks by userId
// @access Public
router.get('/users/:id/tasks', async (req, res) => {
	const id = req.params.id;
	const sql = `SELECT * FROM user_tasks WHERE user_id IN (${id})`;

	try {
		const response = await client.query(sql);
		res.status(200).send(response.rows);
	} catch (err) {
		res.status(500).json({
			message: `Server Error ${err.stack}`,
		});
	}
});

// @route POST /tasks
// @desc Create a task for a user
// @access Public
router.post(
	'/users/:id/tasks',
	[
		check('description', 'Please enter a Description, is required').not().isEmpty(),
		check('state', 'Please enter a state, is required').not().isEmpty(),
		check('userId', 'Please enter the User Id, is required').not().isEmpty(),
	],
	async (req, res) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({
				errors: errors.array(),
			});
		}
		const { description = '', state = 'to do', userId } = req.body;
		const sql = `INSERT INTO user_tasks(description, state, user_id) VALUES('${description}', '${state}', ${userId}) RETURNING *`;

		try {
			const response = await client.query(sql);
			res.status(201).send(response.rows[0]);
		} catch (err) {
			res.status(500).json({
				message: `Server Error: ${err.stack}`,
			});
		}
	}
);

// @route PUT /tasks/:id
// @desc Update a task
// @access Public
router.put('/users/:id/tasks', [
	check('description', 'Please enter a Description, is required').not().isEmpty(),
	check('state', 'Please enter a state, is required').not().isEmpty(),
	check('userId', 'Please enter the User Id, is required').not().isEmpty(),
], async (req, res) => {
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		return res.status(400).json({
			errors: errors.array(),
		});
	}
	const { description, state, userId } = req.body;
	const id = req.params.id;
	const sql = `UPDATE user_tasks 
									SET description = '${description}',
									    state = '${state}'  
								WHERE id IN (${id})
								  AND user_id IN (${userId}) RETURNING *`;

	try {
		const response = await client.query(sql);
		res.status(200).send(response.rows[0]);
	} catch (err) {
		res.status(500).json({
			message: `Server Error: ${err.stack}`,
		});
	}
});

module.exports = router;
