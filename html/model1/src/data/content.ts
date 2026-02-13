export type Section = {
  id: string;
  title: string;
  path: string;
};

export const sections: Section[] = [
  { id: 'home', title: 'Início', path: '/' },
  { id: 'contexto', title: '1. Contexto Web', path: '/contexto' },
  { id: 'overview', title: '2. Overview de Go', path: '/overview' },
  { id: 'fundamentos', title: '3. Fundamentos net/http', path: '/fundamentos' },
  { id: 'pratico', title: '4. Manual Prático', path: '/pratico' },
  { id: 'server', title: '5. Server API', path: '/server' },
  { id: 'docker', title: '6. Docker', path: '/docker' },
];

export const homeContent = {
  title: 'net/http em Go',
  subtitle: 'Do Básico ao Avançado',
  description: 'Este é um manual prático de net/http em Go com foco exclusivo em server-side API. A proposta é evoluir do básico ao avançado com exemplos pequenos, executáveis e organizados em sequência didática.',
  author: {
    name: 'Jefferson Otoni Lima (Jeffotoni)',
    role: 'Engenheiro de Software Sênior e Arquiteto de Soluções',
    experience: '22+ anos de experiência',
  },
  blocks: [
    { name: 'Contexto web', description: 'Visão macro de Web Services, REST/RESTful e evolução do HTTP' },
    { name: 'Fundamentos net/http', description: 'http.Request, http.ResponseWriter, http.Handler, http.HandlerFunc' },
    { name: 'Servidor HTTP em Go', description: 'Variações de http.ListenAndServe, http.ServeMux e http.Server' },
    { name: 'Method pattern', description: 'Rotas como "GET /rota" e "POST /rota" (Go 1.22+)' },
    { name: 'API server na prática', description: 'Padronização de resposta, status/erros, validação e health endpoints' },
  ],
  resources: [
    { name: 'Podcast', description: 'O que preciso saber sobre Backend?', url: 'https://youtu.be/_E20rA8bWGw' },
    { name: 'Podcast', description: 'Mergulhando no backend', url: 'https://youtu.be/fJFQk-yFNxg' },
    { name: 'Chat de dúvidas', description: 'NotebookLM - Chat do manual', url: 'https://notebooklm.google.com/notebook/c50bab62-0214-4b1a-9d53-78079ffc9fe6/preview' },
    { name: 'Apresentação', description: 'Google Slides do manual', url: 'https://docs.google.com/presentation/d/1To-ymSRme7iyUKflu2ctDfyrlY0NjaRnjKYCHQpu6eE/edit?usp=sharing' },
  ],
  goReferences: [
    { name: 'Site oficial do Go', url: 'https://go.dev/', type: 'Oficial', focus: 'Portal principal da linguagem' },
    { name: 'Tutorial oficial', url: 'https://go.dev/doc/tutorial/', type: 'Oficial', focus: 'Passo a passo para começar' },
    { name: 'Tour do Go', url: 'https://go.dev/tour/welcome/1', type: 'Oficial', focus: 'Aprendizado interativo' },
    { name: 'Effective Go', url: 'https://go.dev/doc/effective_go', type: 'Oficial', focus: 'Estilo e boas práticas' },
    { name: 'Go by Example', url: 'https://gobyexample.com', type: 'Comunidade', focus: 'Exemplos diretos e curtos' },
  ],
};
