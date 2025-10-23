# Quick Start Guide

Get the RBC Accounts Service running in under 5 minutes!

## ⚡ 3-Step Setup

### Step 1: Install Dependencies
```bash
npm install
```

### Step 2: Start the Server
```bash
npm run dev
```

Expected output:
```
🚀 RBC Accounts Service running on http://localhost:3000
📊 Health check available at http://localhost:3000/health
🔑 API Key required for protected endpoints
```

### Step 3: Test the API
```bash
# Health check (no auth)
curl http://localhost:3000/health

# List accounts (with auth)
curl -H "X-API-Key: rbc-demo-key-local-12345" \
  http://localhost:3000/accounts
```

## 🎯 Quick Test with Postman

1. **Open Postman**

2. **Import Collection**:
   - Click **Import** → Select `postman/collections/accounts-demo.postman_collection.json`

3. **Import Environment**:
   - Import `postman/environments/local.postman_environment.json`
   - Activate "RBC Accounts - Local" environment

4. **Run First Request**:
   - Open collection → Health → "Health Check"
   - Click **Send**
   - ✅ Should return 200 OK

5. **Try a Full Flow**:
   - Run "List All Accounts" (stores account IDs)
   - Run "Create Transfer" (stores transfer_id)
   - Wait 2 seconds
   - Run "Get Transfer Status" (see it processed!)

## 🎬 Example: Create a Transfer

**Request:**
```bash
curl -X POST http://localhost:3000/transfers \
  -H "X-API-Key: rbc-demo-key-local-12345" \
  -H "Content-Type: application/json" \
  -d '{
    "fromAccountId": "acc_1001",
    "toAccountId": "acc_1002",
    "amount": 100.00,
    "description": "Test transfer"
  }'
```

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "tfr_1729684800000",
    "status": "queued",
    "amount": 100.00,
    ...
  }
}
```

**Check Status:**
```bash
curl -H "X-API-Key: rbc-demo-key-local-12345" \
  http://localhost:3000/transfers/tfr_1729684800000/status
```

## 📍 Available Endpoints

| Endpoint | Method | Auth Required |
|----------|--------|---------------|
| `/health` | GET | ❌ No |
| `/accounts` | GET | ✅ Yes |
| `/accounts/:id` | GET | ✅ Yes |
| `/accounts/:id/balance` | GET | ✅ Yes |
| `/accounts/:id/transactions` | GET | ✅ Yes |
| `/transactions/:id` | GET | ✅ Yes |
| `/transfers` | POST | ✅ Yes |
| `/transfers/:id/status` | GET | ✅ Yes |

## 🔑 API Keys

- **Local**: `rbc-demo-key-local-12345`
- **Release**: `rbc-demo-key-release-67890`

Add to requests via header:
```
X-API-Key: rbc-demo-key-local-12345
```

## 💡 Pro Tips

1. **Hot Reload**: Code changes auto-restart the server in dev mode
2. **Environment Variables**: Postman tests auto-populate IDs
3. **Transfer Status**: Transfers take ~1.5 seconds to process
4. **Error Testing**: Collection includes negative test cases

## 🐛 Troubleshooting

**Port already in use?**
```bash
# Kill process on port 3000
lsof -ti:3000 | xargs kill -9

# Or use a different port
PORT=3001 npm run dev
```

**Dependencies not installing?**
```bash
# Clear npm cache
npm cache clean --force
rm -rf node_modules package-lock.json
npm install
```

**TypeScript errors?**
```bash
# Rebuild
npm run build
```

## 📚 Next Steps

- Read the full [README.md](./README.md)
- Explore [Postman artifacts](./postman/README.md)
- Review [OpenAPI spec](./postman/specs/accounts-openapi.yaml) for complete API reference
- Run Postman collection tests for comprehensive testing scenarios

---

**Ready to integrate with GitHub Actions? See the main README for workflow details (coming soon).**

