import { CodeBlock } from '@/components/CodeBlock';
import { ContentTable } from '@/components/ContentTable';

export function OverviewPage() {
  const goInfoData = {
    headers: ['Item', 'Informação'],
    rows: [
      ['Início do projeto', '2007 (Google)'],
      ['Lançamento público', '2009'],
      ['Versão 1.0', '2012'],
      ['Criadores', 'Robert Griesemer, Rob Pike, Ken Thompson'],
    ],
  };

  const keywordsData = {
    headers: ['1', '2', '3', '4', '5'],
    rows: [
      ['break', 'default', 'func', 'interface', 'select'],
      ['case', 'defer', 'go', 'map', 'struct'],
      ['chan', 'else', 'goto', 'package', 'switch'],
      ['const', 'fallthrough', 'if', 'range', 'type'],
      ['continue', 'for', 'import', 'return', 'var'],
    ],
  };

  const compilationData = {
    headers: ['Aspecto', 'Como funciona em Go'],
    rows: [
      ['Compilação', 'AOT (ahead-of-time), gera binário nativo'],
      ['Tipagem', 'Estática e forte em tempo de compilação'],
      ['Linkagem', 'Normalmente estática; pode usar dinâmica em cenários com cgo'],
      ['Runtime', 'Dinâmico para GC, scheduler e reflexão quando necessário'],
    ],
  };

  const devopsToolsData = {
    headers: ['Ferramenta', 'Categoria', 'Relação com Go'],
    rows: [
      ['Docker (Moby/Engine)', 'Containerização', 'Implementação central em Go'],
      ['Kubernetes', 'Orquestração', 'Projeto core em Go'],
      ['Consul', 'Service discovery/config', 'Core em Go'],
      ['etcd', 'KV distribuído', 'Core em Go'],
      ['Terraform', 'Infrastructure as Code', 'Core em Go'],
      ['Vault', 'Secrets management', 'Core em Go'],
      ['CockroachDB', 'Banco distribuído SQL', 'Core majoritariamente em Go'],
      ['InfluxDB', 'Time-series database', 'Forte uso de Go no core'],
      ['Prometheus', 'Monitoramento', 'Core em Go'],
      ['Grafana', 'Observabilidade', 'Backend em Go'],
      ['Gitea', 'Git forge/self-hosted', 'Core em Go'],
    ],
  };

  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      <h1 className="section-title">2. Overview de Go para APIs</h1>

      {/* O que é Go */}
      <section className="mb-12">
        <h2 className="section-subtitle">O que é Go</h2>
        <p className="section-content">
          Go é uma linguagem compilada, de tipagem estática e sintaxe simples, focada em 
          <strong> produtividade</strong>, <strong>performance</strong> e <strong>legibilidade</strong>.
        </p>
      </section>

      {/* Ano de lançamento */}
      <section className="mb-12">
        <h2 className="section-subtitle">Ano de lançamento e principais nomes</h2>
        <ContentTable data={goInfoData} />
      </section>

      {/* Diferenciais */}
      <section className="mb-12">
        <h2 className="section-subtitle">Diferenciais de Go para construção de APIs</h2>
        <div className="grid md:grid-cols-2 gap-4">
          {[
            'Biblioteca padrão forte (net/http, encoding/json, context, database/sql)',
            'Compilação rápida e deploy simples (binário único)',
            'Concorrência nativa com goroutines e channels',
            'Código mais previsível e com menos complexidade acidental',
            'Excelente robustez para APIs de alta carga e baixa latência',
            'Testes integrados no toolchain (go test) com suporte a testes unitários e table-driven',
            'Cobertura, benchmark e fuzz testing nativos (-cover, -bench, -fuzz)',
          ].map((item, index) => (
            <div key={index} className="p-4 bg-sky-50 rounded-lg border border-sky-100">
              <p className="text-sky-800 text-sm">{item}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Concorrência */}
      <section className="mb-12">
        <h2 className="section-subtitle">Concorrência em Go (simples de entender)</h2>
        
        <div className="grid md:grid-cols-3 gap-4 mb-6">
          <div className="p-5 bg-slate-50 rounded-xl border border-slate-200">
            <h3 className="font-semibold text-slate-700 mb-2">goroutine</h3>
            <p className="text-sm text-slate-600">Função executando concorrentemente com baixo custo</p>
          </div>
          <div className="p-5 bg-slate-50 rounded-xl border border-slate-200">
            <h3 className="font-semibold text-slate-700 mb-2">channel</h3>
            <p className="text-sm text-slate-600">Canal seguro para comunicação entre goroutines</p>
          </div>
          <div className="p-5 bg-slate-50 rounded-xl border border-slate-200">
            <h3 className="font-semibold text-slate-700 mb-2">select</h3>
            <p className="text-sm text-slate-600">Coordena múltiplos canais e timeouts</p>
          </div>
        </div>

        <div className="tip-card">
          <h4 className="font-semibold text-emerald-800 mb-3">Modelo mental:</h4>
          <ol className="text-emerald-700 space-y-2 list-decimal list-inside">
            <li>Use <strong>goroutines</strong> para estruturar trabalho concorrente (não confundir com paralelismo)</li>
            <li>Troque dados por <strong>channels</strong> (em vez de compartilhar memória sempre)</li>
            <li>Controle cancelamento e prazo com <code>context.Context</code></li>
            <li>O runtime/scheduler decide quando há paralelismo real (ex.: múltiplos núcleos)</li>
          </ol>
        </div>
      </section>

      {/* Compilado, estático e dinâmico */}
      <section className="mb-12">
        <h2 className="section-subtitle">Compilado, estático e dinâmico (na prática)</h2>
        <ContentTable data={compilationData} />
      </section>

      {/* Go hoje é escrito em Go */}
      <section className="mb-12">
        <h2 className="section-subtitle">Go hoje é escrito em Go</h2>
        <p className="section-content">
          Desde o Go 1.5, o compilador principal é <strong>self-hosted</strong> (escrito em Go). 
          Ainda existem partes de baixo nível em assembly.
        </p>
      </section>

      {/* HTTP server built-in */}
      <section className="mb-12">
        <h2 className="section-subtitle">HTTP server built-in</h2>
        <p className="section-content mb-4">
          Go já traz servidor HTTP embutido na stdlib via <code>net/http</code>.
        </p>
        <CodeBlock 
          code={`http.HandleFunc("/ping", func(w http.ResponseWriter, r *http.Request) {
    w.Write([]byte("pong"))
})
http.ListenAndServe(":8080", nil)`}
        />
        <div className="info-card mt-4">
          <p className="text-sky-700">
            Isso não substitui todos os papéis de um nginx/reverse proxy, mas acelera muito o desenvolvimento de APIs.
          </p>
        </div>
      </section>

      {/* Palavras-chave */}
      <section className="mb-12">
        <h2 className="section-subtitle">Palavras-chave oficiais da linguagem (25)</h2>
        <ContentTable data={keywordsData} />
      </section>

      {/* Ecossistema Go em DevOps */}
      <section className="mb-12">
        <h2 className="section-subtitle">Ecossistema Go em DevOps</h2>
        <p className="section-content mb-6">
          Go se tornou uma das linguagens centrais do ecossistema <strong>CNCF/DevOps</strong> por entregar:
        </p>
        <ul className="list-disc list-inside space-y-2 ml-4 mb-6 text-slate-600">
          <li>Binários portáteis e simples de distribuir</li>
          <li>Boa performance de rede e concorrência</li>
          <li>Toolchain estável para projetos de infraestrutura</li>
        </ul>
        <ContentTable data={devopsToolsData} />
      </section>
    </div>
  );
}
