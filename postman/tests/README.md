# Postman Test Collections

This directory contains test collections for the RBC Accounts API.

## Collections

### 1. accounts.tests.collection.json
**Unit and Integration Tests**

- 20+ individual test cases
- Organized by functionality (Health, Accounts, Balances, Transactions, Transfers)
- Each request has automated test assertions
- Tests individual endpoints and error scenarios

**Run this when:**
- Testing individual endpoints
- Validating API responses
- Checking error handling
- Quick smoke testing

### 2. accounts.e2e.collection.json
**End-to-End Test Workflows**

Two comprehensive workflows:

#### Complete Transfer Workflow (9 steps)
1. List accounts and store initial balances
2. Verify source account balance (before)
3. Verify destination account balance (before)
4. Create transfer
5. Wait for processing
6. Check transfer status (should be "processed")
7. Verify source account balance decreased
8. Verify destination account balance increased
9. Verify transactions were created

#### Account Query Workflow (6 steps)
1. Get all accounts
2. Get specific account details
3. Verify balance endpoint matches
4. Get all transactions
5. Get specific transaction
6. Filter transactions by type

**Run this when:**
- Testing complete user workflows
- Validating end-to-end functionality
- Regression testing
- Pre-deployment checks

## How to Run

### Using Postman Collection Runner

1. Import both collections
2. Select collection to run
3. Choose environment (local or release)
4. Click "Run"
5. View results

### Running E2E Tests

The E2E tests must be run **in sequence** as they depend on previous steps:

```
Complete Transfer Workflow → Runs sequentially → Validates entire flow
```

**Expected duration**: ~3 seconds (includes 2-second wait for transfer processing)

## Test Results

### accounts.tests.collection.json
- **20+ tests**
- Tests status codes, response structure, business logic
- Validates error scenarios

### accounts.e2e.collection.json
- **15 tests** across 2 workflows
- Validates complete user journeys
- Checks state changes (balances, transactions)
- Verifies async operations (transfer processing)

## Variables Used

E2E tests use specific environment variables:

- `e2e_from_account` - Source account for transfers
- `e2e_to_account` - Destination account
- `e2e_transfer_amount` - Amount to transfer (100.00)
- `e2e_from_initial_balance` - Balance before transfer
- `e2e_to_initial_balance` - Balance before transfer
- `e2e_transfer_id` - Created transfer ID
- `e2e_query_account` - Account for query tests
- `e2e_query_txn` - Transaction for query tests

These are automatically set and managed by the test scripts.

## Best Practices

1. **Run E2E tests first** - They test complete workflows
2. **Check Console logs** - E2E tests log detailed info
3. **Sequential execution** - E2E tests must run in order
4. **Fresh environment** - Restart service for consistent state
5. **Review failures** - Check which step failed in E2E workflows

## Example Output

```
Complete Transfer Workflow
  ✓ Status code is 200
  ✓ At least 2 accounts exist
  Transfer Setup:
  From: acc_1001 Balance: 15000
  To: acc_1002 Balance: 45000
  Amount: 100
  
  ✓ Balance matches initial value
  ✓ Transfer created successfully
  ✓ Transfer is processed
  ✓ Balance decreased by transfer amount
  ✓ Balance increased by transfer amount
  ✓ Transfer transactions exist
```

---

**For more details, see [main Postman README](../README.md)**

