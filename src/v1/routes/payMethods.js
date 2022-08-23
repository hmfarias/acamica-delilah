const express = require('express');
const router = express.Router();

const { PayMethodsService } = require('../../services');
const { isAdmin } = require('../../middlewares/usersMiddleware');
const {
	validateFields,
	chekPayMethodExist,
} = require('../../middlewares/payMethodsMiddleware');

router
	//POST a new payment method
	.post('/', isAdmin, validateFields, chekPayMethodExist, async (req, res) => {
		const { code, ok, data, message } = await PayMethodsService.newPayMethod(req, res);
		res.status(code).json({ ok, data, message });
	})

	//GET all payment methods
	.get('/', isAdmin, async (req, res) => {
		const { code, ok, data, message } = await PayMethodsService.getPayMethods();
		res.status(code).json({ ok, data, message });
	})

	//GET payment method by id param
	.get('/:id', isAdmin, async (req, res) => {
		const { code, ok, data, message } = await PayMethodsService.getPayMethod(
			req.params.id
		);
		res.status(code).json({ ok, data, message });
	})

	//RESTORE payment method by id
	.put('/:id', async (req, res) => {
		const { code, ok, data, message } = await PayMethodsService.restorePayMethod(
			req.params.id
		);
		res.status(code).json({ ok, data, message });
	})

	//UPDATE payment method
	.put('/', async (req, res) => {
		const { code, ok, data, message } = await PayMethodsService.updatePayMethod(req, res);
		res.status(code).json({ ok, data, message });
	})

	//DELETE payment method by id
	.delete('/:id', isAdmin, async (req, res) => {
		const { code, ok, data, message } = await PayMethodsService.deletePayMethod(
			req.params.id
		);
		res.status(code).json({ ok, data, message });
	});

module.exports = router;
