# RBC Accounts Service Demo

A comprehensive demo banking API service showcasing **Postman × GitHub integration** for RBC and Autodesk use cases. This project demonstrates how Git can serve as the source of truth for both code and Postman artifacts (collections, environments, OpenAPI specs), with automated cloud sync capabilities.

## 🎯 Project Overview

This service provides a realistic banking API with account management, transaction tracking, and fund transfer capabilities. It includes:

- **Production-ready TypeScript + Express service** with API key authentication
- **8 RESTful endpoints** with comprehensive validation and error handling
- **In-memory data store** with seeded accounts and transactions
- **Complete Postman artifacts** including collections, environments, and OpenAPI 3.1 spec
- **Ready for CI/CD integration** with GitHub Actions (coming soon)

## 📁 Project Structure

```
RBC/
├── src/
│   ├── index.ts                 # Main application entry point
│   ├── types.ts                 # TypeScript type definitions
│   ├── data.ts                  # In-memory data store & business logic
│   ├── middleware/
│   │   └── auth.ts              # API key authentication middleware
│   └── routes/
│       ├── accounts.ts          # Account endpoints
│       ├── transactions.ts      # Transaction endpoints
│       └── transfers.ts         # Transfer endpoints
├── postman/
│   ├── specs/
│   │   └── accounts-openapi.yaml           # OpenAPI 3.1 specification
│   ├── collections/
│   │   └── accounts-demo.postman_collection.json
│   └── environments/
│       ├── local.postman_environment.json
│       └── release.postman_environment.json
├── package.json
├── tsconfig.json
└── README.md
```

## 🚀 Quick Start

### Prerequisites

- **Node.js** (v18 or higher)
- **npm** or **yarn**
- **Postman** (desktop app or web)

### Installation

1. **Clone the repository**:
   ```bash
   git clone <repository-url>
   cd RBC
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start the development server**:
   ```bash
   npm run dev
   ```

   The service will start on `http://localhost:3000`

4. **Verify the service is running**:
   ```bash
   curl http://localhost:3000/health
   ```

   Expected response:
   ```json
   {
     "status": "healthy",
     "service": "RBC Accounts Service",
     "version": "1.0.0",
     "timestamp": "2024-10-23T10:00:00Z",
     "uptime": 3.5
   }
   ```

## 📡 API Endpoints

### Authentication

All endpoints (except `/health`) require API key authentication via the `X-API-Key` header.

**Valid API Keys:**
- Local: `rbc-demo-key-local-12345`
- Release: `rbc-demo-key-release-67890`

### Available Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/health` | Health check (no auth required) |
| `GET` | `/accounts` | List all accounts |
| `GET` | `/accounts/:id` | Get account details |
| `GET` | `/accounts/:id/balance` | Get account balance |
| `GET` | `/accounts/:id/transactions` | Get account transactions (supports filters) |
| `GET` | `/transactions/:id` | Get transaction details |
| `POST` | `/transfers` | Create a new transfer |
| `GET` | `/transfers/:id/status` | Get transfer status |

### Query Parameters (Transactions)

- `from` - Start date (ISO 8601 format)
- `to` - End date (ISO 8601 format)
- `type` - Transaction type (`debit`, `credit`, `transfer`)

## 🧪 Testing with Postman

### Import Postman Artifacts

1. **Open Postman** (desktop or web)

2. **Import collections**:
   - API Collection: `postman/collections/accounts.api.collection.json` (pure routes)
   - Test Suite: `postman/tests/accounts.tests.collection.json` (unit/integration tests)
   - E2E Tests: `postman/tests/accounts.e2e.collection.json` (end-to-end scenarios)

3. **Import the environment**:
   - Click on "Environments" in the sidebar
   - Click "Import"
   - Select `postman/environments/local.postman_environment.json`
   - Activate the "RBC Accounts - Local" environment

4. **Import the OpenAPI spec** (optional):
   - Click "Import"
   - Select `postman/specs/accounts-openapi.yaml`
   - This generates a separate collection from the spec

### Running the Collections

**Unit/Integration Tests** (`accounts.tests.collection.json`):
- Organized into folders: Health, Accounts, Balances, Transactions, Transfers
- 20+ individual test cases with assertions
- Run individually or as a suite

**End-to-End Tests** (`accounts.e2e.collection.json`):
- **Complete Transfer Workflow**: Creates transfer, verifies processing, checks balances
- **Account Query Workflow**: Tests full query flow from listing to filtering

**Recommended Test Flow:**

1. Run E2E: Complete Transfer Workflow (9 steps, ~3 seconds)
   - Validates entire transfer lifecycle
   - Verifies balance changes
   - Confirms transaction creation
   
2. Run E2E: Account Query Workflow (6 steps)
   - Tests all query endpoints
   - Validates filtering
   - Confirms data consistency

### Collection Features

**API Collection**:
- Pure API routes without tests
- Can be regenerated from OpenAPI spec
- Clean interface for manual testing

**Test Collections**:
- **Automated Assertions**: Validates responses, business logic, data integrity
- **Environment Variables**: Auto-stores IDs and values between requests
- **Error Scenarios**: Negative test cases (invalid amounts, insufficient funds, etc.)
- **E2E Workflows**: Complete user journeys with multi-step validation
- **Balance Verification**: Before/after comparisons in transfers

