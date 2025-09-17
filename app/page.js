
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Send, Copy, Check } from "lucide-react";
import ReactMarkdownComponent from "@/components/ReactMarkdownComponent";
import Footer from "@/components/Footer";

export default function Home() {
  const [message, setMessage] = useState("");
  const [copied, setCopied] = useState(false);
  const [previewContent, setPreviewContent] = useState("");
  const [isLoading, setIsLoading] = useState(false); // New state for preview

  const handleSend = async () => {
    if (!message.trim()) return;
    
    setIsLoading(true);
    try {
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: message
        }),
      });

      const data = await response.json();

      if (data.success) {
        // Check if AI returned the "tell us more" message
        if (data.content.includes("Tell us more about you")) {
          setPreviewContent("Tell us more about you! Please provide more information about your skills, projects, experience, or interests to create a compelling GitHub profile.");
        } else {
          setPreviewContent(data.content);
        }
      } else {
        console.error('Error:', data.error);
        // Fallback to showing the original message
        setPreviewContent(message);
      }
    } catch (error) {
      console.error('Failed to generate content:', error);
      // Fallback to showing the original message
      setPreviewContent(message);
    } finally {
      setIsLoading(false);
    }
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(previewContent);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 py-8">
        {/* Welcome Message */}
                <div className="text-center mb-12">
                  <h1 className="text-5xl font-bold text-gray-800 mb-2 tracking-wide">
                    Git<span className="text-blue-600">Glow</span>
                  </h1>
                  <div className="w-16 h-0.5 bg-blue-600 mx-auto mb-4"></div>
                  <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                    🤖 Transform your GitHub profile in seconds! See the preview instantly.
                  </p>
                </div>

        {/* Input Section */}
        <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-6 mb-8">
          <div className="space-y-4">
            <Textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyPress={handleKeyPress}
                      placeholder="My name is Ali Alayyafi. I am a full stack developer. I work with JavaScript, React, Node.js, Python. Contact: ali.alayafiii@gmail.com"
              className="w-full min-h-[120px] max-h-[300px] resize-none border-0 focus-visible:ring-0 focus-visible:ring-offset-0 text-base bg-transparent text-gray-900 placeholder:text-gray-500 placeholder:text-left leading-relaxed"
              rows={5}
            />
            <div className="flex justify-end">
              <Button
                onClick={handleSend}
                disabled={!message.trim() || isLoading}
                size="lg"
                className="px-6 py-3 h-auto bg-gray-900 hover:bg-gray-800 disabled:bg-gray-100 disabled:text-gray-400 text-white border-0 transition-all duration-200 rounded-xl cursor-pointer"
              >
                <Send className="h-4 w-4 mr-2" />
                {isLoading ? "Creating..." : "⚡ Create Magic"}
              </Button>
            </div>
          </div>
        </div>

        {/* Preview Section */}
        {(previewContent || isLoading) && (
          <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-medium text-gray-900">Preview</h3>
              <div className="flex items-center gap-3">
                <div className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
                  GitHub Style
                </div>
                <Button
                  onClick={copyToClipboard}
                  size="sm"
                  className="px-3 py-1 h-auto bg-gray-100 hover:bg-gray-200 text-gray-700 border border-gray-300 transition-all duration-200 rounded-md text-xs cursor-pointer"
                >
                  {copied ? (
                    <>
                      <Check className="h-3 w-3 mr-1" />
                      Copied!
                    </>
                  ) : (
                    <>
                      <Copy className="h-3 w-3 mr-1" />
                      Copy
                    </>
                  )}
                </Button>
              </div>
            </div>

            <div className="bg-gray-50 rounded-xl border border-gray-200 p-6 overflow-auto max-h-[500px]">
              {isLoading ? (
                <div className="flex items-center justify-center py-12">
                  <div className="text-center">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
                    <p className="text-gray-600">🤖 AI is creating your GitHub profile...</p>
                  </div>
                </div>
              ) : (
                <div className="prose prose-gray max-w-none text-gray-800">
                  <ReactMarkdownComponent>
                    {previewContent}
                  </ReactMarkdownComponent>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Empty State */}
        {!previewContent && (
          <div className="text-center py-16">
            <div className="w-16 h-16 bg-gray-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">📝</span>
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">Ready to create?</h3>
            <p className="text-gray-500 max-w-md mx-auto">
              Type your info above and click "⚡ Create Magic" to see your GitHub profile come to life!
            </p>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
