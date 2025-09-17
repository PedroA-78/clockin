✅ Checkpoint – 16/09/2025

Checkpoint — Próximos passos no ClockIn

Preparar base do calendário

Criar um componente/section calendar na tela (HTML + CSS).

Estruturar dias do mês em grid (7 colunas = dias da semana).

Destacar o dia atual com um estilo especial.

Integração com registros

Marcar visualmente os dias que já possuem registros no localStorage.

Exemplo: bolinha azul embaixo do número do dia.

Interação básica

Ao clicar em um dia, exibir os registros daquele dia (mesmo layout da tela inicial).

Se o dia não tiver registros → mostrar mensagem tipo "Nenhum ponto registrado neste dia".

Refino visual

Transição suave na troca de dias.

Ícones de navegação (← →) para trocar de mês (mesmo que só prepare a estrutura).

Organização do JS

Criar módulo calendar.js separado.

Funções principais:

renderCalendar(currentMonth) → desenha os dias.

highlightMarkedDays() → verifica localStorage e marca.

openDayDetails(day) → abre registros.

🚀 Ideias futuras (não urgente)

Animações suaves (modal e FAB).

Criar calendário para histórico dos dias.

Melhorar responsividade no celular real.

Separar CSS em módulos (header.css, menu.css, etc).