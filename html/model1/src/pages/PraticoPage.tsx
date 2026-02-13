import { CodeBlock } from '@/components/CodeBlock';
import { ContentTable } from '@/components/ContentTable';

export function PraticoPage() {
  const raciocinioData = {
    headers: ['Ordem', 'Foco', 'Resultado para o aluno'],
    rows: [
      ['1', 'Entender HandleFunc vs HandlerFunc', 'Evita os erros mais comuns'],
      ['2', 'Entender o que ListenAndServe aceita', 'Sabe passar nil ou Handler'],
      ['3', 'Praticar variações sem ServeMux custom', 'Domina o básico do fluxo HTTP'],
      ['4', 'Praticar respostas reais de API', 'Query, JSON e headers'],
      ['5', 'Configurar ServeMux e http.Server', 'Method pattern, timeout e limites'],
      ['6', 'Entender composição com http.Handler', 'Sabe crescer sem quebrar arquitetura'],
    ],
  };

  const serverPropsData = {
    headers: ['Campo', 'O que faz', 'Exemplo'],
    rows: [
      ['Addr', 'Endereço/porta que o servidor vai escutar', '":8080"'],
      ['Handler', 'Quem vai processar as rotas (mux, handler custom, etc.)', 'mux'],
      ['IdleTimeout', 'Tempo de conexão ociosa aguardando próxima request (keep-alive)', '60 * time.Second'],
      ['ReadTimeout', 'Tempo máximo para ler a request completa (headers + body)', '15 * time.Second'],
      ['ReadHeaderTimeout', 'Tempo máximo para ler apenas headers (anti slowloris)', '5 * time.Second'],
      ['WriteTimeout', 'Tempo máximo para escrever a resposta', '15 * time.Second'],
      ['MaxHeaderBytes', 'Tamanho máximo dos headers recebidos', '1 << 20 (1MB)'],
    ],
  };

  const decoderVsUnmarshalData = {
    headers: ['Opção', 'Quando usar', 'Vantagem', 'Atenção'],
    rows: [
      ['json.NewDecoder(r.Body).Decode(&v)', 'Fluxo HTTP padrão lendo direto do body', 'Simples e direto no handler', 'Menos controle sobre o []byte bruto'],
      ['io.ReadAll(r.Body) + json.Unmarshal(raw, &v)', 'Quando você precisa do body bruto antes de converter', 'Permite log, auditoria, assinatura, validação prévia', 'Mais verboso e usa memória para guardar o body inteiro'],
    ],
  };

  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      <h1 className="section-title">4. Manual Prático: ListenAndServe (Fase Zero)</h1>

      <div className="info-card mb-8">
        <p className="text-sky-700">
          Nesta fase, o README.md é o manual principal para copiar, colar e executar.
        </p>
        <p className="text-sky-600 text-sm mt-2">
          Observação prática: cada exemplo usa a porta <code>:8080</code>. Execute um exemplo por vez (pare o anterior antes de rodar o próximo).
        </p>
      </div>

      {/* Linha de raciocínio */}
      <section className="mb-12">
        <h2 className="section-subtitle">Linha de raciocínio da aula</h2>
        <ContentTable data={raciocinioData} />
      </section>

      {/* Diferença HandleFunc vs HandlerFunc */}
      <section className="mb-12">
        <h2 className="section-subtitle">1) Diferença essencial: HandleFunc vs HandlerFunc</h2>
        
        <p className="section-content mb-4">
          <code>HandleFunc</code> é função de registro. <code>HandlerFunc</code> é tipo adaptador (vira <code>http.Handler</code>).
        </p>

        <div className="space-y-4">
          <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-red-700 text-sm font-semibold mb-2">ERRADO - HandleFunc não retorna nada</p>
            <CodeBlock code={`http.Handle("/rota", http.HandleFunc(...))`} />
          </div>
          
          <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-lg">
            <p className="text-emerald-700 text-sm font-semibold mb-2">CERTO - HandlerFunc é um tipo</p>
            <CodeBlock code={`http.Handle("/rota", http.HandlerFunc(...))`} />
          </div>
          
          <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-lg">
            <p className="text-emerald-700 text-sm font-semibold mb-2">CERTO - HandleFunc registra direto</p>
            <CodeBlock code={`http.HandleFunc("/rota", ...)`} />
          </div>
        </div>
      </section>

      {/* O que ListenAndServe aceita */}
      <section className="mb-12">
        <h2 className="section-subtitle">2) O que ListenAndServe aceita</h2>
        
        <p className="section-content mb-4">Assinatura:</p>
        <CodeBlock code={`func ListenAndServe(addr string, handler Handler) error`} />

        <p className="section-content mb-4"><code>handler</code> pode ser:</p>
        <ul className="list-disc list-inside space-y-1 ml-4 text-slate-600">
          <li><code>nil</code> (usa <code>DefaultServeMux</code>)</li>
          <li><code>http.HandlerFunc(...)</code></li>
          <li><code>http.NewServeMux()</code></li>
          <li>tipo custom com <code>ServeHTTP()</code></li>
        </ul>

        <div className="mt-6 p-6 bg-slate-800 rounded-xl text-slate-100 font-mono text-sm">
          <p>ListenAndServe(addr, handler)</p>
          <p className="ml-20">│</p>
          <p className="ml-20">+--&gt; qualquer coisa que implemente Handler</p>
          <p className="ml-24">│</p>
          <p className="ml-24">+--&gt; nil (DefaultServeMux)</p>
          <p className="ml-24">+--&gt; http.HandlerFunc(...)</p>
          <p className="ml-24">+--&gt; http.NewServeMux()</p>
          <p className="ml-24">+--&gt; tipo custom com ServeHTTP()</p>
        </div>
      </section>

      {/* Variações base */}
      <section className="mb-12">
        <h2 className="section-subtitle">3) Variações base (sem ServeMux custom)</h2>

        <div className="space-y-8">
          <div>
            <h3 className="font-semibold text-slate-700 mb-3">Exemplo 3.1 - DefaultServeMux com HandleFunc</h3>
            <CodeBlock 
              filename="main.go"
              code={`package main

import (
	"log"
	"net/http"
)

func main() {
	http.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
		_, _ = w.Write([]byte("Home"))
	})

	http.HandleFunc("/api", func(w http.ResponseWriter, r *http.Request) {
		_, _ = w.Write([]byte("API"))
	})

	log.Fatal(http.ListenAndServe(":8080", nil))
}`}
            />
            <div className="mt-4 p-4 bg-slate-50 rounded-lg">
              <p className="text-sm text-slate-600 font-semibold mb-2">Executar:</p>
              <CodeBlock language="bash" code={`go run main.go
curl -i localhost:8080/
curl -i localhost:8080/api`} />
            </div>
          </div>

          <div>
            <h3 className="font-semibold text-slate-700 mb-3">Exemplo 3.2 - DefaultServeMux com Handle</h3>
            <CodeBlock 
              filename="main.go"
              code={`package main

import (
	"log"
	"net/http"
)

func main() {
	http.Handle("/", http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		_, _ = w.Write([]byte("Home"))
	}))

	http.Handle("/api", http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		_, _ = w.Write([]byte("API"))
	}))

	log.Fatal(http.ListenAndServe(":8080", nil))
}`}
            />
          </div>

          <div>
            <h3 className="font-semibold text-slate-700 mb-3">Exemplo 3.3 - Handler único direto (roteamento manual)</h3>
            <CodeBlock 
              filename="main.go"
              code={`package main

import (
	"log"
	"net/http"
)

func main() {
	log.Fatal(http.ListenAndServe(":8080",
		http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
			switch r.URL.Path {
			case "/":
				_, _ = w.Write([]byte("Home"))
			case "/api":
				_, _ = w.Write([]byte("API"))
			default:
				w.WriteHeader(http.StatusNotFound)
				_, _ = w.Write([]byte("Not Found"))
			}
		}),
	))
}`}
            />
          </div>

          <div>
            <h3 className="font-semibold text-slate-700 mb-3">Exemplo 3.4 - Extrair HandlerFunc para variável</h3>
            <CodeBlock 
              filename="main.go"
              code={`package main

import (
	"log"
	"net/http"
)

func main() {
	meuHandler := http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		_, _ = w.Write([]byte("Handler extraído"))
	})

	log.Fatal(http.ListenAndServe(":8080", meuHandler))
}`}
            />
          </div>

          <div>
            <h3 className="font-semibold text-slate-700 mb-3">Exemplo 3.5 - Converter para HandlerFunc</h3>
            <CodeBlock 
              filename="main.go"
              code={`package main

import (
	"log"
	"net/http"
)

func minhaFuncao(w http.ResponseWriter, r *http.Request) {
	_, _ = w.Write([]byte("Função normal convertida em Handler"))
}

func main() {
	log.Fatal(http.ListenAndServe(":8080", http.HandlerFunc(minhaFuncao)))
}`}
            />
          </div>
        </div>
      </section>

      {/* Algumas possibilidades */}
      <section className="mb-12">
        <h2 className="section-subtitle">4) Algumas possibilidades</h2>

        <div className="space-y-8">
          <div>
            <h3 className="font-semibold text-slate-700 mb-3">Exemplo 4.1 - Parâmetros de URL (r.URL.Query)</h3>
            <CodeBlock 
              filename="main.go"
              code={`package main

import (
	"fmt"
	"log"
	"net/http"
)

func main() {
	http.HandleFunc("/hello", func(w http.ResponseWriter, r *http.Request) {
		name := r.URL.Query().Get("name")
		_, _ = fmt.Fprintf(w, "Hello, %s!", name)
	})

	log.Fatal(http.ListenAndServe(":8080", nil))
}`}
            />
            <div className="mt-4 p-4 bg-slate-50 rounded-lg">
              <CodeBlock language="bash" code={`curl -i "localhost:8080/hello?name=jeff"
curl -i localhost:8080/hello`} />
            </div>
          </div>

          <div>
            <h3 className="font-semibold text-slate-700 mb-3">Exemplo 4.2 - Resposta JSON</h3>
            <CodeBlock 
              filename="main.go"
              code={`package main

import (
	"encoding/json"
	"log"
	"net/http"
)

func main() {
	http.HandleFunc("/api/user", func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Content-Type", "application/json")
		_ = json.NewEncoder(w).Encode(map[string]string{
			"name": "Joao",
			"role": "Developer",
		})
	})

	log.Fatal(http.ListenAndServe(":8080", nil))
}`}
            />
          </div>

          <div>
            <h3 className="font-semibold text-slate-700 mb-3">Exemplo 4.3 - Headers customizados + status code</h3>
            <CodeBlock 
              filename="main.go"
              code={`package main

import (
	"log"
	"net/http"
)

func main() {
	http.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("X-Custom-Header", "DevopsBH")
		w.Header().Set("Content-Type", "text/plain; charset=utf-8")
		w.WriteHeader(http.StatusOK)
		_, _ = w.Write([]byte("Response com headers customizados"))
	})

	log.Fatal(http.ListenAndServe(":8080", nil))
}`}
            />
          </div>
        </div>
      </section>

      {/* ServeMux com method pattern */}
      <section className="mb-12">
        <h2 className="section-subtitle">5) ServeMux com method pattern + http.Server</h2>

        <div className="info-card mb-6">
          <p className="text-sky-700">
            Sim, essa sintaxe existe e é oficial:
          </p>
          <CodeBlock code={`mux.HandleFunc("POST /api/v1/user", handler)`} />
          <p className="text-sky-600 text-sm mt-2">
            Observação: method pattern (<code>"GET /x"</code>, <code>"POST /x"</code>) requer Go 1.22+
          </p>
        </div>

        <div className="tip-card mb-6">
          <h4 className="font-semibold text-emerald-800 mb-2">Keep-Alive (importante para API):</h4>
          <ul className="text-emerald-700 space-y-1 text-sm">
            <li>• No HTTP/1.1, keep-alive é padrão; o cliente tende a reutilizar a conexão</li>
            <li>• O servidor não "liga keep-alive manualmente", mas controla tempo de ociosidade</li>
            <li>• Em Go, <code>IdleTimeout</code> é uma configuração chave para conexões persistentes</li>
            <li>• Proxies/load balancers no caminho também podem fechar conexões</li>
          </ul>
        </div>

        <h3 className="font-semibold text-slate-700 mb-4">Propriedades principais do http.Server</h3>
        <ContentTable data={serverPropsData} />

        <div className="mt-8">
          <h3 className="font-semibold text-slate-700 mb-3">Exemplo completo e didático</h3>
          <CodeBlock 
            filename="main.go"
            code={`package main

import (
	"fmt"
	"log"
	"net/http"
	"time"
)

func homeHandler(w http.ResponseWriter, r *http.Request) {
	_, _ = fmt.Fprintf(w, "Request %s processado\\n", r.URL.Path)
	fmt.Printf("Connection from: %s\\n", r.RemoteAddr)
}

func main() {
	mux := http.NewServeMux()
	mux.HandleFunc("/", homeHandler)

	srv := &http.Server{
		Addr:              ":8080",
		Handler:           mux,
		IdleTimeout:       60 * time.Second,
		ReadTimeout:       15 * time.Second,
		ReadHeaderTimeout: 5 * time.Second,
		WriteTimeout:      15 * time.Second,
		MaxHeaderBytes:    1 << 20, // 1MB
	}

	fmt.Println("Server listening on :8080")
	fmt.Println("IdleTimeout:", srv.IdleTimeout)
	log.Fatal(srv.ListenAndServe())
}`}
          />
        </div>

        <div className="mt-6">
          <h3 className="font-semibold text-slate-700 mb-3">POST /api/v1/user com json.NewDecoder</h3>
          <CodeBlock 
            filename="main.go"
            code={`package main

import (
	"errors"
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"strings"
)

type User struct {
	Name  string \`json:"name"\`
	Email string \`json:"email"\`
}

const maxBodyBytes = 1 << 20 // 1MB

func postUserWithDecoder(w http.ResponseWriter, r *http.Request) {
	if !strings.HasPrefix(r.Header.Get("Content-Type"), "application/json") {
		w.Header().Set("Content-Type", "application/json")
		w.WriteHeader(http.StatusUnsupportedMediaType)
		_, _ = w.Write([]byte(\`{"error":"content_type_must_be_application_json"}\`))
		return
	}

	r.Body = http.MaxBytesReader(w, r.Body, maxBodyBytes)

	var in User
	if err := json.NewDecoder(r.Body).Decode(&in); err != nil {
		w.Header().Set("Content-Type", "application/json")
		var maxErr *http.MaxBytesError
		if errors.As(err, &maxErr) {
			w.WriteHeader(http.StatusRequestEntityTooLarge)
			_, _ = w.Write([]byte(\`{"error":"body_too_large","max_bytes":1048576}\`))
			return
		}
		w.WriteHeader(http.StatusBadRequest)
		_, _ = w.Write([]byte(\`{"error":"invalid_json"}\`))
		return
	}

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusCreated)
	_, _ = w.Write([]byte(fmt.Sprintf(
		\`{"message":"user created (decoder)","name":"%s","email":"%s"}\`,
		in.Name, in.Email,
	)))
}

func main() {
	mux := http.NewServeMux()
	mux.HandleFunc("POST /api/v1/user", postUserWithDecoder)
	log.Fatal(http.ListenAndServe(":8080", mux))
}`}
          />
        </div>

        <div className="mt-6">
          <h3 className="font-semibold text-slate-700 mb-3">Quando usar Decoder vs Unmarshal?</h3>
          <ContentTable data={decoderVsUnmarshalData} />
        </div>

        <div className="tip-card mt-6">
          <h4 className="font-semibold text-emerald-800 mb-2">Checklist mínimo para endpoint de API:</h4>
          <ul className="text-emerald-700 space-y-1">
            <li>• Limitar tamanho do body (<code>http.MaxBytesReader</code>)</li>
            <li>• Validar <code>Content-Type: application/json</code> para endpoints JSON</li>
            <li>• Validar JSON de entrada e retornar erro claro</li>
            <li>• Responder com <code>Content-Type</code> consistente</li>
            <li>• Manter handlers nomeados fora do <code>main</code> quando o fluxo crescer</li>
          </ul>
        </div>
      </section>

      {/* Quando usar http.Handler */}
      <section className="mb-12">
        <h2 className="section-subtitle">6) Quando usar http.Handler?</h2>

        <div className="warning-card mb-6">
          <h4 className="font-semibold text-amber-800 mb-2">Regra de ouro:</h4>
          <ul className="text-amber-700 space-y-1">
            <li>• Use <code>http.Handler</code> quando quiser <strong>compor comportamento</strong> (middleware, cadeia, reaproveitamento)</li>
            <li>• Use <code>http.HandlerFunc</code> quando quiser <strong>responder rota direto</strong> (simples e rápido)</li>
          </ul>
        </div>

        <p className="section-content mb-4">
          <code>http.Handler</code> é a base de tudo:
        </p>
        <CodeBlock 
          code={`type Handler interface {
    ServeHTTP(http.ResponseWriter, *http.Request)
}`}
        />

        <p className="section-content mt-4">
          Não é função. É <strong>comportamento</strong>: qualquer tipo que implemente <code>ServeHTTP</code> vira handler HTTP.
        </p>

        <div className="space-y-8 mt-8">
          <div>
            <h3 className="font-semibold text-slate-700 mb-3">6.1) Quando HandlerFunc é suficiente</h3>
            <p className="text-slate-600 mb-4">Use função direta quando:</p>
            <ul className="list-disc list-inside space-y-1 ml-4 text-slate-600 mb-4">
              <li>Código simples</li>
              <li>Sem estado interno</li>
              <li>Sem composição de middlewares</li>
            </ul>
            <CodeBlock 
              filename="main.go"
              code={`package main

import (
	"log"
	"net/http"
)

func ping(w http.ResponseWriter, r *http.Request) {
	_, _ = w.Write([]byte("pong"))
}

func main() {
	http.HandleFunc("/ping", ping)
	log.Fatal(http.ListenAndServe(":8080", nil))
}`}
            />
          </div>

          <div>
            <h3 className="font-semibold text-slate-700 mb-3">6.2) Exemplo com ServeHTTP (tipo customizado)</h3>
            <CodeBlock 
              filename="main.go"
              code={`package main

import (
	"fmt"
	"log"
	"net/http"
)

type helloHandler struct {
	msg string
}

func (h helloHandler) ServeHTTP(w http.ResponseWriter, r *http.Request) {
	_, _ = w.Write([]byte(fmt.Sprintf("%s | path=%s", h.msg, r.URL.Path)))
}

func main() {
	h := helloHandler{msg: "handler custom implementando ServeHTTP"}
	http.Handle("/hello", h)
	log.Fatal(http.ListenAndServe(":8080", nil))
}`}
            />
          </div>

          <div>
            <h3 className="font-semibold text-slate-700 mb-3">6.3) Exemplo com http.Handler para composição</h3>
            <CodeBlock 
              filename="main.go"
              code={`package main

import (
	"log"
	"net/http"
)

type LoggerMiddleware struct {
	next http.Handler
}

func (l LoggerMiddleware) ServeHTTP(w http.ResponseWriter, r *http.Request) {
	log.Printf("%s %s", r.Method, r.URL.Path)
	l.next.ServeHTTP(w, r)
}

func getUser(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	_, _ = w.Write([]byte(\`{"name":"Jeff","email":"jeff@email.com"}\`))
}

func main() {
	mux := http.NewServeMux()
	mux.HandleFunc("GET /api/v1/user", getUser)

	handlerFinal := LoggerMiddleware{next: mux}
	srv := &http.Server{
		Addr:    ":8080",
		Handler: handlerFinal,
	}

	log.Fatal(srv.ListenAndServe())
}`}
            />
          </div>

          <div>
            <h3 className="font-semibold text-slate-700 mb-3">6.4) Mesma composição, outra forma (middleware func)</h3>
            <CodeBlock 
              filename="main.go"
              code={`package main

import (
	"log"
	"net/http"
)

func loggingMiddleware(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		log.Printf("%s %s", r.Method, r.URL.Path)
		next.ServeHTTP(w, r)
	})
}

func getUser(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	_, _ = w.Write([]byte(\`{"name":"Jeff","email":"jeff@email.com"}\`))
}

func main() {
	mux := http.NewServeMux()
	mux.HandleFunc("GET /api/v1/user", getUser)

	handlerFinal := loggingMiddleware(mux)
	srv := &http.Server{
		Addr:    ":8080",
		Handler: handlerFinal,
	}

	log.Fatal(srv.ListenAndServe())
}`}
            />
          </div>
        </div>
      </section>
    </div>
  );
}
