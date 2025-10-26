__Relatório de Sessão__

Inspirado no artigo de John Bach sobre Session\-Based Test Management \(2001\)

__Data e Hora do Início__

__Nome do Testador__

__Módulo__

26 de outubro de 2025 12:57 PM

Geison Sousa de oliveira

Cadastro 

__Test Charter:  
__Explorar a funcionalidade de cadastro de usuário para verificar se a API consegue registrar novos usuários corretamente, validando conformidade com os requisitos funcionais e regras de negócio\.

*Com* a Heurística __CVDLTSCR__

*Para descobrir* se a API consegue registrar novo usuário conforme os requisitos

__Tamanho da Sessão:  
20__ minutos

__Notas\*:__

__\(I\)\. __Não há limites máximo de caracteres para os campos nome e senha, podendo gerar \(Quebra de layout / Falhas de Banco de Dados / Vulnerabilidades de Segurança\.\.\.\)

*\(\*\) Podem ser \(I\)nformações ou \(R\)iscos\.*

__Defeitos:__

1. Ao cadastrar um novo usuário, o sistema permite que o campo de __nome__ receba números,caracteres especiais, o que não é condizente com as regras de validação esperadas\. Mesmo inserindo esses dados, o cadastro é concluído com sucesso e o servidor retorna __status 201 \(Created\)__\.

2 \.Ao tentar cadastrar um novo usuário \(POST /api/auth/cadastro\) usando um formato JSON que contenha um payload de __injeção de NoSQL__, o cadastro é __realizado__ e a API retorna o __status 201 \(Created\)\.__

__Perguntas:__

1. Deveria conter uma quantidade máxima de caracteres?

