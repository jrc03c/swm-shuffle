let Vue = require("vue/dist/vue.min")

window.onload = function(){
  let app = new Vue({
    el: "#app",

    template: `
      <div>
        <h1>SWM: Shuffle</h1>

        <div v-if="isLoading">
          Loading...
        </div>

        <div v-if="!isLoading && track">
          <div><b>{{ track.title }}</b></div>
          <div>{{ track.subtitle }}</div>

          <br>

          <audio controls :src="track.mp3"></audio>
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
