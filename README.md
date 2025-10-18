## Unleash – Feature Toggle Platform

## 1. What is Unleash?

**Unleash** is an open-source **feature management platform** (feature toggle system) that allows developers to **control which features are enabled or disabled** in an application without deploying new code.

**Key Features:**

- Enable or disable features dynamically.
    
- Gradual rollout of new features (percentage-based activation).
    
- Target features to specific user segments.
    
- Reduce risks in production by safely testing new functionality.
    
- Integration with multiple programming languages and frameworks (Node.js, Java, .NET, Python, React, etc.).
    

**Use Cases:**

- A/B testing new features.
    
- Gradual rollout of experimental features.
    
- Emergency disabling of buggy features.
    
- Testing features for specific user segments.
    

---

# Unleash Feature Flag Demo - React App

This project demonstrates how to integrate **Unleash Feature Flags** into a React application using the **Unleash Proxy Client**.

---

## Table of Contents
- [Overview](#overview)
- [Prerequisites](#prerequisites)
- [Setup](#setup)
- [Running the App](#running-the-app)
- [Usage](#usage)
- [Next Steps](#next-steps)

---

## Overview

**Unleash** is a feature management platform that allows you to **roll out new features gradually** and **control feature access** for different environments or users.

This demo includes:

- A React app with a feature flag component.
- Integration with the **Unleash Proxy Client** to safely fetch feature flag states.
- Real-time updates when flags are toggled in the Unleash dashboard.

---

## Prerequisites

- Node.js (v20+)
- npm (v10+)
- Running **Unleash Server** with a proxy configured.
- React development environment.

---
### Step 1 – Start a PostgreSQL Container
```
docker run -d \
  --name unleash-db \
  -e POSTGRES_USER=unleash \
  -e POSTGRES_PASSWORD=unleash \
  -e POSTGRES_DB=unleash \
  -p 5432:5432 \
  postgres:15
```
### Step 2 – Run Unleash Server Connected to PostgreSQL
```
docker run -d \
  --name unleash \
  -p 4242:4242 \
  --link unleash-db:db \
  -e DATABASE_URL=postgres://unleash:unleash@db:5432/unleash \
  -e DATABASE_SSL=false \
  -e UNLEASH_ADMIN_API_TOKEN=admin-api-token \
  unleashorg/unleash-server
```

## Step 3 – Verify Containers Are Running
```
docker ps
```
You should see both `unleash-db` and `unleash` containers running.

### Step 4 – Access the Dashboard

Open your browser:
```
http://<server-ip>:4242
```

**Notes:**

- `DATABASE_URL` points to the PostgreSQL container.
    
- `UNLEASH_ADMIN_API_TOKEN` sets the admin API token for dashboard login.
    
- Exposed dashboard URL: `http://localhost:4242`.

**Default credentials:**

- Username: `admin`
    
- Password: `unleash4all` (check latest Docker image for defaults)

<img width="960" height="449" alt="Screenshot 2025-10-18 174605" src="https://github.com/user-attachments/assets/d5b0db0d-8bf0-49fc-b040-124b20ae02fa" />


##  1. Create a Feature Flag

1. Click **“Create a feature flag”** in the dashboard.
    
2. Give it a name, e.g., `new-feature`.
    
3. Impression Data: **enabled**.

<img width="734" height="281" alt="Screenshot 2025-10-18 174709" src="https://github.com/user-attachments/assets/555518be-2ff7-4651-b50c-3d17be258e68" />


## 2. Connect an SDK to Your Project

1. Click **“Connect an SDK”**.
    
2. For a React app, use the **JavaScript / React SDK**.

3. Generate API key and save it.

Setup the SDK

1. Install the SDK
```
npm install @unleash/proxy-client-react unleash-proxy-client
```

2. Initialize Unleash
```
import { createRoot } from 'react-dom/client';
import { FlagProvider } from '@unleash/proxy-client-react';

const config = {
  url: 'http://localhost:4242/api/frontend/',
  clientKey: 'default:development.425146ad323e3e24749bdd575a9db070107f56a40796ba6879729276', // in production use environment variable
  appName: 'unleash-onboarding-react',
};

const root = createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <FlagProvider config={config}>
      <App />
    </FlagProvider>
  </React.StrictMode>
);
```

3. Check feature flag status
```
import { useFlag } from '@unleash/proxy-client-react';

const TestComponent = () => {
  const enabled = useFlag('new-feature');

  return enabled ? 'Flag is enabled' : 'Flag is disabled'
};

BackComplete
```

---
### 1️⃣ Install `create-react-app` (if not installed)

`npm install -g create-react-app`

### 2️⃣ Create a React App

If you want the project inside your current folder:

`npx create-react-app react-app`




---
## 1️⃣ Install Node.js and npm

```
# Enable NodeSource repository for Node 20.x (or latest LTS)
curl -fsSL https://rpm.nodesource.com/setup_20.x | bash -

# Install Node.js and npm
yum install -y nodejs

# Verify installation
node -v
npm -v
```

### 3️⃣ Install Unleash SDK in Your React Project

Navigate to your React project folder and run:
```
npm install @unleash/proxy-client-react unleash-proxy-client
```


---

## Setup

1. Clone this repository:

```bash
git clone <your-repo-url>
cd strapi-13-react
```
2. Install dependencies:

    `npm install`

3. Configure Unleash:

Create a file `src/unleash.js`:

```
import { UnleashClient } from 'unleash-proxy-client';

const unleash = new UnleashClient({
  url: 'http://localhost:4242/proxy',  // Replace with your Unleash proxy URL
  clientKey: 'your-proxy-client-key',  // Generate this from your Unleash dashboard
  appName: 'my-react-app',
});

export default unleash;
```

4. Create a feature component `src/FeatureComponent.js`:

```
import React, { useEffect, useState } from 'react';
import unleash from './unleash';

const FeatureComponent = () => {
  const [isEnabled, setIsEnabled] = useState(false);

  useEffect(() => {
    unleash.on('update', () => {
      setIsEnabled(unleash.isEnabled('new-feature'));
    });

    setIsEnabled(unleash.isEnabled('new-feature'));
  }, []);

  return (
    <div>
      {isEnabled ? <p>New Feature Enabled!</p> : <p>Old Feature</p>}
    </div>
  );
};

export default FeatureComponent;
```
5. Import the feature component in `src/App.js`:
```
import React from 'react';
import FeatureComponent from './FeatureComponent';

function App() {
  return (
    <div className="App">
      <h1>Unleash Feature Flag Demo</h1>
      <FeatureComponent />
    </div>
  );
}

export default App;
```
## Running the App

Start the development server:
```
npm start
```
- Open your browser and navigate to [http://localhost:3000](http://localhost:3000).

## Usage

- Initially, the app will display **Old Feature** if the flag `new-feature` is disabled.
    
- Enable the feature flag `new-feature` in the Unleash dashboard to see the component update in real-time to **New Feature Enabled!**

## Next Steps

- Add multiple feature flags to manage complex app features.
    
- Use **Unleash SDKs** for backend integrations (Node.js, Java, Python, etc.).
    
- Integrate with CI/CD pipelines to automatically toggle features based on deployments.
    
- Explore Unleash strategies like gradual rollouts, user segmentation, and custom constraints.
