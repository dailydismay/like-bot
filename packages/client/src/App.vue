<template>
  <div id="app">
    <Header />
    <vk-notification position="top-left" :messages.sync="topLeft">
      <div slot-scope="{ message }">
        <vk-icon icon="check"></vk-icon>
        {{ message }}
      </div>
    </vk-notification>
    <router-view />
  </div>
</template>

<script>
import socket from "socket.io-client";
import Header from "@/components/Header.vue";
import { baseURL } from "@/api-client";
import { eventBus } from "@/main";

export default {
  components: {
    Header
  },
  data() {
    return {
      topLeft: [],
      io: null
    };
  },
  created() {
    this.io = socket(baseURL);

    this.io.on("CREDS_USED", creds => {
      this.topLeft = [
        ...this.topLeft,
        `Account ${creds.email} liked ${creds.page_url}`
      ];

      this.lastMsg = creds;

      eventBus.$emit("CREDS_USED", creds);
    });
  }
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  height: 100vh;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
