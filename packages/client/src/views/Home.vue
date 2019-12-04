<template>
  <div class="uk-section uk-background-muted">
    <div class="uk-container">
      <vk-grid class="home">
        <div class="uk-width-expand@m">
          <Card title="Like processing">
            <div class="uk-margin">
              <input
                class="uk-input uk-form-width-large"
                v-model="pageUrl"
                type="text"
                placeholder="Post url"
              />
            </div>
            <div class="uk-margin">
              <input
                class="uk-input uk-form-width-large"
                v-model="delay"
                type="number"
                placeholder="Delay (mins)"
              />
            </div>
            <vk-button @click="processLikes">Process</vk-button>
          </Card>
        </div>
      </vk-grid>
    </div>
    <div class="uk-container">
      <vk-grid class="likes-table">
        <div class="uk-width-expand@m">
          <Card title="List likes">
            <table class="uk-table uk-table-striped">
              <thead>
                <tr>
                  <th>id</th>
                  <th>url</th>
                  <th>count</th>
                  <th>delay</th>
                  <th>created</th>
                </tr>
              </thead>

              <tbody>
                <tr v-for="(data, idx) in likes" :key="idx">
                  <td>
                    <router-link :to="`/likes/${data._id}`">
                      {{
                      data._id
                      }}
                    </router-link>
                  </td>
                  <td>
                    <a :href="data.page_url">{{ data.page_url }}</a>
                  </td>
                  <td>{{ data.count }}</td>
                  <td>{{ data.delay }} Mins</td>
                  <td>{{ data.createdAt | toDate }}</td>
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
import Card from "@/components/Card.vue";
import { addLikes, getAllLikes } from "@/api-client";
import { eventBus } from "@/main.js";

export default {
  name: "home",
  components: {
    Card
  },
  data() {
    return {
      pageUrl: "",
      likes: [],
      delay: 0
    };
  },
  methods: {
    async processLikes() {
      const likes = await addLikes(this.pageUrl, this.delay);
      this.likes = [likes, ...this.likes];
    },
    async allLikes() {
      const { items, total } = await getAllLikes();
      this.likes = items;
    }
  },
  created() {
    this.allLikes();

    if (eventBus) {
      eventBus.$on("CREDS_USED", creds => {
        this.likes = this.likes.map(like => {
          if ((like.page_url = creds.page_url)) {
            like.count = like.count + 1;
          }
          return like;
        });
      });
    }
  }
};
</script>

<style scoped>
.home {
  padding-top: 60px;
}
.likes-table {
  margin-top: 50px;
}
</style>
