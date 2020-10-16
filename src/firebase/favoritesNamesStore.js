import { firestore } from './firebase'

export const listenForRealtimeFavoritesNames = (userId, onUpdate) => {
    return firestore.collection('users')
        .doc(userId)
        .onSnapshot(snapshot => {
            const data = snapshot.data()
            onUpdate((data && data.favNames) ? data.favNames : [])
        })
}

export const saveFavoritesNames = (userId, names,) => {
    if (!names) {
        return Promise.resolve()
    }
    try {
        return firestore.collection("users")
            .doc(userId)
            .set({
                favNames: names
            }, { merge: true })
            .then(() => {
                return true
            })
    } catch (error) {
        console.error(error)
        return Promise.resolve(false)
    }
}
