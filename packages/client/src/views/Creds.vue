<template>
  <div class="uk-section uk-background-muted">
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
      </vk-grid>
      <div class="uk-container list-creds">
        <vk-grid>
          <div class="uk-width-expand@m">
            <Card title="List creds">
              <table class="uk-table uk-table-striped">
                <thead>
                  <tr>
                    <th>id</th>
                    <th>email</th>
                    <th>password</th>
                    <th>created</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(data, idx) in items" :key="idx">
                    <td>
                      <router-link :to="`/creds/${data._id}`">
                        {{
                        data._id
                        }}
                      </router-link>
                    </td>
                    <td>{{ data.email }}</td>
                    <td>{{ data.password }}</td>
                    <td>{{ data.createdAt | toDate }}</td>
                  </tr>
                </tbody>
              </table>
            </Card>
          </div>
        </vk-grid>
      </div>
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
.list-creds {
  margin-top: 50px;
}
</style>
