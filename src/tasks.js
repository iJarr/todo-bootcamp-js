const [spanDate, spanMonth, spanYear, spanWeekday] = ["date", "month", "year", "weekday"].map(id => document.getElementById(id));

const formatDate = date => new Intl.DateTimeFormat('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' }).format(date).split(', ');

const [month, day, year, weekday] = formatDate(new Date());

[spanDate.textContent, spanMonth.textContent, spanYear.textContent, spanWeekday.textContent] = [day, month, year, weekday];

import { initializeApp } from 'firebase/app'
import { getFirestore, collection, onSnapshot, addDoc, deleteDoc, doc } from "firebase/firestore";
import { getAuth, signOut, onAuthStateChanged, getRedirectResult } from 'firebase/auth'


const firebaseConfig = {
  apiKey: "AIzaSyAbTYZcHMprcehgsMCcRJi65TUrBNk94Hc",
  authDomain: "to-do-codigo-facilito.firebaseapp.com",
  projectId: "to-do-codigo-facilito",
  storageBucket: "to-do-codigo-facilito.appspot.com",
  messagingSenderId: "671355281721",
  appId: "1:671355281721:web:0e4ca5ef731fe5f4e888e8"
};

initializeApp(firebaseConfig)

const db = getFirestore()
const auth = getAuth()

const colRef = collection(db, 'todos')

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

// Logout script
const logoutButton = document.querySelector('.logout')
logoutButton.addEventListener('click', () => {
  signOut(auth)
    .then(() => {
      console.log('the user signed out')
      window.location.href = 'login.html'
    })
    .catch((err) => {
      console.log(err.message)
    })
})

onSnapshot(colRef, (snapchot) => {
  let todos = []
  snapchot.docs.forEach((doc) => {
    todos.push({ ...doc.data(), id: doc.id })
  })
  console.log(todos)
})

const deleteTaskForm = document.querySelector('.delete')
deleteTaskForm.addEventListener('submit', (e) => {
  e.preventDefault()

  const docRef = doc(db, 'todos', deleteTaskForm.id.value)

  deleteDoc(docRef)
    .then(() => {
      deleteTaskForm.reset()
    })
})

//greetings time
var myDate = new Date();
var hrs = myDate.getHours();

var greet;

if (hrs < 12) {
  greet = 'Good Morning';
} else if (hrs >= 12 && hrs <= 17) {
  greet = 'Good Afternoon';
} else {
  greet = 'Good Evening';
}

const todoContainer = document.getElementById("todo-container");

function renderTask(task) {
  const taskDiv = document.createElement("<ol></ol>");
  taskDiv.textContent = task;
  return taskDiv;
}

function renderTasks(snapshot) {

  let html = ''; // Crear una cadena de texto vacía
  snapshot.forEach((doc) => {
    const taskData = doc.data();
    const taskHTML = `<li>${taskData.task}</>`; // Crear una cadena de texto con el HTML del elemento
    html += taskHTML; // Añadir la cadena al HTML
  });
  todoContainer.innerHTML = html; // Asignar el HTML al elemento
}

onSnapshot(colRef, (snapshot) => {
  renderTasks(snapshot);
});

const addTaskform = document.querySelector('.add-task')
addTaskform.addEventListener('submit', (e) => {
  e.preventDefault()

  addDoc(colRef, {
    task: addTaskform.todolist.value,
  })
    .then(() => {
      addTaskform.reset()
    })
})

const form = document.getElementById('form');
let date = new Date;
let time = date.getTime();
let counter = time;

form.addEventListener('submit', e => {
  e.preventDefault();
  const todos = form['todos'].value;

  let id = counter += 1;
  form.reset();
})