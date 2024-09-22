type ReactRerenderableDataStructure<T> = {
    [K in keyof T]: T[K] extends (...args: infer A) => infer R ? (shouldRerender: boolean, ...args: A) => R : T[K];
};
export declare const useRestruct: <T extends object>(dataStructure: T) => ReactRerenderableDataStructure<T>;
export {};
