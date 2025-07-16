Use this folder for testing. All the test data, test cases, and test log files will be stored here.

example file structure :

test/
├── data/
│   ├── sample_users.json         # Test data: sample user records
│   ├── sample_products.json      # Test data: sample product records
│   └── sample_orders.json        # Test data: sample order records
├── unit/
│   ├── test_user_service.py      # Unit tests for user service logic
│   ├── test_product_service.py   # Unit tests for product service logic
│   └── test_order_service.py     # Unit tests for order service logic
├── integration/
│   ├── test_user_api.py          # Integration tests for user API endpoints
│   ├── test_product_api.py       # Integration tests for product API endpoints
│   └── test_order_api.py         # Integration tests for order API endpoints
└── readme.txt                    # This file: describes test structure and files

# Example content for sample_users.json
[
    { "id": 1, "name": "Alice", "email": "alice@example.com" },
    { "id": 2, "name": "Bob", "email": "bob@example.com" }
]

# Example JavaScript script for checking login (test_login.js)
const users = [
    { id: 1, name: "Alice", email: "alice@example.com", password: "alice123" },
    { id: 2, name: "Bob", email: "bob@example.com", password: "bob123" }
];

function checkLogin(email, password) {
    return users.some(user => user.email === email && user.password === password);
}

// Example usage:
console.log(checkLogin("alice@example.com", "alice123")); // true
console.log(checkLogin("bob@example.com", "wrongpass"));  // false