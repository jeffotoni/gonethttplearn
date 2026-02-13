import { homeContent } from '@/data/content';
import { ContentTable } from '@/components/ContentTable';
import { ExternalLink, Play, MessageCircle, Presentation, BookOpen } from 'lucide-react';

export function HomePage() {
  const { title, subtitle, description, author, blocks, resources, goReferences } = homeContent;

  const blocksData = {
    headers: ['Bloco', 'O que você aprende'],
    rows: blocks.map(b => [b.name, b.description]),
  };

  const resourcesData = {
    headers: ['Canal', 'Link', 'Objetivo'],
    rows: resources.map(r => [
      <span className="flex items-center gap-2">
        {r.name === 'Podcast' && <Play className="w-4 h-4 text-rose-500" />}
        {r.name === 'Chat de dúvidas' && <MessageCircle className="w-4 h-4 text-emerald-500" />}
        {r.name === 'Apresentação' && <Presentation className="w-4 h-4 text-amber-500" />}
        {r.name}
      </span>,
      <a href={r.url} target="_blank" rel="noopener noreferrer" className="text-sky-600 hover:underline flex items-center gap-1">
        {r.description} <ExternalLink className="w-3 h-3" />
      </a>,
      r.name === 'Podcast' ? 'Revisar os conceitos em formato de áudio' :
      r.name === 'Chat de dúvidas' ? 'Tirar dúvidas e reforçar o conteúdo' :
      'Apoio visual para estudo e aula'
    ]),
  };

  const goRefsData = {
    headers: ['Referência', 'Link', 'Tipo', 'Foco'],
    rows: goReferences.map(r => [
      r.name,
      <a href={r.url} target="_blank" rel="noopener noreferrer" className="text-sky-600 hover:underline flex items-center gap-1">
        {r.url.replace('https://', '')} <ExternalLink className="w-3 h-3" />
      </a>,
      r.type,
      r.focus
    ]),
  };

  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      {/* Hero */}
      <div className="text-center mb-12">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-sky-50 text-sky-700 rounded-full text-sm font-medium mb-6">
          <BookOpen className="w-4 h-4" />
          Manual Prático
        </div>
        <h1 className="text-5xl font-bold text-slate-800 mb-4">{title}</h1>
        <p className="text-2xl text-sky-600 font-medium mb-6">{subtitle}</p>
        <p className="text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">{description}</p>
      </div>

      {/* Author */}
      <div className="info-card mb-12">
        <div className="flex items-start gap-4">
          <div className="w-16 h-16 bg-gradient-to-br from-sky-500 to-blue-600 rounded-full flex items-center justify-center text-white text-2xl font-bold">
            JL
          </div>
          <div>
            <h3 className="font-semibold text-slate-800 text-lg">{author.name}</h3>
            <p className="text-slate-600">{author.role}</p>
            <p className="text-sky-600 text-sm mt-1">{author.experience}</p>
          </div>
        </div>
        <p className="mt-4 text-slate-600">
          Atua principalmente em APIs, arquitetura de software e ecossistema cloud-native, 
          além de programação em diversas linguagens como Go, Rust, C, C++, Java, C#, Node.js, Deno, Bun, PHP, Perl, Python, Dart.
        </p>
        <div className="mt-4 p-4 bg-white/60 rounded-lg">
          <p className="text-slate-700 font-medium">
            "A proposta central é dominar o net/http para que frameworks sejam uma escolha, não uma dependência."
          </p>
        </div>
      </div>

      {/* Content Blocks */}
      <section className="mb-12">
        <h2 className="section-title">O que já está coberto neste manual</h2>
        <ContentTable data={blocksData} />
      </section>

      {/* Resources */}
      <section className="mb-12">
        <h2 className="section-title">Recursos oficiais do manual</h2>
        <ContentTable data={resourcesData} />
      </section>

      {/* Go References */}
      <section className="mb-12">
        <h2 className="section-title">Referências Go</h2>
        <ContentTable data={goRefsData} />
      </section>

      {/* Jeffotoni References */}
      <section className="mb-12">
        <h2 className="section-title">Referências Jeffotoni (Go e Arquitetura)</h2>
        <div className="grid md:grid-cols-2 gap-4">
          {[
            { name: 'Go Bootcamp', url: 'https://gobootcamp.jeffotoni.com/br/index.html', desc: 'Trilha de aprendizado em Go' },
            { name: 'Site pessoal', url: 'http://jeffotoni.com', desc: 'Conteúdo e materiais do autor' },
            { name: 'Go gRPC Palestra', url: 'https://github.com/jeffotoni/gogrpc.palestra', desc: 'Materiais e exemplos de gRPC em Go' },
            { name: 'Go Workshop DevOps', url: 'https://github.com/jeffotoni/goworkshopdevops', desc: 'Práticas de Go para DevOps' },
            { name: 'Go Example', url: 'https://github.com/jeffotoni/goexample', desc: 'Coleção de exemplos práticos' },
            { name: 'Go Manual', url: 'https://gomanual.jeffotoni.com/', desc: 'Manual de referência em Go' },
            { name: 'Go Roadmap', url: 'https://github.com/jeffotoni/groadmap', desc: 'Visão macro da jornada Go' },
            { name: 'Quick', url: 'https://github.com/jeffotoni/quick', desc: 'Framework leve para APIs em Go' },
          ].map((ref) => (
            <a
              key={ref.name}
              href={ref.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group p-4 bg-white border border-slate-200 rounded-xl hover:border-sky-300 hover:shadow-sm transition-all"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="font-medium text-slate-800 group-hover:text-sky-600 transition-colors">{ref.name}</span>
                <ExternalLink className="w-4 h-4 text-slate-400 group-hover:text-sky-500" />
              </div>
              <p className="text-sm text-slate-500">{ref.desc}</p>
            </a>
          ))}
        </div>
      </section>

      {/* ASCII Art */}
      <div className="text-center py-8">
        <pre className="inline-block text-slate-300 font-mono text-sm select-none">
{`   ██████╗ ██╗   ██╗██╗ ██████╗██╗  ██╗
  ██╔═══██╗██║   ██║██║██╔═══   ██║ ██╔╝
  ██║   ██║██║   ██║██║██║      █████╔╝
  ██║▄▄ ██║██║   ██║██║██║      ██╔═██╗
  ╚██████╔╝╚██████╔╝██║╚██████╔ ██║  ██╗
   ╚══▀▀═╝  ╚═════╝ ╚═╝ ╚═════╝ ╚═╝  ╚═╝`}
        </pre>
      </div>
    </div>
  );
}
