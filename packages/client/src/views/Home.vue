<template>
  <div class="uk-container">
    <vk-grid class="home">
      <div class="uk-width-expand@m">
        <vk-card>
          <vk-card-title>Add credentials</vk-card-title>

          <div class="uk-margin">
            <input class="uk-input uk-form-width-large" type="text" placeholder="Email" />
          </div>
          <div class="uk-margin">
            <input class="uk-input uk-form-width-large" type="text" placeholder="Password" />
          </div>
          <vk-button>Add</vk-button>
        </vk-card>
      </div>
      <div class="uk-width-expand@m">
        <vk-card>
          <vk-card-title>Like processing</vk-card-title>
          <div class="uk-margin">
            <input class="uk-input uk-form-width-large" type="text" placeholder="Post url" />
          </div>
          <vk-button>Process</vk-button>
        </vk-card>
      </div>
    </vk-grid>
  </div>
</template>

<script>
// @ is an alias to /src
export default {
  name: "home",
  components: {}
};
</script>

<style scoped>
.home {
  padding-top: 60px;
}
</style>
