import { CodeBlock } from '@/components/CodeBlock';
import { ContentTable } from '@/components/ContentTable';

export function FundamentosPage() {
  const componentsData = {
    headers: ['Componente', 'Descrição'],
    rows: [
      ['http.ListenAndServe', 'Inicia o servidor HTTP na porta especificada'],
      ['http.Request', 'Representa a requisição do cliente'],
      ['http.ResponseWriter', 'Interface para escrever a resposta HTTP'],
      ['http.HandleFunc', 'Registra uma função handler para uma rota'],
      ['http.HandlerFunc', 'Tipo adaptador que converte função em Handler'],
      ['http.Handle', 'Registra um Handler para uma rota'],
      ['http.Handler', 'Interface com método ServeHTTP'],
      ['http.ServeMux', 'Multiplexador de requisições HTTP (roteador)'],
      ['http.Server', 'Configuração avançada do servidor HTTP'],
    ],
  };

  const responseWriterData = {
    headers: ['Método', 'O que faz', 'Observações importantes'],
    rows: [
      ['Header() http.Header', 'Manipula headers da resposta', 'Defina antes do WriteHeader'],
      ['Write([]byte)', 'Escreve o body', 'Se não chamar WriteHeader, envia 200 automaticamente'],
      ['WriteHeader(statusCode int)', 'Define status HTTP', 'Deve ser chamado uma vez'],
    ],
  };

  const requestFieldsData = {
    headers: ['Campo', 'Tipo', 'Para que serve'],
    rows: [
      ['r.Method', 'string', 'Verbo HTTP (GET, POST, etc.)'],
      ['r.URL', '*url.URL', 'Path e query string'],
      ['r.Header', 'http.Header', 'Headers da requisição'],
      ['r.Body', 'io.ReadCloser', 'Corpo da requisição'],
      ['r.Host', 'string', 'Host chamado'],
      ['r.RemoteAddr', 'string', 'IP/porta de origem do cliente'],
      ['r.Proto', 'string', 'Protocolo (HTTP/1.1, HTTP/2.0)'],
      ['r.ContentLength', 'int64', 'Tamanho do body'],
    ],
  };

  const urlFieldsData = {
    headers: ['Expressão', 'Tipo', 'Para que serve'],
    rows: [
      ['r.URL.Path', 'string', 'Caminho da rota sem query'],
      ['r.URL.RawQuery', 'string', 'Query string crua'],
      ['r.URL.Query()', 'url.Values', 'Mapa de parâmetros da query'],
      ['r.URL.Query().Get("id")', 'string', 'Pega o primeiro valor da chave'],
      ['r.URL.Query()["tag"]', '[]string', 'Pega todos os valores da chave repetida'],
      ['r.URL.EscapedPath()', 'string', 'Path escapado para URL'],
      ['r.URL.String()', 'string', 'URL em formato texto (bom para log/debug)'],
    ],
  };

  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      <h1 className="section-title">3. Fundamentos do net/http</h1>

      {/* O pacote */}
      <section className="mb-12">
        <h2 className="section-subtitle">O pacote net/http</h2>
        <p className="section-content mb-4">
          O pacote oferece:
        </p>
        <ul className="list-disc list-inside space-y-1 ml-4 text-slate-600">
          <li>Cliente HTTP</li>
          <li>Servidor HTTP</li>
          <li>Request e ResponseWriter</li>
          <li>Handler, HandlerFunc e ServeMux</li>
          <li>Utilitários de cookies, headers e mais</li>
        </ul>
        <ContentTable data={componentsData} />
      </section>

      {/* Mini referência */}
      <section className="mb-12">
        <h2 className="section-subtitle">Mini referência dos componentes</h2>
        
        <div className="space-y-8">
          <div>
            <h3 className="font-semibold text-slate-700 mb-3">http.ListenAndServe</h3>
            <CodeBlock code={`log.Fatal(http.ListenAndServe(":8080", nil))`} />
          </div>

          <div>
            <h3 className="font-semibold text-slate-700 mb-3">http.Request e http.ResponseWriter</h3>
            <CodeBlock 
              code={`func echo(w http.ResponseWriter, r *http.Request) {
	id := r.URL.Query().Get("id")

	w.Header().Set("Content-Type", "text/plain; charset=utf-8")
	w.WriteHeader(http.StatusOK)
	_, _ = w.Write([]byte("method=" + r.Method + " path=" + r.URL.Path + " id=" + id))
}`}
            />
          </div>

          <div>
            <h3 className="font-semibold text-slate-700 mb-3">http.HandleFunc</h3>
            <CodeBlock 
              code={`http.HandleFunc("/ping", func(w http.ResponseWriter, r *http.Request) {
	_, _ = w.Write([]byte("pong"))
})

log.Fatal(http.ListenAndServe(":8080", nil))`}
            />
          </div>

          <div>
            <h3 className="font-semibold text-slate-700 mb-3">http.HandlerFunc</h3>
            <CodeBlock 
              code={`handler := http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
	_, _ = w.Write([]byte("pong"))
})

log.Fatal(http.ListenAndServe(":8080", handler))`}
            />
          </div>

          <div>
            <h3 className="font-semibold text-slate-700 mb-3">http.Handle</h3>
            <CodeBlock 
              code={`http.Handle("/ping", http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
	_, _ = w.Write([]byte("pong"))
}))

log.Fatal(http.ListenAndServe(":8080", nil))`}
            />
          </div>

          <div>
            <h3 className="font-semibold text-slate-700 mb-3">http.Handler</h3>
            <CodeBlock 
              code={`type PingHandler struct{}

func (PingHandler) ServeHTTP(w http.ResponseWriter, r *http.Request) {
	_, _ = w.Write([]byte("pong"))
}

log.Fatal(http.ListenAndServe(":8080", PingHandler{}))`}
            />
          </div>

          <div>
            <h3 className="font-semibold text-slate-700 mb-3">http.ServeMux</h3>
            <CodeBlock 
              code={`mux := http.NewServeMux()
mux.HandleFunc("GET /ping", func(w http.ResponseWriter, r *http.Request) {
	_, _ = w.Write([]byte("pong"))
})

log.Fatal(http.ListenAndServe(":8080", mux))`}
            />
          </div>

          <div>
            <h3 className="font-semibold text-slate-700 mb-3">http.Server</h3>
            <CodeBlock 
              code={`srv := &http.Server{
	Addr:    ":8080",
	Handler: mux,
}

log.Fatal(srv.ListenAndServe())`}
            />
          </div>
        </div>

        <div className="tip-card mt-8">
          <h4 className="font-semibold text-emerald-800 mb-2">Regra mental rápida:</h4>
          <ul className="text-emerald-700 space-y-1">
            <li>• <code>HandleFunc</code>: função</li>
            <li>• <code>HandlerFunc</code>: função adaptada para Handler</li>
            <li>• <code>Handle</code>: registra um Handler</li>
            <li>• <code>Handler</code>: comportamento completo (ServeHTTP)</li>
          </ul>
        </div>
      </section>

      {/* Anatomia do handler */}
      <section className="mb-12">
        <h2 className="section-subtitle">Anatomia mínima de um handler (w e r)</h2>
        
        <div className="mb-6">
          <h3 className="font-semibold text-slate-700 mb-3">Assinatura padrão</h3>
          <CodeBlock code={`func(w http.ResponseWriter, r *http.Request)`} />
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <div className="p-6 bg-sky-50 rounded-xl border border-sky-100">
            <h3 className="font-semibold text-sky-700 mb-3">w http.ResponseWriter</h3>
            <p className="text-sky-800 text-sm mb-3">
              É a saída da sua API (resposta para o cliente)
            </p>
            <p className="text-sky-800 text-sm">
              Pense na ordem: <strong>Headers → Status → Body</strong>
            </p>
          </div>
          <div className="p-6 bg-emerald-50 rounded-xl border border-emerald-100">
            <h3 className="font-semibold text-emerald-700 mb-3">r *http.Request</h3>
            <p className="text-emerald-800 text-sm">
              Representa tudo que o cliente enviou na requisição
            </p>
          </div>
        </div>

        <h3 className="font-semibold text-slate-700 mb-4">Métodos principais de ResponseWriter</h3>
        <ContentTable data={responseWriterData} />

        <div className="warning-card mt-6">
          <h4 className="font-semibold text-amber-800 mb-2">Regras importantes:</h4>
          <ul className="text-amber-700 space-y-1">
            <li>• Depois de <code>WriteHeader</code>, os headers ficam congelados</li>
            <li>• <code>Write()</code> chama implicitamente <code>WriteHeader(200)</code> se nenhum status foi enviado</li>
            <li>• Ordem correta: Header().Set() → WriteHeader() → Write()</li>
          </ul>
        </div>

        <h3 className="font-semibold text-slate-700 mt-8 mb-4">Campos mais usados de Request</h3>
        <ContentTable data={requestFieldsData} />
      </section>

      {/* Trabalhando com URL */}
      <section className="mb-12">
        <h2 className="section-subtitle">Trabalhando com URL e Query</h2>
        
        <div className="mb-6">
          <h3 className="font-semibold text-slate-700 mb-3">Anatomia da URL</h3>
          <CodeBlock 
            language="text"
            code={`https://domain.com/api/v1/user?id=123&debug=true#secao`}
          />
        </div>

        <ContentTable 
          data={{
            headers: ['Parte da URL', 'Exemplo', 'Onde usar no servidor Go'],
            rows: [
              ['Protocolo (scheme)', 'https', 'inferir via r.TLS (nil = http, diferente de nil = https)'],
              ['Host', 'domain.com', 'r.Host'],
              ['Path', '/api/v1/user', 'r.URL.Path'],
              ['Query string bruta', 'id=123&debug=true', 'r.URL.RawQuery'],
              ['Query params', 'id=123, debug=true', 'r.URL.Query().Get("id"), r.URL.Query().Get("debug")'],
              ['Fragmento', '#secao', 'não chega no servidor (browser não envia no request HTTP)'],
            ],
          }}
        />

        <h3 className="font-semibold text-slate-700 mt-6 mb-4">Exemplo prático no handler</h3>
        <CodeBlock 
          code={`scheme := "http"
if r.TLS != nil {
	scheme = "https"
}

fullURL := scheme + "://" + r.Host + r.URL.RequestURI()
// fullURL => https://domain.com/api/v1/user?id=123&debug=true`}
        />

        <h3 className="font-semibold text-slate-700 mt-6 mb-4">Campos e métodos úteis de r.URL</h3>
        <ContentTable data={urlFieldsData} />
      </section>

      {/* Trabalhando com headers e body */}
      <section className="mb-12">
        <h2 className="section-subtitle">Trabalhando com headers e body</h2>
        
        <div className="space-y-6">
          <div>
            <h3 className="font-semibold text-slate-700 mb-3">Trabalhando com headers</h3>
            <CodeBlock 
              code={`r.Header.Get("Authorization")
r.Header.Get("Content-Type")`}
            />
          </div>

          <div>
            <h3 className="font-semibold text-slate-700 mb-3">Trabalhando com body JSON</h3>
            <CodeBlock 
              code={`defer r.Body.Close()
_ = json.NewDecoder(r.Body).Decode(&payload)`}
            />
          </div>

          <div>
            <h3 className="font-semibold text-slate-700 mb-3">Boa prática: limitar tamanho do body</h3>
            <CodeBlock 
              code={`r.Body = http.MaxBytesReader(w, r.Body, 1<<20) // 1MB`}
            />
          </div>
        </div>
      </section>
    </div>
  );
}
