Onde você parou

Já implementou edição de registros (selectedStep para controlar).

Todos os fluxos de registro, edição, persistência e UI estão funcionando para o dia atual.

O calendário já renderiza e marca os dias trabalhados.

🎯 Próximos passos (amanhã)

Criar selectedDay

Variável global (começa no YYYY-MM-DD de hoje).

Substituir onde hoje você usa “data atual” para usar selectedDay.

Integrar com o calendário

Ao clicar em um dia → atualizar selectedDay.

Chamar funções que:

Carreguem os registros desse dia do localStorage.

Atualizem a área inicial com os marcadores corretos.

Salvar registros no dia selecionado

Quando registrar/editar → gravar no localStorage[selectedDay].

Se mudar de dia e voltar, os dados devem estar lá.

UI feedback

Mostrar visualmente qual é o dia selecionado no calendário.

Atualizar header inicial (pode exibir “Registrando em: 13/09/2025”).

📌 Sugestão: começar criando a função setSelectedDay(day) que:

Atualiza a variável global.

Chama load(day).

Atualiza a UI.

Carregar dados existentes

Quando o usuário selecionar um dia no calendário:

Buscar no localStorage.

Se existir → preencher marcadores da tela inicial e modal.

Se não existir → limpar/zerar os marcadores para novo registro.

UX

Deixar claro qual dia está ativo (ex: borda, fundo colorido).

Talvez mostrar o nome do dia (“terça-feira, 16 de setembro”) no topo da tela inicial para reforçar contexto.


🚀 Ideias futuras (não urgente)

Animações suaves (modal e FAB).

Melhorar responsividade no celular real.