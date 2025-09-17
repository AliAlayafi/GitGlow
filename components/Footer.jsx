import { Github, Globe, Linkedin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t border-gray-200 py-8 mt-16">
      <div className="max-w-4xl mx-auto px-4 text-center">
        <div className="flex justify-center space-x-6 mb-4">
          <a 
            href="https://github.com/alialayafi" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-gray-600 hover:text-blue-600 transition-colors duration-200"
          >
            <Github className="h-6 w-6" />
          </a>
          <a 
            href="https://ali-alayyafi.site/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-gray-600 hover:text-blue-600 transition-colors duration-200"
          >
            <Globe className="h-6 w-6" />
          </a>
          <a 
            href="https://www.linkedin.com/in/ali-alayafi/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-gray-600 hover:text-blue-600 transition-colors duration-200"
          >
            <Linkedin className="h-6 w-6" />
          </a>
        </div>
        <p className="text-sm text-gray-500">
          © 2025 GitGlow.
        </p>
      </div>
    </footer>
  );
}
