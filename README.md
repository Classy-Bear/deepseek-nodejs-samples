# DeepSeek AI Integration Examples

A Node.js application that demonstrates different uses of DeepSeek's AI capabilities, including Bible verse explanation and Fill-In-the-Middle (FIM) code generation. This project is containerized using Docker and implements secure secret management.

## 🚀 Features

- Bible verse explanations using DeepSeek AI
- Fibonacci sequence implementation using Fill-In-the-Middle (FIM) API
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

The application provides two main functionalities:

### 1. Bible Verse Explanation
```javascript
const textOutput = await explainBibleVerse("Proverbs 17:3");
console.log(textOutput.choices[0].message);
```

### 2. Fibonacci Implementation Generation
```javascript
const response = await fibonacciFMI();
console.log(response.choices[0].text);
```

The FIM (Fill-In-the-Middle) API will generate the middle part of a Fibonacci sequence implementation in Python, given the function definition and return statement.

## 🔌 API Endpoints

The application uses two DeepSeek API endpoints:
- Main API: `https://api.deepseek.com`
- Beta API (for FIM): `https://api.deepseek.com/beta`

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
- The FIM feature requires access to DeepSeek's beta API endpoint 