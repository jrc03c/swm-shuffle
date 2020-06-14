let Vue = require("vue/dist/vue.min")

window.onload = function(){
  let app = new Vue({
    el: "#app",

    template: `
      <div>
        <p>
          <a href="https://www.sleepwithmepodcast.com/" target="_blank">
            <img src="res/img/logo.png">
          </a>
        </p>

        <h1>SWM: Shuffle</h1>

        <hr>

        <div v-if="isLoading">
          Loading...
        </div>

        <div v-if="!isLoading && track">
          <h3>{{ track.title }}</h3>
          <p>{{ track.subtitle }}</p>

          <p>
            <audio controls :src="track.mp3"></audio>
          </p>

          <div>
            <button @click="shuffle">
              <b>Shuffle!</b>
            </button>
          </div>
        </div>
      </div>
    `,

    data: {
      isLoading: true,
      feed: [],
      track: null,
    },

    methods: {
      shuffle: function(){
        let self = this
        Vue.set(self, "track", self.feed[parseInt(Math.random() * self.feed.length)])
      },
    },

    mounted: async function(){
      let self = this
      self.isLoading = true
      let response = await fetch("res/js/feed.json")
      let feed = await response.json()
      Vue.set(self, "feed", feed)
      self.isLoading = false
      self.shuffle()
    },
  })
}
