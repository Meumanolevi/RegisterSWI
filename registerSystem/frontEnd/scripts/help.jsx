const { useState, useMemo } = React;

const faqsInitial = [
  { id: 1, q: "Como faço para me cadastrar no sistema?", a: "Clique em 'Registrar' no menu principal, preencha seus dados e confirme o e-mail. Campos obrigatórios são marcados com '*'.", tags: ["registro","conta"] },
  { id: 2, q: "Esqueci minha senha — como recuperar?", a: "Vá em 'Entrar' e clique em 'Esqueci minha senha'. Insira o e-mail cadastrado; você receberá instruções para redefinir.", tags: ["senha","login","segurança"] },
  { id: 3, q: "Como editar meus dados pessoais?", a: "Acesse 'Meu Perfil' no menu superior, clique em 'Editar' e atualize os campos desejados. Salve para confirmar as alterações.", tags: ["perfil","editar"] },
  { id: 4, q: "Posso excluir minha conta?", a: "Sim. Em 'Meu Perfil' existe a opção 'Excluir Conta'. Atenção: essa ação é irreversível e remove todos os seus dados.", tags: ["conta","privacidade"] },
  { id: 5, q: "Como gerar relatórios de registros?", a: "No painel administrativo, vá até 'Relatórios'. Escolha o período e o formato (CSV/PDF) e clique em 'Gerar'.", tags: ["relatórios","admin"] },
  { id: 6, q: "O sistema funciona em dispositivos móveis?", a: "Sim. A interface é responsiva e otimizada para celulares e tablets. Para melhor experiência, use navegadores atualizados.", tags: ["mobile","compatibilidade"] },
  { id: 7, q: "Como contactar o suporte?", a: "Envie um e-mail para suporte@exemplo.com ou acesse 'Suporte' no rodapé e abra um chamado com detalhes do problema.", tags: ["suporte","contato"] },
  { id: 8, q: "Quais são as regras de privacidade dos dados?", a: "Trabalhamos conforme nossa Política de Privacidade exibida no rodapé. Dados pessoais são usados apenas para fornecer o serviço.", tags: ["privacidade","segurança"] }
];

function HelpPage() {
  const [query, setQuery] = useState("");
  const [activeId, setActiveId] = useState(null);
  const [tagFilter, setTagFilter] = useState("todas");

  const tags = useMemo(() => {
    const s = new Set();
    faqsInitial.forEach(f => f.tags.forEach(t => s.add(t)));
    return ["todas", ...Array.from(s)];
  }, []);

  const filtered = useMemo(() => {
    return faqsInitial.filter(faq => {
      const matchTag = tagFilter === "todas" || faq.tags.includes(tagFilter);
      const q = query.trim().toLowerCase();
      const matchQuery = q === "" || faq.q.toLowerCase().includes(q) || faq.a.toLowerCase().includes(q);
      return matchTag && matchQuery;
    });
  }, [query, tagFilter]);

  return (
    <div className="mb-5">
      <header className="help-header rounded-3 p-4 mb-4">
        <div className="d-flex flex-column flex-md-row align-items-md-center justify-content-between">
          <div>
            <h1 className="h3 mb-1">Ajuda — Como utilizar o sistema</h1>
            <p className="mb-0 opacity-75">Perguntas frequentes, guias rápidos e suporte para usar o RegisterSWI.</p>
          </div>
          <div className="mt-3 mt-md-0">
            <a href="/registerSystem/frontEnd/pages/index.html" className="btn btn-outline-light">Voltar ao sistema</a>
          </div>
        </div>
      </header>

      <div className="row">
        <div className="col-xl-8 col-lg-9">
          <div className="mb-3 d-flex flex-wrap gap-2 align-items-center">
            <input
              className="form-control search-input"
              placeholder="Busque por palavra-chave — ex: senha, relatório, perfil"
              value={query}
              onChange={e => setQuery(e.target.value)}
            />
            <select className="form-select w-auto" value={tagFilter} onChange={e => setTagFilter(e.target.value)}>
              {tags.map(t => <option key={t} value={t}>{t === "todas" ? "Todas as categorias" : t}</option>)}
            </select>
            <button className="btn btn-outline-secondary" onClick={() => { setQuery(""); setTagFilter("todas"); }}>Limpar</button>
          </div>

          <div className="accordion" id="faqAccordion">
            {filtered.length === 0 && (
              <div className="alert alert-info">Nenhuma pergunta encontrada. Tente outra palavra-chave.</div>
            )}

            {filtered.map((faq) => (
              <div className="accordion-item" key={faq.id}>
                <h2 className="accordion-header" id={`heading-${faq.id}`}>
                  <button
                    className={"accordion-button " + (activeId === faq.id ? "" : "collapsed")}
                    type="button"
                    onClick={() => setActiveId(activeId === faq.id ? null : faq.id)}
                    aria-expanded={activeId === faq.id}
                    aria-controls={`collapse-${faq.id}`}
                  >
                    {faq.q}
                  </button>
                </h2>
                <div
                  id={`collapse-${faq.id}`}
                  className={"accordion-collapse collapse " + (activeId === faq.id ? "show" : "")}
                  aria-labelledby={`heading-${faq.id}`}
                >
                  <div className="accordion-body">
                    <p className="mb-2">{faq.a}</p>
                    <div>
                      {faq.tags.map(t => <span key={t} className="badge bg-secondary me-1 tag">{t}</span>)}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-4">
            <h5>Guia rápido</h5>
            <ol>
              <li>Registrar conta → Validar e-mail → Entrar</li>
              <li>Ir para "Meu Perfil" para atualizar informações</li>
              <li>Administradores: acessar "Painel" para relatórios e gestão</li>
            </ol>
          </div>
        </div>

        <aside className="col-xl-4 col-lg-3">
          <div className="card mb-3">
            <div className="card-body">
              <h6 className="card-title">Precisa de suporte?</h6>
              <p className="card-text small">Se sua dúvida não estiver aqui, abra um chamado com o máximo de detalhes: passos, telas e horários.</p>
              <a href="mailto:suporte@exemplo.com" className="btn btn-primary btn-sm">Enviar e-mail</a>
            </div>
          </div>

          <div className="card mb-3">
            <div className="card-body">
              <h6 className="card-title">Documentação</h6>
              <p className="card-text small">Consulte a documentação técnica e os manuais para administradores.</p>
              <a href="/registerSystem/frontEnd/pages/docs" className="btn btn-outline-primary btn-sm">Abrir docs</a>
            </div>
          </div>

          <div className="card">
            <div className="card-body">
              <h6 className="card-title">Últimas atualizações</h6>
              <ul className="small mb-0">
                <li>2025-10-01: Melhorias na recuperação de senha</li>
                <li>2025-08-12: Relatórios exportáveis em CSV/PDF</li>
                <li>2025-05-20: Suporte completo a dispositivos móveis</li>
              </ul>
            </div>
          </div>
        </aside>
      </div>

      <footer className="mt-5 text-muted small">
        <div>© RegisterSWI — Política de Privacidade e Termos de uso disponíveis no rodapé do sistema.</div>
      </footer>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('help-root')).render(<HelpPage />);
