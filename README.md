# net/http em Go - Do Básico ao Avançado

Este repositório é um manual prático de `net/http` em Go com foco exclusivo em **server-side API**. A proposta é evoluir do básico ao avançado com exemplos pequenos, executáveis e organizados em sequência didática.

O que já está coberto neste manual:
- visão macro de Web Services, REST/RESTful e evolução do HTTP
- fundamentos de `http.Request`, `http.ResponseWriter`, `http.Handler` e `http.HandlerFunc`
- variações de `http.ListenAndServe` e uso de `http.ServeMux`/`http.Server`
- method pattern (`"GET /rota"`, `"POST /rota"`, etc.) no Go 1.22+
- padronização de resposta, mapa de status/erros, validação de entrada e health endpoints

Este material foi desenvolvido por **Jefferson Otoni Lima (Jeffotoni)**, Engenheiro de Software Sênior e Arquiteto de Soluções.
Com mais de **22 anos de experiência**, atua principalmente em APIs, arquitetura de software e ecossistema cloud-native, além de programação em diversas linguagens como Go, Rust, C, C++, Java, C#, Node.js,Deno, Bun, PHP, Perl, Python, Dart.

A proposta central é dominar o **net/http** para que frameworks sejam uma escolha, não uma dependência.

**Podcast áudio do manual net/http:**
[Podcast youtube](https://www.youtube.com/watch?v=5E1FVbMDFs4)

**Chat para tirar dúvidas**
[ChatBoot do nosso manual](https://notebooklm.google.com/notebook/c50bab62-0214-4b1a-9d53-78079ffc9fe6/preview)

**Apresentação Google**
[Apresentação google](https://docs.google.com/presentation/d/1To-ymSRme7iyUKflu2ctDfyrlY0NjaRnjKYCHQpu6eE/edit?usp=sharing)

**LinkedIn do autor:**
[linkedin.com/in/jeffotoni](https://www.linkedin.com/in/jeffotoni)

**GitHub do autor:**
https://github.com/jeffotoni
https://github.com/jeffotoni/quick -> Um framework super leve

```bash
   ██████╗ ██╗   ██╗██╗ ██████╗██╗  ██╗
  ██╔═══██╗██║   ██║██║██╔═══   ██║ ██╔╝
  ██║   ██║██║   ██║██║██║      █████╔╝
  ██║▄▄ ██║██║   ██║██║██║      ██╔═██╗
  ╚██████╔╝╚██████╔╝██║╚██████╔ ██║  ██╗
   ╚══▀▀═╝  ╚═════╝ ╚═╝ ╚═════╝ ╚═╝  ╚═╝
```
**Antes de entrar no pacote `net/http`, o material faz uma visão macro de:**
- Web services
- HTTP e evolução de protocolos
- REST e RESTful
- Overview da linguagem Go para APIs
- Boas práticas de corpo, status code e serialização

## Sumário
- [Objetivos do curso](#objetivos-do-curso)
- [Trilha de conteúdo](#trilha-de-conteudo)
- [1. Contexto: Web Services, REST e Protocolos](#1-contexto-web-services-rest-e-protocolos)
- [Keep-Alive: HTTP/1.0 -> HTTP/1.1 -> HTTP/2](#keep-alive-http10---http11---http2)
- [REST Constraints](#rest-constraints)
- [HTTP Methods (Verbos HTTP)](#http-methods-verbos-http)
- [Corpo em REST (request/response) com status na prática](#corpo-em-rest-requestresponse-com-status-na-pratica)
- [2. Overview de Go para APIs](#2-overview-de-go-para-apis)
- [Diferenciais de Go para construção de APIs](#diferenciais-de-go-para-construcao-de-apis)
- [Concorrência em Go (simples de entender)](#concorrencia-em-go-simples-de-entender)
- [3. Fundamentos do `net/http`](#3-fundamentos-do-nethttp)
- [Anatomia mínima de um handler (`w` e `r`)](#anatomia-minima-de-um-handler-w-e-r)
- [4. Manual Pratico: ListenAndServe (Fase Zero)](#4-manual-pratico-listenandserve-fase-zero)
- [4.1 Diferença essencial: `HandleFunc` vs `HandlerFunc`](#1-diferenca-essencial-handlefunc-vs-handlerfunc)
- [4.2 O que `ListenAndServe` aceita](#2-o-que-listenandserve-aceita)
- [4.3 Variações base (sem `ServeMux` custom)](#3-variacoes-base-sem-servemux-custom)
- [4.4 Algumas possibilidades](#4-algumas-possibilidades)
- [4.5 `ServeMux` com method pattern + `http.Server`](#5-servemux-com-method-pattern--httpserver)
- [4.6 Quando usar `http.Handler`?](#6-quando-usar-httphandler)
- [5. Server API (em andamento / em breve)](#5-server-api-em-andamento--em-breve)
- [5.1 Padronizacao de resposta](#51-padronizacao-de-resposta)
- [5.2 Mapa de erros e status por cenario](#52-mapa-de-erros-e-status-por-cenario)
- [5.3 Organizacao de rotas](#53-organizacao-de-rotas)
- [5.4 Validacao de entrada no servidor](#54-validacao-de-entrada-no-servidor)
- [5.5 Health endpoints](#55-health-endpoints)
- [6. Docker: build e run local](#6-docker-build-e-run-local)
- [6.1 Dockerfile multi-stage (Alpine + timezone Brasil)](#61-dockerfile-multi-stage-alpine--timezone-brasil)
- [6.2 Comandos basicos Docker](#62-comandos-basicos-docker)

## Objetivos do curso
- Dominar o pacote `net/http` da biblioteca padrão
- Construir APIs REST com organização e previsibilidade
- Aplicar boas práticas de HTTP (status, headers, payload, timeouts)
- Evoluir do exemplo mínimo para estrutura de servidor mais profissional

## Trilha de conteúdo

| Etapa | Tema |
|---|---|
| 1 | Contexto de Web Services + REST/RESTful |
| 2 | Overview de Go para construção de APIs |
| 3 | Fundamentos do `net/http` |
| 4 | Handlers, `ServeMux`, `Server` e fluxo request/response |
| 5 | JSON, validação e status codes |
| 6 | Segurança, limites e boas práticas de produção |
| 7 | Padrões de API server (em andamento / em breve) |
| 8 | Docker local para API server (build e run) |

## 1. Contexto: Web Services, REST e Protocolos

### Panorama de Web Services

| Estilo/Tecnologia | Ano (origem/aparição) | Característica principal | Quando aparece mais |
|---|---:|---|---|
| SOAP | 1998 | Contrato rígido, XML, WSDL | Legado corporativo e integrações formais |
| REST | 2000 | Estilo arquitetural sobre HTTP | APIs web em geral |
| GraphQL | 2015 | Cliente define campos da resposta | Cenários com múltiplas visões de dados |
| gRPC | 2015 | RPC com Protobuf sobre HTTP/2 | Comunicação interna de microserviços |

### Evolução rápida de HTTP

| Protocolo | Ano | Destaques |
|---|---:|---|
| HTTP/1.0 | 1996 | Conexão fechada por padrão; keep-alive opcional via header |
| HTTP/1.1 | 1997 | Texto, amplamente suportado, keep-alive |
| HTTP/2 | 2015 | Binário, multiplexing, compressão de headers |
| HTTP/3 | 2022 | QUIC/UDP, menor latência em redes instáveis |

### Keep-Alive: HTTP/1.0 -> HTTP/1.1 -> HTTP/2

```text
HTTP/1.0 (1996)
├─ Conexao fechada apos CADA request/response
├─ Keep-Alive era OPCIONAL (via header)
└─ Header: Connection: keep-alive (explicito)

HTTP/1.1 (1997)
├─ Keep-Alive e o PADRAO
├─ Conexoes persistentes por default
├─ Para fechar: Connection: close
└─ Melhor performance out-of-the-box

HTTP/2 (2015)
├─ Multiplexing sobre uma unica conexao
├─ Keep-Alive implicito
└─ Multiplas requisicoes simultaneas
```

#### HTTP/1.0 - ativando Keep-Alive

```http
GET /index.html HTTP/1.0
Host: example.com
Connection: keep-alive
```

```http
HTTP/1.0 200 OK
Connection: keep-alive
Keep-Alive: timeout=5, max=100
Content-Type: text/html
Content-Length: 1234

<html>...</html>
```

#### HTTP/1.1 - Keep-Alive por padrao

```http
GET /index.html HTTP/1.1
Host: example.com
```

```http
HTTP/1.1 200 OK
Content-Type: text/html
Content-Length: 1234

<html>...</html>
```

#### HTTP/1.1 - fechando conexao explicitamente

```http
GET /logout HTTP/1.1
Host: example.com
Connection: close
```

```http
HTTP/1.1 200 OK
Connection: close
Content-Type: application/json

{"status":"logged out"}
```

### HTTP, TCP e UDP (diferença rápida)

Referência didática:
- Modelo OSI (7 camadas)
- Modelo TCP/IP (4 camadas, mais usado na prática)

| Tecnologia | Tipo | Camada OSI | Camada TCP/IP | Papel |
|---|---|---|---|---|
| HTTP | Protocolo de aplicação | 7 (Aplicação) | Aplicação | Define como cliente e servidor trocam dados (request/response) |
| TCP | Protocolo de transporte | 4 (Transporte) | Transporte | Confiável, orientado à conexão, garante ordem e entrega |
| UDP | Protocolo de transporte | 4 (Transporte) | Transporte | Sem conexão, baixa latência, sem garantia de entrega |

| Exemplo | Pilha simplificada |
|---|---|
| HTTP/1.1 e HTTP/2 | `HTTP -> TCP -> IP` |
| HTTP/3 | `HTTP -> QUIC(UDP) -> IP` |

### REST vs RESTful

- `REST` é um estilo arquitetural (conjunto de restrições)
- `RESTful` é a API que aplica REST de forma consistente na prática

### REST Constraints

```text
┌───────────────────────────────────────────────────────┐
│ 1. Client-Server                                      │
│    Separação de responsabilidades                     │
│                                                       │
│ 2. Stateless                                          │
│    Cada request é independente                        │
│                                                       │
│ 3. Cacheable                                          │
│    Responses devem indicar cache                      │
│                                                       │
│ 4. Uniform Interface                                  │
│    ├─ Resource identification                         │
│    ├─ Manipulation via representations                │
│    ├─ Self-descriptive messages                       │
│    └─ HATEOAS                                         │
│                                                       │
│ 5. Layered System                                     │
│    Cliente não sabe se conecta direto no servidor     │
│    final ou em camadas intermediárias                 │
│                                                       │
│ 6. Code on Demand (opcional)                          │
│    Server pode enviar código executável               │
└───────────────────────────────────────────────────────┘
```

#### Prévia didática de cada constraint:

| Constraint | Prévia prática |
|---|---|
| Client-Server | Frontend e backend evoluem de forma independente |
| Stateless | Token/autenticação e contexto vão em cada requisição |
| Cacheable | Uso de `Cache-Control`, `ETag`, `Last-Modified` |
| Uniform Interface | URI + método + status + representação consistente |
| Layered System | CDN, load balancer e API gateway entre cliente e app |
| Code on Demand | Ex.: JavaScript entregue ao cliente (opcional) |

#### Uniform Interface (detalhado em 4 partes)

**1. Resource Identification (Identificação de Recursos)**

Cada recurso tem um identificador único (URI).

Exemplos:
- `/users/123`
- `/posts/456`

**2. Manipulation via Representations (Manipulação via Representações)**

Cliente manipula recursos através de representações (`JSON`, `XML`, etc).  
O servidor envia a representação do recurso, não o recurso em memória.

Exemplo prático:
- o cliente recebe JSON de usuário
- ao fazer `PUT /users/123`, envia nova representação desse usuário

**3. Self-descriptive Messages (Mensagens Auto-descritivas)**

Cada mensagem deve conter informação suficiente para processamento.

```http
Content-Type: application/json
Accept: application/json
```

Com isso, cliente e servidor entendem formato de entrada/saída sem "acordo oculto".

**4. HATEOAS (Hypermedia As The Engine Of Application State)**

A API retorna links para próximas ações válidas, e o cliente navega por esses links.

```json
{
  "id": 123,
  "name": "Joao",
  "links": [
    {"rel": "self", "href": "/users/123"},
    {"rel": "posts", "href": "/users/123/posts"},
    {"rel": "delete", "href": "/users/123", "method": "DELETE"}
  ]
}
```

Na prática, HATEOAS é o item menos implementado na maioria das APIs RESTful.

Motivos comuns:
- clientes mobile/web preferem contrato fixo documentado em OpenAPI/Swagger
- equipes priorizam simplicidade de implementação e manutenção
- gateways, versionamento e SDKs tendem a centralizar fluxo fora da hipermídia
- custo extra de modelagem nem sempre gera benefício claro no produto

### Níveis de maturidade (Richardson)

| Nível | Descrição |
|---|---|
| 0 | HTTP só como transporte (RPC via HTTP) |
| 1 | Recursos identificados por URI |
| 2 | Uso correto de verbos HTTP + status codes |
| 3 | Hipermídia (HATEOAS) |

### HTTP Methods (Verbos HTTP)

| Verbo | Uso Correto | Exemplo |
|---|---|---|
| `GET` | Buscar dados | `GET /users/123` |
| `POST` | Criar | `POST /users` |
| `PUT` | Substituir | `PUT /users/123` |
| `PATCH` | Atualizar parcialmente | `PATCH /users/123` |
| `DELETE` | Remover | `DELETE /users/123` |

### Corpo em REST (request/response) com status na prática

Regras simples:
- `GET` e `DELETE`: normalmente sem body
- `POST`, `PUT`, `PATCH`: normalmente com body
- Sempre definir `Content-Type` e validar entrada

#### GET (buscar recurso)

```http
GET /users/123
Accept: application/json
```

```http
HTTP/1.1 200 OK
Content-Type: application/json

{
  "id": 123,
  "name": "Jeff Otoni"
}
```

```http
HTTP/1.1 404 Not Found
Content-Type: application/json

{
  "error": "user_not_found"
}
```

#### POST (criar recurso)

```http
POST /users
Content-Type: application/json

{
  "name": "Jeff Otoni",
  "email": "jeff@email.com"
}
```

```http
HTTP/1.1 201 Created
Location: /users/123
Content-Type: application/json

{
  "id": 123,
  "name": "Jeff Otoni",
  "email": "jeff@email.com"
}
```

```http
HTTP/1.1 422 Unprocessable Entity
Content-Type: application/json

{
  "error": "validation_failed",
  "details": {
    "email": "invalid format"
  }
}
```

#### PUT (substituir recurso)

```http
PUT /users/123
Content-Type: application/json

{
  "name": "Jeff Otoni",
  "email": "novo@email.com"
}
```

```http
HTTP/1.1 200 OK
Content-Type: application/json

{
  "id": 123,
  "name": "Jeff Otoni",
  "email": "novo@email.com"
}
```

```http
HTTP/1.1 404 Not Found
Content-Type: application/json

{
  "error": "user_not_found"
}
```

#### PATCH (atualização parcial)

```http
PATCH /users/123
Content-Type: application/json

{
  "email": "patch@email.com"
}
```

```http
HTTP/1.1 200 OK
Content-Type: application/json

{
  "id": 123,
  "name": "Jeff Otoni",
  "email": "patch@email.com"
}
```

#### DELETE (remover recurso)

```http
DELETE /users/123
```

```http
HTTP/1.1 204 No Content
```

```http
HTTP/1.1 404 Not Found
Content-Type: application/json

{
  "error": "user_not_found"
}
```

### Status codes essenciais para APIs

| Cenário | Status |
|---|---|
| Sucesso com retorno | `200 OK` |
| Criação de recurso | `201 Created` |
| Sucesso sem corpo | `204 No Content` |
| Erro de entrada | `400 Bad Request` |
| Não autenticado | `401 Unauthorized` |
| Sem permissão | `403 Forbidden` |
| Não encontrado | `404 Not Found` |
| Conflito de estado | `409 Conflict` |
| Erro de validação semântica | `422 Unprocessable Entity` |
| Erro interno | `500 Internal Server Error` |

### Formatos de serialização

Para este curso, o foco principal será `JSON` em APIs REST com Go.

| Formato | Tipo | Quando usar |
|---|---|---|
| JSON | Texto | APIs REST públicas e simplicidade |
| Protobuf | Binário | gRPC e comunicação interna de alta performance |
| Avro | Binário | Streaming/Kafka com evolução forte de schema |
| MessagePack | Binário | Payload mais compacto sem muita complexidade |
| CBOR | Binário | IoT e cenários com padrão IETF |

### Servidores web e aplicação 

| Servidor | Ano | Categoria | Observação |
|---|---:|---|---|
| Apache HTTP Server | 1995 | Web Server | Base histórica da web open source |
| IIS | 1995 | Web Server | Servidor web da Microsoft |
| nginx | 2004 | Web Server/Reverse Proxy | Muito usado em alta concorrência |
| Caddy | 2015 | Web Server | HTTPS automático por padrão |
| Tomcat | 1999 | Application Server (Java) | Muito comum em aplicações Java |
| JBoss / WildFly | 2006 (WildFly 2014) | Application Server (Java) | Linha enterprise do ecossistema Java |

### Servidores Web/Reverse Proxy feitos em Go

| Projeto | Categoria | Onde aparece muito | Por que Go ajuda aqui |
|---|---|---|---|
| Caddy | Web server / reverse proxy | APIs, TLS automático, edge simples | Binário único, concorrência nativa e deploy fácil |
| Traefik | Reverse proxy / ingress | Docker, Kubernetes, service discovery | Integração cloud-native e alta performance de rede |
| Fabio | Load balancer / reverse proxy | Ambientes com Consul | Simplicidade operacional e bom modelo concorrente |

### Market share (visão macro em markdown)

```text
1. nginx          ~34%  ████████████████████
2. Apache         ~31%  ██████████████████
3. Cloudflare     ~21%  ████████████
4. LiteSpeed      ~6%   ███
5. IIS            ~5%   ██
6. Outros         ~3%   █
```

### Ecossistema Go em DevOps

Go se tornou uma das linguagens centrais do ecossistema **CNCF/DevOps** por entregar:
- Binários portáveis e simples de distribuir
- Boa performance de rede e concorrência
- Toolchain estável para projetos de infraestrutura

| Ferramenta | Categoria | Relação com Go |
|---|---|---|
| Docker (Moby/Engine) | Containerização | Implementação central em Go (com partes em outras linguagens) |
| Kubernetes | Orquestração | Projeto core em Go |
| Consul | Service discovery/config | Core em Go |
| etcd | KV distribuído | Core em Go |
| Terraform | Infrastructure as Code | Core em Go |
| Vault | Secrets management | Core em Go |
| CockroachDB | Banco distribuído SQL | Core majoritariamente em Go |
| InfluxDB | Time-series database | Forte uso de Go no core |
| Prometheus | Monitoramento | Core em Go |
| Grafana | Observabilidade | Backend em Go (frontend em TypeScript) |
| Gitea | Git forge/self-hosted | Core em Go |

## 2. Overview de Go para APIs

### O que é Go 

Go é uma linguagem compilada, de tipagem estática e sintaxe simples, focada em produtividade, performance e legibilidade.

### Ano de lançamento e principais nomes

| Item | Informação |
|---|---|
| Início do projeto | 2007 (Google) |
| Lançamento público | 2009 |
| Versão 1.0 | 2012 |
| Criadores | Robert Griesemer, Rob Pike, Ken Thompson |

### Diferenciais de Go para construção de APIs

- Biblioteca padrão forte (`net/http`, `encoding/json`, `context`, `database/sql`)
- Compilação rápida e deploy simples (binário único)
- Concorrência nativa com goroutines e channels
- Código mais previsível e com menos complexidade acidental
- Excelente robustez para APIs de alta carga e baixa latência
- Testes integrados no toolchain (`go test`) com suporte prático a testes unitários e table-driven.
- Cobertura, benchmark e fuzz testing nativos (`-cover`, `-bench`, `-fuzz`) para elevar confiabilidade da API.

### Concorrência em Go (simples de entender)

- `goroutine`: função executando concorrentemente com baixo custo
- `channel`: canal seguro para comunicação entre goroutines
- `select`: coordena múltiplos canais e timeouts

Modelo mental:
1. Use goroutines para estruturar trabalho concorrente (não confundir com paralelismo)
2. Troque dados por channels (em vez de compartilhar memória sempre)
3. Controle cancelamento e prazo com `context.Context`
4. O runtime/scheduler decide quando há paralelismo real (ex.: múltiplos núcleos)

### Compilado, estático e dinâmico (na prática)

| Aspecto | Como funciona em Go |
|---|---|
| Compilação | AOT (ahead-of-time), gera binário nativo |
| Tipagem | Estática e forte em tempo de compilação |
| Linkagem | Normalmente estática; pode usar dinâmica em cenários com `cgo` |
| Runtime | Dinâmico para GC, scheduler e reflexão quando necessário |

### Go hoje é escrito em Go

Desde o Go 1.5, o compilador principal é self-hosted (escrito em Go).  
Ainda existem partes de baixo nível em assembly.

### HTTP server built-in 

Go já traz servidor HTTP embutido na stdlib via `net/http`.

```go
http.HandleFunc("/ping", func(w http.ResponseWriter, r *http.Request) {
    w.Write([]byte("pong"))
})
http.ListenAndServe(":8080", nil)
```

Isso não substitui todos os papéis de um nginx/reverse proxy, mas acelera muito o desenvolvimento de APIs.

### Palavras-chave oficiais da linguagem (25)

| 1 | 2 | 3 | 4 | 5 |
|---|---|---|---|---|
| `break` | `default` | `func` | `interface` | `select` |
| `case` | `defer` | `go` | `map` | `struct` |
| `chan` | `else` | `goto` | `package` | `switch` |
| `const` | `fallthrough` | `if` | `range` | `type` |
| `continue` | `for` | `import` | `return` | `var` |

## 3. Fundamentos do `net/http`

### O pacote `net/http`

O pacote oferece:
- Cliente HTTP
- Servidor HTTP
- `Request` e `ResponseWriter`
- `Handler`, `HandlerFunc` e `ServeMux`
- Utilitários de cookies, headers e mais

Componentes:
- `http.ListenAndServe`
- `http.Request`
- `http.ResponseWriter`
- `http.HandleFunc`
- `http.HandlerFunc`
- `http.Handle`
- `http.Handler`
- `http.ServeMux`
- `http.Server`

### Mini referencia dos componentes

**`http.ListenAndServe`**

```go
log.Fatal(http.ListenAndServe(":8080", nil))
```

**`http.Request` e `http.ResponseWriter`:**

```go
func echo(w http.ResponseWriter, r *http.Request) {
	id := r.URL.Query().Get("id")

	w.Header().Set("Content-Type", "text/plain; charset=utf-8")
	w.WriteHeader(http.StatusOK)
	_, _ = w.Write([]byte("method=" + r.Method + " path=" + r.URL.Path + " id=" + id))
}
```

**`http.HandleFunc`:**
```go
http.HandleFunc("/ping", func(w http.ResponseWriter, r *http.Request) {
	_, _ = w.Write([]byte("pong"))
})

log.Fatal(http.ListenAndServe(":8080", nil))
```

**`http.HandlerFunc`**

```go
handler := http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
	_, _ = w.Write([]byte("pong"))
})

log.Fatal(http.ListenAndServe(":8080", handler))
```

**`http.Handle`**

```go
http.Handle("/ping", http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
	_, _ = w.Write([]byte("pong"))
}))

log.Fatal(http.ListenAndServe(":8080", nil))
```

**`http.Handler`**

```go
type PingHandler struct{}

func (PingHandler) ServeHTTP(w http.ResponseWriter, r *http.Request) {
	_, _ = w.Write([]byte("pong"))
}

log.Fatal(http.ListenAndServe(":8080", PingHandler{}))
```

**`http.ServeMux`**

```go
mux := http.NewServeMux()
mux.HandleFunc("GET /ping", func(w http.ResponseWriter, r *http.Request) {
	_, _ = w.Write([]byte("pong"))
})

log.Fatal(http.ListenAndServe(":8080", mux))
```

**`http.Server`**

```go
srv := &http.Server{
	Addr:    ":8080",
	Handler: mux,
}

log.Fatal(srv.ListenAndServe())
```

Regra mental rapida:
- `HandleFunc`: funcao
- `HandlerFunc`: funcao adaptada para `Handler`
- `Handle`: registra um `Handler`
- `Handler`: comportamento completo (`ServeHTTP`)


### Anatomia mínima de um handler (`w` e `r`)

**Assinatura padrão**

```go
func(w http.ResponseWriter, r *http.Request)
```

**w `http.ResponseWriter`:**
- e a saida da sua API (resposta para o cliente)
- pense na ordem: **Headers -> Status -> Body**

**Metodos principais de `ResponseWriter`**

| Metodo | O que faz | Observacoes importantes |
|---|---|---|
| `Header() http.Header` | Manipula headers da resposta | Defina antes do `WriteHeader` |
| `Write([]byte)` | Escreve o body | Se nao chamar `WriteHeader`, envia `200` automaticamente |
| `WriteHeader(statusCode int)` | Define status HTTP | Deve ser chamado uma vez |

Exemplo curto:

```go
w.Header().Set("Content-Type", "application/json")
w.WriteHeader(http.StatusCreated)
_, _ = w.Write([]byte(`{"ok":true}`))
```

**Regras importantes**
- depois de `WriteHeader`, os headers ficam congelados
- `Write()` chama implicitamente `WriteHeader(200)` se nenhum status foi enviado
- ordem correta:
1. `Header().Set(...)`
2. `WriteHeader(...)`
3. `Write(...)`

r `*http.Request`:
- representa tudo que o cliente enviou na requisicao

**Campos mais usados de `Request`**

| Campo | Tipo | Para que serve |
|---|---|---|
| `r.Method` | `string` | Verbo HTTP (`GET`, `POST`, etc.) |
| `r.URL` | `*url.URL` | Path e query string (`r.URL.Path`, `r.URL.Query().Get("id")`) |
| `r.Header` | `http.Header` | Headers da requisicao |
| `r.Body` | `io.ReadCloser` | Corpo da requisicao |
| `r.Host` | `string` | Host chamado |
| `r.RemoteAddr` | `string` | IP/porta de origem do cliente |
| `r.Proto` | `string` | Protocolo (`HTTP/1.1`, `HTTP/2.0`) |
| `r.ContentLength` | `int64` | Tamanho do body |

**Trabalhando com URL e Query**

**Anatomia da URL (cada pedaco)**

Exemplo:

```text
https://domain.com/api/v1/user?id=123&debug=true#secao
```

| Parte da URL | Exemplo | Onde usar no servidor Go |
|---|---|---|
| Protocolo (scheme) | `https` | inferir via `r.TLS` (`nil` = http, diferente de nil = https) |
| Host | `domain.com` | `r.Host` |
| Path | `/api/v1/user` | `r.URL.Path` |
| Query string bruta | `id=123&debug=true` | `r.URL.RawQuery` |
| Query params | `id=123`, `debug=true` | `r.URL.Query().Get("id")`, `r.URL.Query().Get("debug")` |
| Fragmento | `#secao` | nao chega no servidor (browser nao envia no request HTTP) |

Exemplo pratico no handler:

```go
scheme := "http"
if r.TLS != nil {
	scheme = "https"
}

fullURL := scheme + "://" + r.Host + r.URL.RequestURI()
// fullURL => https://domain.com/api/v1/user?id=123&debug=true
```

**Campos e metodos uteis de `r.URL` (`*url.URL`)**

| Expressao | Tipo | Para que serve |
|---|---|---|
| `r.URL.Path` | `string` | Caminho da rota sem query (`/api/v1/user`) |
| `r.URL.RawQuery` | `string` | Query string crua (`id=10&debug=true`) |
| `r.URL.Query()` | `url.Values` | Mapa de parametros da query |
| `r.URL.Query().Get("id")` | `string` | Pega o primeiro valor da chave |
| `r.URL.Query()["tag"]` | `[]string` | Pega todos os valores da chave repetida |
| `r.URL.EscapedPath()` | `string` | Path escapado para URL |
| `r.URL.String()` | `string` | URL em formato texto (bom para log/debug) |

```go
r.URL.Path
r.URL.RawQuery
r.URL.Query()
r.URL.Query().Get("id")
r.URL.Query()["tag"]
r.URL.EscapedPath()
r.URL.String()
```

Trabalhando com headers:

```go
r.Header.Get("Authorization")
r.Header.Get("Content-Type")
```

Trabalhando com body JSON:

```go
defer r.Body.Close()
_ = json.NewDecoder(r.Body).Decode(&payload)
```

Boa pratica: limitar tamanho do body:

```go
r.Body = http.MaxBytesReader(w, r.Body, 1<<20) // 1MB
```

## 4. Manual Pratico: ListenAndServe (Fase Zero)

Nesta fase, o `README.md` e o manual principal para copiar, colar e executar.

Observacao pratica:
- cada exemplo usa a porta `:8080`
- execute um exemplo por vez (pare o anterior antes de rodar o proximo)

### Linha de raciocinio da aula

| Ordem | Foco | Resultado para o aluno |
|---|---|---|
| 1 | Entender `HandleFunc` vs `HandlerFunc` | Evita os erros mais comuns |
| 2 | Entender o que `ListenAndServe` aceita | Sabe passar `nil` ou `Handler` |
| 3 | Praticar variacoes sem `ServeMux` custom | Domina o basico do fluxo HTTP |
| 4 | Praticar respostas reais de API | Query, JSON e headers |
| 5 | Configurar `ServeMux` e `http.Server` | Method pattern, timeout e limites |
| 6 | Entender composicao com `http.Handler` | Sabe crescer sem quebrar arquitetura |

### 1) Diferenca essencial: `HandleFunc` vs `HandlerFunc`

`HandleFunc` e funcao de registro.  
`HandlerFunc` e tipo adaptador (vira `http.Handler`).

```go
// ERRADO - HandleFunc nao retorna nada
http.Handle("/rota", http.HandleFunc(...))

// CERTO - HandlerFunc e um tipo
http.Handle("/rota", http.HandlerFunc(...))

// CERTO - HandleFunc registra direto
http.HandleFunc("/rota", ...)
```

### 2) O que `ListenAndServe` aceita

Assinatura:

```go
func ListenAndServe(addr string, handler Handler) error
```

`handler` pode ser:
- `nil` (usa `DefaultServeMux`)
- `http.HandlerFunc(...)`
- `http.NewServeMux()`
- tipo custom com `ServeHTTP()`

```text
ListenAndServe(addr, handler)
                      |
                      +--> qualquer coisa que implemente Handler
                           |
                           +--> nil (DefaultServeMux)
                           +--> http.HandlerFunc(...)
                           +--> http.NewServeMux()
                           +--> tipo custom com ServeHTTP()
```

### 3) Variacoes base (sem `ServeMux` custom)

#### Exemplo 3.1 - `DefaultServeMux` com `HandleFunc`

```go
package main

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
}
```

Executar:

```bash
go run main.go
curl -i localhost:8080/
curl -i localhost:8080/api
```

#### Exemplo 3.2 - `DefaultServeMux` com `Handle`

```go
package main

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
}
```

Executar:

```bash
go run main.go
curl -i localhost:8080/
curl -i localhost:8080/api
```

#### Exemplo 3.3 - Handler unico direto (roteamento manual)

```go
package main

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
}
```

Executar:

```bash
go run main.go
curl -i localhost:8080/
curl -i localhost:8080/api
curl -i localhost:8080/x
```

#### Exemplo 3.4 - Extrair `HandlerFunc` para variavel

```go
package main

import (
	"log"
	"net/http"
)

func main() {
	meuHandler := http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		_, _ = w.Write([]byte("Handler extraido"))
	})

	log.Fatal(http.ListenAndServe(":8080", meuHandler))
}
```

Executar:

```bash
go run main.go
curl -i localhost:8080/
```

#### Exemplo 3.5 - Converter para `HandlerFunc`

```go
package main

import (
	"log"
	"net/http"
)

func minhaFuncao(w http.ResponseWriter, r *http.Request) {
	_, _ = w.Write([]byte("Funcao normal convertida em Handler"))
}

func main() {
	log.Fatal(http.ListenAndServe(":8080", http.HandlerFunc(minhaFuncao)))
}
```

Executar:

```bash
go run main.go
curl -i localhost:8080/
```

### 4) Algumas possibilidades

#### Exemplo 4.1 - Parametros de URL (`r.URL.Query`)

```go
package main

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
}
```

Executar:

```bash
go run main.go
curl -i "localhost:8080/hello?name=jeff"
curl -i localhost:8080/hello
```

#### Exemplo 4.2 - Resposta JSON

```go
package main

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
}
```

Executar:

```bash
go run main.go
curl -i localhost:8080/api/user
```

#### Exemplo 4.3 - Headers customizados + status code

```go
package main

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
}
```

Executar:

```bash
go run main.go
curl -i localhost:8080/
```

### 5) `ServeMux` com method pattern + `http.Server`

Sim, essa sintaxe existe e e oficial:

```go
mux.HandleFunc("POST /api/v1/user", handler)
```

Observacao:
- method pattern (`"GET /x"`, `"POST /x"`) requer Go 1.22+

**Keep-Alive** (importante para API):
- no **HTTP/1.1**, **keep-alive** e padrao; o cliente tende a reutilizar a conexao
- o servidor nao "liga keep-alive manualmente", mas controla tempo de ociosidade
- em Go, `IdleTimeout` e uma configuracao chave para conexoes persistentes
- proxies/load balancers no caminho tambem podem fechar conexoes

#### 5.1) Propriedades principais do `http.Server`

| Campo | O que faz | Exemplo |
|---|---|---|
| `Addr` | Endereco/porta que o servidor vai escutar | `":8080"` |
| `Handler` | Quem vai processar as rotas (`mux`, handler custom, etc.) | `mux` |
| `IdleTimeout` | Tempo de conexao ociosa aguardando proxima request (keep-alive) | `60 * time.Second` |
| `ReadTimeout` | Tempo maximo para ler a request completa (headers + body) | `15 * time.Second` |
| `ReadHeaderTimeout` | Tempo maximo para ler apenas headers (anti slowloris) | `5 * time.Second` |
| `WriteTimeout` | Tempo maximo para escrever a resposta | `15 * time.Second` |
| `MaxHeaderBytes` | Tamanho maximo dos headers recebidos | `1 << 20` (1MB) |

Exemplo completo e didatico:

```go
package main

import (
	"fmt"
	"log"
	"net/http"
	"time"
)

func homeHandler(w http.ResponseWriter, r *http.Request) {
	_, _ = fmt.Fprintf(w, "Request %s processado\n", r.URL.Path)
	fmt.Printf("Connection from: %s\n", r.RemoteAddr)
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
}
```

Executar:

```bash
go run main.go
curl -i localhost:8080/
```

Teste rapido de reutilizacao de conexao (HTTP/1.1):

```bash
curl -v --http1.1 http://localhost:8080/ http://localhost:8080/
```

Pontos criticos para explicar em aula:
- `ReadTimeout` cobre leitura completa (headers + body)
- `ReadHeaderTimeout` protege contra envio lento de headers (slowloris)
- `IdleTimeout` controla por quanto tempo conexao keep-alive fica aberta sem nova request
- `MaxHeaderBytes: 1 << 20` usa bit shift para definir limite de 1MB
- keep-alive depende do cliente/proxy reutilizar conexao; o servidor define limites e politicas

#### 5.2) POST `/api/v1/user` com `json.NewDecoder`

```go
package main

import (
	"errors"
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"strings"
)

type User struct {
	Name  string `json:"name"`
	Email string `json:"email"`
}

const maxBodyBytes = 1 << 20 // 1MB -> Operador Bit Shift (operador de deslocamento de bits)
// bit shift left) que significa -> "Desloque o número 1 para a esquerda 20 posições"
// Matematica por tras
// 1 << n  =  1 × 2^n  =  2^n
// Exemplos:
// 1 << 0  = 2^0  = 1
// 1 << 1  = 2^1  = 2
// 1 << 2  = 2^2  = 4
// 1 << 3  = 2^3  = 8
// 1 << 4  = 2^4  = 16
// 1 << 5  = 2^5  = 32
// 1 << 10 = 2^10 = 1024      (1 KB)
// 1 << 20 = 2^20 = 1048576   (1 MB)
// 1 << 30 = 2^30 = 1073741824 (1 GB)

func postUserWithDecoder(w http.ResponseWriter, r *http.Request) {
	if !strings.HasPrefix(r.Header.Get("Content-Type"), "application/json") {
		w.Header().Set("Content-Type", "application/json")
		w.WriteHeader(http.StatusUnsupportedMediaType)
		_, _ = w.Write([]byte(`{"error":"content_type_must_be_application_json"}`))
		return
	}

	r.Body = http.MaxBytesReader(w, r.Body, maxBodyBytes)

	var in User
	if err := json.NewDecoder(r.Body).Decode(&in); err != nil {
		w.Header().Set("Content-Type", "application/json")
		var maxErr *http.MaxBytesError
		if errors.As(err, &maxErr) {
			w.WriteHeader(http.StatusRequestEntityTooLarge)
			_, _ = w.Write([]byte(`{"error":"body_too_large","max_bytes":1048576}`))
			return
		}
		w.WriteHeader(http.StatusBadRequest)
		_, _ = w.Write([]byte(`{"error":"invalid_json"}`))
		return
	}

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusCreated)
	_, _ = w.Write([]byte(fmt.Sprintf(
		`{"message":"user created (decoder)","name":"%s","email":"%s"}`,
		in.Name, in.Email,
	)))
}

func main() {
	mux := http.NewServeMux()
	mux.HandleFunc("POST /api/v1/user", postUserWithDecoder)
	log.Fatal(http.ListenAndServe(":8080", mux))
}
```

Executar:

```bash
go run main.go
curl -i -X POST localhost:8080/api/v1/user \
  -H "Content-Type: application/json" \
  -d '{"name":"Jeff","email":"jeff@email.com"}'
```

#### 5.3) POST `/api/v1/user` lendo `Body` + `json.Unmarshal`

```go
package main

import (
	"errors"
	"encoding/json"
	"fmt"
	"io"
	"log"
	"net/http"
	"strings"
)

type User struct {
	Name  string `json:"name"`
	Email string `json:"email"`
}

const maxBodyBytes = 1 << 20 // 1MB

func postUserWithUnmarshal(w http.ResponseWriter, r *http.Request) {
	if !strings.HasPrefix(r.Header.Get("Content-Type"), "application/json") {
		w.Header().Set("Content-Type", "application/json")
		w.WriteHeader(http.StatusUnsupportedMediaType)
		_, _ = w.Write([]byte(`{"error":"content_type_must_be_application_json"}`))
		return
	}

	r.Body = http.MaxBytesReader(w, r.Body, maxBodyBytes)

	raw, err := io.ReadAll(r.Body)
	if err != nil {
		w.Header().Set("Content-Type", "application/json")
		var maxErr *http.MaxBytesError
		if errors.As(err, &maxErr) {
			w.WriteHeader(http.StatusRequestEntityTooLarge)
			_, _ = w.Write([]byte(`{"error":"body_too_large","max_bytes":1048576}`))
			return
		}
		w.WriteHeader(http.StatusBadRequest)
		_, _ = w.Write([]byte(`{"error":"cannot_read_body"}`))
		return
	}

	var in User
	if err := json.Unmarshal(raw, &in); err != nil {
		w.Header().Set("Content-Type", "application/json")
		w.WriteHeader(http.StatusBadRequest)
		_, _ = w.Write([]byte(`{"error":"invalid_json"}`))
		return
	}

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusCreated)
	_, _ = w.Write([]byte(fmt.Sprintf(
		`{"message":"user created (unmarshal)","name":"%s","email":"%s"}`,
		in.Name, in.Email,
	)))
}

func main() {
	mux := http.NewServeMux()
	mux.HandleFunc("POST /api/v1/user", postUserWithUnmarshal)
	log.Fatal(http.ListenAndServe(":8080", mux))
}
```

Executar:

```bash
go run main.go
curl -i -X POST localhost:8080/api/v1/user \
  -H "Content-Type: application/json" \
  -d '{"name":"Jeff","email":"jeff@email.com"}'
```

#### Quando usar `Decoder` vs `Unmarshal`?

| Opção | Quando usar | Vantagem | Atenção |
|---|---|---|---|
| `json.NewDecoder(r.Body).Decode(&v)` | Fluxo HTTP padrão lendo direto do body | Simples e direto no handler | Menos controle sobre o `[]byte` bruto |
| `io.ReadAll(r.Body)` + `json.Unmarshal(raw, &v)` | Quando você precisa do body bruto antes de converter | Permite log, auditoria, assinatura, validação prévia | Mais verboso e usa memória para guardar o body inteiro |

Checklist minimo para endpoint de API:
- limitar tamanho do body (`http.MaxBytesReader`)
- validar `Content-Type: application/json` para endpoints JSON
- validar JSON de entrada e retornar erro claro
- responder com `Content-Type` consistente
- manter handlers nomeados fora do `main` quando o fluxo crescer

#### 5.4) GET `/api/v1/user`

```go
package main

import (
	"log"
	"net/http"
)

func getUsers(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	_, _ = w.Write([]byte(`[{"name":"Jeff","email":"jeff@email.com"}]`))
}

func main() {
	mux := http.NewServeMux()
	mux.HandleFunc("GET /api/v1/user", getUsers)
	log.Fatal(http.ListenAndServe(":8080", mux))
}
```

Executar:

```bash
go run main.go
curl -i localhost:8080/api/v1/user
```

#### 5.5) PUT `/api/v1/user`

```go
package main

import (
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"strings"
)

type User struct {
	Name  string `json:"name"`
	Email string `json:"email"`
}

func putUser(w http.ResponseWriter, r *http.Request) {
	if !strings.HasPrefix(r.Header.Get("Content-Type"), "application/json") {
		w.Header().Set("Content-Type", "application/json")
		w.WriteHeader(http.StatusUnsupportedMediaType)
		_, _ = w.Write([]byte(`{"error":"content_type_must_be_application_json"}`))
		return
	}

	var in User
	if err := json.NewDecoder(r.Body).Decode(&in); err != nil {
		w.Header().Set("Content-Type", "application/json")
		w.WriteHeader(http.StatusBadRequest)
		_, _ = w.Write([]byte(`{"error":"invalid_json"}`))
		return
	}

	w.Header().Set("Content-Type", "application/json")
	_, _ = w.Write([]byte(fmt.Sprintf(
		`{"message":"user updated","name":"%s","email":"%s"}`,
		in.Name, in.Email,
	)))
}

func main() {
	mux := http.NewServeMux()
	mux.HandleFunc("PUT /api/v1/user", putUser)
	log.Fatal(http.ListenAndServe(":8080", mux))
}
```

Executar:

```bash
go run main.go
curl -i -X PUT localhost:8080/api/v1/user \
  -H "Content-Type: application/json" \
  -d '{"name":"Jeff Otoni","email":"novo@email.com"}'
```

### 6) Quando usar `http.Handler`?

Regra de ouro:
- use `http.Handler` quando quiser **compor comportamento** (middleware, cadeia, reaproveitamento)
- use `http.HandlerFunc` quando quiser **responder rota direto** (simples e rapido)

`http.Handler` e a base de tudo:

```go
type Handler interface {
    ServeHTTP(http.ResponseWriter, *http.Request)
}
```

Nao e funcao.  
E comportamento: qualquer tipo que implemente `ServeHTTP` vira handler HTTP.

#### 6.1) Quando `HandlerFunc` e suficiente

Use funcao direta quando:
- codigo simples
- sem estado interno
- sem composicao de middlewares

```go
package main

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
}
```

Executar:

```bash
go run main.go
curl -i localhost:8080/ping
```

#### 6.2) Exemplo com `ServeHTTP` (tipo customizado)

```go
package main

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
}
```

Executar:

```bash
go run main.go
curl -i localhost:8080/hello
```

#### 6.3) Exemplo com `http.Handler` para composicao (struct + `handlerFinal`)

```go
package main

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
	_, _ = w.Write([]byte(`{"name":"Jeff","email":"jeff@email.com"}`))
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
}
```

Executar:

```bash
go run main.go
curl -i localhost:8080/api/v1/user
```

#### 6.4) Mesma composicao, outra forma (middleware func + `handlerFinal`)

```go
package main

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
	_, _ = w.Write([]byte(`{"name":"Jeff","email":"jeff@email.com"}`))
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
}
```

Executar:

```bash
go run main.go
curl -i localhost:8080/api/v1/user
```

## 5. Server API (em andamento / em breve)

Foco deste bloco:
- somente lado servidor
- exemplos pequenos para copiar, colar e evoluir
- padronizar API antes de avançar para estrutura maior

Status dos pontos selecionados:

| Item | Status no README |
|---|---|
| 5.1 Padronizacao de resposta | Implementado |
| 5.2 Mapa de erros/status por cenario | Implementado |
| 5.3 Organizacao de rotas | Implementado |
| 5.4 Validacao de entrada no servidor | Implementado |
| 5.5 Health endpoints | Implementado |

### 5.1 Padronizacao de resposta

Objetivo:
- centralizar escrita de resposta em um ponto unico
- evitar repeticao de `Header`, `WriteHeader`, `Write`
- manter formato consistente de sucesso e erro

```go
package main

import (
	"encoding/json"
	"log"
	"net/http"
)

type APIError struct {
	Code    string `json:"code"`
	Message string `json:"message"`
}

func writeJSON(w http.ResponseWriter, status int, payload any) {
	b, err := json.Marshal(payload)
	if err != nil {
		w.Header().Set("Content-Type", "application/json")
		w.WriteHeader(http.StatusInternalServerError)
		_, _ = w.Write([]byte(`{"error":{"code":"internal_error","message":"json_encode_failed"}}`))
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
}
```

Executar:

```bash
go run main.go
curl -i localhost:8080/ok
curl -i localhost:8080/bad
```

### 5.2 Mapa de erros e status por cenario

| Cenario | Status | Quando usar |
|---|---:|---|
| JSON inválido | `400` | Body malformado |
| Campo inválido / faltando | `422` | Body válido, mas regra de negócio inválida |
| Content-Type incorreto | `415` | Esperava `application/json` |
| Recurso não encontrado | `404` | ID/path não existe |
| Método não permitido | `405` | Endpoint existe, método não |
| Conflito de estado | `409` | Ex.: email já cadastrado |
| Erro interno | `500` | Falha inesperada no servidor |

Exemplo de retorno de erro padronizado:

```go
package main

import (
	"encoding/json"
	"log"
	"net/http"
)

type APIError struct {
	Code    string `json:"code"`
	Message string `json:"message"`
}

func writeJSON(w http.ResponseWriter, status int, payload any) {
	b, err := json.Marshal(payload)
	if err != nil {
		w.Header().Set("Content-Type", "application/json")
		w.WriteHeader(http.StatusInternalServerError)
		_, _ = w.Write([]byte(`{"error":{"code":"internal_error","message":"json_encode_failed"}}`))
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
}
```

Executar:

```bash
go run main.go
curl -i localhost:8080/error/bad-json
curl -i localhost:8080/error/validation
curl -i localhost:8080/error/not-found
```

### 5.3 Organizacao de rotas

Objetivo:
- manter rotas previsiveis
- separar por contexto (`health`, `users`, etc.)
- versionar API (`/api/v1`)

```go
package main

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
	_, _ = w.Write([]byte(`{"message":"user created"}`))
}

func getUserByID(w http.ResponseWriter, r *http.Request) {
	id := r.PathValue("id")
	_, _ = w.Write([]byte(`{"id":"` + id + `"}`))
}

func updateUser(w http.ResponseWriter, r *http.Request) {
	id := r.PathValue("id")
	_, _ = w.Write([]byte(`{"message":"user updated","id":"` + id + `"}`))
}

func main() {
	mux := http.NewServeMux()
	registerRoutes(mux)

	log.Fatal(http.ListenAndServe(":8080", mux))
}
```

Dica:
- se usar `{id}` no pattern (Go 1.22+), leia com `r.PathValue("id")`

Executar:

```bash
go run main.go
curl -i localhost:8080/healthz
curl -i localhost:8080/api/v1/users/123
```

### 5.4 Validacao de entrada no servidor

Checklist curto para `POST/PUT`:
1. validar `Content-Type`
2. limitar tamanho do body
3. decodificar JSON com `DisallowUnknownFields`
4. validar campos obrigatorios
5. retornar status correto (`400`, `415`, `422`)

```go
package main

import (
	"encoding/json"
	"log"
	"net/http"
	"strings"
)

type APIError struct {
	Code    string `json:"code"`
	Message string `json:"message"`
}

type CreateUserInput struct {
	Name  string `json:"name"`
	Email string `json:"email"`
}

func writeJSON(w http.ResponseWriter, status int, payload any) {
	b, err := json.Marshal(payload)
	if err != nil {
		w.Header().Set("Content-Type", "application/json")
		w.WriteHeader(http.StatusInternalServerError)
		_, _ = w.Write([]byte(`{"error":{"code":"internal_error","message":"json_encode_failed"}}`))
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
}
```

Executar:

```bash
go run main.go
curl -i -X POST localhost:8080/api/v1/users \
  -H "Content-Type: application/json" \
  -d '{"name":"Jeff","email":"jeff@email.com"}'
curl -i -X POST localhost:8080/api/v1/users \
  -H "Content-Type: application/json" \
  -d '{"name":"Jeff","email":"jeff@email.com","extra":"x"}'
```

### 5.5 Health endpoints

Padrao simples:
- `GET /healthz`: servidor respondeu (up)
- `GET /livez`: processo vivo
- `GET /readyz`: pronto para receber trafego (dependencias OK)

```go
package main

import (
	"encoding/json"
	"log"
	"net/http"
	"time"
)

type APIError struct {
	Code    string `json:"code"`
	Message string `json:"message"`
}

var ready = true

func writeJSON(w http.ResponseWriter, status int, payload any) {
	b, err := json.Marshal(payload)
	if err != nil {
		w.Header().Set("Content-Type", "application/json")
		w.WriteHeader(http.StatusInternalServerError)
		_, _ = w.Write([]byte(`{"error":{"code":"internal_error","message":"json_encode_failed"}}`))
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
}
```

Executar:

```bash
go run main.go
curl -i localhost:8080/healthz
curl -i localhost:8080/readyz
curl -i localhost:8080/livez
```

## 6. Docker: build e run local

Objetivo:
- compilar o server Go em imagem enxuta (multi-stage)
- subir local na porta `8080`
- ter comandos basicos para operacao e debug

Pre-requisito:
- ter um `main.go` funcional na raiz (voce pode usar qualquer exemplo deste README)
- usar `.dockerignore` para nao enviar arquivos desnecessarios no contexto de build

### 6.1 Dockerfile multi-stage (Alpine + timezone Brasil)

Arquivo `Dockerfile` (na raiz do projeto):

```dockerfile
# syntax=docker/dockerfile:1

FROM golang:1.25.6-alpine AS builder
WORKDIR /src
RUN apk add --no-cache ca-certificates tzdata
COPY . .
ARG APP_FILE=main.go
ENV CGO_ENABLED=0
RUN go build -trimpath -ldflags="-s -w" -o /out/server "./${APP_FILE}"

FROM alpine:3.20 AS runtime
RUN apk add --no-cache ca-certificates tzdata \
  && cp /usr/share/zoneinfo/America/Sao_Paulo /etc/localtime \
  && echo "America/Sao_Paulo" > /etc/timezone
ENV TZ=America/Sao_Paulo
WORKDIR /app
COPY --from=builder /out/server /app/server
EXPOSE 8080
USER nobody:nobody
ENTRYPOINT ["/app/server"]
```

Observacoes:
- imagem final fica enxuta (sem toolchain Go)
- timezone definida para Brasil (`America/Sao_Paulo`)
- se seu entrypoint for outro arquivo, use `--build-arg APP_FILE=seu_arquivo.go`
- a imagem do builder deve ser compativel com a versao do `go.mod` (ex.: `go 1.25.6`)

### 6.2 Comandos basicos Docker

Build da imagem:

```bash
docker build -t nethttp-server:local .
```

Build da imagem sem usar cache (forca rebuild):

```bash
docker build --no-cache -t nethttp-server:local .
```

Build escolhendo outro arquivo Go:

```bash
docker build -t nethttp-server:local --build-arg APP_FILE=cmd/api/main.go .
```

Limpar cache de build (builder cache):

```bash
docker builder prune -f
```

Subir container local:

```bash
docker run -d --name nethttp-server -p 8080:8080 nethttp-server:local
```

Listar containers:

```bash
docker ps -a
```

Ver logs:

```bash
docker logs -f nethttp-server
```

Validar rotas do `main.go` (`GET`, `POST`, `PUT` em `/api/v1/user`):

```bash
curl -i localhost:8080/api/v1/user
```

```bash
curl -i -X POST localhost:8080/api/v1/user \
  -H "Content-Type: application/json" \
  -d '{"name":"Jeff","email":"jeff@email.com"}'
```

```bash
curl -i -X PUT localhost:8080/api/v1/user \
  -H "Content-Type: application/json" \
  -d '{"name":"Jeff Updated","email":"jeff.updated@email.com"}'
```

Conferir timezone no container:

```bash
docker exec -it nethttp-server date
```

Parar e remover container:

```bash
docker stop nethttp-server
docker rm nethttp-server
```
