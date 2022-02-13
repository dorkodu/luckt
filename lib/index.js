function store(state, logic) {
    let watchers = {};
    let id = 0;
    for (const key in logic) {
        const cb = logic[key];
        logic[key] = (...payload) => {
            if (cb(...payload))
                dispatch(key);
        };
    }
    function dispatch(key) {
        if (!watchers[key])
            return;
        for (let i = 0; i < watchers[key].length; ++i) {
            watchers[key][i].cb();
        }
    }
    function watch(key, cb) {
        const watchId = id++;
        if (!watchers[key])
            watchers[key] = [];
        watchers[key].push({ id: watchId, cb: cb });
        return () => { unwwatch(key, watchId); };
    }
    function unwwatch(key, id) {
        for (let i = 0; i < watchers[key].length; ++i) {
            if (watchers[key][i].id === id) {
                watchers[key].splice(i, 1);
                return;
            }
        }
    }
    return { state, logic, watch };
}
const luckt = { store };

export { luckt };
//# sourceMappingURL=index.js.map
