export const cns = (
  ...classes: (string | false | undefined | null)[]
): Record<string, unknown> => ({
  $$css: true,
  _: classes.filter(Boolean).join(' ') as unknown as string[],
})
