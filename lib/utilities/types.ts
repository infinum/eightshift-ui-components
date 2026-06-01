/**
 * Forces TypeScript to render a type as a flat object literal in hover/intellisense output
 * instead of as the original alias name. Use it on component prop annotations so VS Code
 * expands the full prop list on hover.
 */
export type Prettify<T> = { [K in keyof T]: T[K] } & {};
