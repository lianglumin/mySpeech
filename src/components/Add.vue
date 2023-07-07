<template>
	<div class="add-page">
		<el-form
			:model="formMainData"
			:inline="true"
			:rules="mainRules"
			ref="mainForm"
		>
			<el-row class="title">
				<el-col :span="24">质量问题检查记录表</el-col>
			</el-row>
			<!-- <el-row :gutter="25">
					<el-col :span="4"> -->
			<el-form-item label="机种代码" prop="model">
				<el-select
					v-model="formMainData.model"
					placeholder="Select"
					v-if="!isEditOpen"
				>
					<el-option
						v-for="item in model"
						:key="item.value"
						:label="item.label"
						:value="item.value"
					/>
				</el-select>
				<span v-if="isEditOpen">{{ currentEditObj.model }}</span>
			</el-form-item>
			<!-- </el-col>
					<el-col :span="4"> -->
			<el-form-item label="架次" prop="batchNumber">
				<el-input
					v-model="formMainData.batchNumber"
					v-if="!isEditOpen"
					placeholder="请输入"
				></el-input>
				<span v-if="isEditOpen">{{ formMainData.batchNumber }}</span>
			</el-form-item>
			<!-- </el-col>
					<el-col :span="4"> -->
			<el-form-item label="检验类型" prop="checkType">
				<el-select
					v-model="formMainData.checkType"
					placeholder="Select"
					v-if="!isEditOpen"
				>
					<el-option
						v-for="item in checkType"
						:key="item.value"
						:label="item.label"
						:value="item.value"
					/>
				</el-select>
				<span v-if="isEditOpen">{{ formMainData.checkType }}</span>
			</el-form-item>
			<!-- </el-col>
					<el-col :span="4"> -->
			<el-form-item label="检验专业" prop="checkProfessional">
				<el-select
					v-model="formMainData.checkProfessional"
					placeholder="Select"
					v-if="!isEditOpen"
				>
					<el-option
						v-for="item in checkProfessional"
						:key="item.value"
						:label="item.label"
						:value="item.value"
					/>
				</el-select>
				<span v-if="isEditOpen">{{ formMainData.checkProfessional }}</span>
			</el-form-item>

			<!-- </el-col>
					<el-col :span="4"> -->
			<el-form-item label="提出时间" prop="proposedTime">
				<el-config-provider :locale="locale">
					<el-date-picker
						v-model="formMainData.proposedTime"
						type="date"
						placeholder="选择日期"
						v-if="!isEditOpen"
					>
					</el-date-picker>
				</el-config-provider>

				<span v-if="isEditOpen">{{ formMainData.proposedTime }}</span>
			</el-form-item>
			<el-form-item>
				<el-button @click="submitMainForm()" type="primary">保存</el-button>
			</el-form-item>
		</el-form>

		<el-form
			:inline="true"
			:rules="gidRules"
			ref="gidForm"
			:model="organization"
		>
			<!-- ////////////////////////////////////////////////////// -->
			<el-form-item label="组织" prop="gid" class="hotword">
				<!-- <el-select v-model="organization" placeholder="Select" @click="getGroup"> -->
				<el-select v-model="organization.gid" placeholder="Select">
					<el-option
						v-for="item in organization"
						:key="item.gid"
						:label="item.gid"
						:value="item.gid"
					/>
				</el-select>
			</el-form-item>
			<el-form-item>
				<el-button type="primary" @click="Addhotword">热词管理</el-button>
			</el-form-item>
			<!-- /////////////////////////////////////////////////////// -->
		</el-form>

		<el-form :model="formSubData">
			<el-row>
				<el-col :span="24">
					<el-button circle @click="addSunInfo" class="circle-button">
						<el-icon>
							<Plus />
						</el-icon>
					</el-button>
					<el-button circle @click="translateAll" class="circle-button">
						译
					</el-button>
				</el-col>
			</el-row>
			<el-table
				:data="formSubData"
				max-height="450"
				id="subTable"
				ref="myTable"
			>
				<el-table-column label="序号" type="index"></el-table-column>
				<el-table-column label="部位" prop="position">
					<template #default="scope">
						<span v-show="!scope.row.isEdit">{{ scope.row.position }}</span>
						<el-select
							v-show="scope.row.isEdit"
							v-model="scope.row.position"
							placeholder="Select"
						>
							<el-option
								v-for="item in position"
								:key="item.value"
								:label="item.label"
								:value="item.value"
							/>
							<!-- 修改 -->
						</el-select>
					</template>
				</el-table-column>
				<el-table-column label="不合格说明" width="300px">
					<template #default="scope">
						<span v-show="!scope.row.isEdit">{{ scope.row.description }}</span>
						<div v-show="scope.row.isEdit">
							<el-row>
								<el-col :span="20">
									<el-input
										v-model="scope.row.description"
										type="textarea"
										:autosize="{ minRows: 5 }"
										class="textarea-size"
										:id="'descid_' + scope.$index"
									></el-input>
								</el-col>
								<el-col :span="4">
									<el-button
										circle
										@click="openRecordDialog(scope.row, scope.$index)"
										type="info"
										class="operation-button circle-button"
									>
										<el-icon>
											<Microphone />
										</el-icon>
									</el-button>
								</el-col>
							</el-row>
						</div>
					</template>
				</el-table-column>
				<el-table-column label="检查者">
					<el-table-column label="机务">
						<template #default="scope">
							<span v-show="!scope.row.isEdit">{{ scope.row.amm }}</span>
							<div v-show="scope.row.isEdit">
								<el-select
									v-model="scope.row.amm"
									placeholder="Select"
									v-if="!isEditOpen"
								>
									<el-option
										v-for="item in amm"
										:key="item.value"
										:label="item.label"
										:value="item.value"
									/>
								</el-select>
							</div>
						</template>
					</el-table-column>
					<el-table-column label="检验">
						<template #default="scope">
							<span v-show="!scope.row.isEdit">{{ scope.row.examine }}</span>
							<div v-show="scope.row.isEdit">
								<el-select
									v-model="scope.row.examine"
									placeholder="Select"
									v-if="!isEditOpen"
								>
									<el-option
										v-for="item in examine"
										:key="item.value"
										:label="item.label"
										:value="item.value"
									/>
								</el-select>
							</div>
						</template>
					</el-table-column>
					<el-table-column label="代表">
						<template #default="scope">
							<span v-show="!scope.row.isEdit">{{
								scope.row.representative
							}}</span>
							<div v-show="scope.row.isEdit">
								<el-select
									v-model="scope.row.representative"
									placeholder="Select"
									v-if="!isEditOpen"
								>
									<el-option
										v-for="item in representative"
										:key="item.value"
										:label="item.label"
										:value="item.value"
									/>
								</el-select>
							</div>
						</template>
					</el-table-column>
				</el-table-column>
				<el-table-column label="成品型号">
					<template #default="scope">
						<span v-show="!scope.row.isEdit">{{ scope.row.productModel }}</span>
						<div v-show="scope.row.isEdit">
							<el-select
								v-model="scope.row.productModel"
								placeholder="Select"
								v-if="!isEditOpen"
							>
								<el-option
									v-for="item in productModel"
									:key="item.value"
									:label="item.label"
									:value="item.value"
								/>
							</el-select>
						</div>
					</template>
				</el-table-column>
				<el-table-column label="责任单位">
					<template #default="scope">
						<!-- <span v-show="!scope.row.isEdit">{{ scope.row.responsibleUnit }}</span> -->
						<span v-show="!scope.row.isEdit">{{
							this.formSubData[scope.$index].responsibleUnit
						}}</span>

						<div v-show="scope.row.isEdit">
							<el-select
								v-model="scope.row.responsibleUnit"
								placeholder="Select"
								v-if="!isEditOpen"
							>
								<el-option
									v-for="item in responsibleUnit"
									:key="item.value"
									:label="item.label"
									:value="item.value"
								/>
							</el-select>
						</div>
					</template>
				</el-table-column>
				<el-table-column label="处理单位">
					<template #default="scope">
						<span v-show="!scope.row.isEdit">{{ scope.row.handleUnit }}</span>
						<div v-show="scope.row.isEdit">
							<el-select
								v-model="scope.row.handleUnit"
								placeholder="Select"
								v-if="!isEditOpen"
							>
								<el-option
									v-for="item in handleUnit"
									:key="item.value"
									:label="item.label"
									:value="item.value"
								/>
							</el-select>
						</div>
					</template>
				</el-table-column>
				<el-table-column label="备注">
					<template #default="scope">
						<span v-show="!scope.row.isEdit">{{ scope.row.remark }}</span>
						<div v-show="scope.row.isEdit">
							<el-input v-model="scope.row.remark"></el-input>
						</div>
					</template>
				</el-table-column>
				<el-table-column label="操作">
					<template #default="scope">
						<el-button
							@click="editSunInfo(scope.$index)"
							type="primary"
							class="operation-button"
						>
							<el-icon> <Edit /> </el-icon>修改
						</el-button>
						<el-button
							@click="saveSunInfo(scope.row, scope.$index)"
							type="success"
							class="operation-button"
						>
							<el-icon> <Check /> </el-icon>保存
						</el-button>
						<el-button
							@click="delSunInfo(scope.row, scope.$index)"
							type="danger"
							class="operation-button"
						>
							<el-icon> <Delete /> </el-icon>删除
						</el-button>
					</template>
				</el-table-column>
			</el-table>
		</el-form>
		<el-dialog v-model="recordDialog" @close="closeMicoDia">
			<el-button @click="startMico" class="operation-button" type="primary"
				>开始录音</el-button
			>
			<el-button @click="stopMico" class="operation-button" type="warning"
				>结束录音</el-button
			>
			<el-button @click="replayMico" class="operation-button" type="primary"
				>录音回放</el-button
			>
			<el-button @click="pauseMico" class="operation-button" type="warning"
				>停止回放</el-button
			>
			<el-row class="dialog-row">
				<el-col :span="24">当前状态：{{ currentStatu }}</el-col>
			</el-row>
			<el-row class="dialog-row">
				<el-col :span="24">录音时长：{{ time }} 秒</el-col>
			</el-row>
			<el-button
				@click="transferMico('')"
				class="operation-button"
				type="primary"
				>翻译</el-button
			>

			<!-- <el-button
				@click="saveTransferMico"
				class="operation-button"
				type="success"
				>保存</el-button
			> -->

			<el-input
				type="textarea"
				:autosize="{ minRows: 7 }"
				v-model="currentMicoDesc"
				class="textarea-size"
			>
			</el-input>
		</el-dialog>
	</div>
