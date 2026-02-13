import { useState } from 'react';
import { Menu, X, BookOpen, Github, Linkedin } from 'lucide-react';
import { sections } from '@/data/content';

interface LayoutProps {
  children: React.ReactNode;
  currentSection: string;
  onSectionChange: (section: string) => void;
}

export function Layout({ children, currentSection, onSectionChange }: LayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-white">
      {/* Mobile Header */}
      <header className="lg:hidden fixed top-0 left-0 right-0 h-16 bg-white border-b border-slate-200 z-50 flex items-center justify-between px-4">
        <div className="flex items-center gap-2">
          <BookOpen className="w-6 h-6 text-sky-600" />
          <span className="font-semibold text-slate-800">net/http Go</span>
        </div>
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="p-2 hover:bg-slate-100 rounded-lg"
        >
          {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </header>

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-full w-72 bg-slate-50 border-r border-slate-200 z-40 transition-transform duration-300 lg:translate-x-0 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="p-6">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 bg-gradient-to-br from-sky-500 to-blue-600 rounded-xl flex items-center justify-center">
              <BookOpen className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="font-bold text-slate-800 leading-tight">net/http</h1>
              <p className="text-xs text-slate-500">Manual em Go</p>
            </div>
          </div>

          <nav className="space-y-1">
            {sections.map((section) => (
              <button
                key={section.id}
                onClick={() => {
                  onSectionChange(section.id);
                  setSidebarOpen(false);
                }}
                className={`sidebar-link ${currentSection === section.id ? 'active' : ''}`}
              >
                {section.title}
              </button>
            ))}
          </nav>
        </div>

        <div className="absolute bottom-0 left-0 right-0 p-6 border-t border-slate-200">
          <div className="flex items-center gap-4">
            <a
              href="https://github.com/jeffotoni"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 hover:bg-slate-200 rounded-lg transition-colors"
              title="GitHub"
            >
              <Github className="w-5 h-5 text-slate-600" />
            </a>
            <a
              href="https://linkedin.com/in/jeffotoni"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 hover:bg-slate-200 rounded-lg transition-colors"
              title="LinkedIn"
            >
              <Linkedin className="w-5 h-5 text-slate-600" />
            </a>
          </div>
          <p className="text-xs text-slate-400 mt-3">
            Por Jefferson Otoni Lima
          </p>
        </div>
      </aside>

      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/20 z-30 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main Content */}
      <main className="lg:ml-72 min-h-screen">
        <div className="lg:pt-0 pt-16">
          {children}
        </div>
      </main>
    </div>
  );
}
