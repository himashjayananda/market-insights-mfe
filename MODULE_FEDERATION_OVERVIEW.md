# Module Federation Setup - Overview Remote

This setup demonstrates how to use Module Federation with Vite to create a microfrontend architecture where the Overview feature runs as a separate remote application.

## Architecture

- **Host App** (Port 3000): Main application that consumes the remote Overview module
- **Overview Remote** (Port 3002): Standalone application that exposes the Overview component

## Project Structure

```
apps/
├── host-app/                 # Main application (consumer)
│   ├── src/
│   │   ├── components/
│   │   │   └── DynamicOverview.tsx  # Loads remote Overview
│   │   ├── types/
│   │   │   └── module-federation.d.ts  # TypeScript declarations
│   │   └── app/
│   │       └── index.tsx     # Uses DynamicOverview
│   └── vite.config.ts        # Configured to consume overview_remote
│
└── overview-remote/          # Remote application (provider)
    ├── src/
    │   ├── Overview.tsx      # Main Overview component
    │   ├── components/       # Local components
    │   ├── api/             # API client and hooks
    │   ├── mocks/           # Mock data
    │   ├── types/           # TypeScript types
    │   └── utils/           # Utility functions
    └── vite.config.ts        # Configured to expose Overview
```

## How It Works

### 1. Remote App (overview-remote)

The remote app exposes the Overview component:

```typescript
// vite.config.ts
federation({
  name: "overview_remote",
  filename: "remoteEntry.js",
  exposes: {
    "./Overview": "./src/Overview.tsx",
    "./Card": "./src/components/Card.tsx",
  },
  shared: {
    react: { singleton: true },
    "@mui/material": { singleton: true },
    // ... other shared dependencies
  },
});
```

### 2. Host App (host-app)

The host app consumes the remote Overview:

```typescript
// vite.config.ts
federation({
  name: "host_app",
  filename: "remoteEntry.js",
  remotes: {
    overview_remote: "http://localhost:3002/assets/remoteEntry.js",
  },
  shared: {
    react: { singleton: true },
    "@mui/material": { singleton: true },
    // ... other shared dependencies
  },
});
```

### 3. Dynamic Loading

The host app dynamically loads the remote component and passes the ticker prop:

```typescript
// DynamicOverview.tsx
const RemoteOverview = lazy(() => {
  return new Promise<any>((resolve, reject) => {
    if (!(window as any).overview_remote) {
      reject(new Error("Overview remote module not found"));
      return;
    }

    (window as any).overview_remote
      .get("./Overview")
      .then((factory: any) => {
        const Module = factory();
        resolve(Module);
      })
      .catch(reject);
  });
});

// Usage with ticker prop
export const DynamicOverview: React.FC = () => {
  const { ticker } = useParams<{ ticker: string }>();

  return (
    <RemoteErrorBoundary>
      <Suspense fallback={<LoadingFallback />}>
        <RemoteOverview ticker={ticker || ""} />
      </Suspense>
    </RemoteErrorBoundary>
  );
};
```

## Running the Applications

### Start Both Applications

1. **Start the remote app first:**

```bash
cd apps/overview-remote
pnpm dev
# Runs on http://localhost:3002
```

2. **Start the host app:**

```bash
cd apps/host-app
pnpm dev
# Runs on http://localhost:3000
```

### Development Workflow

1. The remote app must be running before the host app can load it
2. Changes to the remote app will hot-reload automatically
3. The host app will automatically reload when the remote changes
4. Both apps share the same dependencies (React, MUI, etc.)

## Key Features

### Error Handling

- Graceful fallback when remote is unavailable
- Error boundary for remote component failures
- Retry mechanism for failed loads

### Type Safety

- TypeScript declarations for remote modules
- Proper typing for dynamic imports

### Shared Dependencies

- React, React-DOM, MUI components are shared as singletons
- Prevents duplicate bundle sizes
- Ensures consistent versions

## Benefits

1. **Independent Development**: Teams can work on Overview separately
2. **Independent Deployment**: Overview can be deployed independently
3. **Technology Flexibility**: Remote can use different tech stack if needed
4. **Performance**: Only loads Overview when needed
5. **Scalability**: Easy to add more remote modules

## Troubleshooting

### Common Issues

1. **Remote not loading**: Ensure overview-remote is running on port 3002
2. **CORS errors**: Both apps have CORS enabled in development
3. **Version conflicts**: Ensure shared dependencies have compatible versions
4. **Type errors**: Check module-federation.d.ts declarations

### Debug Tips

1. Check browser console for module federation errors
2. Verify remote entry point is accessible: http://localhost:3002/assets/remoteEntry.js
3. Use React DevTools to inspect component tree
4. Check network tab for failed module loads

## Next Steps

1. **Add more remote modules**: News, Financials can be separate remotes
2. **Production deployment**: Update remote URLs for production
3. **Authentication**: Add auth context sharing between host and remotes
4. **State management**: Share state between host and remotes if needed
5. **Testing**: Add integration tests for module federation
