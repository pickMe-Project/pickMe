# pickMe!

**pickMe!** is a web application designed to help aspiring guitarists learn fingerstyle guitar. Whether you're a beginner or an advanced player, pickMe! provides a comprehensive library of guitar chords, tabs, and tutorial videos to enhance your learning experience. The app includes features like progress tracking and exclusive content for registered users.

## Tech Stack

- **Frontend**: Next.js, Tailwind CSS
- **Backend**: MongoDB, Redis
- **Authentication**: Google Auth for login/register

## Features

### 1. Chords Library
- Open access to a wide range of fingerstyle guitar chords.
- Each chord comes with detailed finger placements and tips to help users improve their technique.

### 2. Tabs and Video Tutorials
- Registered users can access exclusive fingerstyle guitar tabs and high-quality tutorial videos.
- Content is structured to help users progress from basic to advanced levels.

### 3. User Profiles and Progress Tracking
- Users can create personalized profiles to track their learning progress.
- Progress is visualized using a dynamic progress bar, allowing users to see their improvement over time.

### 4. Secure Authentication
- Google Auth integration provides a quick and secure login and registration process.
- User data is managed securely with MongoDB and Redis for session management.

### 5. Modern and Responsive Design
- Built with Next.js for server-side rendering (SSR) and optimized performance.
- Styled with Tailwind CSS to ensure a responsive and visually appealing user experience across devices.

### 6. Scalability and Future Plans
- The app is designed with scalability in mind, supporting potential future integration of a subscription-based model to access premium content.

## Getting Started

To run this project locally:

1. Clone the repository:
    ```bash
    git clone https://github.com/yourusername/pickMe.git
    ```

2. Navigate to the project directory:
    ```bash
    cd pickMe
    ```

3. Install the dependencies:
    ```bash
    npm install
    ```

4. Set up environment variables for MongoDB, Redis, and Google Auth in a `.env` file.

5. Start the development server:
    ```bash
    npm run dev
    ```

6. Open your browser and go to `http://localhost:3000` to see the app in action.

## Contributing

Contributions are welcome! Please fork the repository and open a pull request with your changes.

## License

This project is licensed under the MIT License.

