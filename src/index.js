const [spanDate, spanMonth, spanYear, spanWeekday] = ["date", "month", "year", "weekday"].map(id => document.getElementById(id));

const formatDate = date => new Intl.DateTimeFormat('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' }).format(date).split(', ');

const [month, day, year, weekday] = formatDate(new Date());

[spanDate.textContent, spanMonth.textContent, spanYear.textContent, spanWeekday.textContent] = [day, month, year, weekday];

import { initializeApp } from 'firebase/app'
import { getAuth, createUserWithEmailAndPassword, getRedirectResult } from 'firebase/auth'


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

const addUserForm = document.querySelector('.add-user')
addUserForm.addEventListener('submit', (e) => {
  e.preventDefault()

  const email = addUserForm.signupemail.value
  const password = addUserForm.signuppassword.value

  createUserWithEmailAndPassword(auth, email, password)
    .then((cred) => {
      console.log('user created:', cred.user)
      addUserForm.reset()
      window.location.href = 'login.html'
    })
    .catch((err) => {
      console.log(err.message)
    })
})
