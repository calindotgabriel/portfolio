# Node Garbage CO

## Specific mem. leaks on NodeJS/JS

- global vars
- setInterval/timers left unclosed
- event listeners left unclosed
- closure capturing big objects by mistake
- caches without size limits - expanding indefinitely
