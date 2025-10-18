#!/bin/bash

echo "🚀 Testing Module Federation Setup"
echo "=================================="

echo ""
echo "1. Starting Overview Remote App (Port 3002)..."
cd apps/overview-remote
pnpm dev &
REMOTE_PID=$!

echo "   Remote app started with PID: $REMOTE_PID"
echo "   Waiting for remote app to be ready..."

# Wait a bit for the remote app to start
sleep 5

echo ""
echo "2. Starting Host App (Port 3000)..."
cd ../host-app
pnpm dev &
HOST_PID=$!

echo "   Host app started with PID: $HOST_PID"
echo "   Waiting for host app to be ready..."

# Wait a bit for the host app to start
sleep 5

echo ""
echo "✅ Both applications should now be running!"
echo ""
echo "📱 Access Points:"
echo "   • Host App: http://localhost:3000"
echo "   • Remote App: http://localhost:3002"
echo "   • Remote Entry: http://localhost:3002/assets/remoteEntry.js"
echo ""
echo "🧪 Test Steps:"
echo "   1. Open http://localhost:3000 in your browser"
echo "   2. Navigate to any company (e.g., /company/AAPL)"
echo "   3. The Overview tab should load from the remote app"
echo "   4. Check browser console for any module federation errors"
echo ""
echo "🛑 To stop both apps, run:"
echo "   kill $REMOTE_PID $HOST_PID"
echo ""
echo "Press Ctrl+C to stop this script (apps will continue running)"
echo ""

# Keep script running
wait
