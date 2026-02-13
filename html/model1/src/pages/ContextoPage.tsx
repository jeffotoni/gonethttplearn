import { CodeBlock } from '@/components/CodeBlock';
import { ContentTable } from '@/components/ContentTable';

export function ContextoPage() {
  const webServicesData = {
    headers: ['Estilo/Tecnologia', 'Ano', 'Característica principal', 'Quando aparece mais'],
    rows: [
      ['SOAP', '1998', 'Contrato rígido, XML, WSDL', 'Legado corporativo e integrações formais'],
      ['REST', '2000', 'Estilo arquitetural sobre HTTP', 'APIs web em geral'],
      ['GraphQL', '2015', 'Cliente define campos da resposta', 'Cenários com múltiplas visões de dados'],
      ['gRPC', '2015', 'RPC com Protobuf sobre HTTP/2', 'Comunicação interna de microserviços'],
    ],
  };

  const httpEvolutionData = {
    headers: ['Protocolo', 'Ano', 'Destaques'],
    rows: [
      ['HTTP/1.0', '1996', 'Conexão fechada por padrão; keep-alive opcional via header'],
      ['HTTP/1.1', '1997', 'Texto, amplamente suportado, keep-alive'],
      ['HTTP/2', '2015', 'Binário, multiplexing, compressão de headers'],
      ['HTTP/3', '2022', 'QUIC/UDP, menor latência em redes instáveis'],
    ],
  };

  const osiModelData = {
    headers: ['Camada', 'Nome', 'Função Principal', 'Exemplos'],
    rows: [
      ['7', 'Aplicação', 'Interface com o usuário e aplicações', 'HTTP, HTTPS, FTP, SMTP, DNS'],
      ['6', 'Apresentação', 'Formatação, criptografia, compressão', 'SSL/TLS, JPEG, MP3, JSON'],
      ['5', 'Sessão', 'Controle de sessão/conexão', 'NetBIOS, RPC'],
      ['4', 'Transporte', 'Comunicação fim a fim, controle de erro', 'TCP, UDP'],
      ['3', 'Rede', 'Endereçamento lógico e roteamento', 'IP, ICMP, IPSec'],
      ['2', 'Enlace', 'Comunicação dentro da rede local', 'Ethernet, ARP, PPP'],
      ['1', 'Física', 'Transmissão elétrica/óptica dos bits', 'Cabos, Fibra, Wi-Fi'],
    ],
  };

  const tcpIpModelData = {
    headers: ['Camada TCP/IP', 'Equivalente OSI', 'Exemplos'],
    rows: [
      ['Aplicação', '7, 6 e 5', 'HTTP, FTP, SMTP, DNS'],
      ['Transporte', '4', 'TCP, UDP'],
      ['Internet', '3', 'IP, ICMP'],
      ['Acesso à Rede', '2 e 1', 'Ethernet, Wi-Fi'],
    ],
  };

  const siglasData = {
    headers: ['Termo', 'Significado', 'Tipo', 'Onde se encaixa'],
    rows: [
      ['HTTP', 'HyperText Transfer Protocol', 'Protocolo', 'Camada de Aplicação'],
      ['REST', 'Representational State Transfer', 'Estilo arquitetural', 'Usa HTTP'],
      ['SOAP', 'Simple Object Access Protocol', 'Protocolo', 'Usa HTTP (geralmente)'],
      ['gRPC', 'Google Remote Procedure Call', 'Framework / RPC', 'Usa HTTP/2'],
    ],
  };

  const httpMethodsData = {
    headers: ['Verbo', 'Uso Correto', 'Exemplo'],
    rows: [
      ['GET', 'Buscar dados', 'GET /users/123'],
      ['POST', 'Criar', 'POST /users'],
      ['PUT', 'Substituir', 'PUT /users/123'],
      ['PATCH', 'Atualizar parcialmente', 'PATCH /users/123'],
      ['DELETE', 'Remover', 'DELETE /users/123'],
    ],
  };

  const statusCodesData = {
    headers: ['Cenário', 'Status'],
    rows: [
      ['Sucesso com retorno', '200 OK'],
      ['Criação de recurso', '201 Created'],
      ['Sucesso sem corpo', '204 No Content'],
      ['Erro de entrada', '400 Bad Request'],
      ['Não autenticado', '401 Unauthorized'],
      ['Sem permissão', '403 Forbidden'],
      ['Não encontrado', '404 Not Found'],
      ['Conflito de estado', '409 Conflict'],
      ['Erro de validação semântica', '422 Unprocessable Entity'],
      ['Erro interno', '500 Internal Server Error'],
    ],
  };

  const serversData = {
    headers: ['Servidor', 'Ano', 'Categoria', 'Observação'],
    rows: [
      ['Apache HTTP Server', '1995', 'Web Server', 'Base histórica da web open source'],
      ['IIS', '1995', 'Web Server', 'Servidor web da Microsoft'],
      ['nginx', '2004', 'Web Server/Reverse Proxy', 'Muito usado em alta concorrência'],
      ['Caddy', '2015', 'Web Server', 'HTTPS automático por padrão'],
      ['Tomcat', '1999', 'Application Server (Java)', 'Muito comum em aplicações Java'],
      ['JBoss / WildFly', '2006', 'Application Server (Java)', 'Linha enterprise do ecossistema Java'],
    ],
  };

  const goServersData = {
    headers: ['Projeto', 'Categoria', 'Onde aparece muito', 'Por que Go ajuda aqui'],
    rows: [
      ['Caddy', 'Web server / reverse proxy', 'APIs, TLS automático, edge simples', 'Binário único, concorrência nativa e deploy fácil'],
      ['Traefik', 'Reverse proxy / ingress', 'Docker, Kubernetes, service discovery', 'Integração cloud-native e alta performance de rede'],
      ['Fabio', 'Load balancer / reverse proxy', 'Ambientes com Consul', 'Simplicidade operacional e bom modelo concorrente'],
    ],
  };

  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      <h1 className="section-title">1. Contexto: Web Services, REST e Protocolos</h1>

      <div className="section-content space-y-4">
        <p>
          Antes de entrar no pacote <code>net/http</code>, o material faz uma visão macro de:
        </p>
        <ul className="list-disc list-inside space-y-1 ml-4">
          <li>Web services</li>
          <li>HTTP e evolução de protocolos</li>
          <li>REST e RESTful</li>
          <li>Overview da linguagem Go para APIs</li>
          <li>Boas práticas de corpo, status code e serialização</li>
        </ul>
      </div>

      {/* Panorama de Web Services */}
      <section className="mt-12">
        <h2 className="section-subtitle">Panorama de Web Services</h2>
        <ContentTable data={webServicesData} />
      </section>

      {/* Evolução HTTP */}
      <section className="mt-12">
        <h2 className="section-subtitle">Evolução rápida de HTTP</h2>
        <ContentTable data={httpEvolutionData} />
      </section>

      {/* Keep-Alive */}
      <section className="mt-12">
        <h2 className="section-subtitle">Keep-Alive: HTTP/1.0 → HTTP/1.1 → HTTP/2</h2>
        
        <div className="space-y-6">
          <div className="p-6 bg-slate-50 rounded-xl border border-slate-200">
            <h3 className="font-semibold text-slate-700 mb-3">HTTP/1.0 (1996)</h3>
            <ul className="text-sm text-slate-600 space-y-1">
              <li>• Conexão fechada após CADA request/response</li>
              <li>• Keep-Alive era OPCIONAL (via header)</li>
              <li>• Header: Connection: keep-alive (explícito)</li>
            </ul>
          </div>

          <div className="p-6 bg-sky-50 rounded-xl border border-sky-100">
            <h3 className="font-semibold text-sky-700 mb-3">HTTP/1.1 (1997)</h3>
            <ul className="text-sm text-sky-800 space-y-1">
              <li>• Keep-Alive é o PADRÃO</li>
              <li>• Conexões persistentes por default</li>
              <li>• Para fechar: Connection: close</li>
              <li>• Melhor performance out-of-the-box</li>
            </ul>
          </div>

          <div className="p-6 bg-emerald-50 rounded-xl border border-emerald-100">
            <h3 className="font-semibold text-emerald-700 mb-3">HTTP/2 (2015)</h3>
            <ul className="text-sm text-emerald-800 space-y-1">
              <li>• Multiplexing sobre uma única conexão</li>
              <li>• Keep-Alive implícito</li>
              <li>• Múltiplas requisições simultâneas</li>
            </ul>
          </div>
        </div>

        <h3 className="font-semibold text-slate-700 mt-8 mb-4">HTTP/1.0 - ativando Keep-Alive</h3>
        <CodeBlock 
          language="http" 
          code={`GET /index.html HTTP/1.0
Host: example.com
Connection: keep-alive`} 
        />
        <CodeBlock 
          language="http" 
          code={`HTTP/1.0 200 OK
Connection: keep-alive
Keep-Alive: timeout=5, max=100
Content-Type: text/html
Content-Length: 1234

<html>...</html>`} 
        />

        <h3 className="font-semibold text-slate-700 mt-8 mb-4">HTTP/1.1 - Keep-Alive por padrão</h3>
        <CodeBlock 
          language="http" 
          code={`GET /index.html HTTP/1.1
Host: example.com`} 
        />
        <CodeBlock 
          language="http" 
          code={`HTTP/1.1 200 OK
Content-Type: text/html
Content-Length: 1234

<html>...</html>`} 
        />
      </section>

      {/* Modelo OSI */}
      <section className="mt-12">
        <h2 className="section-subtitle">Modelo OSI (7 Camadas)</h2>
        <ContentTable data={osiModelData} />
      </section>

      {/* Modelo TCP/IP */}
      <section className="mt-12">
        <h2 className="section-subtitle">Modelo TCP/IP (4 Camadas)</h2>
        <ContentTable data={tcpIpModelData} />

        <div className="tip-card mt-6">
          <h4 className="font-semibold text-emerald-800 mb-2">Resumo rápido da pilha:</h4>
          <ul className="text-emerald-700 space-y-1">
            <li>• HTTP/1.1 e HTTP/2: <code>HTTP → TCP → IP</code></li>
            <li>• HTTP/3: <code>HTTP → QUIC(UDP) → IP</code></li>
          </ul>
        </div>

        <div className="mt-6 p-6 bg-slate-50 rounded-xl border border-slate-200">
          <h4 className="font-semibold text-slate-700 mb-3">Analogia didática (mensagem e correio):</h4>
          <ol className="text-slate-600 space-y-2 list-decimal list-inside">
            <li><strong>Aplicação:</strong> escrever a mensagem</li>
            <li><strong>Transporte:</strong> colocar no envelope (TCP controla se chegou)</li>
            <li><strong>Rede:</strong> escolher rota até o destino</li>
            <li><strong>Enlace:</strong> levar até o correio local</li>
            <li><strong>Física:</strong> estrada e caminhão</li>
          </ol>
        </div>

        <CodeBlock 
          code={`http.ListenAndServe(":8080", nil)`}
          filename="Exemplo básico em Go"
        />

        <p className="text-slate-600 mt-4">
          Ou seja, <code>net/http</code> está no topo da pilha, mas depende de todas as camadas abaixo.
        </p>
      </section>

      {/* REST vs RESTful */}
      <section className="mt-12">
        <h2 className="section-subtitle">REST vs RESTful</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="p-6 bg-slate-50 rounded-xl border border-slate-200">
            <h3 className="font-semibold text-slate-700 mb-2">REST</h3>
            <p className="text-slate-600">É um <strong>estilo arquitetural</strong> (conjunto de restrições)</p>
          </div>
          <div className="p-6 bg-sky-50 rounded-xl border border-sky-100">
            <h3 className="font-semibold text-sky-700 mb-2">RESTful</h3>
            <p className="text-sky-800">É a <strong>API que aplica REST</strong> de forma consistente na prática</p>
          </div>
        </div>
      </section>

      {/* Siglas */}
      <section className="mt-12">
        <h2 className="section-subtitle">Significado das Siglas</h2>
        <ContentTable data={siglasData} />
      </section>

      {/* REST Constraints */}
      <section className="mt-12">
        <h2 className="section-subtitle">REST Constraints</h2>
        
        <div className="p-6 bg-slate-800 rounded-xl text-slate-100 font-mono text-sm">
          <div className="space-y-4">
            <div>
              <span className="text-sky-400 font-semibold">1. Client-Server</span>
              <p className="text-slate-400 ml-4">Separação de responsabilidades</p>
            </div>
            <div>
              <span className="text-sky-400 font-semibold">2. Stateless</span>
              <p className="text-slate-400 ml-4">Cada request é independente</p>
            </div>
            <div>
              <span className="text-sky-400 font-semibold">3. Cacheable</span>
              <p className="text-slate-400 ml-4">Responses devem indicar cache</p>
            </div>
            <div>
              <span className="text-sky-400 font-semibold">4. Uniform Interface</span>
              <p className="text-slate-400 ml-4">Resource identification, Manipulation via representations, Self-descriptive messages, HATEOAS</p>
            </div>
            <div>
              <span className="text-sky-400 font-semibold">5. Layered System</span>
              <p className="text-slate-400 ml-4">Cliente não sabe se conecta direto no servidor final ou em camadas intermediárias</p>
            </div>
            <div>
              <span className="text-sky-400 font-semibold">6. Code on Demand (opcional)</span>
              <p className="text-slate-400 ml-4">Server pode enviar código executável</p>
            </div>
          </div>
        </div>
      </section>

      {/* HTTP Methods */}
      <section className="mt-12">
        <h2 className="section-subtitle">HTTP Methods (Verbos HTTP)</h2>
        <ContentTable data={httpMethodsData} />
      </section>

      {/* Status Codes */}
      <section className="mt-12">
        <h2 className="section-subtitle">Status codes essenciais para APIs</h2>
        <ContentTable data={statusCodesData} />
      </section>

      {/* Servidores */}
      <section className="mt-12">
        <h2 className="section-subtitle">Servidores web e aplicação</h2>
        <ContentTable data={serversData} />
      </section>

      {/* Servidores Go */}
      <section className="mt-12">
        <h2 className="section-subtitle">Servidores Web/Reverse Proxy feitos em Go</h2>
        <ContentTable data={goServersData} />
      </section>

      {/* Market Share */}
      <section className="mt-12">
        <h2 className="section-subtitle">Market share (visão macro)</h2>
        <div className="p-6 bg-slate-50 rounded-xl border border-slate-200 font-mono text-sm">
          <div className="space-y-2">
            <div className="flex items-center gap-4">
              <span className="w-24">1. nginx</span>
              <span className="w-12 text-right">~34%</span>
              <div className="flex-1 h-4 bg-slate-200 rounded overflow-hidden">
                <div className="h-full bg-emerald-500 w-[34%]"></div>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <span className="w-24">2. Apache</span>
              <span className="w-12 text-right">~31%</span>
              <div className="flex-1 h-4 bg-slate-200 rounded overflow-hidden">
                <div className="h-full bg-red-500 w-[31%]"></div>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <span className="w-24">3. Cloudflare</span>
              <span className="w-12 text-right">~21%</span>
              <div className="flex-1 h-4 bg-slate-200 rounded overflow-hidden">
                <div className="h-full bg-orange-500 w-[21%]"></div>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <span className="w-24">4. LiteSpeed</span>
              <span className="w-12 text-right">~6%</span>
              <div className="flex-1 h-4 bg-slate-200 rounded overflow-hidden">
                <div className="h-full bg-blue-500 w-[6%]"></div>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <span className="w-24">5. IIS</span>
              <span className="w-12 text-right">~5%</span>
              <div className="flex-1 h-4 bg-slate-200 rounded overflow-hidden">
                <div className="h-full bg-cyan-500 w-[5%]"></div>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <span className="w-24">6. Outros</span>
              <span className="w-12 text-right">~3%</span>
              <div className="flex-1 h-4 bg-slate-200 rounded overflow-hidden">
                <div className="h-full bg-slate-400 w-[3%]"></div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
