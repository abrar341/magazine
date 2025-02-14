This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.js`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
# magazine

API’s and Payloads
Overview
This document provides an overview of the API endpoints for saving data. It includes the API URLs, request payloads, and details on how data is structured and sent via API. 
1.	Create Magazines – create a magazine with define which plans are there.
•	This API allows for the creation of a magazine. Currently, it is managed through a simple API to maintain data consistency. In the future, specific user roles or permissions may be required to create a magazine.
https://magazine-one-tau.vercel.app/api/magazines/createMagazines
Payload
{
    "magazines": [
        {
            "name": "Tech Weekly",
            "description": "Latest tech news and trends",
            "base_price": 15,
            "plans": ["67ae4b78dc229fab2dbafb5b", "67ae4b78dc229fab2dbafb5c"]
        },
        {
            "name": "Health & Wellness",
            "description": "Tips for a healthier lifestyle",
            "base_price": 10,
            "plans": ["67ae4b78dc229fab2dbafb5d", "67ae4b78dc229fab2dbafb5e"]
        }
    ]
}
2.	Create Plans
For now, predefined plans will be created in the database using a command-line script to ensure data consistency.
Scripts/seedPlan.js
node Scripts/seedPlan.js

3.	Register
https://magazine-one-tau.vercel.app/api/auth/register
Payload
{
  "name": "Ali",
  "email": "ahmed@gmail.com",
  "password": "123456"
}

4.	Login
https://magazine-one-tau.vercel.app/api/auth/login
Payload
{
  "email": "abrar@gmail.com",
  "password": "123456"
}

5.	Magazines-get all magazines
https://magazine-one-tau.vercel.app/api/magazines
6.	Create Subscription- make a subscription of magazine with any plan 
https://magazine-one-tau.vercel.app/api/subscriptions/create
Payload

{
  "magazine_id": "67adea2c67a9bed5087a675d",
  "plan_id": "67ade7612dcc1e2f98e14fe8",
  "price": 100
}


7.	Retrieve Subscriptions
https://magazine-one-tau.vercel.app/api/subscriptions
8.	Modify Subscription
https://magazine-one-tau.vercel.app/api/subscriptions/modify
Payload
{
  "magazine_id": "67adea2c67a9bed5087a675d",
  "new_plan_id": "67ade7612dcc1e2f98e14fea",
  "price": 500	
}

9.	Delete Subscription – cancel any subscription plan
https://magazine-one-tau.vercel.app/api/subscriptions/cancel
Payload
{
  "magazine_id": "67adea2c67a9bed5087a675d"
}

