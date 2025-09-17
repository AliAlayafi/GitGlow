"use client";

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import rehypeHighlight from "rehype-highlight";

export default function ReactMarkdownComponent({ children }) {
  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      rehypePlugins={[rehypeRaw, rehypeHighlight]}
      components={{
        h1: ({ children, ...props }) => (
          <h1 
            className={`text-2xl font-bold text-gray-900 mb-4 mt-6 border-b border-gray-200 pb-2 ${
              props.align === 'center' ? 'text-center' : ''
            }`}
            {...props}
          >
            {children}
          </h1>
        ),
        h2: ({ children, ...props }) => (
          <h2 
            className={`text-xl font-bold text-gray-900 mb-3 mt-5 border-b border-gray-200 pb-2 ${
              props.align === 'center' ? 'text-center' : ''
            }`}
            {...props}
          >
            {children}
          </h2>
        ),
        h3: ({ children, ...props }) => (
          <h3 
            className={`text-lg font-bold text-gray-900 mb-2 mt-4 ${
              props.align === 'center' ? 'text-center' : ''
            }`}
            {...props}
          >
            {children}
          </h3>
        ),
        h4: ({ children }) => (
          <h4 className="text-base font-bold text-gray-900 mb-2 mt-3">
            {children}
          </h4>
        ),
        h5: ({ children }) => (
          <h5 className="text-sm font-bold text-gray-900 mb-1 mt-2">
            {children}
          </h5>
        ),
        h6: ({ children }) => (
          <h6 className="text-xs font-bold text-gray-900 mb-1 mt-2">
            {children}
          </h6>
        ),
        p: ({ children, ...props }) => (
          <p 
            className={`mb-3 text-gray-800 leading-relaxed ${
              props.align === 'center' ? 'text-center' : 
              props.align === 'left' ? 'text-left' : 
              props.align === 'right' ? 'text-right' : ''
            }`}
            {...props}
          >
            {children}
          </p>
        ),
        ul: ({ children }) => (
          <ul className="mb-3 list-disc list-outside text-gray-800 pl-4">
            {children}
          </ul>
        ),
        ol: ({ children }) => (
          <ol className="mb-3 list-decimal list-inside text-gray-800">
            {children}
          </ol>
        ),
        li: ({ children }) => (
          <li className="mb-2 text-gray-800">
            {children}
          </li>
        ),
        code: ({ children }) => (
          <code className="bg-gray-200 text-gray-800 px-1 py-0.5 rounded text-sm font-mono">
            {children}
          </code>
        ),
        pre: ({ children }) => (
          <pre className="bg-gray-200 border border-gray-300 rounded-lg p-4 overflow-x-auto mb-3">
            {children}
          </pre>
        ),
        blockquote: ({ children }) => (
          <blockquote className="border-l-4 border-gray-400 pl-4 italic text-gray-700 mb-3">
            {children}
          </blockquote>
        ),
        img: ({ src, alt, ...props }) => {
          // Check if it's a profile views counter or similar badge
          const isBadge = src.includes('komarev.com') || src.includes('github-readme-stats') || src.includes('badge');
          // Check if it's GitHub stats (should be inline)
          const isGitHubStats = src.includes('github-readme-stats');
          
          return (
            <img 
              src={src} 
              alt={alt} 
              className={isBadge ? (isGitHubStats ? "inline-block mr-2" : "inline-block") : "inline-block mx-1"}
              style={isBadge ? {
                height: 'auto',
                width: 'auto',
                maxHeight: '200px',
                maxWidth: isGitHubStats ? '48%' : '100%',
                display: 'inline-block'
              } : {
                height: props.height || '30px', 
                width: props.width || '40px',
                verticalAlign: 'middle'
              }}
              {...props}
            />
          );
        },
        a: ({ href, children }) => (
          <a href={href} className="text-blue-600 hover:text-blue-700 underline">
            {children}
          </a>
        ),
        table: ({ children }) => (
          <table className="w-full border-collapse border border-gray-300 mb-3">
            {children}
          </table>
        ),
        th: ({ children }) => (
          <th className="border border-gray-300 bg-gray-100 px-3 py-2 text-left font-bold text-gray-900">
            {children}
          </th>
        ),
        td: ({ children }) => (
          <td className="border border-gray-300 px-3 py-2 text-gray-800">
            {children}
          </td>
        ),
      }}
    >
      {children}
    </ReactMarkdown>
  );
}