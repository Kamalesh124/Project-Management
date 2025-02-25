# Project Management Prototype

A full-stack project management application built with React and Spring Boot.

## 🚀 Tech Stack

### Frontend
- **React** (v18.2.0) - UI Library
- **Vite** - Build tool and development server
- **TailwindCSS** - Utility-first CSS framework
- **Radix UI** - Headless UI components
- **Redux** + **Redux Thunk** - State management
- **React Router DOM** - Client-side routing
- **Socket.io-client** - Real-time communications
- **Axios** - HTTP client
- **React Hook Form** - Form handling
- **Zod** - Schema validation

### Backend
- **Spring Boot** - Java backend framework
- **Spring Security** - Authentication and authorization
- **Spring Data JPA** - Data persistence
- **WebSocket** - Real-time communication support
- **Maven** - Dependency management

## 🛠️ Setup & Installation

### Prerequisites
- Node.js (v16+)
- Java JDK 17+
- Maven
- MySQL/PostgreSQL

### Frontend Setup
```bash
cd frontend
npm install
npm run dev
```

### Backend Setup
```bash
cd backend
mvn clean install
mvn spring-boot:run
```

## 🏗️ Project Structure
```
project-management/
├── frontend/
│   ├── src/
│   ├── public/
│   └── package.json
└── backend/
    ├── src/
    ├── pom.xml
    └── application.properties
```

## 🔑 Environment Variables

### Frontend (.env)
```env
VITE_API_URL=http://localhost:8080
```

### Backend (application.properties)
```properties
spring.datasource.url=your_database_url
spring.datasource.username=your_username
spring.datasource.password=your_password
```

## 🌟 Features

- User Authentication & Authorization
- Real-time Project Updates
- Task Management
- Team Collaboration
- Project Analytics
- Responsive Design
- Dark/Light Theme

## 🔧 Available Scripts

### Frontend
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run lint` - Run ESLint
- `npm run preview` - Preview production build

### Backend
- `mvn clean install` - Clean and install dependencies
- `mvn test` - Run tests
- `mvn spring-boot:run` - Start backend server

## 📝 API Documentation
API documentation is available at `/api/docs` when running the backend server.

## 🤝 Contributing
1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📜 License
This project is licensed under the MIT License - see the LICENSE file for details.

## 👥 Authors
- Your Name

## 🙏 Acknowledgments
- Radix UI for the component library
- TailwindCSS team
- Spring Boot community
