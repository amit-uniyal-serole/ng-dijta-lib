export function deprecated(methodName: string, alternative: string): void {
  console.warn(`${methodName} is deprecated.
    please use ${alternative} instead`);
}
