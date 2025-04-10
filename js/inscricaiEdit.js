function formularioInscricaoEdite() {
    return {
        // Variáveis do formulário
        nome: '',
        dataNascimento: '',
        cpf: '',
        sexo: '',
        email: '',
        telefone: '',
        cep: '',
        rua: '',
        numero: '',
        cidade: '',
        estado: '',
        trilha: '',
        userName: '',
        password: '',
        confirmadPassword: '',
        termoConcordancia: false,

        async carregarDados() {
            try {
                const token = sessionStorage.getItem("token"); // ou localStorage.getItem("token")
        
                if (!token) {
                    throw new Error("Token não encontrado");
                }

                
                const compResidencia = sessionStorage.getItem('comprovanteResidencia');
                const docIdentidade = sessionStorage.getItem('documentoIdentidade');
                if (docIdentidade && docIdentidade.startsWith('data:application/pdf')) {
                    document.querySelector('#preview-identidade').src = docIdentidade;
                }
                
                if (compResidencia && compResidencia.startsWith('data:application/pdf')) {
                    document.querySelector('#preview-compResidencia').src = compResidencia;
                }

        
                const response = await fetch('http://localhost:8080/trilha/getdados', {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    }
                });
        
                if (!response.ok) throw new Error("Erro ao buscar dados");
                const dados = await response.json();
        
                this.nome = dados.pessoa.nome;
                this.dataNascimento = dados.pessoa.dataNascimento.split('T')[0];
                this.cpf = dados.pessoa.cpf;
                this.sexo = dados.pessoa.sexo;
                this.email = dados.pessoa.email;
                this.telefone = dados.pessoa.telefone;
        
                this.cep = dados.emdereco.cep;
                this.rua = dados.emdereco.rua;
                this.numero = dados.emdereco.nuemro;
                this.cidade = dados.emdereco.cidade;
                this.estado = dados.emdereco.estado;
        
                const trilhas = {
                    1: 'front-end',
                    2: 'back-end',
                    3: 'jogos',
                    4: 'design',
                    5: 'dados'
                };
                this.trilha = trilhas[dados.trilhaId] || '';

                this.userName = sessionStorage.getItem('user') || '';
        
            } catch (err) {
                console.error("Erro ao carregar dados:", err);
                Swal.fire({
                    icon: 'error',
                    title: 'Erro',
                    text: err.message || 'Erro ao buscar dados do usuário.'
                });
            }
        }
        
    }
}
