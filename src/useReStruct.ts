import { useRef, useState } from 'react'

export type ReactRerenderableDataStructure<T> = {
  [K in keyof T]: T[K] extends (...args: infer A) => infer R ? (shouldRerender: boolean, ...args: A) => R : T[K]
}

export const useRestruct = <T extends object>(dataStructure: T): ReactRerenderableDataStructure<T> => {
  const [_, setRerender] = useState<boolean>(false)
  const ref = useRef<T>(dataStructure)
  return new Proxy(ref.current, {
    get: (target, p) => {
      const property = target[p as keyof T]
      if (typeof property === 'function')
        return (shouldRerender: boolean, ...args: any[]) => {
          const result = (property as Function).apply(target, args)
          shouldRerender && setRerender((prev) => !prev)
          return result
        }
      return property
    },
  }) as ReactRerenderableDataStructure<T>
}
