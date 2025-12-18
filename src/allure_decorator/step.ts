import { test } from '@playwright/test';

export function Step(titleTemplate?: string) {
  return function <T extends (...args: any[]) => any>(
    originalMethod: T,
    context: ClassMethodDecoratorContext,
  ) {
    if (context.kind !== 'method') {
      throw new Error('Step decorator can only be applied to methods');
    }

    return async function (this: any, ...args: Parameters<T>) {
      const rawTitle = titleTemplate ?? String(context.name);
      const stepTitle = rawTitle.replace(/\{(\d+)\}/g, (_, i) =>
        String(args[Number(i)]),
      );

      return await test.step(stepTitle, async () => {
        return await originalMethod.apply(this, args);
      });
    };
  };
}