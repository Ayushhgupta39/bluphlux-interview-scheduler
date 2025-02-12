# Interview Scheduler

A modern web application for managing and scheduling interviews built with React, Vite, and Shadcn UI components. The application provides a clean and intuitive interface for scheduling, managing, and tracking interviews.

## 🚀 Features

### Core Functionality
- **Interview Scheduling**
  - Select from available time slots (30-minute intervals)
  - Schedule interviews with candidate and interviewer details
  - Choose interview type (Technical, HR, Behavioral)
  - Automatic conflict detection for overlapping schedules

- **Interview Management**
  - View all scheduled interviews in a clean dashboard
  - Filter interviews by date, candidate, or interviewer
  - Edit existing interview details
  - Delete interviews with confirmation

- **User Interface**
  - Modern, responsive design using Shadcn UI
  - Toast notifications for user actions
  - Calendar view for date selection
  - Intuitive time slot selection

### Technical Features
- State management with Zustand + localStorage persistence
- React Router for navigation
- Form validation and error handling
- Responsive design for all screen sizes
- Type-safe development with TypeScript

## 🛠️ Tech Stack

- **Core:**
  - React 18
  - TypeScript
  - Vite
  - React Router v6

- **State Management:**
  - Zustand
  - localStorage persistence

- **UI/Styling:**
  - Tailwind CSS
  - Shadcn UI Components
  - Lucide Icons
  - date-fns for date manipulation

## 📦 Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd interview-scheduler
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

The application will be available at `http://localhost:5173`

## 🏗️ Project Structure

```
src/
├── components/          # React components
│   ├── app/            # Application-specific components
│   └── ui/             # Shadcn UI components
├── pages/              # Route pages
├── store/              # Zustand store
├── types/              # TypeScript types
├── utils/              # Utility functions
└── hooks/              # Custom React hooks
```

## 🔧 Configuration

The project uses several configuration files:
- `components.json` - Shadcn UI configuration
- `tailwind.config.js` - Tailwind CSS configuration
- `vite.config.ts` - Vite configuration
- `tsconfig.json` - TypeScript configuration

## 📱 Usage

1. **Dashboard:**
   - View all scheduled interviews
   - Filter interviews by date
   - Access edit and delete functions

2. **Schedule Interview:**
   - Fill in candidate and interviewer details
   - Select date from calendar
   - Choose from available time slots
   - Select interview type

3. **Edit Interview:**
   - Modify any interview details
   - System validates for conflicts
   - Instant updates to dashboard


## 📄 License

[MIT License](LICENSE)