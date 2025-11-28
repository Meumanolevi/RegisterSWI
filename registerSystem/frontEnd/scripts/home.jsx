const { useState } = React;

function App() {
  const registrations = [
    { title: 'Cliente', href: 'register/clientRegister.html', icon: 'person' },
    { title: 'Funcionário', href: 'register/employeeRegister.html', icon: 'people' },
    { title: 'Produto', href: 'register/productRegister.html', icon: 'box-seam' },
    { title: 'Fornecedor', href: 'register/supplierRegister.html', icon: 'truck' },
    { title: 'Usuário', href: 'register/userRegister.html', icon: 'key' },
  ];

  const consultations = [
    { title: 'Cliente', href: 'consultation/clientConsult.html', icon: 'search' },
    { title: 'Funcionário', href: 'consultation/employeeConsult.html', icon: 'search' },
    { title: 'Produto', href: 'consultation/productConsult.html', icon: 'search' },
    { title: 'Fornecedor', href: 'consultation/supplierConsult.html', icon: 'search' },
    { title: 'Usuário', href: 'consultation/userConsult.html', icon: 'search' },
  ];

  return (
    <>
      <Header />
      <main className="container mt-4">
        <Hero />

        <section className="mt-4">
          <h3>Cadastros</h3>
          <div className="row g-3">
            {registrations.map((r) => (
              <div className="col-12 col-sm-6 col-md-4 col-lg-3" key={r.href}>
                <a className="card card-body h-100 card-link shadow-sm" href={r.href}>
                  <div className="d-flex align-items-center">
                    <i className={`bi bi-${r.icon} fs-2 text-primary me-3`} aria-hidden></i>
                    <div>
                      <h5 className="mb-0">{r.title}</h5>
                      <small className="text-muted">Ir para cadastro de {r.title.toLowerCase()}</small>
                    </div>
                  </div>
                </a>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-5">
          <h3>Consultas</h3>
          <div className="row g-3">
            {consultations.map((c) => (
              <div className="col-12 col-sm-6 col-md-4 col-lg-3" key={c.href}>
                <a className="card card-body h-100 card-link shadow-sm" href={c.href}>
                  <div className="d-flex align-items-center">
                    <i className={`bi bi-${c.icon} fs-2 text-success me-3`} aria-hidden></i>
                    <div>
                      <h5 className="mb-0">{c.title}</h5>
                      <small className="text-muted">Ir para consulta de {c.title.toLowerCase()}</small>
                    </div>
                  </div>
                </a>
              </div>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

function Header() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary fixed-top">
      <div className="container">
        <a className="navbar-brand d-flex align-items-center" href="#">
          <i className="bi bi-journals me-2"></i>
          Sistema de Cadastro - SW I
        </a>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navMain" aria-controls="navMain" aria-expanded="false" aria-label="Alternar navegação">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navMain">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item dropdown">
              <a className="nav-link dropdown-toggle" href="#" id="cadDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">Cadastros</a>
              <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="cadDropdown">
                <li><a className="dropdown-item" href="register/clientRegister.html">Cliente</a></li>
                <li><a className="dropdown-item" href="register/employeeRegister.html">Funcionário</a></li>
                <li><a className="dropdown-item" href="register/productRegister.html">Produto</a></li>
                <li><a className="dropdown-item" href="register/supplierRegister.html">Fornecedor</a></li>
                <li><a className="dropdown-item" href="register/userRegister.html">Usuário</a></li>
              </ul>
            </li>
            <li className="nav-item dropdown ms-2">
              <a className="nav-link dropdown-toggle" href="#" id="consDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">Consultas</a>
              <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="consDropdown">
                <li><a className="dropdown-item" href="consultation/clientConsult.html">Cliente</a></li>
                <li><a className="dropdown-item" href="consultation/employeeConsult.html">Funcionário</a></li>
                <li><a className="dropdown-item" href="consultation/productConsult.html">Produto</a></li>
                <li><a className="dropdown-item" href="consultation/supplierConsult.html">Fornecedor</a></li>
                <li><a className="dropdown-item" href="consultation/userConsult.html">Usuário</a></li>
              </ul>
            </li>
            <li className="nav-item ms-3">
              <a className="nav-link" href="help.html">Ajuda</a>
            </li> 
          </ul>
        </div>
      </div>
    </nav>
  );
}

function Hero(){
  return (
    <div className="p-4 p-md-5 mb-4 text-white rounded bg-dark">
      <div className="col-md-10 px-0">
        <h1 className="display-5 fst-italic">Bem-vindo ao Sistema de Cadastro</h1>
        <p className="lead my-3">Use o menu ou os cards abaixo para navegar entre cadastros e consultas.</p>
        <p className="lead mb-0"><a href="register/clientRegister.html" className="text-white fw-bold">Começar pelo cadastro de clientes &raquo;</a></p>
      </div>
    </div>
  );
}

function Footer(){
  return (
    <footer className="footer mt-auto py-3 bg-light">
      <div className="container text-center">
        <span className="text-muted">© {new Date().getFullYear()} Empresa - Sistema de Cadastro</span>
      </div>
    </footer>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
