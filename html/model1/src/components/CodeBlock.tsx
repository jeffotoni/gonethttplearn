import { useState } from 'react';
import { Check, Copy } from 'lucide-react';

interface CodeBlockProps {
  code: string;
  language?: 'go' | 'http' | 'bash' | 'text';
  filename?: string;
}

export function CodeBlock({ code, language = 'go', filename }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const highlightGo = (code: string) => {
    return code
      .replace(/(\/\/.*$)/gm, '<span class="comment">$1</span>')
      .replace(/\b(package|import|func|var|const|type|struct|interface|return|if|else|for|range|switch|case|default|defer|go|chan|select|break|continue|fallthrough|goto|map|make|new|append|copy|len|cap|panic|recover|close|delete|real|imag|complex)\b/g, '<span class="keyword">$1</span>')
      .replace(/\b(string|int|int8|int16|int32|int64|uint|uint8|uint16|uint32|uint64|float32|float64|bool|byte|rune|error|any)\b/g, '<span class="type">$1</span>')
      .replace(/(".*?")/g, '<span class="string">$1</span>')
      .replace(/(`[\s\S]*?`)/g, '<span class="string">$1</span>')
      .replace(/\b(\d+)\b/g, '<span class="number">$1</span>')
      .replace(/\b([A-Z][a-zA-Z0-9]*)\b/g, '<span class="type">$1</span>')
      .replace(/\b([a-z][a-zA-Z0-9]*)\s*\(/g, '<span class="function">$1</span>(');
  };

  const highlightHttp = (code: string) => {
    return code
      .replace(/^(GET|POST|PUT|PATCH|DELETE|HEAD|OPTIONS)\b/gm, '<span class="method">$1</span>')
      .replace(/^(HTTP\/\d\.\d)/gm, '<span class="type">$1</span>')
      .replace(/(\d{3})\s+(.+)$/gm, '<span class="number">$1</span> <span class="path">$2</span>')
      .replace(/^([A-Za-z-]+):/gm, '<span class="header">$1</span>:')
      .replace(/(\/[^\s]*)/g, '<span class="path">$1</span>');
  };

  const highlightBash = (code: string) => {
    return code
      .replace(/^(#.*$)/gm, '<span class="comment">$1</span>')
      .replace(/\b(curl|go|docker|npm|yarn|git|make|cd|ls|cat|echo|export|source|mkdir|rm|cp|mv)\b/g, '<span class="function">$1</span>')
      .replace(/(-[a-zA-Z-]+)/g, '<span class="keyword">$1</span>')
      .replace(/(".*?")/g, '<span class="string">$1</span>')
      .replace(/('.*?')/g, '<span class="string">$1</span>');
  };

  const getHighlightedCode = () => {
    switch (language) {
      case 'go':
        return highlightGo(code);
      case 'http':
        return highlightHttp(code);
      case 'bash':
        return highlightBash(code);
      default:
        return code;
    }
  };

  return (
    <div className="relative group my-6">
      {filename && (
        <div className="bg-slate-100 px-4 py-2 text-xs text-slate-500 font-mono rounded-t-lg border border-slate-200 border-b-0">
          {filename}
        </div>
      )}
      <div className={`relative ${filename ? 'rounded-b-lg' : 'rounded-lg'} overflow-hidden border border-slate-200`}>
        <button
          onClick={handleCopy}
          className="absolute top-3 right-3 p-2 bg-white/90 hover:bg-white rounded-md shadow-sm opacity-0 group-hover:opacity-100 transition-all duration-200"
          aria-label="Copiar código"
        >
          {copied ? <Check className="w-4 h-4 text-green-600" /> : <Copy className="w-4 h-4 text-slate-500" />}
        </button>
        <pre
          className={`code-block ${language === 'http' ? 'http-block' : ''} ${filename ? '' : 'rounded-lg'}`}
          dangerouslySetInnerHTML={{ __html: getHighlightedCode() }}
        />
      </div>
    </div>
  );
}
