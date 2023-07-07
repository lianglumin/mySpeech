<template>
  <div>
    <el-form :inline="true">
      <el-form-item label="机种代码" prop="model">
        <el-select v-model="formMainData.model" placeholder="Select">
          <el-option v-for="item in model" :key="item.value" :label="item.label" :value="item.value" />
        </el-select>
      </el-form-item>
      <el-form-item label="架次" prop="batchNumber">
        <el-input v-model="formMainData.batchNumber" placeholder="请输入"></el-input>
      </el-form-item>
      <el-form-item label="检验类型" prop="checkType">
        <el-select v-model="formMainData.checkType" placeholder="Select">
          <el-option v-for="item in checkType" :key="item.value" :label="item.label" :value="item.value" />
        </el-select>
      </el-form-item>
      <el-form-item label="检验专业" prop="checkProfessional">
        <el-select v-model="formMainData.checkProfessional" placeholder="Select">
          <el-option v-for="item in checkProfessional" :key="item.value" :label="item.label" :value="item.value" />
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="initData">查询</el-button>
      </el-form-item>
    </el-form>
    <el-table :data="mainData">
      <el-table-column label="序号" type="index"></el-table-column>
      <el-table-column label="机种代码" prop="model"></el-table-column>
      <el-table-column label="架次" prop="batchNumber"></el-table-column>
      <el-table-column label="检验类型" prop="checkType"></el-table-column>
      <el-table-column label="检验专业" prop="checkProfessional"></el-table-column>
      <el-table-column label="提出时间" prop="proposedTime"></el-table-column>
      <el-table-column label="详情">
        <template #default="scope">
          <!-- <el-button link class="link" @click="openDeatil(scope.row)">详情</el-button> -->
          <el-link type="primary" :underline="false" @click="openDeatil(scope.row)">详情</el-link>
          <!-- <el-button link  @click="editDeatil(scope.row)" :disabled="true">修改</el-button> -->
        </template>
      </el-table-column>
    </el-table>
    <el-drawer title="我是标题" v-model="drawer" :with-header="false" size="70%">
      <el-table :data="subInfoData">
        <el-table-column label="序号" type="index"></el-table-column>
        <el-table-column label="部位" prop="position">
        </el-table-column>
        <el-table-column label="不合格说明" width="300px" prop="description">

        </el-table-column>
        <el-table-column label="检查者">
          <el-table-column label="机务" prop="amm">

          </el-table-column>
          <el-table-column label="检验" prop="examine">

          </el-table-column>
          <el-table-column label="代表" prop="representative">

          </el-table-column>
        </el-table-column>
        <el-table-column label="成品型号" prop="productModel">

        </el-table-column>
        <el-table-column label="责任单位" prop="responsibleUnit">

        </el-table-column>
        <el-table-column label="处理单位" prop="handleUnit">

        </el-table-column>
        <el-table-column label="备注" prop="remark">

        </el-table-column>
      </el-table>
    </el-drawer>
  </div>
</template>
  
<script>
import api from "@/service/http.js";
import { ElMessage } from "element-plus";
export default {
  data() {
    return {
      formMainData: {},
      mainData: [],
      subInfoData: [],
      drawer: false,
      model: [
        { value: "a", label: "YR" },
        { value: "b", label: "Y20" },
        { value: "c", label: "JH7A" },
        { value: "d", label: "H6N" },
        { value: "e", label: "H6K" },
        { value: "f", label: "H6J" },
        { value: "g", label: "EA" },
      ],
      checkType: [
        { value: "a", label: "接收检" },
        { value: "b", label: "过程检" },
        { value: "c", label: "总检" },
        { value: "d", label: "军检" },
        { value: "e", label: "飞行检" },
        { value: "f", label: "接机检" },
      ],
      checkProfessional: [
        { value: "a", label: "机械" },
        { value: "b", label: "电气" },
        { value: "c", label: "仪表" },
        { value: "d", label: "无线电" },
        { value: "e", label: "雷达" },
        { value: "f", label: "军械" },
        { value: "g", label: "航电专业" },
        { value: "h", label: "其他" },
      ],
      position: [
        { value: "a", label: "驾驶舱、雷达舱" },
        { value: "b", label: "前起舱" },
        { value: "c", label: "15框-65框货舱右侧、地板" },
        { value: "d", label: "15框-65框货舱左侧、顶部" },
        { value: "e", label: "发动机短舱" },
        { value: "f", label: "发动机短舱、吊挂（1、2发）" },
        { value: "g", label: "发动机短舱、吊挂（3、4发）" },
        { value: "h", label: "前后翼身整流罩、中央翼" },
        { value: "i", label: "左机翼" },
        { value: "j", label: "右机翼" },
        { value: "k", label: "左主起整流罩" },
        { value: "l", label: "下设备舱15-54框" },
        { value: "m", label: "65-83框" },
        { value: "n", label: "垂尾、平尾" },
      ]
    };
  },
  mounted() {
    this.initData()
  },

  methods: {
    //查询
    initData() {
      api.searchMainData(this.formMainData).then((res) => {
        this.mainData = res.data;
        // console.log('this.mainData',this.mainData)
      }).catch((err) => {
        ElMessage.error(err.msg);
      });
    },
    openDeatil(row) {
      api.searchSubData(row.id).then(res => {
        this.subInfoData = res.data;
        this.drawer = true;
      }).catch(err => {
        ElMessage.error(err.msg);
      })
    },
    editDeatil(row) {
      this.$emit("editDeatil", row)
    }
  },
};
</script>
  
<style>

</style>