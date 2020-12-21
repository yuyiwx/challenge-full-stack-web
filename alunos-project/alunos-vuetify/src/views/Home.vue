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
                      v-model="alunoEmail"
                      label="E-mail*"
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
              <v-btn color="blue darken-1" text @click.stop="closeDialog">
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
        :items-per-page="10"
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
        { text: "E-mail", value: "email" },
        { text: "Ações", value: "id", sortable: false },
      ],
      alunos: [],
      alunoName: "",
      alunoRegister: "",
      alunoCpf: "",
      alunoEmail: "",
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
        email: this.alunoEmail,
        cpf: this.alunoCpf,
      });
      const res = await axios.get(baseURL);
      this.alunos = res.data;
      this.alunoName = "";
      this.alunoRegister = "";
      this.alunoCpf = "";
      this.dialog = false;
    },
    closeDialog() {
      this.dialog = false;
      this.alunoName = "";
      this.alunoRegister = "";
      this.alunoEmail = "";
      this.alunoCpf = "";
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
