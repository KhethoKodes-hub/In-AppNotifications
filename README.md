# Waterbucks Secure Transaction Authorisation

A frontend proof-of-concept showing how a dedicated Waterbucks mobile app can act as a trusted transaction authorisation and notification channel within the Pinnacle Rewards ecosystem.

## Demo

The interface includes:

- A Waterbucks Member Portal for initiating sensitive actions
- A realistic Waterbucks mobile app simulator
- Simulated security notifications
- Approval and rejection workflows
- Biometric verification animation
- Live transaction status and timeline updates
- Scenario switching for different sensitive actions
- A visual explanation of the trusted authorisation flow

## Demo Flow

1. Select a scenario from the **Demo scenario** selector.
2. Click **Redeem now** in the member portal.
3. A sensitive transaction is placed into pending authorisation.
4. A simulated Waterbucks Security notification appears on the phone.
5. Click the notification to open the authorisation screen.
6. Choose **Approve** or **Reject**.
7. Approval runs a biometric simulation before completing the action.
8. The desktop portal updates automatically with the final result.

Use **Reset Demo** to return the experience to its initial state.

## Available Scenarios

- High Value Redemption
- New Device Login
- Password Change
- Suspicious Activity

## Mock Member

- **Name:** Khetho Mngomezulu
- **Member ID:** WB-2026-001
- **Starting balance:** 25,000 WB
- **Redemption:** Premium Reward Voucher for 10,000 WB

## Technology

- React
- TypeScript
- Vite
- Tailwind CSS integration
- Lucide icons
- Local React state only

## Getting Started

### Requirements

- Node.js 18 or newer
- npm

### Install dependencies

```bash
npm install
```

### Start the development server

```bash
npm run dev
```

Open the local URL shown by Vite, usually `http://localhost:5173/`.

### Create a production build

```bash
npm run build
```

### Preview the production build

```bash
npm run preview
```

## Scope

This is a frontend demonstration only. It uses mock data and simulated real-time behaviour. It does not include authentication, external APIs, databases, or real push notification services.
