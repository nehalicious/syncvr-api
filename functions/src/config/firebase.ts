import * as admin from 'firebase-admin'
import * as functions from 'firebase-functions'

admin.initializeApp({
  credential: admin.credential.cert({
    privateKey: functions.config().private.key.replace(/\\n/g, '\n'),
    projectId: functions.config().project.id,
    clientEmail: functions.config().client.email
  }),
  // databaseURL: 'https://syncvr-fc5d5.firebaseio.com'
  databaseURL: 'https://syncvr-fc5d5-default-rtdb.europe-west1.firebasedatabase.app'
})

const db = admin.firestore()
export { admin, db }