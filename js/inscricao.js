window.onload= function(){
    const fileInputs = document.querySelectorAll(".file-input");

    $('#telefone').mask('(00) 00000-0000');
    $('#cep').mask('00000-000');
    $('#cpf').mask('000.000.000-00');

    fileInputs.forEach(input => {
        const uploadBox = input.closest(".upload-box"); // Encontra a upload-box correta
        const fileName = uploadBox.querySelector(".file-name"); // Pega o nome correto

        // Atualiza o nome do arquivo quando o usuário seleciona um arquivo (click)
        input.addEventListener("change", function () {
            if (input.files.length > 0) {
                fileName.textContent = input.files[0].name;
            } else {
                fileName.textContent = "Nenhum arquivo selecionado";
            }
        });

        // Permitir arrastar arquivos para upload
        uploadBox.addEventListener("dragover", function (e) {
            e.preventDefault();
            uploadBox.style.background = "#dfe6e9";
        });

        uploadBox.addEventListener("dragleave", function () {
            uploadBox.style.background = "white";
        });

        uploadBox.addEventListener("drop", function (e) {
            e.preventDefault();
            uploadBox.style.background = "white";

            const file = e.dataTransfer.files[0];

            // Criar um novo DataTransfer para evitar que outros inputs sejam modificados
            const dataTransfer = new DataTransfer();
            dataTransfer.items.add(file);
            
            // Agora o arquivo é inserido apenas no input correto
            input.files = dataTransfer.files;

            fileName.textContent = file.name; // Atualiza apenas o nome da caixa correta
        });
    });

    const radios = document.querySelectorAll('.radio');

    // Adiciona o evento de mudança para cada rádio
    radios.forEach(radio => {
        radio.addEventListener('change', function () {
            // Remove a borda laranja de todos os labels
            document.querySelectorAll('.radio-card').forEach(label => {
                label.style.borderColor = '#ddd'; // Restaura a cor original
            });

            // Muda a borda do label do radio selecionado para laranja
            if (this.checked) {
                const label = this.closest('label'); // Pega o label mais próximo
                label.style.borderColor = '#ff6600'; // Borda laranja
            }
        });
    });
};


function buscaCep(cep){
    var cep = cep.value.replace(/\D/g, '');
    const rua =  $("#rua");
    const cidade = $("#cidade");
    const estado = $("#estado");

    if (cep.length === 8) {
        $.ajax({
            url: `https://viacep.com.br/ws/${cep}/json/`,
            type: "GET",
            dataType: "json",
            success: function(data) {
                if (!data.erro) {
                    console.log(data);
                    rua.val(data.logradouro);
                    rua.addClass("bloqueado");
                    rua.prop("disabled", true);

                    cidade.val(data.localidade);
                    cidade.prop("disabled", true);
                    cidade.addClass("bloqueado");

                    estado.val(data.estado);
                    estado.addClass("bloqueado");
                    estado.prop("disabled", true);
                } else {
                    alertErro("CEP não encontrado")
                    rua.removeClass("bloqueado");
                    rua.prop("disabled", false);

                    cidade.removeClass("bloqueado");
                    cidade.prop("disabled", false);

                    estado.removeClass("bloqueado");
                    estado.prop("disabled", false);

                }
            },  
            error: function() {
                $("#endereco").html("Erro ao buscar o CEP.");
            }
        });
    } else {
        $("#endereco").html("Digite um CEP válido com 8 dígitos.");
    }

}

function checkCpf(cpf){
    if(!validarCPF(cpf)){
        alertErro("CPF não validado")
    }
        
}

function validarCPF(cpf) {
    cpf = cpf.replace(/\D/g, '');

    if (cpf.length !== 11 || /^(\d)\1{10}$/.test(cpf)) {
        return false;
    }

    let soma = 0, resto;

    
    for (let i = 0; i < 9; i++) {
        soma += parseInt(cpf[i]) * (10 - i);
    }
    resto = (soma * 10) % 11;
    if (resto === 10 || resto === 11) resto = 0;
    if (resto !== parseInt(cpf[9])) return false;


    soma = 0;
    for (let i = 0; i < 10; i++) {
        soma += parseInt(cpf[i]) * (11 - i);
    }
    resto = (soma * 10) % 11;
    if (resto === 10 || resto === 11) resto = 0;
    if (resto !== parseInt(cpf[10])) return false;

    return true;
}

