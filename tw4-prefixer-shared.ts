export const replaceTwPrefix = (css: string): string => css.replace(/--tw-/g, '--es-uic-tw-').replace(/var\(--tw-/g, 'var(--es-uic-tw-');
