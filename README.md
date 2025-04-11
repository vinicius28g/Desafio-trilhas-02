# GabaritaAi

## Sobre

O **GabaritaAi** (inicialmente nomeado AnotaAi) é uma ideia que surgiu a partir do segundo desafio do programa **Trilhas Inova Maranhão**.  
Esta aplicação funciona como uma banca de editais, inicialmente adaptada exclusivamente para o Trilhas, mas que pode facilmente ser ajustada para outros tipos de concursos ou contextos mais genéricos.

## Como rodar localmente?

Esta aplicação é apenas o **frontend**, portanto, para funcionar corretamente, é necessário também clonar e configurar o repositório do **backend**.

1. Clone o repositório do backend e siga as instruções de instalação. https://github.com/vinicius28g/gabaritaAi
2. Ajuste os domínios das URLs nas requisições do frontend, pois todas estão configuradas como `localhost`.
   - Se for rodar o backend em outro ambiente (como um servidor), você precisará definir o IP correto nas chamadas da API.

## Tecnologias utilizadas

O projeto utiliza as seguintes tecnologias:

- `Alpine.js`
- `jQuery`
- `HTML`
- `CSS`
- `JavaScript`
- Entre outras ferramentas auxiliares

## Principais funcionalidades

O sistema ainda está em desenvolvimento, mas já conta com algumas funcionalidades e telas implementadas:

- **Tela inicial (index)**
- **Tela de login**
- **Tela de cadastro**
- **Tela de visualização de arquivos salvos**

### Telas da aplicação

<img src="https://github.com/user-attachments/assets/d0d5fe95-f787-4590-b070-2122b1e28023" alt="Tela inicial" width="1000"/>

<img src="https://github.com/user-attachments/assets/6d81e602-3a38-4e8c-9256-6d46e159366c" alt="Tela de login" width="1000"/>

### Validação de formulário

O formulário de cadastro já conta com validação de campos obrigatórios:

<img src="https://github.com/user-attachments/assets/1e0651b8-91d8-49eb-b102-3b27077a8837" alt="Validação de formulário" width="1000"/>

### Visualização de informações salvas

A tela de verificação de informações salvas é a mesma tela de cadastro, porém preenchida com os dados vindos do banco de dados.  
Além disso, há um `iframe` para visualização dos arquivos enviados.

<img src="https://github.com/user-attachments/assets/3f0de322-a0e3-423e-b29c-39a1cb55c855" alt="Tela de informações salvas" width="1000"/>
