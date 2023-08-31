// 來自npm i dotenv 作用為.env 匯入此 (import)
import 'dotenv/config'
import linebot from 'linebot'
import axios from 'axios'

// process是nod程序處理的環境資料.env 的env  .channelID的 channelID

const bot = linebot({
  channelID: process.env.channelID,
  channelSecret: process.env.channelSecret,
  channelAccessToken: process.env.channelAccessToken
})

bot.on('message', async event => {
  if (event.message.type === 'text') {
    try {
      const { data } = await axios.get('https://media.taiwan.net.tw/XMLReleaseALL_public/scenic_spot_C_f.json')
      for (const info of data.XML_Head.Infos.Info) {
        if (info.Name === event.message.text) {
          event.reply(info.Description)
          return
        }
      }
      event.reply('找不到')
    } catch (error) {
      console.log(error)
      event.reply('發生錯誤01')
    }
  }
})

bot.listen('/', process.env.PORT || 3000, () => {
  console.log('原神啟動')
})
