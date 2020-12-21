<template>
  <v-app>
    <v-app-bar app color="primary" dark>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <v-spacer></v-spacer>

      <div class="d-flex align-center">
        <v-btn
          class="pa-0"
          href="https://www.grupoa.com.br/"
          target="_blank"
          contain
          text
        >
          <v-img
            alt="Vuetify Logo"
            class="shrink pa-0"
            contain
            src="./assets/image.png"
            transition="scale-transition"
            max-width="90"
          />
        </v-btn>
      </div>

      <v-spacer></v-spacer>

      <v-btn
        href="https://github.com/vuetifyjs/vuetify/releases/latest"
        target="_blank"
        text
      >
        <span class="mr-2">Cadastrar aluno</span>
        <v-icon>mdi-account-multiple-plus</v-icon>
      </v-btn>
    </v-app-bar>
    <v-navigation-drawer v-model="drawer" absolute bottom temporary>
      <v-list nav dense>
        <v-list-item-group
          v-model="group"
          active-class="deep-purple--text text--accent-4"
        >
          <v-list-item>
            <v-list-item-title>Consultar Alunos</v-list-item-title>
          </v-list-item>

          <v-list-item>
            <v-list-item-title>Cadastro</v-list-item-title>
          </v-list-item>

          <v-list-item>
            <v-list-item-title>Sair</v-list-item-title>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>
    <v-main class="ml-4 mt-4">
      <h1>Todos</h1>
      <v-text-field
        v-model="todoName"
        @keyup.enter="addTodo"
        label="Digite seu afazer e pressione enter"
      ></v-text-field>
      <ul>
        <li v-for="todo of todos" :key="todo.id">
          {{ todo.name }}
          <v-btn
            class="mx-2"
            fab
            dark
            small
            color="primary"
            v-on:click="removeTodo(todo.id)"
          >
            <v-icon dark>
              mdi-minus
            </v-icon>
          </v-btn>
        </li>
      </ul>
    </v-main>
  </v-app>
</template>

<script>
import axios from "axios";

const baseURL = "http://localhost:3000/api/chirps";

export default {
  name: "App",

  data() {
    return {
      todos: [],
      todoName: "",
      drawer: false,
      group: null,
    };
  },
  async created() {
    try {
      const res = await axios.get(baseURL);
      this.todos = res.data;
      console.log(res.data[0]);
    } catch (e) {
      console.error(e);
    }
  },
  methods: {
    async addTodo() {
      await axios.post(baseURL, { name: this.todoName });
      const res = await axios.get(baseURL);
      this.todos = res.data;
      this.todoName = "";
    },
    async removeTodo(Todo_id) {
      await axios.delete(baseURL, { data: { id: Todo_id } });
      const res = await axios.get(baseURL);
      this.todos = res.data;
      this.todoName = "";
    },
  },
  watch: {
    group() {
      this.drawer = false;
    },
  },
};
</script>
