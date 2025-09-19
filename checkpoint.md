✅ Checkpoint 18/09/25

Seleção do dia

Implementar um seletor de dia no calendário.

Quando clicar em um dia, marcar como ativo (ex: com uma classe .selected).

Esse dia selecionado será a referência para salvar/carregar os registros.

Integração com localStorage

Ao salvar registros, usar a chave baseada no dia selecionado (YYYY-MM-DD).

Exemplo: clockin-2025-09-16.

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