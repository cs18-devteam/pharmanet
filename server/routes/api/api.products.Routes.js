AppRouter.pipe(req , res).route('/api/products')
?.get(cashierController.getAllProducts)
?.post(cashierController.createProduct);

AppRouter.pipe(req , res).route('/api/products/:productId')
?.get(cashierController.getProductById)
?.update(cashierController.updateProduct)
?.delete(cashierController.deleteProduct);