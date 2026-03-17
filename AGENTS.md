# Instrucciones para AGENTS

## Reglas de Git

1. **NUNCA hacer push** a menos que el usuario escriba explícitamente "push" en el chat.
2. Cuando el usuario escribe "push", hacer commit automáticamente (no pedir permiso) y luego hacer push.
3. Antes de hacer commit o push, SIEMPRE mostrar los cambios con `git status` y `git diff` para que el usuario pueda revisarlos.
4. Solo proceder con commit/push después de que el usuario lo confirme explícitamente.

## Flujo de trabajo recomendado

1. Hacer cambios en el código
2. Mostrar `git status` y `git diff`
3. Si el usuario escribe "push", hacer commit + push automáticamente

## Excepciones

- Sí está permitido hacer `git add` para agregar archivos al staging
- Sí está permitido hacer análisis de código y búsquedas
