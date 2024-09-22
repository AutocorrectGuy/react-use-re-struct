**react-userestruct** is designed to efficiently manage mutable data structures with explicit control over re-renders.
Built for performance, it allows you to work with complex data structures (like linked lists, stacks, trees, and more) in a React-friendly way while maintaining full control over when components re-render.

### Features:

- **Mutable Data Structures**: Modify your data directly without needing to recreate state, unlike React's default useState hook.
- **Explicit Rerender Control**: Decide exactly when React should re-render your component by using a flexible rerender flag, preventing unnecessary updates and improving performance.
- **Performance Focused**: Ideal for managing large or complex data structures efficiently in React applications.
- **Customizable**: Compatible with any custom data structure—linked lists, trees, stacks, or even user-defined classes—without the need for immutability.

### Use Cases:

- Applications requiring custom or complex data structures like linked lists, trees, or graphs.
- Performance-sensitive applications where unnecessary re-renders need to be minimized.
- Developers who want to maintain full control over React's rendering behavior without sacrificing the flexibility of mutable data.

### Example usage

For example, you have your own custom `LinkedList` class:

```tsx
// MyLinkedList.ts
export class LinkedListNode<T> {
  public value: T
  public next: LinkedListNode<T> | null = null

  constructor(value: T) {
    this.value = value
  }
}

export default class MyLinkedList<T> {
  public head: LinkedListNode<T> | null = null
  public tail: LinkedListNode<T> | null = null

  public push(value: T) {
    const newNode = new LinkedListNode(value)
    !this.head || !this.tail ? (this.head = newNode) : (this.tail!.next = newNode)
    this.tail = newNode
  }
}
```

Usage of this custom clas using `react-restruct` hook:

```tsx
import { useRestruct } from 'react-restruct'

// Your own custom datasctructure class
import MyLinkedList from './MyLinkedList'

// Example: Using a LinkedList in a React component
const App = () => {
  const linkedList = useRestruct<MyLinkedList<string>>(new LinkedList())

  const handleAddDuplicate = () => {
    list.append(false, 'new item') // Append withhout rerender trigger
    list.append(true, 'new item') // Append with rerender trigger
    // result - one rerender but two state changes
  }

  return <button onClick={handleAddDuplicate}>Add Item</button>
}
```
