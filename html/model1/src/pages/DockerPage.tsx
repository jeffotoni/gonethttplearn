import { CodeBlock } from '@/components/CodeBlock';

export function DockerPage() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      <h1 className="section-title">6. Docker: build e run local</h1>

      <div className="info-card mb-8">
        <h3 className="font-semibold text-sky-800 mb-2">Objetivo:</h3>
        <ul className="text-sky-700 space-y-1">
          <li>• Compilar o server Go em imagem enxuta (multi-stage)</li>
          <li>• Subir local na porta 8080</li>
          <li>• Ter comandos básicos para operação e debug</li>
        </ul>
      </div>

      <div className="warning-card mb-8">
        <h4 className="font-semibold text-amber-800 mb-2">Pré-requisito:</h4>
        <ul className="text-amber-700 space-y-1">
          <li>• Ter um <code>main.go</code> funcional na raiz (você pode usar qualquer exemplo deste manual)</li>
          <li>• Usar <code>.dockerignore</code> para não enviar arquivos desnecessários no contexto de build</li>
        </ul>
      </div>

      {/* Dockerfile */}
      <section className="mb-12">
        <h2 className="section-subtitle">6.1 Dockerfile multi-stage (Alpine + timezone Brasil)</h2>

        <p className="section-content mb-4">
          Arquivo <code>Dockerfile</code> (na raiz do projeto):
        </p>

        <CodeBlock 
          filename="Dockerfile"
          code={`# exemplo Dockerfile para Go

FROM golang:1.25.6-alpine AS builder
WORKDIR /src
RUN apk add --no-cache ca-certificates tzdata
COPY . .
ARG APP_FILE=main.go
ENV CGO_ENABLED=0
RUN go build -trimpath -ldflags="-s -w" -o /out/server "./\${APP_FILE}"

FROM alpine:3.20 AS runtime
RUN apk add --no-cache ca-certificates tzdata \\
  && cp /usr/share/zoneinfo/America/Sao_Paulo /etc/localtime \\
  && echo "America/Sao_Paulo" > /etc/timezone

ENV TZ=America/Sao_Paulo
WORKDIR /app
COPY --from=builder /out/server /app/server
EXPOSE 8080
USER nobody:nobody
ENTRYPOINT ["/app/server"]`}
        />

        <div className="tip-card mt-6">
          <h4 className="font-semibold text-emerald-800 mb-2">Observações:</h4>
          <ul className="text-emerald-700 space-y-1">
            <li>• Imagem final fica enxuta (sem toolchain Go)</li>
            <li>• Timezone definida para Brasil (<code>America/Sao_Paulo</code>)</li>
            <li>• Se seu entrypoint for outro arquivo, use <code>--build-arg APP_FILE=seu_arquivo.go</code></li>
            <li>• A imagem do builder deve ser compatível com a versão do <code>go.mod</code> (ex.: <code>go 1.25.6</code>)</li>
          </ul>
        </div>
      </section>

      {/* Comandos Docker */}
      <section className="mb-12">
        <h2 className="section-subtitle">6.2 Comandos básicos Docker</h2>

        <div className="space-y-8">
          <div>
            <h3 className="font-semibold text-slate-700 mb-3">Build da imagem</h3>
            <CodeBlock language="bash" code={`docker build -t nethttp-server:local .`} />
          </div>

          <div>
            <h3 className="font-semibold text-slate-700 mb-3">Build da imagem sem usar cache (força rebuild)</h3>
            <CodeBlock language="bash" code={`docker build --no-cache -t nethttp-server:local .`} />
          </div>

          <div>
            <h3 className="font-semibold text-slate-700 mb-3">Build escolhendo outro arquivo Go</h3>
            <CodeBlock language="bash" code={`docker build -t nethttp-server:local --build-arg APP_FILE=cmd/api/main.go .`} />
          </div>

          <div>
            <h3 className="font-semibold text-slate-700 mb-3">Limpar cache de build (builder cache)</h3>
            <CodeBlock language="bash" code={`docker builder prune -f`} />
          </div>

          <div>
            <h3 className="font-semibold text-slate-700 mb-3">Subir container local</h3>
            <CodeBlock language="bash" code={`docker run -d --name nethttp-server -p 8080:8080 nethttp-server:local`} />
          </div>

          <div>
            <h3 className="font-semibold text-slate-700 mb-3">Listar containers</h3>
            <CodeBlock language="bash" code={`docker ps -a`} />
          </div>

          <div>
            <h3 className="font-semibold text-slate-700 mb-3">Ver logs</h3>
            <CodeBlock language="bash" code={`docker logs -f nethttp-server`} />
          </div>

          <div>
            <h3 className="font-semibold text-slate-700 mb-3">Validar rotas do main.go</h3>
            <CodeBlock language="bash" code={`curl -i localhost:8080/api/v1/user`} />
            <CodeBlock 
              language="bash" 
              code={`curl -i -X POST localhost:8080/api/v1/user \\
  -H "Content-Type: application/json" \\
  -d '{"name":"Jeff","email":"jeff@email.com"}'`} 
            />
            <CodeBlock 
              language="bash" 
              code={`curl -i -X PUT localhost:8080/api/v1/user \\
  -H "Content-Type: application/json" \\
  -d '{"name":"Jeff Updated","email":"jeff.updated@email.com"}'`} 
            />
          </div>

          <div>
            <h3 className="font-semibold text-slate-700 mb-3">Conferir timezone no container</h3>
            <CodeBlock language="bash" code={`docker exec -it nethttp-server date`} />
          </div>

          <div>
            <h3 className="font-semibold text-slate-700 mb-3">Parar e remover container</h3>
            <CodeBlock language="bash" code={`docker stop nethttp-server
docker rm nethttp-server`} />
          </div>
        </div>
      </section>

      {/* .dockerignore */}
      <section className="mb-12">
        <h2 className="section-subtitle">Exemplo de .dockerignore</h2>
        <CodeBlock 
          filename=".dockerignore"
          code={`# Binários
*.exe
*.exe~
*.dll
*.so
*.dylib
*.test
*.out

# Diretórios
.git/
.gitignore
.vscode/
.idea/

# Go
vendor/
go.work
go.work.sum

# Docker
Dockerfile*
docker-compose*
.docker/

# Outros
README.md
*.md
.env
.env.local`}
        />
      </section>
    </div>
  );
}
