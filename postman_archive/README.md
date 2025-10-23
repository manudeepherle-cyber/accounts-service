# Postman Artifacts

This directory contains all Postman-related artifacts for the RBC Accounts Service demo.

## Directory Structure

```
postman/
├── specs/
│   └── accounts-openapi.yaml              # OpenAPI 3.1 specification
├── collections/
│   └── accounts.api.collection.json       # API routes (generated from spec)
├── tests/
│   ├── accounts.tests.collection.json     # Unit/integration tests
│   └── accounts.e2e.collection.json       # End-to-end test scenarios
└── environments/
    ├── local.postman_environment.json     # Local development environment
    └── release.postman_environment.json   # Release environment
```

## 📋 Importing into Postman

### Quick Import

1. Open Postman Desktop or Web
2. Click **Import** button
3. Drag and drop all files from this directory
4. Select **RBC Accounts - Local** environment from the environment dropdown

### Individual Imports

**API Collection:**
- File: `collections/accounts.api.collection.json`
- Contains: Pure API routes without test scripts (can be regenerated from spec)

**Test Collections:**
- File: `tests/accounts.tests.collection.json`
- Contains: 20+ unit/integration tests with automated assertions

- File: `tests/accounts.e2e.collection.json`
- Contains: End-to-end test scenarios with full workflows

**Environments:**
- Local: `environments/local.postman_environment.json`
- Release: `environments/release.postman_environment.json`
- Contains: base_url, api_key, and dynamic variables

**OpenAPI Spec:**
- File: `specs/accounts-openapi.yaml`
- Generates: Alternative collection from specification
- Use for: API documentation and contract testing

## 🔑 Environment Variables

### Shared Variables

| Variable | Description | Set By |
|----------|-------------|--------|
| `base_url` | API base URL | Pre-configured |
| `api_key` | Authentication key | Pre-configured |
| `account_id` | First account ID | Auto-set by "List All Accounts" |
| `account_id_2` | Second account ID | Auto-set by "List All Accounts" |
| `transaction_id` | Sample transaction ID | Auto-set by "Get Account Transactions" |
| `transfer_id` | Created transfer ID | Auto-set by "Create Transfer" |

### Local Environment

- **Base URL**: `http://localhost:3000`
- **API Key**: `rbc-demo-key-local-12345`

### Release Environment

- **Base URL**: `https://accounts-api-release.rbc.demo.com`
- **API Key**: `rbc-demo-key-release-67890`

## 🧪 Running Tests

### Collection Runner

1. Select the collection
2. Click **Run** (or use Runner)
3. Select environment
4. Click **Run RBC Accounts Service Demo**

**Recommended Order:**
1. Health → Accounts → Balances → Transactions → Transfers

### Individual Requests

Each request includes test scripts that:
- Validate response status codes
- Check response structure
- Verify data types
- Store variables for subsequent requests

## 📊 Test Coverage

The collection includes:

- ✅ **Positive Tests**: Valid requests with expected success
- ❌ **Negative Tests**: Invalid inputs with expected errors
- 🔄 **State Management**: Variables passed between requests
- 📝 **Validation**: Schema and business logic validation

## 🔄 Git Workflow Integration

These artifacts are version-controlled alongside the codebase:

1. **Develop locally**: Modify collection/environments as needed
2. **Commit changes**: `git add postman/ && git commit`
3. **Push to branch**: `git push origin feature/my-feature`
4. **Merge to release**: Triggers GitHub Action (coming soon)
5. **Auto-sync**: Artifacts pushed to Postman Cloud

## 📚 OpenAPI Specification

The `specs/accounts-openapi.yaml` file serves multiple purposes:

- **Documentation**: Complete API reference
- **Code Generation**: Generate client SDKs
- **Validation**: Contract testing and schema validation
- **Import**: Create Postman collections from spec

### Viewing the Spec

1. Import into Postman
2. Or view in Swagger Editor: https://editor.swagger.io/
3. Or use any OpenAPI-compatible tool

## 🎯 Best Practices

1. **Always use environments**: Don't hardcode URLs or keys
2. **Run sequentially first time**: Let variables populate
3. **Check Console**: View variable updates and logs
4. **Update specs with code**: Keep OpenAPI in sync with implementation

## 🤝 Contributing

When updating Postman artifacts:

1. Test locally first
2. Update OpenAPI spec if endpoints change
3. Add/update tests for new functionality
4. Update environment templates if new variables needed
5. Document changes in commit message

---

**For more details, see the main [README.md](../README.md)**

