import idb from "./idb"

let dbPromise = idb.open('soccer league', 4, function (upgradeDB) {
	if (!upgradeDB.objectStoreNames.contains('teamSav')) {
		const teamStore = upgradeDB.createObjectStore('teamSav', {
			keyPath: 'id',
			autoIncrement: false,
		});
		teamStore.createIndex('id', 'id', {
			unique: true,
		});
	}
});
// ADD data
function addTeamSav(data) {
	dbPromise.then((db) => {
		const tx = db.transaction('teamSav', 'readwrite');
		tx.objectStore('teamSav').put(data);
		console.log(data);
		return tx.complete;
	});
}
// READ data
function getAllTeamSav() {
	return dbPromise.then((db) => {
		const tx = db.transaction('teamSav', 'readonly');
		const store = tx.objectStore('teamSav');
		return store.getAll();
	});
}

// CHECK DATA exist
function isSav(id) {
	return dbPromise.then(async (db) => {
		const tx = await db.transaction('teamSav', 'readonly');
		const data = await tx.objectStore('teamSav').get(id);
		return data == undefined ? false : true;
	});
}
// DELETE data
function deleteTeamSav(id) {
	dbPromise.then((db) => {
		const tx = db.transaction('teamSav', 'readwrite');
		tx.objectStore('teamSav').delete(id);
		return tx.complete;
	});
}

export {isSav, deleteTeamSav, addTeamSav, getAllTeamSav}
