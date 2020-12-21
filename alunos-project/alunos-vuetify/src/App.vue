<template>
  <v-app>
    <v-app-bar app color="primary" dark>
      <div class="d-flex align-center">
        <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
        <v-spacer></v-spacer>
      </div>

      <v-spacer></v-spacer>

      <v-btn
        href="https://www.grupoa.com.br/"
        target="_blank"
        class="pa-0"
        text
      >
        <v-img
          alt="Vuetify Logo"
          class="shrink ma-0"
          contain
          src="./assets/image.png"
          transition="scale-transition"
          width="90"
        />
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
    <v-main>
      <router-view></router-view>
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: "App",

  components: {},

  data: () => ({
    drawer: false,
    group: null,

    //
  }),
  watch: {
    group() {
      this.drawer = false;
    },
  },
};
</script>
