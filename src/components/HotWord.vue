<template>
  <div>
    <el-form :inline="true" :model="formMainData" :rules="mainRules" ref="mainForm">
			<el-form-item label="组织" prop="gid">
				<el-select v-model="formMainData.gid" placeholder="Select">
					<el-option v-for="item in organization" :key="item.gid" :label="item.gid" :value="item.gid" />
				</el-select>
			</el-form-item>
      
      <el-form-item>
        <el-button type="primary" @click="searchWords">查询</el-button>
        <el-button type="success" @click="addHotWords" style="margin-left:10px">增加</el-button>
      </el-form-item>
    </el-form>
    <el-table :data="mainData">
      <el-table-column label="序号" type="index"></el-table-column>
      <el-table-column width="300px" label="组织" prop="gid"></el-table-column>
      <el-table-column width="300px" label="热词" prop="hotWord">
        <template #default="scope">
          <span v-show="!scope.row.isEdit">{{ scope.row.hotWord }}</span>
          <div v-show="scope.row.isEdit">
            <el-input v-model="scope.row.hotWord"></el-input>
          </div>
        </template>
      </el-table-column>
      <el-table-column width="300px" label="创建时间" prop="createTime"></el-table-column>
      <el-table-column width="300px" label="更新时间" prop="updateTime"></el-table-column>

      <el-table-column width="300px" label="操作">
        <template #default="scope">
          <el-link type="primary" :underline="false"
                  v-if="!scope.row.isEdit" @click="editehotWord(scope.row)">修改</el-link>
          <el-link type="primary" :underline="false"
                  v-if="scope.row.isEdit" @click="saveEditWords(scope.row)">保存</el-link>
          
          <el-link type="primary" :underline="false"
                  @click="delWords(scope.row)" style="margin-left:10px">删除</el-link>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog title="热词添加窗口" v-model="isHotWordsDia" @close="closeAddDia" center width="20%">
      <el-form :model="formAddData">
        <el-row>
          <el-col :span=22>
            <el-form-item label="热词" class="hotword-input">
              <el-input v-model="formAddData.hotWord" placeholder="请输入内容"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span=4></el-col>
        </el-row>
      </el-form>
      <div  class="hotword-button">
        <el-button @click="saveWords" type="success">保存</el-button>
      </div>
    </el-dialog>
  </div>
</template>
  
<script>
import api from "@/service/http.js";
import { ElMessage ,ElMessageBox } from "element-plus";
import { reactive} from 'vue-demi';
// import pubsub from 'pubsub-js'
// import bus from "../utils/EventBus"

export default {
  data() {
    return {
      isHotWordsDia:false,
      organization:reactive([]),//组织
      formMainData:reactive({
        // gid: "SF" 
      }),//主表数据
      formAddData:reactive({id:''}),//新增热词窗口数据
      mainData:reactive([]),//按组织查询出的热词信息
      mainRules: {
				gid: [{ required: true, message: '请选择组织', trigger: 'blur' }],
			},
		}
  },
  mounted() {
    this.searchWords();
    this.getGroups();
    //全局总线
    // bus.on('getOrgan',(gid)=>{
    //   console.log('收到消息了')
    //   this.getOrgan(gid);
    //   // this.formMainData.gid=gid;
    // })

    //订阅消息
    // this.pubid=pubsub.subscribe('getOrgan',(msg,gid)=>{
    //   this.getOrgan(gid);
    //   console.log('this.formMainData.gid',this.formMainData.gid)
    //   console.log(msg,gid)
    // })
  },
  // onUnmounted(){
  //   pubsub.unsubscribe(this.pubid)
  // },

  methods: {
    // getOrgan(gid){
    //   this.formMainData.gid=gid;
    //   console.log('getOrgan函数',this.formMainData.gid)
    // },
    // 获取组织
    getGroups(){
      api.getGroup().then((res) => {
          this.organization = res.data;
          // console.log('this.organization',this.organization)
        }).catch((err) => {
          ElMessage.error(err.msg);
        });
    },
    //按组织查询热词
    searchWords() {
        this.$refs["mainForm"].validate((vaild) => {
          if (vaild) {
            api.getHotWords(this.formMainData.gid).then((res) => {
              this.mainData = res.data;
              console.log('this.mainData',this.mainData)
            }).catch((err) => {
              ElMessage.error(err.msg);
            });
          } else {
            return false;
          }
        })
    },
    
    //按组织保存热词(新增)
    saveWords(){
      let AddData = [{
				gid:this.formMainData.gid,
        hotWord:this.formAddData.hotWord,
        id:this.formAddData.id
			}]
      api.saveHotWords(this.formMainData.gid,AddData).then((res) => {
        this.searchWords();
        this.closeAddDia();
        ElMessage.success("新增成功！");
        console.log(res);
      }).catch((err) => {
        ElMessage.error(err.msg);
      });
    },
    
    //保存修改的热词(修改)
    saveEditWords(row){
      let that=this;
      console.log('that.formMainData.preWord',that.formMainData.preWord);
      //判断修改的词是否有变化
      if(that.formMainData.preWord==row.hotWord){
        row.isEdit=false;
        ElMessage.success("修改成功！");
      }
      else{
        let AddData = [{
				gid:this.formMainData.gid,
        hotWord:row.hotWord,
        id:row.id
        }]
        console.log('row',row);
        api.saveHotWords(this.formMainData.gid,AddData).then((res) => {
          this.searchWords();
          this.closeAddDia();
          ElMessage.success("修改成功！");
          console.log(res);
        }).catch((err) => {
          ElMessage.error(err.msg);
        });
        this.searchWords();
      }
    },

    //按组织删除热词
    delWords(row){
      let delData={
        id:row.id,
        gid:this.formMainData.gid,
        hotWord:row.hotWord,
        createTime:row.createTime,
        updateTime:row.updateTime
      }
      ElMessageBox.alert("确认删除当前热词？", "警告", {
        showCancelButton:true,
        confirmButtonText: "确认",
        cancelButtonText: "取消"
      }).then(() => {
        api.deleteHotWords(delData).then((res) => {
          this.searchWords();
          console.log(res);
        }).catch((err) => {
          ElMessage.error(err.msg);
        });
      }).catch(() => { ElMessage.info("已取消") })
      
    },
    closeAddDia(){
      this.isHotWordsDia=false;
      this.formAddData.hotWord=null;
      this.formAddData.gid=null;
      // console.log('closeAddDia')
    },

    //添加热词
    addHotWords(){
      this.$refs["mainForm"].validate((vaild) => {
          if (vaild) {
            this.isHotWordsDia = true;
          } else {
            return false;
          }
        })
    },

    //编辑热词
    editehotWord(row){
      let that=this
      that.formMainData.preWord=row.hotWord;
      row.isEdit=true;
    },

  },
};
</script>
  
<style>
  .el-dialog .el-dialog__body{
    /* display: flex; */
    justify-content: center;
    align-items: center;
  }

  .el-button+.el-button {
    margin-left: 0px;
}

  .hotword-button{
    text-align: center;
  }
</style>