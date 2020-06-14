let Vue = require("vue/dist/vue.min")

window.onload = function(){
  let app = new Vue({
    el: "#app",

    template: `
      <div>
        <div v-if="isLoading">
          Loading...
        </div>

        <div v-else>
          Done!
        </div>
      </div>
    `,

    data: {
      isLoading: true,
    },

    mounted: async function(){
      let self = this
      self.isLoading = true
      let response = await fetch("res/js/feed.json")
      let feed = await response.json()
      console.log(feed)
      
      self.isLoading = false
    },
  })
}
