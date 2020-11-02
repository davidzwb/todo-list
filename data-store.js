let store = new Map();

let addEntry = function(id, entry) {

    if (entry === null || entry.length === 0) {
        return;
    }

    console.log("try to add entry " + entry + " for " + id);
    if (!store.has(id)) {
        console.log("id doesn't exist");
        let entries = new Set();
        entries.add(entry);
        store.set(id, entries);
    }
    else {
        console.log("id exists");
        let entries = store.get(id);
        entries.add(entry);
    }
};

let getEntries = function(id) {
    if (store.has(id)) {
        return store.get(id);
    }
    else {
        return null;
    }
    
};

exports.addEntry = addEntry;
exports.getEntries = getEntries;