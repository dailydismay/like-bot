<template>
  <div class="uk-section uk-background-muted">
    <div class="uk-container">
      <vk-grid class="uk-flex-center">
        <div class="uk-width-expand@m">
          <Card :title="`Current Proxy : ${currentProxy}`">
            <div class="uk-margin">
              <input
                class="uk-input uk-form-width-large"
                v-model="newProxy"
                type="url"
                placeholder="Proxy url"
              />
            </div>
            <vk-buttons>
              <vk-button @click="setProxy">Set</vk-button>
            </vk-buttons>
          </Card>
        </div>
      </vk-grid>
    </div>
  </div>
</template>

<script>
import Card from "@/components/Card.vue";
import { getCurrentProxy, setCurrentProxy } from "@/api-client";

export default {
  components: { Card },
  data() {
    return {
      currentProxy: null,
      newProxy: null
    };
  },
  methods: {
    async setProxy() {
      this.currentProxy = await setCurrentProxy(this.newProxy);
    }
  },
  async created() {
    this.currentProxy = (await getCurrentProxy()) || "No proxy set";
  }
};
</script>

<style></style>
