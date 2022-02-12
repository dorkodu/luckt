function store<T1, T2>(state: T1, logic: T2) {
  let watchers: { [key: string]: { id: number, cb: () => void }[] } = {};
  let id = 0;

  for (const key in logic) {
    const cb: () => boolean = (logic[key] as any);
    (logic[key] as any) = () => {
      if (cb()) dispatch(key);
    }
  }

  function dispatch(key: string) {
    for (let i = 0; i < watchers[key].length; ++i) {
      watchers[key][i].cb();
    }
  }

  function watch(key: keyof typeof logic, cb: () => void) {
    const watchId = id++;

    if (!watchers[key as string]) watchers[key as string] = [];
    watchers[key as string].push({ id: watchId, cb: cb });

    return () => { unwwatch(key as string, watchId) };
  }

  function unwwatch(key: string, id: number) {
    for (let i = 0; i < watchers[key].length; ++i) {
      if (watchers[key][i].id === id) {
        watchers[key].splice(i, 1);
        return;
      }
    }
  }

  return { state, logic, watch };
}

export const luckt = { store };
