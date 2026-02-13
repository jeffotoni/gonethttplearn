import { CodeBlock } from '@/components/CodeBlock';
import { ContentTable } from '@/components/ContentTable';

export function ServerPage() {
  const errorsData = {
    headers: ['Cenário', 'Status', 'Quando usar'],
    rows: [
      ['JSON inválido', '400', 'Body malformado'],
      ['Campo inválido / faltando', '422', 'Body válido, mas regra de negócio inválida'],
      ['Content-Type incorreto', '415', 'Esperava application/json'],
      ['Recurso não encontrado', '404', 'ID/path não existe'],
      ['Método não permitido', '405', 'Endpoint existe, método não'],
      ['Conflito de estado', '409', 'Ex.: email já cadastrado'],
      ['Erro interno', '500', 'Falha inesperada no servidor'],
    ],
  };

  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      <h1 className="section-title">5. Server API</h1>

      <div className="info-card mb-8">
        <h3 className="font-semibold text-sky-800 mb-2">Foco deste bloco:</h3>
        <ul className="text-sky-700 space-y-1">
          <li>• Somente lado servidor</li>
          <li>• Exemplos pequenos para copiar, colar e evoluir</li>
          <li>• Padronizar API antes de avançar para estrutura maior</li>
        </ul>
      </div>

      {/* Padronização de resposta */}
      <section className="mb-12">
        <h2 className="section-subtitle">5.1 Padronização de resposta</h2>

        <div className="tip-card mb-6">
          <h4 className="font-semibold text-emerald-800 mb-2">Objetivo:</h4>
          <ul className="text-emerald-700 space-y-1">
            <li>• Centralizar escrita de resposta em um ponto único</li>
            <li>• Evitar repetição de Header, WriteHeader, Write</li>
            <li>• Manter formato consistente de sucesso e erro</li>
          </ul>
        </div>

        <CodeBlock 
          filename="main.go"
          code={`package main

import (
	"encoding/json"
	"log"
	"net/http"
)

type APIError struct {
	Code    string \`json:"code"\`
	Message string \`json:"message"\`
}

func writeJSON(w http.ResponseWriter, status int, payload any) {
	b, err := json.Marshal(payload)
	if err != nil {
		w.Header().Set("Content-Type", "application/json")
		w.WriteHeader(http.StatusInternalServerError)
		_, _ = w.Write([]byte(\`{"error":{"code":"internal_error","message":"json_encode_failed"}}\`))
		return
	}

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(status)
	_, _ = w.Write(b)
}

func writeError(w http.ResponseWriter, status int, code, message string) {
	writeJSON(w, status, map[string]any{
		"error": APIError{
			Code:    code,
			Message: message,
		},
	})
}

func okHandler(w http.ResponseWriter, r *http.Request) {
	writeJSON(w, http.StatusOK, map[string]any{
		"message": "ok",
		"data":    map[string]string{"course": "net/http"},
	})
}

func badHandler(w http.ResponseWriter, r *http.Request) {
	writeError(w, http.StatusBadRequest, "invalid_input", "missing required field")
}

func main() {
	mux := http.NewServeMux()
	mux.HandleFunc("GET /ok", okHandler)
	mux.HandleFunc("GET /bad", badHandler)

	log.Fatal(http.ListenAndServe(":8080", mux))
}`}
        />

        <div className="mt-4 p-4 bg-slate-50 rounded-lg">
          <p className="text-sm text-slate-600 font-semibold mb-2">Executar:</p>
          <CodeBlock language="bash" code={`go run main.go
curl -i localhost:8080/ok
curl -i localhost:8080/bad`} />
        </div>
      </section>

      {/* Mapa de erros */}
      <section className="mb-12">
        <h2 className="section-subtitle">5.2 Mapa de erros e status por cenário</h2>
        <ContentTable data={errorsData} />

        <div className="mt-8">
          <h3 className="font-semibold text-slate-700 mb-3">Exemplo de retorno de erro padronizado</h3>
          <CodeBlock 
            filename="main.go"
            code={`package main

import (
	"encoding/json"
	"log"
	"net/http"
)

type APIError struct {
	Code    string \`json:"code"\`
	Message string \`json:"message"\`
}

func writeJSON(w http.ResponseWriter, status int, payload any) {
	b, err := json.Marshal(payload)
	if err != nil {
		w.Header().Set("Content-Type", "application/json")
		w.WriteHeader(http.StatusInternalServerError)
		_, _ = w.Write([]byte(\`{"error":{"code":"internal_error","message":"json_encode_failed"}}\`))
		return
	}

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(status)
	_, _ = w.Write(b)
}

func writeError(w http.ResponseWriter, status int, code, message string) {
	writeJSON(w, status, map[string]any{
		"error": APIError{
			Code:    code,
			Message: message,
		},
	})
}

func errorByScenario(w http.ResponseWriter, r *http.Request) {
	switch r.PathValue("scenario") {
	case "bad-json":
		writeError(w, http.StatusBadRequest, "invalid_json", "malformed request body")
	case "validation":
		writeError(w, http.StatusUnprocessableEntity, "validation_error", "name and email are required")
	case "content-type":
		writeError(w, http.StatusUnsupportedMediaType, "unsupported_media_type", "use application/json")
	case "not-found":
		writeError(w, http.StatusNotFound, "not_found", "resource not found")
	case "method":
		writeError(w, http.StatusMethodNotAllowed, "method_not_allowed", "method not allowed for this endpoint")
	case "conflict":
		writeError(w, http.StatusConflict, "conflict", "email already exists")
	default:
		writeError(w, http.StatusInternalServerError, "internal_error", "unexpected server error")
	}
}

func main() {
	mux := http.NewServeMux()
	mux.HandleFunc("GET /error/{scenario}", errorByScenario)

	log.Fatal(http.ListenAndServe(":8080", mux))
}`}
          />
        </div>
      </section>

      {/* Organização de rotas */}
      <section className="mb-12">
        <h2 className="section-subtitle">5.3 Organização de rotas</h2>

        <div className="tip-card mb-6">
          <h4 className="font-semibold text-emerald-800 mb-2">Objetivo:</h4>
          <ul className="text-emerald-700 space-y-1">
            <li>• Manter rotas previsíveis</li>
            <li>• Separar por contexto (health, users, etc.)</li>
            <li>• Versionar API (/api/v1)</li>
          </ul>
        </div>

        <CodeBlock 
          filename="main.go"
          code={`package main

import (
	"log"
	"net/http"
)

func registerRoutes(mux *http.ServeMux) {
	// Health
	mux.HandleFunc("GET /healthz", healthz)
	mux.HandleFunc("GET /readyz", readyz)
	mux.HandleFunc("GET /livez", livez)

	// API v1 - users
	mux.HandleFunc("POST /api/v1/users", createUser)
	mux.HandleFunc("GET /api/v1/users/{id}", getUserByID)
	mux.HandleFunc("PUT /api/v1/users/{id}", updateUser)
}

func healthz(w http.ResponseWriter, r *http.Request) {
	_, _ = w.Write([]byte("ok"))
}

func readyz(w http.ResponseWriter, r *http.Request) {
	_, _ = w.Write([]byte("ready"))
}

func livez(w http.ResponseWriter, r *http.Request) {
	_, _ = w.Write([]byte("alive"))
}

func createUser(w http.ResponseWriter, r *http.Request) {
	w.WriteHeader(http.StatusCreated)
	_, _ = w.Write([]byte(\`{"message":"user created"}\`))
}

func getUserByID(w http.ResponseWriter, r *http.Request) {
	id := r.PathValue("id")
	_, _ = w.Write([]byte(\`{"id":"\` + id + \`"}\`))
}

func updateUser(w http.ResponseWriter, r *http.Request) {
	id := r.PathValue("id")
	_, _ = w.Write([]byte(\`{"message":"user updated","id":"\` + id + \`"}\`))
}

func main() {
	mux := http.NewServeMux()
	registerRoutes(mux)

	log.Fatal(http.ListenAndServe(":8080", mux))
}`}
        />

        <div className="tip-card mt-4">
          <p className="text-emerald-700 text-sm">
            <strong>Dica:</strong> Se usar <code>{"{id}"}</code> no pattern (Go 1.22+), leia com <code>r.PathValue("id")</code>
          </p>
        </div>
      </section>

      {/* Validação de entrada */}
      <section className="mb-12">
        <h2 className="section-subtitle">5.4 Validação de entrada no servidor</h2>

        <div className="tip-card mb-6">
          <h4 className="font-semibold text-emerald-800 mb-2">Checklist curto para POST/PUT:</h4>
          <ol className="text-emerald-700 space-y-1 list-decimal list-inside">
            <li>Validar Content-Type</li>
            <li>Limitar tamanho do body</li>
            <li>Decodificar JSON com DisallowUnknownFields</li>
            <li>Validar campos obrigatórios</li>
            <li>Retornar status correto (400, 415, 422)</li>
          </ol>
        </div>

        <CodeBlock 
          filename="main.go"
          code={`package main

import (
	"encoding/json"
	"log"
	"net/http"
	"strings"
)

type APIError struct {
	Code    string \`json:"code"\`
	Message string \`json:"message"\`
}

type CreateUserInput struct {
	Name  string \`json:"name"\`
	Email string \`json:"email"\`
}

func writeJSON(w http.ResponseWriter, status int, payload any) {
	b, err := json.Marshal(payload)
	if err != nil {
		w.Header().Set("Content-Type", "application/json")
		w.WriteHeader(http.StatusInternalServerError)
		_, _ = w.Write([]byte(\`{"error":{"code":"internal_error","message":"json_encode_failed"}}\`))
		return
	}

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(status)
	_, _ = w.Write(b)
}

func writeError(w http.ResponseWriter, status int, code, message string) {
	writeJSON(w, status, map[string]any{
		"error": APIError{
			Code:    code,
			Message: message,
		},
	})
}

func createUser(w http.ResponseWriter, r *http.Request) {
	if !strings.HasPrefix(r.Header.Get("Content-Type"), "application/json") {
		writeError(w, http.StatusUnsupportedMediaType, "unsupported_media_type", "use application/json")
		return
	}

	r.Body = http.MaxBytesReader(w, r.Body, 1<<20) // 1MB

	var in CreateUserInput
	dec := json.NewDecoder(r.Body)
	dec.DisallowUnknownFields()
	if err := dec.Decode(&in); err != nil {
		writeError(w, http.StatusBadRequest, "invalid_json", "malformed request body")
		return
	}

	if strings.TrimSpace(in.Name) == "" || strings.TrimSpace(in.Email) == "" {
		writeError(w, http.StatusUnprocessableEntity, "validation_error", "name and email are required")
		return
	}

	writeJSON(w, http.StatusCreated, map[string]any{
		"message": "user created",
		"user":    in,
	})
}

func main() {
	mux := http.NewServeMux()
	mux.HandleFunc("POST /api/v1/users", createUser)

	log.Fatal(http.ListenAndServe(":8080", mux))
}`}
        />
      </section>

      {/* Health endpoints */}
      <section className="mb-12">
        <h2 className="section-subtitle">5.5 Health endpoints</h2>

        <div className="info-card mb-6">
          <h4 className="font-semibold text-sky-800 mb-2">Padrão simples:</h4>
          <ul className="text-sky-700 space-y-1">
            <li>• <code>GET /healthz</code>: servidor respondeu (up)</li>
            <li>• <code>GET /livez</code>: processo vivo</li>
            <li>• <code>GET /readyz</code>: pronto para receber tráfego (dependências OK)</li>
          </ul>
        </div>

        <CodeBlock 
          filename="main.go"
          code={`package main

import (
	"encoding/json"
	"log"
	"net/http"
	"time"
)

type APIError struct {
	Code    string \`json:"code"\`
	Message string \`json:"message"\`
}

var ready = true

func writeJSON(w http.ResponseWriter, status int, payload any) {
	b, err := json.Marshal(payload)
	if err != nil {
		w.Header().Set("Content-Type", "application/json")
		w.WriteHeader(http.StatusInternalServerError)
		_, _ = w.Write([]byte(\`{"error":{"code":"internal_error","message":"json_encode_failed"}}\`))
		return
	}

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(status)
	_, _ = w.Write(b)
}

func writeError(w http.ResponseWriter, status int, code, message string) {
	writeJSON(w, status, map[string]any{
		"error": APIError{
			Code:    code,
			Message: message,
		},
	})
}

func healthz(w http.ResponseWriter, r *http.Request) {
	writeJSON(w, http.StatusOK, map[string]string{"status": "ok"})
}

func livez(w http.ResponseWriter, r *http.Request) {
	writeJSON(w, http.StatusOK, map[string]string{"status": "alive"})
}

func readyz(w http.ResponseWriter, r *http.Request) {
	if !ready {
		writeError(w, http.StatusServiceUnavailable, "not_ready", "dependencies are not ready")
		return
	}

	writeJSON(w, http.StatusOK, map[string]string{"status": "ready"})
}

func main() {
	mux := http.NewServeMux()
	mux.HandleFunc("GET /healthz", healthz)
	mux.HandleFunc("GET /readyz", readyz)
	mux.HandleFunc("GET /livez", livez)

	srv := &http.Server{
		Addr:              ":8080",
		Handler:           mux,
		ReadHeaderTimeout: 5 * time.Second,
		ReadTimeout:       10 * time.Second,
		WriteTimeout:      10 * time.Second,
		IdleTimeout:       60 * time.Second,
	}

	log.Fatal(srv.ListenAndServe())
}`}
        />
      </section>
    </div>
  );
}
