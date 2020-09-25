import { initializeApp } from 'firebase'

// inicialização das credenciais do banco
const app = initializeApp({
    apiKey: "AIzaSyDO-nuEwxEpc17sMl7Z85XBvvJZw3lBflg",
    authDomain: "note-list-1c23b.firebaseapp.com",
    databaseURL: "https://note-list-1c23b.firebaseio.com",
    projectId: "note-list-1c23b",
    storageBucket: "note-list-1c23b.appspot.com",
    messagingSenderId: "551490128229",
    appId: "1:551490128229:web:b903ef01d61f94bfa3b98c",
    measurementId: "G-S5Q01JP8QZ"
})

export const db = app.database()