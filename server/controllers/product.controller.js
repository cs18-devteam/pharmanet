const Bridge = require("../common/Bridge");
const { getRequestData } = require("../common/getRequestData");
const { response } = require("../common/response");
const view = require("../common/view");

// ✅ Render admin product management page
exports.renderAdminProductPage = async (req, res) => {
    Bridge.pipe(req, res)
        .connect(Bridge.registry.PRODUCT_SERVICE, {
            method: "GET",
        })
        .request(async (req, res) => {
            return await getRequestData(req);
        })
        .json()
        .resend((data) => {
            return view("admin.products.manage", {
                products: data || [],
            });
        }, 200);
};

// ✅ Create new product
exports.createProduct = async (req, res) => {
    Bridge.pipe(req, res)
        .connect(Bridge.registry.PRODUCT_SERVICE, {
            method: "POST",
        })
        .request(async (req, res) => {
            const productData = await getRequestData(req);
            return productData;
        })
        .json()
        .resend((data) => {
            return view("admin.products.manage", {
                message: "Product created successfully",
                data,
            });
        }, 200);
};

// ✅ Update product details
exports.updateProduct = async (req, res) => {
    Bridge.pipe(req, res)
        .connect(Bridge.registry.PRODUCT_SERVICE, {
            method: "PATCH",
        })
        .request(async (req, res) => {
            const productData = await getRequestData(req);
            return productData;
        })
        .json()
        .resend((data) => {
            return view("admin.products.manage", {
                message: "Product updated successfully",
                data,
            });
        }, 200);
};

// ✅ Delete a product
exports.deleteProduct = async (req, res) => {
    Bridge.pipe(req, res)
        .connect(Bridge.registry.PRODUCT_SERVICE, {
            method: "DELETE",
        })
        .request(async (req, res) => {
            const productData = await getRequestData(req);
            return productData;
        })
        .json()
        .resend((data) => {
            return view("admin.products.manage", {
                message: "Product deleted successfully",
            });
        }, 200);
};

// ✅ Optional: Search products
exports.searchProducts = async (req, res) => {
    Bridge.pipe(req, res)
        .connect(Bridge.registry.PRODUCT_SERVICE, {
            method: "POST", // You can also use GET with query params
        })
        .request(async (req, res) => {
            const searchData = await getRequestData(req);
            return searchData;
        })
        .json()
        .resend((data) => {
            return view("admin.products.manage", {
                message: "Search results",
                products: data || [],
            });
        }, 200);
};
