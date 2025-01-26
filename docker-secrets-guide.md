# Docker Secrets Setup Guide

This guide explains the secure setup for handling API keys and other sensitive information using Docker secrets.

## Current Implementation

Our setup uses Docker secrets to manage sensitive API keys, which are:
- Stored in `.secrets/api_key.txt`
- Mounted into the container at runtime
- Accessed via the filesystem in the application code

## Advantages

1. **Improved Security**
   - Secrets are stored separately from application code
   - Secrets are mounted as temporary files in the container
   - Secret files are automatically removed when the container stops
   - Access is limited to services that explicitly request them

2. **Better Development Experience**
   - Local development can still use `.env` files
   - Seamless transition between development and production environments
   - Fallback mechanism for different environments

3. **Production Ready**
   - Compatible with Docker Swarm for production deployments
   - Follows Docker best practices for secret management
   - Scales well with multiple services and environments

## Important Reminders

### 1. Git Security
- Add `.secrets/` to your `.gitignore`
- Never commit secret files to version control
- Keep `.env` files out of version control

### 2. Production Considerations
- Use Docker Swarm's secret management instead of file-based secrets
- Rotate secrets periodically
- Implement proper access controls for secret management

### 3. Development Workflow
- Document secret requirements for new team members
- Maintain a template for required secrets
- Consider using different secrets for development and production

## File Structure 
```
your-project/
├── .secrets/
│ └── api_key.txt # Contains the actual API key
├── .gitignore # Includes .secrets/ and .env
├── docker-compose.yml # Defines secret mounting
├── Dockerfile # No hardcoded secrets
└── index.js # Handles code logic
```