const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const client = require('../db');

// @route GET /users
// @desc Get all users
// @access Public
router.get('/users', async (req, res) => {
	const sql = `SELECT * FROM users`;

	try {
		const response = await client.query(sql);
		res.status(200).send(response.rows);
	} catch (err) {
		res.status(500).json({
			message: `Server Error ${err.stack}`,
		});
	}
});

// @route POST /users
// @desc Register a user
// @access Public
router.post('/users', [check('name', 'Please enter a Name, is required').not().isEmpty()], async (req, res) => {
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		return res.status(400).json({
			errors: errors.array(),
		});
	}
	const { name } = req.body;
	const sql = `INSERT INTO users(name) VALUES($1) RETURNING *`;
	const values = [name];

	try {
		const response = await client.query(sql, values);
		res.status(201).send(response.rows[0]);
	} catch (err) {
		res.status(500).json({
			message: `Server Error: ${err.stack}`,
		});
	}
});

// @route PUT /users/:id
// @desc Update a user
// @access Public
router.put('/users/:id', [check('name', 'Please enter a Name, is required').not().isEmpty()], async (req, res) => {
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		return res.status(400).json({
			errors: errors.array(),
		});
	}
  const { name } = req.body;
  const id = req.params.id;
	const sql = `UPDATE users SET name = '${name}' WHERE id IN (${id}) RETURNING *`;

	try {
		const response = await client.query(sql);
		res.status(200).send(response.rows[0]);
	} catch (err) {
		res.status(500).json({
			message: `Server Error: ${err.stack}`,
		});
	}
});

// @route DELETE /users/:id
// @desc Delete a user
// @access Public
router.delete('/users/:id', [check('name', 'Please enter a Name, is required').not().isEmpty()], async (req, res) => {
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		return res.status(400).json({
			errors: errors.array(),
		});
	}
  const id = req.params.id;
	const sql = `DELETE FROM users WHERE id IN (${id}) RETURNING *`;

	try {
		await client.query(sql);
		res.status(200).json({
			message: `Record with ID: ${id} was successfully removed`,
		});
	} catch (err) {
		res.status(500).json({
			message: `Server Error: ${err.stack}`,
		});
	}
});

module.exports = router;
