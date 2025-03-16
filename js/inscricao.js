window.onload= function(){
    // Seleciona todos os inputs de upload
    const fileInputs = document.querySelectorAll(".file-input");

    fileInputs.forEach(input => {
        const uploadBox = input.closest(".upload-box");
        const fileName = uploadBox.querySelector(".file-name");

        // Atualiza o nome do arquivo quando um arquivo é escolhido
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
            input.files = e.dataTransfer.files;
            fileName.textContent = file.name;
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
