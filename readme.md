# Find Job - Job Application Platform

![Find Job Banner](https://via.placeholder.com/1200x400.png?text=Find+Job+Banner) 
*(You can replace this with an actual banner image for your project)*

Find Job is a modern web application designed to connect job seekers with recruiters. Users can apply for jobs, while recruiters can post job listings, manage applications, and send notifications. Built with cutting-edge technologies, this platform ensures a seamless experience for both job seekers and recruiters.

---

## Features

### For Job Seekers (Users)
- **Browse Jobs**: Explore a wide range of job listings.
- **Apply for Jobs**: Easily apply to jobs with a single click.
- **Notifications**: Receive real-time updates on your applications.
- **Dashboard**: Track your job applications and statuses.
- **Offline Access**: Use the app offline with PWA support.

### For Recruiters
- **Post Jobs**: Add new job listings with detailed descriptions.
- **Manage Applications**: View and control applications for your posted jobs.
- **Dashboard**: Monitor and manage all your job postings and applications.
---

## Technologies Used

- **Frontend**: 
  - [Next.js](https://nextjs.org/) - React framework for server-side rendering and static site generation.
  - [RTK (Redux Toolkit)](https://redux-toolkit.js.org/) - State management for React applications.
  - [PWA (Progressive Web App)](https://web.dev/progressive-web-apps/) - For offline functionality and native app-like experience.
  
- **Backend**: 
  - [Express.js](https://expressjs.com/) - Node.js framework for building APIs.
  - [JWT (JSON Web Tokens)](https://jwt.io/) - For secure user authentication and authorization.
  
- **Database**: 
  - [Prisma](https://www.prisma.io/) - Modern database toolkit for TypeScript and Node.js.
  - [PostgreSQL](https://www.postgresql.org/) - Powerful, open-source relational database system.

- **Runtime**:
  - [Bun](https://bun.sh/) - Fast all-in-one JavaScript runtime.

- **Other Tools**:
  - [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework for styling.
  - [Axios](https://axios-http.com/) - Promise-based HTTP client for API requests.
  - [React Icons](https://react-icons.github.io/react-icons/) - Icon library for React.

---

## Getting Started


### Installation

1. ### Backend

1. **Clone the repository:**

   ```bash
   git clone https://github.com/RIADH-NOURI/Find_job.git
    cd Find_job/backend
   ```

2. **Install dependencies:**

   ```bash
   bun init 
   bun install
   ```

3. **Configure the environment variables:**
   Create a `.env` file in the `backend` directory and add the necessary configurations:

   ```plaintext
   PORT=3000
   DATABASE_URL=your_database_url
   JWT_SECRET_KEY=your_jwt_secret
   CLOUDINARY_API_KEY=your_cloudinary_api_key
   CLOUDINARY_API_SECRET=your_cloudinary_api_secret
   CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
   RESEND_API_KEY=your_resend_api_key
    ```
   4. **Run the application:**

   ```bash
   bun run dev
   ```

### Frontend

1. **Navigate to the frontend directory:**

   ```bash
   cd ../client
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Run the application:**

   ```bash
   npm start
   ```

## Usage

1. **Run the backend server**: Start the backend server using `bun init` in the `backend` directory.
2. **Run the frontend application**: Start the frontend application using `npm start` in the `client` directory.

## Contributors

- [RIADH-NOURI](https://github.com/RIADH-NOURI)