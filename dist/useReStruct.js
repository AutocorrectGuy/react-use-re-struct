import { useRef, useState } from 'react'
export const useReStruct = (dataStructure) => {
  const [_, setRerender] = useState(false)
  const ref = useRef(dataStructure)
  return new Proxy(ref.current, {
    get: (target, p) => {
      const property = target[p]
      if (typeof property === 'function')
        return (shouldRerender, ...args) => {
          const result = property.apply(target, args)
          shouldRerender && setRerender((prev) => !prev)
          return result
        }
      return property
    },
  })
}
