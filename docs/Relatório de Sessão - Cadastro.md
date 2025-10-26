# Relatório de Sessão

*Inspirado no artigo de John Bach sobre Session-Based Test Management (2001)*

---

## 📅 Data e Hora do Início
26 de outubro de 2025, 12:57 PM

## 👤 Nome do Testador
Geison Sousa de Oliveira

## 🧩 Módulo
Cadastro

---

## 🎯 Test Charter
Explorar a funcionalidade de cadastro de usuário para verificar se a API consegue registrar novos usuários corretamente, validando conformidade com os requisitos funcionais e regras de negócio.

**Heurística utilizada:** `CVDLTSCR`  
**Objetivo:** Descobrir se a API consegue registrar novo usuário conforme os requisitos.

---

## ⏱ Tamanho da Sessão
20 minutos

---

## 📝 Notas
> ⚠️ \*Podem ser **Informações (I)** ou **Riscos (R)**

1. (I) Não há limites máximos de caracteres para os campos **nome** e **senha**, podendo gerar:
   - Quebra de layout  
   - Falhas de banco de dados  
   - Vulnerabilidades de segurança  

---

## 🐞 Defeitos Identificados

1. **Validação de campos inadequada:**  
   Ao cadastrar um novo usuário, o sistema permite que o campo **nome** receba números e caracteres especiais, o que não condiz com as regras de validação esperadas. Mesmo com esses dados, o cadastro é concluído com sucesso e o servidor retorna **status 201 (Created)**.

2. **Falha de segurança – injeção NoSQL:**  
   Ao tentar cadastrar um novo usuário (`POST /api/auth/cadastro`) com payload de **injeção NoSQL**, o cadastro é **realizado** e a API retorna **status 201 (Created)**.

---

## ❓ Perguntas / Observações

1. O campo **nome** deveria ter uma quantidade máxima de caracteres?

---



