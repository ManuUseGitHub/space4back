type Complete<T> = {
  [P in keyof T]-?: NonNullable<T[P]>
}

export const getCompleteObject = <T extends object>(obj: T): Complete<T> => {
  const result = {} as Complete<T>;

  Object.entries(obj)
    .filter(([, v]) => v != null)
    .forEach(([k, v]) => {
      result[k as keyof Complete<T>] = v as Complete<T>[keyof Complete<T>];
    });

  return result;
}