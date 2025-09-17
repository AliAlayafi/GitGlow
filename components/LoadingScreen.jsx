"use client";

export default function LoadingScreen() {
  return (
    <div className="fixed inset-0 bg-white z-50 flex items-center justify-center">
      <div className="text-center">
        {/* Pulsing GitGlow Logo */}
        <div className="mb-8">
          <h1 className="text-6xl font-bold text-gray-800 mb-2 tracking-wide animate-pulse">
            Git<span className="text-blue-600">Glow</span>
          </h1>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-blue-400 mx-auto rounded-full animate-pulse"></div>
        </div>
        
        {/* Loading Dots */}
        <div className="flex justify-center space-x-2 mb-4">
          <div className="w-3 h-3 bg-blue-600 rounded-full animate-bounce"></div>
          <div className="w-3 h-3 bg-blue-600 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
          <div className="w-3 h-3 bg-blue-600 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
        </div>
        
        {/* Loading Text */}
        <p className="text-gray-600 text-lg animate-pulse">
          🤖 Initializing AI Magic...
        </p>
      </div>
    </div>
  );
}
