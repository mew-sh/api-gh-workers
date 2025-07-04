# GitHub API Proxy Worker

A Cloudflare Worker that proxies requests to GitHub API, deployed to `api-gh.hypnguyen.workers.dev` with custom domain `api.mewsh.cc`.

## Setup

### Prerequisites
- Cloudflare account
- GitHub repository
- Custom domain configured in Cloudflare

### GitHub Secrets Configuration

Add the following secrets to your GitHub repository (Settings → Secrets and variables → Actions):

1. **CLOUDFLARE_API_TOKEN**: 
   - Go to Cloudflare Dashboard → My Profile → API Tokens
   - Create a token with "Edit Cloudflare Workers" template
   - Or create a custom token with these permissions:
     - Account: Cloudflare Workers:Edit
     - Zone: Zone Settings:Read, Zone:Read
     - Zone Resources: Include All zones

2. **CLOUDFLARE_ACCOUNT_ID**:
   - Go to Cloudflare Dashboard → Right sidebar → Account ID
   - Copy the Account ID

### Custom Domain Setup

1. In Cloudflare Dashboard, go to Workers & Pages
2. Go to your worker → Settings → Triggers
3. Add custom domain: `api.mewsh.cc`
4. Ensure your domain is configured in Cloudflare DNS

### Local Development

```bash
# Install dependencies
npm install

# Start local development server
npm run dev

# Deploy to Cloudflare
npm run deploy
```

## Deployment

The worker automatically deploys when you push to the `main` or `master` branch via GitHub Actions.

## Usage

Access the GitHub API through your custom domain:
```
https://api.mewsh.cc/user
https://api.mewsh.cc/repos/owner/repo
```

All requests are proxied to `api.github.com` with Cloudflare headers stripped for compatibility.
