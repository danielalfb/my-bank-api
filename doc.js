export const swaggerDocument = {
  "swagger": "2.0",
  "info": {
    "description": "Account Management API.",
    "version": "1.0.0",
    "title": "My Bank API"
  },
  "host": "localhost:3000",
  "tags": [{
    "name": "account",
    "description": "Account Management"
  }],
  "paths": {
    "/accounts": {
      "get": {
        "tags": [
          "account"
        ],
        "summary": "Get all exisisting accounts",
        "description": "Visualize all the account inside the API",
        "produces": [
          "application/json"
        ],
        "responses": {
          "200": {
            "description": "Successful operation",
            "schema": {
              "type": "array",
              "items": {
                "$ref": "#/definitions/Account"
              }
            }
          },
          "400": {
            "description": "Error ocurred"
          }
        }
      },
      "post": {
        "tags": [
          "account"
        ],
        "summary": "Add a new account",
        "description": "Add accounts to the API",
        "consumes": [
          "application/json"
        ],
        "parameters": [{
          "in": "body",
          "name": "body",
          "description": "Add the client's name and balance",
          "required": true,
          "schema": {
            "$ref": "#/definitions/Account"
          }
        }],
        "responses": {
          "200": {
            "description": "Successful operation"
          },
          "400": {
            "description": "Error ocurred"
          }
        }
      },
      "put": {
        "tags": [
          "account"
        ],
        "summary": "Update an existing account's data",
        "description": "Edit an existing account's information",
        "consumes": [
          "application/json"
        ],
        "parameters": [{
          "in": "body",
          "name": "body",
          "description": "Insert the client's information (including {id, name, balance}) to update the field {name}",
          "required": true,
          "schema": {
            "$ref": "#/definitions/Edit"
          }
        }],
        "responses": {
          "200": {
            "description": "Successful operation"
          },
          "400": {
            "description": "Error ocurred"
          }
        }
      }
    },
    "/accounts/:id": {
      "get": {
        "tags": [
          "account"
        ],
        "summary": "Get a single existing account",
        "description": "Get a single existing account using: /accounts/id",
        "consumes": [
          "application/json"
        ],
        "produces": [
          "application/json"
        ],
        "parameters": [{
          "in": "path",
          "name": "/accounts/id",
          "type": "string",
          "minimum": 1,
          "required": true,
          "description": "The client ID"
        }],
        "responses": {
          "200": {
            "description": "Successful operation",
            "schema": {
              "type": "array",
              "items": {
                "$ref": "#/definitions/Edit"
              }
            }
          },
          "400": {
            "description": "Error ocurred"
          }
        }
      },
      "delete": {
        "tags": [
          "account"
        ],
        "summary": "Delete an existing account",
        "description": "Find and delete an existing account.",
        "consumes": [
          "application/json"
        ],
        "parameters": [{
          "in": "path",
          "name": "/accounts/id",
          "type": "string",
          "minimum": 1,
          "required": true,
          "description": "The client ID"
        }],
        "responses": {
          "200": {
            "description": "Successful operation - Account deleted - ID: {id}"
          },
          "400": {
            "description": "Error ocurred"
          }
        }
      }
    },
    "/accounts/transaction": {
      "post": {
        "tags": [
          "account"
        ],
        "summary": "Create a transaction",
        "description": "Create withdraws and deposits.",
        "produces": [
          "application/json"
        ],
        "parameters": [{
            "in": "body",
            "name": "withdraw",
            "description": "Create a withdraw in an existing account's balance",
            "required": false,
            "schema": {
              "$ref": "#/definitions/Withdraw"
            }
          },
          {
            "in": "body",
            "name": "deposit",
            "description": "Create a deposit in an existing account's balance",
            "required": false,
            "schema": {
              "$ref": "#/definitions/Deposit"
            }
          }
        ],
        "responses": {
          "200": {
            "description": "Successful withdraw operation",
            "schema": {
              "type": "array",
              "items": {
                "$ref": "#/definitions/WithdrawRes"
              }
            }
          },
          "201": {
            "description": "Successful deposit operation",
            "schema": {
              "type": "array",
              "items": {
                "$ref": "#/definitions/DepositRes"
              }
            }
          },
          "400": {
            "description": "Error ocurred"
          }
        }
      }
    }
  },
  "definitions": {
    "Account": {
      "type": "object",
      "properties": {
        "name": {
          "type": "string",
          "example": "Daniela Barbosa"
        },
        "balance": {
          "type": "integer",
          "example": 100
        }
      }
    },
    "Edit": {
      "type": "object",
      "properties": {
        "id": {
          "type": "integer",
          "example": 1
        },
        "name": {
          "type": "string",
          "example": "Daniela Aparecida Barbosa"
        },
        "balance": {
          "type": "integer",
          "example": 100
        }
      }
    },
    "Withdraw": {
      "type": "object",
      "properties": {
        "id": {
          "type": "integer",
          "example": 1
        },
        "value": {
          "type": "integer",
          "example": -100
        }
      }
    },
    "Deposit": {
      "type": "object",
      "properties": {
        "id": {
          "type": "integer",
          "example": 1
        },
        "value": {
          "type": "integer",
          "example": 20
        }
      }
    },
    "WithdrawRes": {
      "type": "object",
      "properties": {
        "id": {
          "type": "integer",
          "example": 1
        },
        "name": {
          "type": "string",
          "example": "Daniela Aparecida Barbosa"
        },
        "balance": {
          "type": "integer",
          "example": 0
        }
      }
    },
    "DepositRes": {
      "type": "object",
      "properties": {
        "id": {
          "type": "integer",
          "example": 1
        },
        "name": {
          "type": "string",
          "example": "Daniela Aparecida Barbosa"
        },
        "balance": {
          "type": "integer",
          "example": 120
        }
      }
    }
  },
  "externalDocs": {
    "description": "Find out more about Swagger",
    "url": "http://swagger.io"
  }
};