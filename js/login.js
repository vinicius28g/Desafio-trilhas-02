
// function toggleSenha() {
//     const input = document.getElementById("senha");
//     const icon = document.querySelector(".toggle-olho");

//     if (input.type === "password") {
//       input.type = "text";
//       icon.classList.remove("fa-eye");
//       icon.classList.add("fa-eye-slash");
//     } else {
//       input.type = "password";
//       icon.classList.remove("fa-eye-slash");
//       icon.classList.add("fa-eye");
//     }
//   }

document.addEventListener('alpine:init', () => {
  Alpine.data('loginForm', () => ({
    username: '',
    password: '',
    mostrarSenha: false,
    erro: '',

    async login() {
      try {
        const response = await fetch('http://localhost:8080/auth/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            login: this.username,
            pass: this.password
          })
        });

        if (!response.ok) {
          throw new Error('Usuário ou senha inválidos');
        }

        const data = await response.json();

        sessionStorage.setItem('token', data.token);
        sessionStorage.setItem('user', data.login);
        sessionStorage.setItem('role', data.role);

        window.location.href = '/Inscricao.html'; // redireciona para o painel, ajuste conforme necessário
      } catch (error) {
        this.erro = error.message;
      }
    }
  }));
});
