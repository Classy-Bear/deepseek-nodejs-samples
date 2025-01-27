# DeepSeek AI Integration Examples

A Node.js application that demonstrates different uses of DeepSeek's AI capabilities, including Bible verse explanation, Fill-In-the-Middle (FIM) code generation, multi-round reasoning, and model exploration. This project is containerized using Docker and implements secure secret management.

## 🚀 Features

- Bible verse explanations using DeepSeek AI
- Fibonacci sequence implementation using Fill-In-the-Middle (FIM) API
- Multi-round reasoning using DeepSeek's Reasoner model
- Model exploration and listing capabilities
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

The application provides four main functionalities:

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

### 3. Multi-Round Reasoning
```javascript
const { response1, response2, reasoningContent } = await performReasoningRounds();
console.log("Reasoning Content:", reasoningContent);
console.log("Response 1 Content:", response1.choices[0].message.content);
console.log("Response 2 Content:", response2.choices[0].message.content);
```

This feature demonstrates DeepSeek's Reasoner model capabilities with multi-turn conversations and explicit reasoning steps.

### 4. Model Exploration
```javascript
await listModels();
// Displays available models and their capabilities
```

Lists all available models from the DeepSeek API, helping developers understand which models are accessible for different tasks.

## 🔌 API Endpoints

The application uses two DeepSeek API endpoints:
- Main API: `https://api.deepseek.com` (for chat completions and reasoning)
- Beta API: `https://api.deepseek.com/beta` (for FIM functionality)

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
- Only the FIM feature requires access to DeepSeek's beta API endpoint
- Some models may have different rate limits or access requirements 