## 💾 Sample Data

### Accounts

| ID | Account Number | Type | Customer | Balance (CAD) |
|----|----------------|------|----------|---------------|
| `acc_1001` | 1234567890 | Checking | Alice Johnson | $15,000.00 |
| `acc_1002` | 0987654321 | Savings | Bob Smith | $45,000.00 |
| `acc_1003` | 5555666677 | Credit | Carol White | -$2,500.00 |

### Sample Transactions

- 10 pre-seeded transactions across all accounts
- Mix of debits, credits, and transfers
- Date range: October 2024

## 🔐 Authentication Examples

### cURL with API Key

```bash
curl -H "X-API-Key: rbc-demo-key-local-12345" \
  http://localhost:3000/accounts
```

### Postman

1. Select the collection
2. Go to "Authorization" tab
3. Type: "API Key"
4. Key: `X-API-Key`
5. Value: `{{api_key}}` (uses environment variable)

## 🎬 Example Request/Response

### Create Transfer

**Request:**
```bash
POST /transfers
Content-Type: application/json
X-API-Key: rbc-demo-key-local-12345

{
  "fromAccountId": "acc_1001",
  "toAccountId": "acc_1002",
  "amount": 500.00,
  "description": "Monthly savings"
}
```

**Response (201 Created):**
```json
{
  "success": true,
  "data": {
    "id": "tfr_1729684800000",
    "fromAccountId": "acc_1001",
    "toAccountId": "acc_1002",
    "amount": 500.00,
    "currency": "CAD",
    "description": "Monthly savings",
    "status": "queued",
    "createdAt": "2024-10-23T10:00:00.000Z"
  },
  "message": "Transfer created successfully and queued for processing.",
  "timestamp": "2024-10-23T10:00:00.000Z"
}
```

### Check Transfer Status

**Request:**
```bash
GET /transfers/tfr_1729684800000/status
X-API-Key: rbc-demo-key-local-12345
```

**Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "transferId": "tfr_1729684800000",
    "status": "processed",
    "fromAccountId": "acc_1001",
    "toAccountId": "acc_1002",
    "amount": 500.00,
    "currency": "CAD",
    "createdAt": "2024-10-23T10:00:00.000Z",
    "processedAt": "2024-10-23T10:00:01.500Z",
    "estimatedCompletionTime": null
  },
  "timestamp": "2024-10-23T10:00:05.000Z"
}
```

## 🔄 Transfer Processing Flow

Transfers go through the following states:

1. **queued** (0-500ms) - Transfer created and queued
2. **processing** (500ms-1500ms) - Transfer being processed
3. **processed** - Transfer completed, balances updated, transactions created
4. **failed** - Transfer failed (e.g., account not found)

The service simulates async processing with a ~1.5 second total time from creation to completion.

## 🛠️ Development

### Available Scripts

- `npm run dev` - Start development server with hot reload
- `npm run build` - Build TypeScript to JavaScript
- `npm start` - Run production build
- `npm run lint` - Lint TypeScript code

### Build for Production

```bash
npm run build
npm start
```

The compiled JavaScript will be in the `dist/` directory.

## 📋 Validation & Error Handling

The service includes comprehensive validation:

- **API Key Validation**: 401/403 for missing/invalid keys
- **Amount Validation**: Must be positive number > 0
- **Account Validation**: Checks account exists and is active
- **Sufficient Funds**: Validates balance before transfers
- **Transaction Type**: Only accepts `debit`, `credit`, `transfer`
- **Date Filters**: Proper date range validation

### Error Response Format

```json
{
  "error": "Bad Request",
  "message": "Amount must be a positive number greater than 0.",
  "statusCode": 400,
  "timestamp": "2024-10-23T10:00:00Z"
}
```

## 🚢 Next Steps: GitHub Actions Integration

*Coming soon: Automated deployment and Postman Cloud sync on merge to `release/**` branches.*

The planned workflow will:
1. Trigger on merge to `release/**` branches
2. Run tests and build the service
3. Deploy to release environment
4. Push updated Postman artifacts to Postman Cloud via API
5. Update documentation and notify team

## 📚 Documentation

- **API Reference**: See `postman/specs/accounts-openapi.yaml` (OpenAPI 3.1 spec)
- **Testing Guide**: See Postman collection test scripts in `postman/collections/`
- **Quick Start**: See [QUICKSTART.md](./QUICKSTART.md)

### Additional Resources

- [Postman API Documentation](https://learning.postman.com/docs/postman-api/intro-api/)
- [OpenAPI 3.1 Specification](https://spec.openapis.org/oas/v3.1.0)
- [Express.js Documentation](https://expressjs.com/)
- [TypeScript Documentation](https://www.typescriptlang.org/docs/)

## 📝 License

MIT License - See LICENSE file for details

## 🤝 Contributing

This is a demo project for RBC and Autodesk use cases. For questions or improvements, please contact the RBC Demo Team.

---

**Built with ❤️ for demonstrating Postman × GitHub integration**

