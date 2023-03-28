import { initializeApp } from 'firebase/app'
import { getAuth, signInWithEmailAndPassword, getRedirectResult } from 'firebase/auth'


const firebaseConfig = {
  apiKey: "AIzaSyAbTYZcHMprcehgsMCcRJi65TUrBNk94Hc",
  authDomain: "to-do-codigo-facilito.firebaseapp.com",
  projectId: "to-do-codigo-facilito",
  storageBucket: "to-do-codigo-facilito.appspot.com",
  messagingSenderId: "671355281721",
  appId: "1:671355281721:web:0e4ca5ef731fe5f4e888e8"
};

initializeApp(firebaseConfig)

const auth = getAuth()

// Escucha las redirecciones después de iniciar sesión
getRedirectResult(auth)
  .then((result) => {
    if (result.user) {
      console.log('user logged in:', result.user)
      window.location.href = 'nueva_pagina.html' // redirige al usuario a la nueva página
    }
  })
  .catch((err) => {
    console.log(err.message)
  })

const loginForm = document.querySelector('.login')
loginForm.addEventListener('submit', (e) => {
  e.preventDefault()

  const email = loginForm.loginemail.value
  const password = loginForm.loginpassword.value

  signInWithEmailAndPassword(auth, email, password)
    .then((cred) => {
      console.log('user logged in:', cred.user)
      window.location.href = 'tasks.html'
    })
    .catch((err) => {
      console.log(err.message)
    })

})



