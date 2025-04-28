# Daily Grind Tracker

A web application to track daily GATE and DSA preparation progress.

## Features

- Track daily GATE and DSA study status
- Calculate and display daily scores
- View progress history
- Modern UI with Tailwind CSS
- Cloud database storage using Supabase

## Setup

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a Supabase project and set up the database:
   - Create a new project in Supabase
   - Create a table named `daily_logs` with the following columns:
     - `id` (auto-incrementing primary key)
     - `date` (date)
     - `gate_status` (text)
     - `dsa_status` (text)
     - `score` (integer)

4. Configure environment variables:
   - Copy `.env.example` to `.env`
   - Add your Supabase URL and API key

5. Start the server:
   ```bash
   npm start
   ```

6. Open `http://localhost:3000` in your browser

## Usage

1. Select your GATE preparation status (Done/Skipped)
2. Select your DSA practice status (Done/Skipped)
3. Click "Submit Today's Progress"
4. View your progress history below the form

## Technologies Used

- Node.js
- Express.js
- Supabase
- Tailwind CSS
- HTML5
- JavaScript (ES6+) 