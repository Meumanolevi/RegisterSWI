const { useState } = React;

function App() {
	return (
		<>
			<MainNavbar />
			<main className="container">
				<Hero />
				<QuickLinks />
			</main>
			<Footer />
		</>
	);
}

function MainNavbar() {
	return (
		<nav className="navbar navbar-expand-lg navbar-dark bg-primary fixed-top">
			<div className="container">
				<a className="navbar-brand" href="#">Registro & Controle</a>
				<button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navMain" aria-controls="navMain" aria-expanded="false" aria-label="Toggle navigation">
					<span className="navbar-toggler-icon" />
				</button>
				<div className="collapse navbar-collapse" id="navMain">
					<ul className="navbar-nav me-auto mb-2 mb-lg-0">
						<li className="nav-item dropdown">
							<a className="nav-link dropdown-toggle" href="#" id="cadastrosDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">Cadastros</a>
							<ul className="dropdown-menu" aria-labelledby="cadastrosDropdown">
								<li><a className="dropdown-item" href="register/clientRegister.html">Cliente</a></li>
								<li><a className="dropdown-item" href="register/employeeRegister.html">Funcionário</a></li>
								<li><a className="dropdown-item" href="register/productRegister.html">Produto</a></li>
								<li><a className="dropdown-item" href="register/supplierRegister.html">Fornecedor</a></li>
								<li><a className="dropdown-item" href="register/userRegister.html">Usuário</a></li>
							</ul>
						</li>
						<li className="nav-item dropdown">
							<a className="nav-link dropdown-toggle" href="#" id="consultasDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">Consultas</a>
							<ul className="dropdown-menu" aria-labelledby="consultasDropdown">
								<li><a className="dropdown-item" href="consultation/clientConsult.html">Cliente</a></li>
								<li><a className="dropdown-item" href="consultation/employeeConsult.html">Funcionário</a></li>
								<li><a className="dropdown-item" href="consultation/productConsult.html">Produto</a></li>
								<li><a className="dropdown-item" href="consultation/supplierConsult.html">Fornecedor</a></li>
								<li><a className="dropdown-item" href="consultation/userConsult.html">Usuário</a></li>
							</ul>
						</li>
					</ul>
					<form className="d-flex" role="search" onSubmit={(e)=>e.preventDefault()}>
						<input className="form-control me-2" type="search" placeholder="Pesquisar (local)" aria-label="Search" />
						<button className="btn btn-outline-light" type="submit">Buscar</button>
					</form>
				</div>
			</div>
		</nav>
	);
}

function Hero(){
	return (
		<section className="hero rounded-3 mb-4">
			<div className="container py-4">
				<div className="row align-items-center">
					<div className="col-md-8">
						<h1 className="display-6">Sistema de Cadastro da Empresa</h1>
						<p className="lead">Painel de controle: acesse cadastros e consultas de clientes, funcionários, produtos, fornecedores e usuários.</p>
						<p><a className="btn btn-primary btn-lg" href="register/clientRegister.html" role="button">Novo Cliente</a></p>
					</div>
					<div className="col-md-4 text-md-end">
						<img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original-wordmark.svg" alt="React" style={{width:120,opacity:0.85}}/>
					</div>
				</div>
			</div>
		</section>
	);
}

function QuickLinks(){
	const cadastros = [
		{title:'Cliente', href:'register/clientRegister.html'},
		{title:'Funcionário', href:'register/employeeRegister.html'},
		{title:'Produto', href:'register/productRegister.html'},
		{title:'Fornecedor', href:'register/supplierRegister.html'},
		{title:'Usuário', href:'register/userRegister.html'},
	];
	const consultas = [
		{title:'Cliente', href:'consultation/clientConsult.html'},
		{title:'Funcionário', href:'consultation/employeeConsult.html'},
		{title:'Produto', href:'consultation/productConsult.html'},
		{title:'Fornecedor', href:'consultation/supplierConsult.html'},
		{title:'Usuário', href:'consultation/userConsult.html'},
	];

	return (
		<div className="row g-4">
			<div className="col-12 col-lg-6">
				<div className="card shadow-sm h-100">
					<div className="card-body">
						<h5 className="card-title">Cadastros</h5>
						<p className="card-text">Acesse as telas de cadastro para inserir novos registros.</p>
						<div className="row row-cols-1 row-cols-md-2 g-3">
							{cadastros.map((c) => (
								<div key={c.href} className="col">
									<a className="card-link" href={c.href}>
										<div className="border rounded p-2 h-100 d-flex align-items-center justify-content-between">
											<span>{c.title}</span>
											<span className="text-muted">→</span>
										</div>
									</a>
								</div>
							))}
						</div>
					</div>
				</div>
			</div>

			<div className="col-12 col-lg-6">
				<div className="card shadow-sm h-100">
					<div className="card-body">
						<h5 className="card-title">Consultas</h5>
						<p className="card-text">Veja e filtre registros já cadastrados.</p>
						<div className="row row-cols-1 row-cols-md-2 g-3">
							{consultas.map((c) => (
								<div key={c.href} className="col">
									<a className="card-link" href={c.href}>
										<div className="border rounded p-2 h-100 d-flex align-items-center justify-content-between">
											<span>{c.title}</span>
											<span className="text-muted">🔎</span>
										</div>
									</a>
								</div>
							))}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

function Footer(){
	return (
		<footer className="mt-5 py-4 bg-light">
			<div className="container text-center">
				<small className="text-muted">© {new Date().getFullYear()} Empresa — Sistema de Cadastro</small>
			</div>
		</footer>
	);
}

// Monta a aplicação
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);

