AppRouter.pipe(req ,res).route('/cashier-dashboard')
?.get(cashierController.renderCashierDashboard);

AppRouter.pipe(req ,res).route('/cashier-customer')
?.get(cashierController.renderCashierCustomer);

AppRouter.pipe(req ,res).route('/cashier-createBill')
?.get(cashierController.renderCashierBillPage);

AppRouter.pipe(req ,res).route('/cashier-order')
?.get(cashierController.renderCashierorder);

AppRouter.pipe(req ,res).route('/cashier-sales')
?.get(cashierController.renderCashierSale);

AppRouter.pipe(req ,res).route('/cashier-product')
?.get(cashierController.renderCashierProduct);

AppRouter.pipe(req ,res).route('/Product-management')
?.get(cashierController.cashierProductManagement);

AppRouter.pipe(req, res).route('/api/products')
?.post(cashierController.createProduct);

AppRouter.pipe(req, res).route('/cashier-payment-cash')
?.post(cashierController.paymentcash);

AppRouter.pipe(req, res).route('/cashier-payment-card')
?.post(cashierController.paymentcard);

AppRouter.pipe(req, res).route('/cashier-payment-QR')
?.post(cashierController.paymentQR);

AppRouter.pipe(req, res).route('/cashier-product')
?.put(cashierController.renderCashierProduct);

AppRouter.pipe(req, res).route('/cashier-product')
?.delete(cashierController.renderCashierProduct);