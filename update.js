let fs = require("fs")
let convert = require("xml-js")
let fetch = require("./fetch.js")
let feedURL = "http://feeds.nightvalepresents.com/sleepwithme"

async function update(){
  let raw = await fetch(feedURL)
  let feed = JSON.parse(convert.xml2json(raw, {compact: true}))

  let out = feed.rss.channel.item.map(function(item){
    return {
      title: item["itunes:title"]._text.trim(),
      subtitle: item["itunes:subtitle"]._text.trim(),
      mp3: item.enclosure._attributes.url.trim(),
    }
  })

  fs.writeFileSync("res/js/feed.json", JSON.stringify(out), "utf8")
}

update()
