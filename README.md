# Desafio Banco Safra Back-end

💻 Sobre o projeto:
Foi desenvolvido 3 telas uma tela para fazer login, outra tela para consultas de usuários e integração do usuário em um banco local e outra tela para fazer edição e poder deletar esse usuário que foi integrado no banco local .

No componente de Login o usuário acessa a tela atraves do campo usuário e senha, que estão no final do README para ter acesso ao sistema e testar as telas.

A seguir o usuário entra no componente de Consultas que vem com os dados diretamente de um banco externo https://randomuser.me/
e o usuário tem a opção de pesquisar um usuário pela "Idade" e logo após ser encontrado poderar fazer uma integração com o banco local.

E ao seguir será direcionado para o componente de edição onde poderá editar ou excluir o usuário selecionado.

Projeto desenvolvido para o desafio nava - referente ao banco safra.

💡 Autor:
Felipe Mulero

Link útil
Linkedin para mais informações: https://www.linkedin.com/in/felipe-mulero/

🛠️ Tecnologias utilizadas
Backend

Node, Axios, JavaScript, SQlite3, Scripts: SQL e JS e Express.

📌 Funcionalidades
Atualização de conteúdo em tempo real para o usuário. Usuário consegue visualizar os conteúdos que estão todos disponíveis na tela. Usuario consegue interagir com todos os conteúdos disponíveis na tela.

Futuras melhorias

Os usuarios da plataforma irão conseguir visualizar: Criar novas funcionalidades, banco de cash exemplo Redis para algumas pesquisas e adicionar mais campos de buscas .

Também será possível:

Adicionar um módulo de dashboad, Edição do perfil de usuário, Edição de conteúdos já criados.

# Informações para iniciar o projeto local:
#Opção de versão do node 18.14.0

#npm install

#npm start

#docker build -t banco-safra .

docker images

#docker run -p 3000:3000 banco-safra

Porta de acesso http no front:
http://localhost:4200/

Porta de acesso no back-end:
http://localhost:3000/

# Porta de acesso no back-end Docker e informações para subir o contâiner:

docker build -t banco-safra .

docker images

docker run -p 3000:3000 banco-safra

docker stop

# Como fazer o teste

Utilize o seguinte usuário e senha para acessar o projeto:

username: Teste-Safra,
password: teste@123.

-----------------------------------------------------------------------------------------------------------------

# Para escalar o sistema, podemos seguir as seguintes abordagens:

Frontend: Angular
Backend: Node.js
Banco de dados: Local

Escalabilidade horizontal: Essa abordagem consiste em adicionar mais servidores ao sistema. Isso pode ser feito aumentando o número de instâncias do servidor Node.js ou do servidor Angular.
Escalabilidade vertical: Essa abordagem consiste em aumentar a capacidade de um único servidor. Isso pode ser feito aumentando a memória, a CPU ou o armazenamento do servidor.
No caso específico do sistema proposto, a escalabilidade horizontal é a abordagem mais recomendada. Isso ocorre porque o sistema é relativamente simples e não requer uma grande quantidade de recursos de processamento.

Para implementar a escalabilidade horizontal, podemos seguir os seguintes passos:

Criar um cluster de servidores Node.js.
Criar um cluster de servidores Angular.
Balancear o tráfego entre os servidores do cluster.
O cluster de servidores Node.js pode ser criado usando um serviço de nuvem, como AWS Elastic Beanstalk ou Google Kubernetes Engine. O cluster de servidores Angular também pode ser criado usando um serviço de nuvem ou um gerenciador de contêineres, como Docker Swarm ou Kubernetes.

O balanceamento de tráfego pode ser feito usando um serviço de balanceamento de carga, como AWS Elastic Load Balancing ou Google Cloud Load Balancing.

Com essas alterações, o sistema será capaz de suportar um número maior de usuários sem comprometer o desempenho.

Aqui estão algumas dicas adicionais para escalar o sistema:

Use um cache para armazenar dados frequentemente acessados.
Use um banco de dados NoSQL, como MongoDB ou Redis, para dados que não precisam ser armazenados de forma relacional.
Use um serviço de computação em nuvem para hospedar o sistema.
Ao seguir essas dicas, você poderá criar um sistema escalável e robusto que atenderá às necessidades de seus usuários.


