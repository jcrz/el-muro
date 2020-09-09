import Vue from 'vue'
import App from './App.vue'
import BootstrapVue from 'bootstrap-vue'
import router from './router'
import Vuex from 'vuex'
import firebase from 'firebase/app';
import 'firebase/auth';
import './firebase.js'
import VueFirestore from 'vue-firestore';

//import css files
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

Vue.config.productionTip = false

Vue.use(BootstrapVue)
Vue.use(Vuex)
Vue.use(VueFirestore, {key: 'id'});
firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL)

const store = new Vuex.Store({
  state: {
    user: null,
    error: null
  },
  mutations: {
    // Editamos indirectamente user del state
    setUser(state, newUser) {
      state.user = newUser;
    },
    // Editamos indirectamente error del state
    setError(state, newError) {
      state.error = newError;
    }
  },
  actions: {
    login(context, datos) {
      firebase.auth().signInWithEmailAndPassword(datos.email, datos.password)
      .then(response => {
        // Actualizamos el state
        context.commit('setUser', {email: datos.email, name: response.user.displayName});
        context.commit('setError', null)
        router.push('muro')
      })
      .catch(function (error) {
        console.log(error);
        // Mostrar errores en español
        if (error.code === 'auth/wrong-password') {
          context.commit('setError', 'La contraseña es invalida o no tiene.');
        } else if (error.code === 'auth/user-not-found') {
          context.commit('setError', 'No hay ningún registro de usuario que corresponda a este identificador.');
        }
        context.commit('setUser', null);
      });
    },
    register(context, datos) {
      firebase.auth().createUserWithEmailAndPassword(datos.email, datos.password)
      .then(function (response) {
        console.log("Registrado:" + response)
        // Agregamos el nombre al usuario
        firebase.auth().currentUser.updateProfile({
          displayName: datos.name
        })
      })
      .then((response) => {
        console.log(response);
        // Actualizamos el state
        context.commit('setError', null);
        context.commit('setUser', {email: datos.email, name: datos.name});
        alert("Registrado correctamente!");
      })
      .catch(function(error) {
        // Actualizamos el state
        if (error.code === 'auth/wrong-password') {
          context.commit('setError', 'La contraseña es invalida o no tiene.');
        }
        context.commit('setUser', null);
      })
    },
    logout(context) {
      firebase.auth().signOut()
      .then(() => {
        context.commit('setError', null);
        context.commit('setUser', null);
        // Redireccionamos
        router.push('/');
      })
    },
  }
})

{
  const user = firebase.auth().currentUser
  if (user) {
    console.log('usuario logeado: ' + user.name);
  }
}

new Vue({
  render: h => h(App),
  router,
  store,
}).$mount('#app')
