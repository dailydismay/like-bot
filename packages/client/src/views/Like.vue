<template>
  <div class="uk-section uk-background-muted">
    <div class="uk-container">
      <vk-grid v-if="like" class="uk-flex-center">
        <div class="uk-width-expand@m">
          <Card :title="`Post : ${like._id}`">
            <div class="uk-margin uk-text-left">
              <h4>
                Post url:
                <a :href="like.page_url">{{ like.page_url }}</a>
              </h4>
            </div>
            <div class="uk-margin uk-text-left">
              <div>
                Created:
                <h4>{{ like.createdAt | toDate }}</h4>
              </div>
            </div>
            <div class="uk-margin uk-text-left">
              <div>
                Last liked:
                <h4>{{ like.updatedAt | toDateFromNow }}</h4>
              </div>
            </div>
            <div class="uk-margin uk-text-left">
              <div>
                Count:
                <h4>{{ like.count }}</h4>
              </div>
            </div>
            <div class="uk-margin uk-text-left">
              <div>
                Delay:
                <h4>{{ like.delay }} Min</h4>
              </div>
            </div>
            <div class="uk-margin uk-text-left">
              <div>
                Status:
                <h4>{{ like.total === like.count ? "Done" : "In progress" }}</h4>
              </div>
            </div>
            <vk-buttons>
              <vk-button @click="deleteLikes">Delete</vk-button>
            </vk-buttons>
          </Card>
        </div>
      </vk-grid>
      <vk-grid>
        <div class="uk-width-expand@m">
          <Card title="Creds used">
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
                <tr v-for="(data, idx) in like.creds" :key="idx">
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
</template>

<script>
import Card from "@/components/Card.vue";
import { getLikes, patchCreds, deleteLikes } from "@/api-client";
import { eventBus } from "@/main.js";

export default {
  components: {
    Card
  },
  data() {
    return {
      like: null,
      isEditModeOn: false
    };
  },
  methods: {
    async deleteLikes() {
      await deleteLikes(this.$route.params.id);
      this.$router.push({
        name: "home"
      });
    },
    toggleEditMode() {
      this.isEditModeOn = !this.isEditModeOn;
    }
  },
  async mounted() {
    const data = await getLikes(this.$route.params.id);
    this.like = data;

    if (eventBus) {
      eventBus.$on("CREDS_USED", creds => {
        if (this.like.page_url === creds.page_url) {
          this.like.count++;
        }
      });
    }
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
