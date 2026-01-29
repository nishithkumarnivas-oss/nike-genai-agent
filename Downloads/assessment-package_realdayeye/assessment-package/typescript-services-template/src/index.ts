export interface Example {
  id: string;
  value: number;
}

export function computeExample(input: number): Example {
  return { id: 'EX-1', value: input * 2 };
}

// simple CLI runner for manual testing
if (require.main === module) {
  const arg = Number(process.argv[2] || 1);
  // eslint-disable-next-line no-console
  console.log('computeExample(', arg, ') =>', computeExample(arg));
}
