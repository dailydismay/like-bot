<template>
  <div class="uk-section">
    <div class="uk-container">
      <vk-grid>
        <div class="uk-width-expand@m">
          <Card title="Add creds">
            <div class="uk-margin">
              <input class="uk-input uk-form-width-large" v-model="creds.email" placeholder="Email" />
            </div>
            <div class="uk-margin">
              <input
                class="uk-input uk-form-width-large"
                v-model="creds.password"
                placeholder="Password"
              />
            </div>
            <div class="uk-margin">
              <vk-button @click="addCreds">Add</vk-button>
            </div>
          </Card>
        </div>
        <div class="uk-width-expand@m">
          <Card title="List creds">
            <table class="uk-table uk-table-striped">
              <thead>
                <tr>
                  <th>id</th>
                  <th>email</th>
                  <th>password</th>
                </tr>
              </thead>
              <tfoot>
                <tr>
                  <th>total: {{ total }}</th>
                </tr>
              </tfoot>

              <tbody>
                <tr v-for="(data, idx) in items" :key="idx">
                  <td>
                    <router-link :to="`/creds/${data._id}`">{{data._id}}</router-link>
                  </td>
                  <td>{{data.email}}</td>
                  <td>{{data.password}}</td>
                </tr>
              </tbody>
            </table>
          </Card>
        </div>
      </vk-grid>
    </div>
  </div>
</template>

<script>
import { getAllCreds, createCreds } from "@/api-client";
import Card from "@/components/Card.vue";

export default {
  components: {
    Card
  },
  data() {
    return {
      page: 0,
      perPage: 10,
      items: [],
      total: 0,
      creds: {
        email: "",
        password: ""
      }
    };
  },
  methods: {
    async addCreds() {
      const data = await createCreds(this.creds);
      this.items = [data, ...this.items];
    }
  },
  async mounted() {
    const { total, items } = await getAllCreds(this.page, this.perPage);
    this.items = items;
    this.total = total;
  }
};
</script>

<style>
.creds-form {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
</style>