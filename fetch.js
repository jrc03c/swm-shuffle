let http = require("http")
let https = require("https")

module.exports = function(path){
  let mode = path.split("://")[0]
  let which = mode === "http" ? http : https

  return new Promise(function(resolve, reject){
    try {
      which.get(path, function(response){
        let data = ""

        response.on("data", function(chunk){
          data += chunk
        })

        response.on("end", function(){
          return resolve(data)
        })
      }).on("error", reject)
    } catch(e){
      return reject(e)
    }
  })
}