function validaForms(form) {
    
    const arquivos = document.querySelectorAll('.file-input');
    let cpf = document.getElementById('cpf').value;

    checkCpf(cpf);
   
    for (let input of arquivos) {
        
        if (input.files.length <= 0) {
            console.log("arquivo não selecionado");
            let text = input.closest('.upload-container').previousElementSibling.innerText;   
            alertErro("Adicione " + text);     
           
          
        }
    }

    
   

}

function alertErro(mensagem){
    Swal.fire({
        icon: "error",
        title: "Erro!",
        text: mensagem,
        confirmButtonColor: "#d33"
    });
    throw new Error(mensagem);
}

function converterArquivoParaBase64(arquivo, callback) {
    debugger
    const reader = new FileReader();
    reader.onload = () => callback(reader.result);
    reader.readAsDataURL(arquivo);
}

function formularioInscricao() {
    

    return {
        nome: '',
        email: '',
        telefone: '',
        cpf: '',
        sexo: '',
        dataNascimento: '',
        cep: '',
        rua: '',
        numero: '',
        cidade: '',
        estado: '',
        trilha: '',
        password: '',
        confirmadPassword: '',
        userName: '',
        termoConcordancia: false,
        documetnoIdentidade: null,
        comprovanteResidencia: null,
        enviarFormulario() {
            try {
                const forms = document.querySelector('#form-inscricao');
                validaForms(forms);
                
                if (this.password !== this.confirmadPassword) {
                    alertErro("Senhas não conferem");
                    return;
                }

                if (this.password.length < 8) {
                    alertErro("Senha deve ter no mínimo 8 caracteres");
                    return;
                }
                debugger
;                if (this.documetnoIdentidade) {
                    converterArquivoParaBase64(this.documetnoIdentidade, (base64) => {
                        sessionStorage.setItem('documentoIdentidade', base64);
                    });
                }
                
                if (this.comprovanteResidencia) {
                    converterArquivoParaBase64(this.comprovanteResidencia, (base64) => {
                        sessionStorage.setItem('comprovanteResidencia', base64);
                    });
                }

            }catch (error) {
                console.log(error.message);
            }

            const payload = {
                id: null,
                login: this.userName,
                pass: this.password,
                role: -1, // n ão é necessário no cadastro esse metodo so cadastro participante
                trilhaId: this.trilha,
                pessoa: {
                    nome: this.nome,
                    email: this.email,
                    telefone: this.telefone,
                    cpf: this.cpf,
                    sexo: this.sexo,
                    dataNascimento: this.dataNascimento
                },
                endereco: {
                    cep: this.cep,
                    rua: this.rua,
                    numero: this.numero,
                    cidade: this.cidade,
                    estado: this.estado
                }
            };

            console.log(JSON.stringify(payload));

           
          
            fetch('http://localhost:8080/auth/registro/Participante', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(payload)
            })
            .then(async response => {
                const text = await response.text();
                let data;
            
                try {
                    data = text ? JSON.parse(text) : {};
                } catch (e) {
                    throw new Error("Resposta não é um JSON válido");
                }
            
                if (response.status === 201) {
                    console.log( this.userName)
                    console.log( this.password)
                    const response = await fetch('http://localhost:8080/auth/login', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        login: this.userName,
                        pass: this.password
                    })
                    });
            
                    if (!response.ok) {
                        // Tenta extrair o JSON de erro vindo do backend
                        const errorData = await response.json();
                        throw new Error(errorData.erro || 'erro na reqisição de login');
                    }
            
                    const data = await response.json();
            
                    sessionStorage.setItem('token', data.token);
                    sessionStorage.setItem('user', data.login);
                    sessionStorage.setItem('role', data.role);

                    Swal.fire({
                        icon: "success",
                        title: "Sucesso!",
                        text: "Formulário enviado com sucesso! Aguarde o email de confirmação.",
                        confirmButtonColor: "#28a745"
                    }).then(() => {
                        // redirecionamento se quiser
                        window.location.href = '/Inscricao_eicao.html';
                    });
                } else {
                    // 👇 tenta pegar "erro" OU "message" OU usa fallback
                    const errorMsg = data.erro || data.message || "Erro desconhecido na requisição.";
                    throw new Error(errorMsg);
                }
            })
            .catch(error => {
                Swal.fire({
                    icon: "error",
                    title: "Erro ao enviar inscrição",
                    text: error.message,
                    confirmButtonColor: "#dc3545"
                });
            });
            
        }

        
    }
}


