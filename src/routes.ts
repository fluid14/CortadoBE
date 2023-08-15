export default {
    "strapiApi": {
        "getCurrentUser": "api/users/me",
        "register": "api/auth/local/register",
        "login": "api/auth/local",
        "update": "api/users/{id}",
        "changePassword": "api/auth/change-password",
        "forgotPassword": "api/auth/forgot-password",
        "resetPassword": "api/auth/reset-password",
        "order": {
            "create": "api/orders",
            "update": "api/orders/{id}",
        }
    }
}
