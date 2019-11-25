<template>
  <div class="uk-section">
    <div class="uk-container">
      <vk-grid v-if="creds" class="uk-flex-center">
        <div v-if="!isEditModeOn">
          <Card :title="`Creds: ${creds._id}`">
            <div class="uk-margin uk-text-left">
              <h4>EMAIL: {{creds.email}}</h4>
            </div>
            <div class="uk-margin uk-text-left">
              <h4>PASSWORD: {{ creds.password }}</h4>
            </div>

            <vk-buttons>
              <vk-button @click="toggleEditMode">Edit</vk-button>
              <vk-button @click="deleteCreds">Delete</vk-button>
            </vk-buttons>
          </Card>
        </div>
        <div v-else>
          <Card title="Edit Creds">
            <div class="uk-margin">
              <input
                class="uk-input uk-form-width-large"
                v-model="creds.email"
                type="text"
                placeholder="Email"
              />
            </div>
            <div class="uk-margin">
              <input
                class="uk-input uk-form-width-large"
                v-model="creds.password"
                type="text"
                placeholder="Password"
              />
            </div>

            <vk-buttons>
              <vk-button @click="saveCreds">Save</vk-button>
              <vk-button @click="toggleEditMode">Cancel</vk-button>
            </vk-buttons>
          </Card>
        </div>
      </vk-grid>
    </div>
  </div>
</template>


<script>
import { getCreds, patchCreds, deleteCreds } from "@/api-client";
import Card from "@/components/Card.vue";

export default {
  components: {
    Card
  },
  data() {
    return {
      creds: null,
      isEditModeOn: false
    };
  },
  methods: {
    async deleteCreds() {
      await deleteCreds(this.$route.params.id);
      this.$router.push({
        name: "creds"
      });
    },
    toggleEditMode() {
      this.isEditModeOn = !this.isEditModeOn;
    },
    async saveCreds() {
      await patchCreds(this.$route.params.id, this.creds);
      this.$router.push({
        name: "creds"
      });
    }
  },
  async mounted() {
    const data = await getCreds(this.$route.params.id);
    this.creds = data;
  }
};
</script>

<style>
.creds-buttons {
  display: flex;
  flex-wrap: nowrap;
  justify-content: space-between;
  width: 100%;
}
</style>