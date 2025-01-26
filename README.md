# Bible Verse Explainer with DeepSeek AI

A Node.js application that uses DeepSeek's AI to provide easy-to-understand explanations of Bible verses. This project is containerized using Docker and implements secure secret management.

## 🚀 Features

- Bible verse explanation using DeepSeek AI
- Secure API key management using Docker secrets
- Containerized application for consistent deployment
- Error handling for missing configurations

## 📋 Prerequisites

- Node.js (v23.5.0 or later)
- Docker
- Docker Compose
- DeepSeek API key

## 🛠️ Installation

1. **Clone the repository**
   ```bash
   git clone [your-repository-url]
   cd [repository-name]
   ```

2. **Set up secrets**
   ```bash
   mkdir .secrets
   echo "your-deepseek-api-key" > .secrets/api_key.txt
   ```

3. **Build and run with Docker**
   ```bash
   docker compose up --build
   ```

## 🔒 Security

This project uses Docker secrets for secure API key management. For more information about the security setup, see [docker-secrets-guide.md](docker-secrets-guide.md).

## 🏗️ Project Structure

```
project-root/
├── .secrets/               # Contains sensitive data (git-ignored)
│   └── api_key.txt        # DeepSeek API key
├── .gitignore             # Specifies ignored files
├── docker-compose.yml     # Docker Compose configuration
├── Dockerfile             # Docker image specification
├── index.js               # Main application code
├── package.json           # Node.js dependencies
└── README.md             # This file
```

## 🔧 Configuration

The application can be configured using either:
- Docker secrets (recommended for production)
- Environment variables (for development)

## 🚀 Usage

The application currently explains Proverbs 17:3 by default. To modify the verse being explained, update the `explainBibleVerse()` call in `index.js`.

```javascript
// Example usage
const textOutput = await explainBibleVerse("John 3:16");
```

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## ⚠️ Important Notes

- Never commit API keys or sensitive information to version control
- Always use secure secret management in production environments
- Keep dependencies updated for security patches 