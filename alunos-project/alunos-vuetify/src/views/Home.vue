<template>
  <div class="home">
    <v-main class="ml-4 mr-4">
      <v-row class="ml-4 mr-4 mb-2">
        <h1>Consultar Alunos</h1>
        <v-spacer></v-spacer>
        <v-dialog v-model="dialog" persistent max-width="600px">
          <template class="mt-2" v-slot:activator="{ on, attrs }">
            <v-btn rounded color="primary" dark v-bind="attrs" v-on="on">
              Cadastrar Usuário
              <v-icon class="ml-2">mdi-account-plus</v-icon>
            </v-btn>
          </template>
          <v-card>
            <v-card-title>
              <span class="headline">Cadastro de Usário</span>
            </v-card-title>
            <v-card-text>
              <v-container>
                <v-row>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field
                      v-model="alunoRegister"
                      label="Número de Registro*"
                      required
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field
                      v-model="alunoName"
                      label="Nome*"
                      required
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field
                      v-model="alunoCpf"
                      label="CPF*"
                      required
                    ></v-text-field>
                  </v-col>
                </v-row>
              </v-container>
              <small>*campo obrigatório</small>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click.stop="dialog = false">
                Close
              </v-btn>
              <v-btn color="blue darken-1" text @click.stop="addAluno"
                >Save</v-btn
              >
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-row>
      <v-data-table
        :headers="headers"
        :items="alunos"
        :items-per-page="5"
        class="elevation-1"
        ><template v-slot:[`item.id`]="{ item }">
          <v-chip color="green" dark>
            <v-btn
              class="pa-0"
              target="_blank"
              text
              dark
              v-bind="attrs"
              v-on="on"
              @click="editbuttonAluno(item.id)"
            >
              <v-icon small class="mr-2">mdi-pencil</v-icon>
              Editar
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
    </v-main>
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
      alunoRegister: "",
      alunoCpf: "",
      dialog: false,
      dialog_edit: false,
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
    async addAluno() {
      await axios.post(baseURL, {
        register: this.alunoRegister,
        name: this.alunoName,
        cpf: this.alunoCpf,
      });
      const res = await axios.get(baseURL);
      this.alunos = res.data;
      this.alunoName = "";
      this.alunoRegister = "";
      this.alunoCpf = "";
      this.dialog = false;
    },
    closeDialog_edit() {
      this.dialog_edit = false;
      this.alunoName = "";
      this.alunoRegister = "";
    },
    async removeAluno(aluno_id) {
      await axios.delete(baseURL, { data: { id: aluno_id } });
      const res = await axios.get(baseURL);
      this.alunos = res.data;
      this.alunoName = "";
      this.alunoRegister = "";
      this.alunoCpf = "";
    },
  },
};
</script>
