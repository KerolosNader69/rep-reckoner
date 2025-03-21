
import React from 'react';
import { Link } from 'react-router-dom';
import { Rocket, Flame, User, Users, LayoutDashboard, BarChart3, Dumbbell, CircleUser, ArrowRight } from 'lucide-react';

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white flex flex-col">
      <header className="bg-gray-800/50 backdrop-blur-sm p-6 border-b border-gray-700/50">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold text-gradient bg-gradient-to-r from-blue-400 to-indigo-500">Fitness App</h1>
          <p className="text-gray-400 mt-1">Your path to a healthier you</p>
        </div>
      </header>

      <main className="flex-1 p-6 max-w-7xl mx-auto w-full">
        {/* Hero section with welcome message and login/signup */}
        <div className="mb-10 animate-fade-in">
          <div className="bg-gradient-to-br from-gray-800/90 to-gray-900/90 rounded-xl p-8 border border-gray-700/50 shadow-lg hover:shadow-blue-500/10 transition-all duration-300">
            <h2 className="text-3xl font-bold mb-4 text-gradient bg-gradient-to-r from-blue-400 to-indigo-500">Welcome</h2>
            <p className="text-gray-300 mb-6 text-lg max-w-2xl mx-auto">
              Start your fitness journey with our comprehensive tools designed to help you achieve your goals.
              Track your progress, discover new exercises, and get personalized recommendations.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mt-6">
              <Link to="/login" className="flex items-center justify-center gap-2 py-3 px-6 rounded-lg bg-blue-600 hover:bg-blue-500 transition-all font-semibold text-white shadow-lg hover:shadow-blue-600/30 hover:-translate-y-1 duration-300">
                Login <ArrowRight className="h-5 w-5" />
              </Link>
              <Link to="/signup" className="flex items-center justify-center gap-2 py-3 px-6 rounded-lg bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 transition-all font-semibold text-white shadow-lg hover:shadow-indigo-600/30 hover:-translate-y-1 duration-300">
                Sign Up <User className="h-5 w-5" />
              </Link>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-gradient-to-br from-gray-800/90 to-gray-900/90 rounded-xl p-6 border border-gray-700/50 shadow-lg hover:shadow-blue-500/5 transition-all duration-300">
            <h2 className="text-2xl font-semibold mb-4 text-gradient bg-gradient-to-r from-blue-400 to-indigo-500">Get Started</h2>
            <nav className="space-y-2">
              <Link to="/dashboard" className="flex items-center gap-3 p-3 rounded-lg bg-gray-800/60 hover:bg-blue-600/20 transition-colors">
                <LayoutDashboard className="h-5 w-5 text-blue-400" />
                <span className="font-medium">Dashboard</span>
              </Link>

              <Link to="/progress-tracking" className="flex items-center gap-3 p-3 rounded-lg bg-gray-800/60 hover:bg-green-600/20 transition-colors">
                <BarChart3 className="h-5 w-5 text-green-400" />
                <span className="font-medium">Progress Tracking</span>
              </Link>
              <Link to="/exercises" className="flex items-center gap-3 p-3 rounded-lg bg-gray-800/60 hover:bg-purple-600/20 transition-colors">
                <Dumbbell className="h-5 w-5 text-purple-400" />
                <span className="font-medium">Exercises</span>
              </Link>
              <Link to="/workout-log" className="flex items-center gap-3 p-3 rounded-lg bg-gray-800/60 hover:bg-red-600/20 transition-colors">
                <Rocket className="h-5 w-5 text-red-400" />
                <span className="font-medium">Workout Log</span>
              </Link>
              <Link to="/fitness-chat" className="flex items-center gap-3 p-3 rounded-lg bg-gray-800/60 hover:bg-amber-600/20 transition-colors">
                <Users className="h-5 w-5 text-amber-400" />
                <span className="font-medium">Fitness Chat</span>
              </Link>
            </nav>
          </div>

          <div className="bg-gradient-to-br from-gray-800/90 to-gray-900/90 rounded-xl p-6 border border-gray-700/50 shadow-lg hover:shadow-indigo-500/5 transition-all duration-300">
            <h2 className="text-2xl font-semibold mb-4 text-gradient bg-gradient-to-r from-indigo-400 to-purple-500">Account</h2>
            <nav className="space-y-2">
              <Link to="/login" className="flex items-center gap-3 p-3 rounded-lg bg-gray-800/60 hover:bg-indigo-600/20 transition-colors">
                <User className="h-5 w-5 text-indigo-400" />
                <span className="font-medium">Login</span>
              </Link>
              <Link to="/signup" className="flex items-center gap-3 p-3 rounded-lg bg-gray-800/60 hover:bg-purple-600/20 transition-colors">
                <CircleUser className="h-5 w-5 text-purple-400" />
                <span className="font-medium">Sign Up</span>
              </Link>
            </nav>
          </div>
          
          <div className="md:col-span-2 lg:col-span-1 bg-gradient-to-br from-gray-800/90 to-gray-900/90 rounded-xl p-6 border border-gray-700/50 shadow-lg hover:shadow-blue-500/5 transition-all duration-300 hover-lift">
            <h2 className="text-2xl font-semibold mb-4 text-gradient bg-gradient-to-r from-blue-400 to-cyan-400">Features</h2>
            <p className="text-gray-300 mb-4">
              Our app provides everything you need to achieve your fitness goals:
            </p>
            <ul className="text-gray-300 space-y-2 mb-4">
              <li className="flex items-center gap-2">
                <Flame className="h-4 w-4 text-amber-400" />
                Personalized workout plans
              </li>
              <li className="flex items-center gap-2">
                <BarChart3 className="h-4 w-4 text-green-400" />
                Detailed progress tracking
              </li>
              <li className="flex items-center gap-2">
                <Dumbbell className="h-4 w-4 text-purple-400" />
                Exercise library with tutorials
              </li>
            </ul>
            <Link to="/dashboard" className="inline-block py-3 px-6 rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 transition-all font-semibold text-white shadow-lg hover:shadow-blue-600/20">
              Explore Now
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;
