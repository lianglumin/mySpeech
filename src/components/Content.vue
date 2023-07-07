<template>
  <div class="content-box">
    <el-tabs v-model="editableTabsValue" type="card" editable 
            @tab-click="handleClick" 
            @tab-add="handleAdd"
            @tab-remove="handleRemove">
      <el-tab-pane v-for="item in editableTabs" :key="item.name" :label="item.title" :name="item.name">
        <div class="content-main">
          <!-- <Search v-if="item.flag == 'search'" @editDeatil="addEditPane" :currentEditObj="currentEditObj" :isEditOpen="isEditOpen"></Search>
          <Add v-if="item.flag == 'add'"></Add> -->

          <Search v-if="item.flag == 'search'" @editDeatil="addEditPane" ></Search>
          <Add v-if="item.flag == 'add'" 
              :currentEditObj="currentEditObj" 
              :isEditOpen="isEditOpen" 
              @addhotword="Addhotword">
          </Add>
          <HotWord v-if="item.flag == 'hotword'" ></HotWord>
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import Add from "./Add.vue";
import Search from "./Search.vue";
import HotWord from "./HotWord.vue";

import { ElMessage, ElMessageBox } from "element-plus";
import { reactive } from 'vue-demi';

export default {
  data() {
    return {
      editableTabsValue: "search",
      isEditOpen:false,
      currentEditObj:reactive({}),  
      editableTabs: reactive([
        {
          title: "查看",
          name: "search",
          flag: "search",
        }
      ]),
    };
  },
  components: { Add, Search, HotWord },
  methods: {
    handleClick(pane) {
      this.editableTabsValue = pane.props.name;
    },
    handleAdd() {
      let isAddExist = this.editableTabs.find((item) => {
        return item.name == "add";
      });
      if (!isAddExist) {
        let obj = {
          title: "新增",
          name: "add",
          flag: "add",
        };
        this.editableTabs.push(obj);
        this.editableTabsValue = obj.name
      } else {
        ElMessage.error("存在正在新增未保存的表单，请保存后，再次新建表单");
      }
    },
    handleRemove(tabName) {
      if (tabName != this.editableTabsValue) {
        ElMessage.error("只能关闭当前打开的标签页");
        return false;
      }
      if (tabName == 'search') {
        ElMessage.error("不支持删除查询页");
      } else {
        ElMessageBox.alert("确认删除当前标签页？", "警告", {
          showCancelButton:true,
          confirmButtonText: "确认",
          cancelButtonText: "取消"
        }).then(() => {
          let index = this.editableTabs.findIndex(item => {
            return item.name == this.editableTabsValue
          })
          if (index != -1) {
            this.editableTabsValue = 'search'
            this.editableTabs.splice(index, 1)
          }
        }).catch(() => { ElMessage.info("已取消") })
      }
    },
    addEditPane(row){
      let obj= {
        title: "修改",
          name: "add"+row.id,
          flag: "add",
      }
      console.log(row)
      this.isEditOpen=true;
      this.currentEditObj = JSON.parse(JSON.stringify(row));
      this.editableTabs.push(obj);
      this.editableTabsValue = obj.name
    },
    //////////////////// 新增热词页面
    Addhotword() {
      let isAddExist = this.editableTabs.find((item) => {
        return item.name == "hotword";
      });
      if (!isAddExist) {
        let obj = {
          title: "热词",
          name: "hotword",
          flag: "hotword",
        };
        this.editableTabs.push(obj);
        this.editableTabsValue = obj.name
      } else {
        ElMessage.error("存在正在新增未保存的表单，请保存后，再次新建表单");
      }
    },
  },
};
</script>

<style>
.content-box {
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  padding: 10px;
  -webkit-transition: left 0.3s ease-in-out;
  transition: left 0.3s ease-in-out;
}

.content-main {
  padding: 10px;
}
</style>