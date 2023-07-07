import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import 'element-plus/dist/index.css'
import * as icons from '@element-plus/icons-vue'
// import mitt from 'mitt'

import { ElLink,ElButton, ElMenu, ElMenuItem, ElTabs, ElTabPane, ElTable, ElTableColumn, ElForm, ElFormItem, ElCol, ElRow ,ElSelect,ElOption,ElInput,ElDatePicker,ElIcon,ElDrawer,ElConfigProvider,ElDialog} from 'element-plus';

const app = createApp(App)

// app.config.globalProperties.$mitt=new mitt()

app.use(ElLink)
app.use(ElButton)
app.use(ElMenu)
app.use(ElMenuItem)
app.use(ElTabs)
app.use(ElTabPane)
app.use(ElTable)
app.use(ElTableColumn)
app.use(ElForm)
app.use(ElFormItem)
app.use(ElCol)
app.use(ElRow)
app.use(ElSelect)
app.use(ElOption)
app.use(ElInput)
app.use(ElDatePicker)
app.use(ElIcon)
app.use(ElConfigProvider)
Object.keys(icons).forEach(key => {
  app.component(key, icons[key])
})
app.use(ElDrawer)
app.use(ElDialog)
app.use(router)

app.mount('#app')

