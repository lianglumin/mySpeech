import axios from 'axios';

let api = {};

axios.defaults.baseURL = window.config.baseURL;

//请求拦截器
axios.interceptors.request.use((config) => {
	config.headers['Content-Type'] = 'application/json;charset=utf-8';
	if (config.url == '/translate') {
		//config.url = window.config.fileUploadUrl+"/uploadFile"
		config.headers['Content-Type'] = 'multipart/form-data';
	}
	return config;
});

//响应拦截器
axios.interceptors.response.use((resp) => {
	let respData = resp.data;
	if (respData.code != 200) {
		return Promise.reject(respData);
	} else {
		return respData;
	}
});

api.saveMainData = function (mainData) {
	return axios.post('/saveHeadInfo', mainData);
};

//////////
api.saveSubData = function (mainDataId, subData) {
	return axios.post('/saveDetailsInfo', subData, {
		params: {
			pid: mainDataId,
		},
	});
};

// api.translate = function (recordPath) {
//     return axios.post("/translate", {
//         recordPath: recordPath
//     })
// }

api.translate = function (uploadFile, gId, mainId) {
	return axios.post('/translate', uploadFile, {
		params: {
			gId: gId,
			mainId: mainId,
		},
	});
};

api.searchMainData = function (mainData) {
	return axios.post('/search', mainData);
};

api.searchSubData = function (pid) {
	return axios.post('/showDetial', '', {
		params: {
			pid: pid,
		},
	});
};

api.delSubData = function (deleteId) {
	return axios.post('/deleteDetailsInfo', '', {
		params: {
			id: deleteId,
		},
	});
};

api.uploadWavFile = function (fileBlob) {
	return axios.post('/uploadFile', fileBlob);
};

//查询组织
api.getGroup = function () {
	return axios.post('/getGroup');
};

//按组织查询热词
api.getHotWords = function (gid) {
	return axios.get('/getHotWords?gid=' + gid);
};

//按组织保存热词
api.saveHotWords = function (gid, AddData) {
	return axios.post('/saveHotWords', AddData, {
		params: {
			gid: gid,
		},
	});
};

//按组织删除热词
api.deleteHotWords = function (mainData) {
	return axios.post('/deleteHotWords', mainData, {});
};

export default api;
