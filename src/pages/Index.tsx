import React from 'react';
import { Link } from 'react-router-dom';
import { Rocket, Flame, User, Users, LayoutDashboard, BarChart3 } from 'lucide-react';

const Index = () => {
  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col">
      <header className="bg-gray-800 p-4">
        <h1 className="text-2xl font-bold">Fitness App</h1>
      </header>

      <main className="flex-1 p-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="bg-gray-800 rounded-lg p-4">
            <h2 className="text-xl font-semibold mb-2">Get Started</h2>
            <nav>
              <Link to="/dashboard" className="flex items-center gap-2 p-3 rounded-md hover:bg-blue-600/10">
                <LayoutDashboard className="h-5 w-5" />
                <span>Dashboard</span>
              </Link>

              <Link to="/progress-tracking" className="flex items-center gap-2 p-3 rounded-md hover:bg-blue-600/10">
                <BarChart3 className="h-5 w-5" />
                <span>Progress Tracking</span>
              </Link>
              <Link to="/exercises" className="flex items-center gap-2 p-3 rounded-md hover:bg-blue-600/10">
                <Flame className="h-5 w-5" />
                <span>Exercises</span>
              </Link>
              <Link to="/workout-log" className="flex items-center gap-2 p-3 rounded-md hover:bg-blue-600/10">
                <Rocket className="h-5 w-5" />
                <span>Workout Log</span>
              </Link>
              <Link to="/fitness-chat" className="flex items-center gap-2 p-3 rounded-md hover:bg-blue-600/10">
                <Users className="h-5 w-5" />
                <span>Fitness Chat</span>
              </Link>
            </nav>
          </div>

          <div className="bg-gray-800 rounded-lg p-4">
            <h2 className="text-xl font-semibold mb-2">Account</h2>
            <nav>
              <Link to="/login" className="flex items-center gap-2 p-3 rounded-md hover:bg-blue-600/10">
                <User className="h-5 w-5" />
                <span>Login</span>
              </Link>
              <Link to="/signup" className="flex items-center gap-2 p-3 rounded-md hover:bg-blue-600/10">
                <User className="h-5 w-5" />
                <span>Sign Up</span>
              </Link>
            </nav>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;
