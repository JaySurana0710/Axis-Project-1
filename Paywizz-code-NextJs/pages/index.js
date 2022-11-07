

export default function Home() {
  return (
      <>
          <nav class="navbar navbar-expand-lg bg-light">
            <div class="container-fluid">
              <a class="navbar-brand active" href="/">Paywizz</a>
              <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
              </button>
              <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                <li class="nav-item">
                  <a class="nav-link " aria-current="page" href="/employee">Employee</a>
                </li>
                <li class="nav-item">
                  <a class="nav-link " aria-current="page" href="/bank">Bank</a>
                </li>
                <li class="nav-item">
                  <a class="nav-link " aria-current="page" href="/salary">Salary</a>
                </li>
              </ul>
            </div>
      </nav>
      <main>
        <h1>Welcome to Paywizz App</h1>
        <span>This will help HR to Pay Bank Employee Salary inside any bank</span>
      </main>
      
          </>
      )
}
