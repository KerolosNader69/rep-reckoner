
import React from 'react';
import { Link } from 'react-router-dom';
import { Rocket, Flame, User, Users, LayoutDashboard, BarChart3, Dumbbell, CircleUser, ArrowRight, Heart, Star } from 'lucide-react';

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white flex flex-col">
      <header className="bg-gray-800/50 backdrop-blur-sm p-6 border-b border-gray-700/50 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gradient bg-gradient-to-r from-blue-400 to-indigo-500">Fitness App</h1>
            <p className="text-gray-400 mt-1">Your path to a healthier you</p>
          </div>
          <div className="hidden md:flex space-x-3">
            <Link to="/login" className="py-2 px-4 rounded-lg bg-gray-800 hover:bg-gray-700 transition-all text-sm font-medium border border-gray-700">
              Login
            </Link>
            <Link to="/signup" className="py-2 px-4 rounded-lg bg-blue-600 hover:bg-blue-500 transition-all text-sm font-medium">
              Sign Up
            </Link>
          </div>
        </div>
      </header>

      <main className="flex-1 p-6 max-w-7xl mx-auto w-full">
        {/* Hero section with welcome message and login/signup */}
        <div className="mb-10 animate-fade-in">
          <div className="bg-gradient-to-br from-gray-800/90 to-gray-900/90 rounded-xl p-8 border border-gray-700/50 shadow-xl hover:shadow-blue-500/10 transition-all duration-300">
            <h2 className="text-4xl font-bold mb-4 text-gradient bg-gradient-to-r from-blue-400 to-indigo-500">Welcome to Your Fitness Journey</h2>
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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <div className="bg-gradient-to-br from-gray-800/90 to-gray-900/90 rounded-xl p-6 border border-gray-700/50 shadow-lg hover:shadow-blue-500/10 transition-all duration-300 hover:scale-[1.02]">
            <h2 className="text-2xl font-semibold mb-4 text-gradient bg-gradient-to-r from-blue-400 to-indigo-500">Quick Access</h2>
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

          <div className="bg-gradient-to-br from-gray-800/90 to-gray-900/90 rounded-xl p-6 border border-gray-700/50 shadow-lg hover:shadow-indigo-500/10 transition-all duration-300 hover:scale-[1.02]">
            <h2 className="text-2xl font-semibold mb-4 text-gradient bg-gradient-to-r from-indigo-400 to-purple-500">Features</h2>
            <ul className="text-gray-300 space-y-3 mb-4">
              <li className="flex items-center gap-2 p-3 rounded-lg bg-gray-800/60">
                <Flame className="h-5 w-5 text-amber-400" />
                <span>Personalized workout plans</span>
              </li>
              <li className="flex items-center gap-2 p-3 rounded-lg bg-gray-800/60">
                <BarChart3 className="h-5 w-5 text-green-400" />
                <span>Detailed progress tracking</span>
              </li>
              <li className="flex items-center gap-2 p-3 rounded-lg bg-gray-800/60">
                <Dumbbell className="h-5 w-5 text-purple-400" />
                <span>Exercise library with tutorials</span>
              </li>
              <li className="flex items-center gap-2 p-3 rounded-lg bg-gray-800/60">
                <Heart className="h-5 w-5 text-red-400" />
                <span>Nutrition & recovery guidance</span>
              </li>
            </ul>
          </div>
          
          <div className="bg-gradient-to-br from-gray-800/90 to-gray-900/90 rounded-xl p-6 border border-gray-700/50 shadow-lg hover:shadow-blue-500/10 transition-all duration-300 hover:scale-[1.02]">
            <h2 className="text-2xl font-semibold mb-4 text-gradient bg-gradient-to-r from-blue-400 to-cyan-400">Get Started</h2>
            <p className="text-gray-300 mb-4">
              Ready to transform your fitness journey? Create an account now to unlock all features:
            </p>
            <ul className="text-gray-300 space-y-2 mb-6">
              <li className="flex items-center gap-2">
                <Star className="h-4 w-4 text-yellow-400" />
                Personalized dashboard
              </li>
              <li className="flex items-center gap-2">
                <Star className="h-4 w-4 text-yellow-400" />
                Progress history & analytics
              </li>
              <li className="flex items-center gap-2">
                <Star className="h-4 w-4 text-yellow-400" />
                AI workout recommendations
              </li>
            </ul>
            <Link to="/dashboard" className="inline-block w-full py-3 px-6 rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 transition-all font-semibold text-white shadow-lg hover:shadow-blue-600/20 text-center">
              Explore Now
            </Link>
          </div>
        </div>

        {/* Featured section */}
        <div className="mt-12 bg-gradient-to-br from-gray-800/90 to-gray-900/90 rounded-xl p-8 border border-gray-700/50 shadow-lg animate-fade-in">
          <h2 className="text-3xl font-bold mb-6 text-gradient bg-gradient-to-r from-purple-400 to-pink-400 text-center">Why Choose Our Fitness App?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
            <div className="bg-gray-800/60 p-6 rounded-xl border border-gray-700/50 hover:border-purple-500/30 transition-all hover:-translate-y-1 duration-300">
              <Dumbbell className="h-10 w-10 text-purple-400 mb-4" />
              <h3 className="text-xl font-semibold mb-2 text-gradient bg-gradient-to-r from-purple-400 to-pink-400">Expert Guidance</h3>
              <p className="text-gray-300">Access professionally designed workouts and expert advice tailored to your fitness level.</p>
            </div>
            <div className="bg-gray-800/60 p-6 rounded-xl border border-gray-700/50 hover:border-blue-500/30 transition-all hover:-translate-y-1 duration-300">
              <BarChart3 className="h-10 w-10 text-blue-400 mb-4" />
              <h3 className="text-xl font-semibold mb-2 text-gradient bg-gradient-to-r from-blue-400 to-cyan-400">Track Progress</h3>
              <p className="text-gray-300">Visualize your improvements with detailed analytics and progress tracking tools.</p>
            </div>
            <div className="bg-gray-800/60 p-6 rounded-xl border border-gray-700/50 hover:border-amber-500/30 transition-all hover:-translate-y-1 duration-300">
              <Heart className="h-10 w-10 text-red-400 mb-4" />
              <h3 className="text-xl font-semibold mb-2 text-gradient bg-gradient-to-r from-red-400 to-amber-400">Holistic Approach</h3>
              <p className="text-gray-300">Balance workouts with nutrition guidance and recovery tips for optimal results.</p>
            </div>
          </div>
        </div>
      </main>

      <footer className="bg-gray-900 p-6 border-t border-gray-800">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-gray-400 text-sm">© 2023 Fitness App. All rights reserved.</p>
          <div className="flex justify-center space-x-4 mt-4">
            <Link to="/about" className="text-gray-400 hover:text-white transition-colors text-sm">About</Link>
            <Link to="/privacy" className="text-gray-400 hover:text-white transition-colors text-sm">Privacy Policy</Link>
            <Link to="/terms" className="text-gray-400 hover:text-white transition-colors text-sm">Terms of Service</Link>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
