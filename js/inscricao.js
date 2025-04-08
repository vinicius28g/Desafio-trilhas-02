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
            Swal.fire({
                icon: "error",
                title: "Erro!",
                text: "Adicione " + text,
                confirmButtonColor: "#d33"
            });
            return false; // Impede o envio do formulário
        }
    }

    
    Swal.fire({
        icon: "success",
        title: "Sucesso!",
        text: "Formulário enviado com sucesso! aguarde o email de confirmação",
        confirmButtonColor: "#28a745"
    }).then((result) => {
        if (result.isConfirmed) {
            form.submit();
            
            setTimeout(() => {
                window.location.href = "index.html";
            }, 2000);
        }
        
    });

    return false; 
}

function alertErro(mensagem){
    Swal.fire({
        icon: "error",
        title: "Erro!",
        text: mensagem,
        confirmButtonColor: "#d33"
    });
}


