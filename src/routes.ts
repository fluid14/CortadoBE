export default {
    "strapiApi": {
        "getCurrentUser": "api/users/me",
        "getUser": "api/users/{id}?populate=*",
        "register": "api/auth/local/register",
        "login": "api/auth/local",
        "update": "api/users/{id}",
        "changePassword": "api/auth/change-password",
        "forgotPassword": "api/auth/forgot-password",
        "resetPassword": "api/auth/reset-password",
        "order": {
            "get": "api/orders",
            "create": "api/orders",
            "update": "api/orders/{id}",
        }
    }
}
