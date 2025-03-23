const items = [
    {
        "item": {
          "created_at": "2023-08-12T14:30:00Z",
          "available_products": [
            "balance",
            "investments_auth"
          ],
          "billed_products": [
            "investments"
          ],
          "products": [
            "investments"
          ],
          "error": null,
          "institution_id": "ins_127001",
          "institution_name": "Robinhood",
          "item_id": "Rh9KpM7nQwJRxZ8vLmPqTxwoNz23B5D67hjGt",
          "update_type": "background",
          "webhook": "https://example.com/webhook/robinhood",
          "auth_method": "INSTANT_AUTH",
          "consented_products": [
            "investments"
          ],
          "consented_data_scopes": [
            "Investments"
          ],
          "consented_use_cases": [
            "Track and manage your finances"
          ],
          "consent_expiration_time": null,
          "access_token": "access-production-7b9e2f4d-8c1a-4e5b-a2d3-f6e7890c3d2b",
        },
        "status": {
          "transactions": {
            "last_successful_update": "2025-03-20T10:15:00Z",
            "last_failed_update": null
          },
          "last_webhook": {
            "sent_at": "2025-03-20T10:16:00Z",
            "code_sent": "DEFAULT_UPDATE"
          }
        },
        "request_id": "QwRtYvLmPx9KpM7"
    }, 
    {
        "item": {
          "created_at": "2024-02-01T09:00:00Z",
          "available_products": [
            "identity",
            "transactions"
          ],
          "billed_products": [
            "balance"
          ],
          "products": [
            "balance"
          ],
          "error": null,
          "institution_id": "ins_112600",
          "institution_name": "Capital One",
          "item_id": "Cp5LmPxRtQwJnYvB8vHJmNxwoNz89D1C23hjGt",
          "update_type": "background",
          "webhook": "https://example.com/webhook/capitalone",
          "auth_method": "INSTANT_AUTH",
          "consented_products": [
            "balance"
          ],
          "consented_data_scopes": [
            "Account and balance info"
          ],
          "consented_use_cases": [
            "Track and manage your finances"
          ],
          "consent_expiration_time": "2026-02-01T09:00:00Z", 
          "access_token": "access-production-3d8f9a1c-5e2b-47d9-b6f4-a1c890e5d7f3"
        },
        "status": {
          "transactions": {
            "last_successful_update": "2025-03-15T16:45:00Z",
            "last_failed_update": null
          },
          "last_webhook": {
            "sent_at": "2025-03-15T16:46:00Z",
            "code_sent": "DEFAULT_UPDATE"
          }
        },
        "request_id": "RtQwJnYvB8vLmPx"
      },
      {
        "item": {
          "created_at": "2022-06-25T11:20:00Z",
          "available_products": [
            "assets",
            "liabilities"
          ],
          "billed_products": [
            "investments"
          ],
          "products": [
            "investments",
            "assets"
          ],
          "error": null,
          "institution_id": "ins_115900",
          "institution_name": "Vanguard",
          "item_id": "Vg7RtYvLmPxJnK5HJmB8vZxwoNz45C6D12hjGt",
          "update_type": "background",
          "webhook": "https://example.com/webhook/vanguard",
          "auth_method": "INSTANT_AUTH",
          "consented_products": [
            "investments",
            "assets"
          ],
          "consented_data_scopes": [
            "Investments",
            "Account and balance info"
          ],
          "consented_use_cases": [
            "Track and manage your finances",
            "Plan for retirement"
          ],
          "consent_expiration_time": null,  
          "access_token" : "access-production-e4c7b2f9-1a6d-4f3e-9d8a-5b2c0f7e9a1d", 
        },
        "status": {
          "transactions": {
            "last_successful_update": "2025-03-10T08:30:00Z",
            "last_failed_update": null
          },
          "last_webhook": {
            "sent_at": "2025-03-10T08:31:00Z",
            "code_sent": "DEFAULT_UPDATE"
          }
        },
        "request_id": "LmPxJnK5HJmQwR"
      }, 
      {
        "item": {
          "created_at": "2023-12-15T13:10:00Z",
          "available_products": [
            "identity",
            "transactions"
          ],
          "billed_products": [
            "auth",
            "balance"
          ],
          "products": [
            "auth",
            "balance"
          ],
          "error": {
            "error_type": "INSTITUTION_ERROR",
            "error_code": "INSTITUTION_DOWN",
            "error_code_reason": null,
            "error_message": "Institution is temporarily unavailable.",
            "display_message": "Bank of America is down; please try again later.",
            "request_id": "BoA9KpM7QwRtYv",
            "causes": [],
            "status": 503,
            "documentation_url": "https://plaid.com/docs/errors/institution/#institution_down",
            "suggested_action": "Retry the connection later."
          },
          "institution_id": "ins_100001",
          "institution_name": "Bank of America",
          "item_id": "BoA9KpM7nQwJRxZ8vLmPqTxwoNz67B8D34hjGt",
          "update_type": "background",
          "webhook": "https://example.com/webhook/bofa",
          "auth_method": "INSTANT_AUTH",
          "consented_products": [
            "auth",
            "balance"
          ],
          "consented_data_scopes": [
            "Account and balance info",
            "Account and routing numbers"
          ],
          "consented_use_cases": [
            "Verify your account",
            "Track and manage your finances"
          ],
          "consent_expiration_time": "2025-12-15T13:10:00Z"
        },
        "status": {
          "transactions": {
            "last_successful_update": "2025-02-28T14:00:00Z",
            "last_failed_update": "2025-03-22T12:00:00Z"
          },
          "last_webhook": {
            "sent_at": "2025-03-22T12:01:00Z",
            "code_sent": "ERROR"
          }
        },
        "request_id": "QwJRxZ8vLmPqTx"
      }
]