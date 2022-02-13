declare function store<T1, T2>(state: T1, logic: T2): {
    state: T1;
    logic: T2;
    watch: (key: keyof typeof logic, cb: () => void) => () => void;
};
export declare const luckt: {
    store: typeof store;
};
export {};