</template>

<script>
import Recorder from 'js-audio-recorder';
import { ElMessage } from 'element-plus';
import zhCn from 'element-plus/lib/locale/lang/zh-cn';
//import {downloadFile} from "@/service/download.js"
import api from '@/service/http.js';
import { reactive } from 'vue-demi';

// import pubsub from 'pubsub-js'
// import bus from "../utils/EventBus"

export default {
	props: {
		currentEditObj: Object,
		isEditOpen: Boolean,
	},
	mounted() {
		//this.startCanvas();
		///////////新增,初始化组织
		this.initData();
	},
	watch: {
		isEditOpen(val) {
			console.log(val);
			if (val) {
				this.formMainData = JSON.parse(JSON.stringify(this.currentEditObj));
			}
		},
	},
	//reactive({ })
	data() {
		return {
			recordDialog: false,
			currentMico: null, //弹窗对象
			isfirst: true,
			currentMicoIndex: 0, //弹窗内容
			currentMicoDesc: null, //弹窗翻译内容
			currentStatu: null, //执行按钮信息
			locale: zhCn,
			oCanvas: null,
			ctx: null,
			drawRecordId: null,
			formMainData: reactive({
				////////////////////////////
				// id: 'aaa',
			}),
			time: 0,
			MicoisStop: true,
			// currentMico:null,
			organization: reactive([
				{
					/////////////////////////////
					// gid: 'SF',
				},
			]), //组织
			mainRules: {
				model: [{ required: true, message: '请选择机型', trigger: 'blur' }],
				batchNumber: [
					{ required: true, message: '请输入架次', trigger: 'blur' },
				],
				checkType: [
					{ required: true, message: '请选择检验类型', trigger: 'blur' },
				],
				checkProfessional: [
					{ required: true, message: '请选择检验专业', trigger: 'blur' },
				],
				proposedTime: [
					{ required: true, message: '请选择时间', trigger: 'blur' },
				],
			},
			gidRules: {
				gid: [{ required: true, message: '请选择组织', trigger: 'blur' }],
			},
			formSubData: reactive([]),
			model: [
				{ value: 'a', label: 'YR' },
				{ value: 'b', label: 'Y20' },
				{ value: 'c', label: 'JH7A' },
				{ value: 'd', label: 'H6N' },
				{ value: 'e', label: 'H6K' },
				{ value: 'f', label: 'H6J' },
				{ value: 'g', label: 'EA' },
			],
			checkType: [
				{ value: 'a', label: '接收检' },
				{ value: 'b', label: '过程检' },
				{ value: 'c', label: '总检' },
				{ value: 'd', label: '军检' },
				{ value: 'e', label: '飞行检' },
				{ value: 'f', label: '接机检' },
			],
			checkProfessional: [
				{ value: 'a', label: '机械' },
				{ value: 'b', label: '电气' },
				{ value: 'c', label: '仪表' },
				{ value: 'd', label: '无线电' },
				{ value: 'e', label: '雷达' },
				{ value: 'f', label: '军械' },
				{ value: 'g', label: '航电专业' },
				{ value: 'h', label: '其他' },
			],
			position: [
				{ value: 'a', label: '驾驶舱、雷达舱' },
				{ value: 'b', label: '前起舱' },
				{ value: 'c', label: '15框-65框货舱右侧、地板' },
				{ value: 'd', label: '15框-65框货舱左侧、顶部' },
				{ value: 'e', label: '发动机短舱' },
				{ value: 'f', label: '发动机短舱、吊挂（1、2发）' },
				{ value: 'g', label: '发动机短舱、吊挂（3、4发）' },
				{ value: 'h', label: '前后翼身整流罩、中央翼' },
				{ value: 'i', label: '左机翼' },
				{ value: 'j', label: '右机翼' },
				{ value: 'k', label: '左主起整流罩' },
				{ value: 'l', label: '下设备舱15-54框' },
				{ value: 'm', label: '65-83框' },
				{ value: 'n', label: '垂尾、平尾' },
			],
			amm: [
				{ value: 'a', label: 'aa' },
				{ value: 'b', label: 'bb' },
				{ value: 'c', label: 'cc' },
			],
			examine: [
				{ value: 'a', label: 'aa' },
				{ value: 'b', label: 'bb' },
				{ value: 'c', label: 'cc' },
			],
			representative: [
				{ value: 'a', label: 'aa' },
				{ value: 'b', label: 'bb' },
				{ value: 'c', label: 'cc' },
			],
			productModel: [
				{ value: 'a', label: 'aa' },
				{ value: 'b', label: 'bb' },
				{ value: 'c', label: 'cc' },
			],
			responsibleUnit: [
				{ value: 'a', label: 'aa' },
				{ value: 'b', label: 'bb' },
				{ value: 'c', label: 'cc' },
			],
			handleUnit: [
				{ value: 'a', label: 'aa' },
				{ value: 'b', label: 'bb' },
				{ value: 'c', label: 'cc' },
			],
		};
	},
	methods: {
		// 初始化，获取组织
		initData() {
			// this.currentMico = new Recorder({
			//   sampleBits: 16,
			//   sampleRate: 16000,
			// });
			api
				.getGroup()
				.then((res) => {
					this.organization = res.data;
					// this.organization=JSON.parse(JSON.stringify(this.organization))
				})
				.catch((err) => {
					ElMessage.error(err.msg);
				});
		},

		//保存质量单据头部信息
		submitMainForm() {
			this.$refs['mainForm'].validate((vaild) => {
				if (vaild) {
					let mainData = {
						model: this.formMainData.model, //机型
						batchNumber: this.formMainData.batchNumber, //架次
						checkType: this.formMainData.checkType, //检验类型
						checkProfessional: this.formMainData.checkProfessional, //检验专业
						proposedTime: this.formMainData.proposedTime, //提出日期
					};
					// console.log("接收前的this.formMainData", this.formMainData);
					api
						.saveMainData(mainData)
						.then((res) => {
							// console.log(res);
							this.formMainData = res.data;
							// console.log("接收后的this.formMainData", this.formMainData);
							ElMessage.success('保存成功！');
						})
						.catch((err) => {
							// console.log(err);
							ElMessage.error(err);
						});
				} else {
					return false;
				}
			});
		},

		//新增子表
		addSunInfo() {
			///////////////////////////////////
			if (typeof this.formMainData.id == 'undefined') {
				ElMessage.error('请先填写表头信息并保存！');
				return false;
			}
			//////////////////////////
			if (this.formSubData.length != 0) {
				let newobj = JSON.parse(
					JSON.stringify(this.formSubData[this.formSubData.length - 1])
				);
				// newobj.mico = new Recorder();
				newobj.isEdit = true;
				newobj.description = '';
				newobj.micotime = 0;
				newobj.id = null;
				// console.log('newobj',newobj)
				this.formSubData.push(newobj);
			} else {
				this.formSubData.push({
					///////////////////////
					id: null,
					////////////////////////
					position: '',
					description: '',
					recorder: '',
					amm: '',
					examine: '',
					representative: '',
					productModel: '',
					responsibleUnit: '',
					handleUnit: '',
					recordPath: '',
					remark: '',
					// mico: new Recorder({
					// 	sampleBits: 16,
					// 	sampleRate: 16000,
					// }),
					isEdit: true,
					micotime: 0,
				});
			}
			// 聚焦
			setTimeout(() => {
				this.$nextTick(() => {
					document
						.getElementById('descid_' + (this.formSubData.length - 1))
						.focus();
					// const refTable=this.$refs.myTable.$refs.bodyWrapper;
					// refTable.scrollTop=refTable.scrollHeight;
					// ////////////////////////
					// document.getElementById('subTable').bodyWrapper.scrollTop = document.getElementById('subTable').bodyWrapper.scrollHeight;

					var subTable = document.getElementById('subTable');
					subTable.scrollTop = subTable.scrollHeight;
				});
			}, 100);
		},

		// 打开录音弹窗
		openRecordDialog(row, index) {
			this.$refs['gidForm'].validate((vaild) => {
				if (vaild) {
					// console.log('row.mico',row.mico)
					this.currentMico = new Recorder({
						sampleBits: 16,
						sampleRate: 16000,
					});
					this.currentMicoIndex = index;
					// console.log('currentMicoIndex',this.currentMicoIndex);
					this.currentMicoDesc = row.description;
					this.recordDialog = true;
					this.time = this.formSubData[this.currentMicoIndex].micotime; //显示当前录音时间
					// this.time = row.mico.duration;//显示当前录音时间
					// console.log('duration',this.time);
					// this.currentMico = JSON.parse(
					//   JSON.stringify(this.formSubData[this.currentMicoIndex].mico)
					// );
				} else {
					return false;
				}
			});
		},
		/** 设置录音*/
		startMico() {
			if (this.currentMico != null) {
				this.currentMico.destroy();
			}
			this.MicoisStop = false;
			this.currentMico = new Recorder({
				sampleBits: 16,
				sampleRate: 16000,
			});
			this.currentStatu = '正在录音';
			this.currentMico
				.start()
				.then((res) => {
					console.log(res);
				})
				.catch((err) => {
					console.log(err);
				});
			//var that=this;
			this.currentMico.onprogress = (param) => {
				this.time = param.duration;
				//console.log(param.duration);
			};
			// row.mico.stop()
		},
		stopMico() {
			this.currentStatu = '结束录音';
			this.currentMico.stop();
			this.MicoisStop = false;
			this.formSubData[this.currentMicoIndex].mico = this.currentMico;
			console.log('this.currentMico', this.currentMico);
			// console.log('this.formSubData[this.currentMicoIndex].mico',this.formSubData[this.currentMicoIndex].mico);
			this.formSubData[this.currentMicoIndex].micotime = this.time;
		},
		pauseMico() {
			this.currentStatu = '结束录音播放';
			this.currentMico.stopPlay();
			// this.formSubData[this.currentMicoIndex].mico.stopPlay();
		},
		/**重播 */
		replayMico() {
			this.currentStatu = '正在播放录音';
			this.currentMico.play();
			// this.formSubData[this.currentMicoIndex].mico.play();
		},
		/**翻译 */
		transferMico(index) {
			//type two
			// console.log('翻译index',index)
			if (index !== '') {
				this.currentMicoIndex = index;
			}
			let date = new Date();
			// let fileName = this.formMainData.id + '-' + this.currentMicoIndex + '.wav';
			let fileName = date.getTime() + '.wav';
			let formData = new FormData();
			let that = this;
			let wavBlob = this.formSubData[this.currentMicoIndex].mico.getWAVBlob();
			let uploadFile = new File([wavBlob], fileName, { type: 'audio/wav' });
			formData.append('uploadFile', uploadFile);
			// console.log('this.currentMicoIndex',this.currentMicoIndex);
			let nowIndex = this.currentMicoIndex;
			console.log('this.formSubData', this.formSubData);
			//formData.append('mainDir', window.config.downloadPath)
			//formData.append('fileName', fileName)
			//api.uploadWavFile(formData).then(res => {
			//that.formSubData[this.currentMicoIndex].recordPath = res.data;
			api
				// .translate(formData, this.organization.gid, this.formMainData.id)
				.translate(
					formData,
					that.organization.gid,
					that.formMainData.id,
					that.formSubData[nowIndex].id
				)
				.then((res1) => {
					// api.translate(formData,'1',this.formMainData.id).then(res1 => {
					that.formSubData[nowIndex].description = res1.data.description;
					that.currentMicoDesc = res1.data.description;
					that.formSubData[nowIndex].id = res1.data.id;
					// console.log('nowIndex',nowIndex);
					// console.log('that.currentMicoDesc',that.currentMicoDesc);
					console.log('that.formSubData', that.formSubData);
				})
				.catch((err1) => {
					ElMessage.error(err1.message);
				});
		},

		//保存质量单据子表信息
		saveSunInfo(row, index) {
			let subData = [
				{
					position: row.position, //部位
					amm: row.amm, //机务项目检查者
					examine: row.examine, //检验检查项目检验者
					representative: row.representative, //代表检查项目检验者
					productModel: row.productModel, //成品型号
					responsibleUnit: row.responsibleUnit, //责任单位
					handleUnit: row.handleUnit, //处理单位
					description: row.description, //故障描述
					remark: row.remark, //备注
					recordPath: row.recordPath, //语音存储路径
				},
			];
			// console.log("保存前的this.formSubData[index]", this.formSubData[index]);
			// console.log("subData", subData);
			api
				.saveSubData(this.formMainData.id, subData, this.formSubData[index].id)
				.then((res) => {
					let obj = res.data;
					obj.isEdit = false;
					obj.mico = row.mico;
					this.formSubData[index].isEdit = false;
					this.formSubData[index] = obj[0];
					ElMessage.success('保存成功！');

					// row=obj;
					// ////////////////////
					// console.log("res.data", res.data);
					// console.log("row", row);
				})
				.catch((err) => {
					ElMessage.error(err);
				});
		},
		editSunInfo(index) {
			this.formSubData[index].isEdit = !this.formSubData[index].isEdit;
		},
		delSunInfo(row, index) {
			if (typeof row.id == 'undefined') {
				this.formSubData.splice(index, 1);
			} else {
				api
					.delSubData(row.id)
					.then((res) => {
						console.log(res);
						this.formSubData[index].isEdit = !this.formSubData[index].isEdit;
					})
					.catch((err) => {
						ElMessage.error(err);
					});
			}
		},
		translateAll() {
			this.$refs['gidForm'].validate((vaild) => {
				if (vaild) {
					let that = this;
					if (this.formSubData.length == 0) {
						// this.$message({
						//   message:'没有可翻译的子表信息',
						//   type:'warning'
						// })
						ElMessage.error('没有可翻译的子表信息');
					} else {
						//let promiseUploadList = [];
						this.formSubData.forEach((item, index) => {
							that.transferMico(index);
							console.log('item', item, 'index', index);
						});
						console.log('all this.formSubData', this.formSubData);
					}
				} else {
					return false;
				}
			});
		},
		//获取录音权限
		getPermission() {
			Recorder.getPermission().then(() => {
				console.log('获取录音权限成功！');
			}),
				(error) => {
					console.log(`${error.name}:${error.message}`);
				};
		},
		saveTransferMico() {
			this.formSubData[this.currentMicoIndex].description =
				this.currentMicoDesc;
			ElMessage.success('保存成功！');
		},
		//关闭弹窗前
		// beforeClose(){
		//   //关闭录音后，停止录制
		//   if(this.MicoisStop==false){
		//     this.stopMico();
		//   }
		// },
		//关闭录音弹窗
		closeMicoDia() {
			// if (this.currentMico != null) {
			// 	this.currentMico.destroy();
			// }

			this.recordDialog = false;
			// this.time = 0;
			this.currentStatu = null;
			this.currentMicoDesc = null;
			// console.log("this.currentMico close", this.currentMico);
			//调用保存函数，保存语音信息
			this.saveTransferMico();
			// this.currentMico = null;
			console.log(
				'关闭弹窗：this.formSubData[this.currentMicoIndex].mico',
				this.formSubData[this.currentMicoIndex].mico
			);
		},

		//添加hotword标签页
		Addhotword() {
			this.$emit('addhotword');

			//mitt实现全局总线
			// bus.emit('getOrgan',this.organization.gid)

			//消息订阅与发布
			// setTimeout(pubsub.publish('getOrgan',this.organization.gid),3000)
		},
	},
};
</script>

<style scoped>
.el-button {
	margin-left: 20px;
}

.hotword {
	margin-left: 27px;
	margin-right: 5px;
}

.el-row {
	margin-bottom: 10px;
}

.title {
	text-align: center;
}

.el-form-item {
	margin-right: 2px !important;
}

.el-table .el-button {
	margin-left: 3px;
}

.operation-button,
.dialog-row {
	margin-bottom: 5px;
}

.circle-button {
	height: 50px;
	/* line-height: 50px; */
	width: 50px;
}

.add-page,
.dialog-row {
	font-size: 30px;
}
.textarea-size {
	font-size: 20px;
}
</style>
