<template>
  <div class="home">
    <v-main class="ml-4">
      <h1>Consultar Alunos</h1>
      <v-text-field
        v-model="alunoName"
        @keyup.enter="addAluno"
        label="Digite seu afazer e pressione enter"
      ></v-text-field>
    </v-main>
    <v-data-table
      :headers="headers"
      :items="alunos"
      :items-per-page="5"
      class="elevation-1"
      ><template v-slot:[`item.id`]="{ item }">
        <v-chip color="green" dark>
          <v-btn
            class="pa-0"
            href="https://github.com/vuetifyjs/vuetify/releases/latest"
            target="_blank"
            text
          >
            <v-icon small>mdi-pencil</v-icon>
            <span class="ml-1">editar</span>
          </v-btn>
        </v-chip>
        <v-chip class="ml-1" color="red" dark>
          <v-btn
            @click.stop="removeAluno(item.id)"
            class="pa-0"
            target="_blank"
            text
          >
            <v-icon small>mdi-delete</v-icon>
            <span class="ml-1">remover</span>
          </v-btn>
        </v-chip>
      </template></v-data-table
    >
  </div>
</template>

<script>
// @ is an alias to /src
//import HelloWorld from "@/components/HelloWorld.vue";
import axios from "axios";

const baseURL = "http://localhost:3000/api/alunos";
export default {
  name: "Home",
  components: {
    //HelloWorld,
  },
  data() {
    return {
      drawer: false,
      headers: [
        {
          text: "Registro Acadêmico",
          align: "start",
          value: "register",
        },
        { text: "Nome", value: "name" },
        { text: "CPF", value: "cpf" },
        { text: "Ações", value: "id", sortable: false },
      ],
      alunos: [
        {
          name: "Frozen Yogurt",
          calories: 159,
          fat: 6.0,
          carbs: 24,
          protein: 4.0,
          iron: "1%",
        },
        {
          name: "Ice cream sandwich",
          calories: 237,
          fat: 9.0,
          carbs: 37,
          protein: 4.3,
          iron: "1%",
        },
        {
          name: "Eclair",
          calories: 262,
          fat: 16.0,
          carbs: 23,
          protein: 6.0,
          iron: "7%",
        },
        {
          name: "Cupcake",
          calories: 305,
          fat: 3.7,
          carbs: 67,
          protein: 4.3,
          iron: "8%",
        },
        {
          name: "Gingerbread",
          calories: 356,
          fat: 16.0,
          carbs: 49,
          protein: 3.9,
          iron: "16%",
        },
        {
          name: "Jelly bean",
          calories: 375,
          fat: 0.0,
          carbs: 94,
          protein: 0.0,
          iron: "0%",
        },
        {
          name: "Lollipop",
          calories: 392,
          fat: 0.2,
          carbs: 98,
          protein: 0,
          iron: "2%",
        },
        {
          name: "Honeycomb",
          calories: 408,
          fat: 3.2,
          carbs: 87,
          protein: 6.5,
          iron: "45%",
        },
        {
          name: "Donut",
          calories: 452,
          fat: 25.0,
          carbs: 51,
          protein: 4.9,
          iron: "22%",
        },
        {
          name: "KitKat",
          calories: 518,
          fat: 26.0,
          carbs: 65,
          protein: 7,
          iron: "6%",
        },
      ],
      alunoName: "",
    };
  },
  async created() {
    try {
      const res = await axios.get(baseURL);
      this.alunos = res.data;
      console.log(res.data[0]);
    } catch (e) {
      console.error(e);
    }
  },
  methods: {
    getColor(calories) {
      if (calories > 40) return "red";
      else if (calories > 30) return "orange";
      else return "green";
    },
    async addAluno() {
      await axios.post(baseURL, { name: this.alunoName });
      const res = await axios.get(baseURL);
      this.alunos = res.data;
      this.alunoName = "";
    },
    async removeAluno(aluno_id) {
      await axios.delete(baseURL, { data: { id: aluno_id } });
      const res = await axios.get(baseURL);
      this.alunos = res.data;
      this.alunosName = "";
    },
  },
};
</script>
