
function maintainWhiteList() {
    var insureType = $('#insureType').val();
    var whitelistType = $('#whitelistType').val();
    var whitelistData = $('#whitelistData').val();
    var idNo = $('#idNo').val();
    var relationshipId = $('#relationshipId').val();
    var statusId = $('#statusId').val();
    var memo = $('#memo').val();
    var userId = document.querySelector('input[name="userId"]').value;
    whitelistData = whitelistData.trim();
    idNo = idNo.trim();

    if (!whitelistData) {
        alert("白名單資料為必填");
        return;
    }
    if (!idNo) {
        alert("白名單ID為必填");
        return;
    }
    if (!relationshipId) {
        alert("關係為必填");
        return;
    }
    if (!statusId) {
        alert("狀態碼為必填");
        return;
    }
    if (whitelistType === '1') {
		//如果白名單類型為手機
        // 檢查 whitelistData 是否為數字
        if (/^(?!(09\d{8})$)/.test(whitelistData)) {
            alert('手機號碼格式錯誤。');
            return;
        }
    }
    if (whitelistType == "2" && !(/^([\w]+)(\.[\w]+)*@([\w]+)(\.[\w]+)+$/.test(whitelistData))) {
        alert('信箱格式錯誤。');
        return;
    }
    if (!confirm("確定要新增白名單?")) {
        return;
    }
    document.getElementById('loading').style.display = 'block';
    $.ajax({
        url: contextPath + '/frontend/maintainWhiteList/insert',
        type: "post",
        data: {
            insureType: insureType,
            whitelistType: whitelistType,
            whitelistData: whitelistData,
            idNo: idNo,
            relationshipId: relationshipId,
            statusId: statusId,
            memo: memo,
            userId: userId
        },
        beforeSend: function(xhr) {
            xhr.setRequestHeader(header, token);
        },
        success: function(data) {
            var cleanData = DOMPurify.sanitize(data, purifyConfig);
            $("#page-right").html(cleanData);
            
            var tempDiv = document.createElement("div");
			tempDiv.innerHTML = cleanData;
			// 找到具有 id="errorMsg" 的元素
			var errorMsgElement = tempDiv.querySelector("#errorMsg");
			if(null!=errorMsgElement && errorMsgElement.textContent != "" && errorMsgElement.textContent != null){
				alert(errorMsgElement.textContent);
			}else{
				alert("新增成功");
			}
        }
    });
}

function queryWhiteListForInsertWhite(sortField, sortDirection) {
    var insureType = $('#insureType').val();
    var whitelistType = $('#whitelistType').val();
    var whitelistData = $('#whitelistData').val();
    var idNo = $('#idNo').val();
    var relationshipId = $('#relationshipId').val();
    var statusId = $('#statusId').val();
    var memo = $('#memo').val();
    var pageSize = 10;
    if(null!=document.getElementById('pageSize')){
		pageSize = document.getElementById('pageSize').value;
	}
    document.getElementById('loading').style.display = 'block';
    $.ajax({
        url: contextPath + '/frontend/maintainWhiteList/query',
        type: "post",
        data: {
            insureType: insureType,
            whitelistType: whitelistType,
            whitelistData: whitelistData,
            idNo: idNo,
            relationshipId: relationshipId,
            statusId: statusId,
            memo: memo,
            pageSize: pageSize,
            sortField: sortField,
            sortDirection: sortDirection
        },
        beforeSend: function(xhr) {
            xhr.setRequestHeader(header, token);
        },
        success: function(data) {
            var cleanData = DOMPurify.sanitize(data, purifyConfig);
            $("#page-right").html(cleanData);
            
            var tempDiv = document.createElement("div");
			tempDiv.innerHTML = cleanData;
			// 找到具有 id="errorMsg" 的元素
			var errorMsgElement = tempDiv.querySelector("#errorMsg");
			if(null!=errorMsgElement && errorMsgElement.textContent != "" && errorMsgElement.textContent != null){
				alert(errorMsgElement.textContent);
			}
			updateSortStatus(sortField, sortDirection);
			
			// 將原本的查詢條件保留
		    document.getElementById('queryInsureType').value = document.getElementById('insureType').value;
		    document.getElementById('queryWhitelistType').value = document.getElementById('whitelistType').value;
		    document.getElementById('queryWhitelistData').value = document.getElementById('whitelistData').value;
		    document.getElementById('queryIdNo').value = document.getElementById('idNo').value;
		    document.getElementById('queryRelationshipId').value = document.getElementById('relationshipId').value;
		    document.getElementById('queryStatusId').value = document.getElementById('statusId').value;
		    document.getElementById('queryMemo').value = document.getElementById('memo').value;
        }
    });
}

function fillQueryConditions(rowIndex) {
    const insureType = document.getElementById('insureType_' + rowIndex);
    const whitelistType = document.getElementById('whitelistType_' + rowIndex);
    const whitelistData = document.getElementById('whitelistData_' + rowIndex);
    const idNo = document.getElementById('idNo_' + rowIndex);
    const relationshipId = document.getElementById('relationshipId_' + rowIndex);
    const statusId = document.getElementById('statusId_' + rowIndex);
    const memo = document.getElementById('memo_' + rowIndex);

    // 將單據資料帶到查詢欄位
    document.getElementById('insureType').value = insureType.textContent;
    document.getElementById('whitelistType').value = whitelistType.textContent;
    document.getElementById('whitelistData').value = whitelistData.textContent;
    document.getElementById('idNo').value = idNo.textContent;
    document.getElementById('relationshipId').value = relationshipId.textContent;
    document.getElementById('statusId').value = statusId.textContent;
    document.getElementById('memo').value = memo.textContent;

    //改變按鈕
    const queryButton = document.getElementById('queryButton');
    const insertButton = document.getElementById('insertButton');
    const clearButton = document.getElementById('clearButton');
    const updateButton = document.getElementById('updateButton');
    const deleteButton = document.getElementById('deleteButton');
    const cancelButton = document.getElementById('cancelButton');

    queryButton.style.display = 'none';
    insertButton.style.display = 'none';
    clearButton.style.display = 'none';
    updateButton.style.display = 'inline-block';
    deleteButton.style.display = 'inline-block';
    cancelButton.style.display = 'inline-block';
    
    //修改或刪除時，白名單資料與白名單ID不允許調整
    document.getElementById('whitelistData').disabled = true;
    document.getElementById('idNo').disabled = true;
}

function clearConditions() {
    //初始查詢條件
    document.getElementById('insureType').value = 'CAR';
    document.getElementById('whitelistType').value = '1';
    document.getElementById('whitelistData').value = '';
    document.getElementById('idNo').value = '';
    document.getElementById('relationshipId').value = '';
    document.getElementById('statusId').value = '';
    document.getElementById('memo').value = '';

    //改變按鈕
    const queryButton = document.getElementById('queryButton');
    const insertButton = document.getElementById('insertButton');
    const clearButton = document.getElementById('clearButton');
    const updateButton = document.getElementById('updateButton');
    const deleteButton = document.getElementById('deleteButton');
    const cancelButton = document.getElementById('cancelButton');

    queryButton.style.display = 'inline-block';
    insertButton.style.display = 'inline-block';
    clearButton.style.display = 'inline-block';
    updateButton.style.display = 'none';
    deleteButton.style.display = 'none';
    cancelButton.style.display = 'none';
    
    //修改或刪除時，白名單資料與白名單ID不允許調整
    document.getElementById('whitelistData').disabled = false;
    document.getElementById('idNo').disabled = false;
}

function updateWhiteList() {
    var insureType = $('#insureType').val();
    var whitelistType = $('#whitelistType').val();
    var whitelistData = $('#whitelistData').val();
    var idNo = $('#idNo').val();
    var relationshipId = $('#relationshipId').val();
    var statusId = $('#statusId').val();
    var memo = $('#memo').val();
    var userId = document.querySelector('input[name="userId"]').value;
    whitelistData = whitelistData.trim();
    idNo = idNo.trim();
    
    if (!whitelistData) {
        alert("白名單資料為必填");
        return;
    }
    if (!idNo) {
        alert("白名單ID為必填");
        return;
    }
    if (!relationshipId) {
        alert("關係為必填");
        return;
    }
    if (!statusId) {
        alert("狀態碼為必填");
        return;
    }
    if (!confirm("確定要修改白名單?")) {
        return;
    }
    document.getElementById('loading').style.display = 'block';
    $.ajax({
        url: contextPath + '/frontend/maintainWhiteList/update',
        type: "post",
        data: {
            insureType: insureType,
            whitelistType: whitelistType,
            whitelistData: whitelistData,
            idNo: idNo,
            relationshipId: relationshipId,
            statusId: statusId,
            memo: memo,
            userId: userId
        },
        beforeSend: function(xhr) {
            xhr.setRequestHeader(header, token);
        },
        success: function(data) {
            var cleanData = DOMPurify.sanitize(data, purifyConfig);
            $("#page-right").html(cleanData);
            
            var tempDiv = document.createElement("div");
			tempDiv.innerHTML = cleanData;
			// 找到具有 id="errorMsg" 的元素
			var errorMsgElement = tempDiv.querySelector("#errorMsg");
			if(null!=errorMsgElement && errorMsgElement.textContent != "" && errorMsgElement.textContent != null){
				alert(errorMsgElement.textContent);
			}else{
				alert("修改成功");	
			}
        }
    });
}

function deleteWhiteList() {
    var insureType = $('#insureType').val();
    var whitelistType = $('#whitelistType').val();
    var whitelistData = $('#whitelistData').val();
    var idNo = $('#idNo').val();
    var relationshipId = $('#relationshipId').val();
    var statusId = $('#statusId').val();
    var memo = $('#memo').val();

    whitelistData = whitelistData.trim();
    idNo = idNo.trim();

    //保留原本的查詢條件
    var queryInsureType = document.getElementById('queryInsureType').value;
    var queryWhitelistType = document.getElementById('queryWhitelistType').value;
    var queryWhitelistData = document.getElementById('queryWhitelistData').value;
    var queryIdNo = document.getElementById('queryIdNo').value;
    var queryRelationshipId = document.getElementById('queryRelationshipId').value;
    var queryStatusId = document.getElementById('queryStatusId').value;
    var queryMemo = document.getElementById('queryMemo').value;
	queryWhitelistData = queryWhitelistData.trim();
	queryIdNo = queryIdNo.trim();
	
    if (!whitelistData) {
        alert("白名單資料為必填");
        return;
    }
    if (!idNo) {
        alert("白名單ID為必填");
        return;
    }
    if (!confirm("確定要刪除白名單?")) {
        return;
    }
    document.getElementById('loading').style.display = 'block';
    $.ajax({
        url: contextPath + '/frontend/maintainWhiteList/delete',
        type: "post",
        data: {
            insureType: insureType,
            whitelistType: whitelistType,
            whitelistData: whitelistData,
            idNo: idNo,
            relationshipId: relationshipId,
            statusId: statusId,
            memo: memo,
            queryInsureType: queryInsureType,
            queryWhitelistType: queryWhitelistType,
            queryWhitelistData: queryWhitelistData,
            queryIdNo: queryIdNo,
            queryRelationshipId: queryRelationshipId,
            queryStatusId: queryStatusId,
            queryMemo: queryMemo
        },
        beforeSend: function(xhr) {
            xhr.setRequestHeader(header, token);
        },
        success: function(data) {
            var cleanData = DOMPurify.sanitize(data, purifyConfig);
            $("#page-right").html(cleanData);
            
            var tempDiv = document.createElement("div");
			tempDiv.innerHTML = cleanData;
			// 找到具有 id="errorMsg" 的元素
			var errorMsgElement = tempDiv.querySelector("#errorMsg");
			if(null!=errorMsgElement && errorMsgElement.textContent != "" && errorMsgElement.textContent != null){
				alert(errorMsgElement.textContent);
			}else{
				alert("刪除成功");
			}
        }
    });
}

function queryPolicy(sortField, sortDirection) {
    var settleDate = $('#settleDate').val();
    var queryType = $('#queryType').val();
    var queryData = $('#queryData').val();
 	var pageSize = 10;
    if(null!=document.getElementById('pageSize')){
		pageSize = document.getElementById('pageSize').value;
	}
    if (!settleDate) {
        alert("簽單日為必填");
        return;
    }

    queryData = queryData.trim();
    if (!queryData) {
        alert("查詢資料為必填");
        return;
    }
    if (queryType == "1" && /^(?!(09\d{8})$)/.test(queryData)) {
        alert('手機號碼格式錯誤。');
        return;
    }
    if (queryType == "2" && !(/^([\w]+)(\.[\w]+)*@([\w]+)(\.[\w]+)+$/.test(queryData))) {
        alert('信箱格式錯誤。');
        return;
    }
    document.getElementById('loading').style.display = 'block';
    $.ajax({
        url: contextPath + '/frontend/queryDuplicatePolicyInfo/query',
        type: "post",
        data: {
            settleDate: settleDate,
            queryType: queryType,
            queryData: queryData,
            pageSize: pageSize,
            sortField: sortField,
            sortDirection: sortDirection
        },
        beforeSend: function(xhr) {
            xhr.setRequestHeader(header, token);
        },
        success: function(data) {
            var cleanData = DOMPurify.sanitize(data, purifyConfig);
            $("#page-right").html(cleanData);
            
            var tempDiv = document.createElement("div");
    		tempDiv.innerHTML = cleanData;
    		// 找到具有 id="errorMsg" 的元素
    		var errorMsgElement = tempDiv.querySelector("#errorMsg");
    		if(null!=errorMsgElement && errorMsgElement.textContent != "" && errorMsgElement.textContent != null){
				alert(errorMsgElement.textContent);
			}
			updateSortStatus(sortField, sortDirection);
        }
    });
}

function queryWhiteList(sortField, sortDirection) {
    var pageSize = 10;
    if(null!=document.getElementById('pageSize')){
		pageSize = document.getElementById('pageSize').value;
	}
    document.getElementById('loading').style.display = 'block';
    let data = getDataFormFields('value');
    data['pageSize'] = pageSize;
    data['sortField'] = sortField;
    data['sortDirection'] = sortDirection;
    $.ajax({
        url: contextPath + '/frontend/queryWhiteList/query',
        type: "post",
        contentType: 'application/json',
        data: JSON.stringify(data),
        beforeSend: function(xhr) {
            xhr.setRequestHeader(header, token);
        },
        success: function(data) {
            var cleanData = DOMPurify.sanitize(data, purifyConfig);
            $("#page-right").html(cleanData);

            var tempDiv = document.createElement("div");
    		tempDiv.innerHTML = cleanData;
    		// 找到具有 id="errorMsg" 的元素
    		var errorMsgElement = tempDiv.querySelector("#errorMsg");
    		if(null!=errorMsgElement && errorMsgElement.textContent != "" && errorMsgElement.textContent != null){
				alert(errorMsgElement.textContent);
			}
			updateSortStatus(sortField, sortDirection);
        }
    });
}


function changeWhiteListPage(page, sortField, sortDirection){
    var pageSize = document.getElementById('pageSize');
    var endPageNum = document.querySelector('input[name="endPageNum"]').value;
	var changePageNum = document.querySelector('input[name="changePageNum"]').value;
	if (sortField === 'null') {
        sortField = ""; 
    }
    if (sortDirection === 'null') {
        sortDirection = ""; 
    }
	if(page==='up'){
		//上一頁
		if(changePageNum == 1){
			alert("已經是第一頁");
			return;
		}
		page = parseInt(changePageNum) -1;//目前頁數-1
	}
	if(page==='down'){
		//上一頁
		if(changePageNum == endPageNum){
			alert("已經是最後一頁");
			return;
		}
		page = parseInt(changePageNum) +1;//目前頁數+1
	}
    document.getElementById('loading').style.display = 'block';
    let data = getDataFormFields('value');
    data['changePageNum'] = page;
    data['pageSize'] = pageSize.value;
    data['sortField'] = sortField;
    data['sortDirection'] = sortDirection;
    $.ajax({
        url: contextPath + '/frontend/queryWhiteList/query',
        type: "post",
        contentType: 'application/json',
        data: JSON.stringify(data),
        beforeSend: function(xhr) {
            xhr.setRequestHeader(header, token);
        },
        success: function(data) {
            var cleanData = DOMPurify.sanitize(data, purifyConfig);
            $("#page-right").html(cleanData);
            updateSortStatus(sortField, sortDirection);
        }
    });
}


function changeListPageForInsert(page, sortField, sortDirection){
	var insureType = $('#insureType').val();
    var whitelistType = $('#whitelistType').val();
    var whitelistData = $('#whitelistData').val();
    var idNo = $('#idNo').val();
    var relationshipId = $('#relationshipId').val();
    var statusId = $('#statusId').val();
    var memo = $('#memo').val();
    var pageSize = document.getElementById('pageSize');
    
    //判斷如果已經有點下方單據的序號
    //則重新查詢要依照原本的查詢條件
    const updateButton = document.getElementById('updateButton');
	if(updateButton.style.display=='inline-block'){//已經是修改按鈕 表示有點過序號
		insureType = document.getElementById('queryInsureType').value;
	    whitelistType = document.getElementById('queryWhitelistType').value;
	    whitelistData = document.getElementById('queryWhitelistData').value;
	    idNo = document.getElementById('queryIdNo').value;
	    relationshipId = document.getElementById('queryRelationshipId').value;
	    statusId = document.getElementById('queryStatusId').value;
	    memo = document.getElementById('queryMemo').value;
	}

    var endPageNum = document.querySelector('input[name="endPageNum"]').value;
	var changePageNum = document.querySelector('input[name="changePageNum"]').value;
	if (sortField === 'null') {
        sortField = ""; 
    }
    if (sortDirection === 'null') {
        sortDirection = ""; 
    }
	if(page==='up'){
		//上一頁
		if(changePageNum == 1){
			alert("已經是第一頁");
			return;
		}
		page = parseInt(changePageNum) -1;//目前頁數-1
	}
	if(page==='down'){
		//上一頁
		if(changePageNum == endPageNum){
			alert("已經是最後一頁");
			return;
		}
		page = parseInt(changePageNum) +1;//目前頁數+1
	}
    document.getElementById('loading').style.display = 'block';
    $.ajax({
        url: contextPath + '/frontend/maintainWhiteList/query',
        type: "post",
        data: {
			insureType: insureType,
            whitelistType: whitelistType,
            whitelistData: whitelistData,
            idNo: idNo,
            relationshipId: relationshipId,
            statusId: statusId,
            memo: memo,
            changePageNum: page,
            pageSize: pageSize.value,
            sortField: sortField,
            sortDirection: sortDirection
        },
        beforeSend: function(xhr) {
            xhr.setRequestHeader(header, token);
        },
        success: function(data) {
            var cleanData = DOMPurify.sanitize(data, purifyConfig);
            $("#page-right").html(cleanData);
            updateSortStatus(sortField, sortDirection);
            
            // 將原本的查詢條件保留
		    document.getElementById('queryInsureType').value = document.getElementById('insureType').value;
		    document.getElementById('queryWhitelistType').value = document.getElementById('whitelistType').value;
		    document.getElementById('queryWhitelistData').value = document.getElementById('whitelistData').value;
		    document.getElementById('queryIdNo').value = document.getElementById('idNo').value;
		    document.getElementById('queryRelationshipId').value = document.getElementById('relationshipId').value;
		    document.getElementById('queryStatusId').value = document.getElementById('statusId').value;
		    document.getElementById('queryMemo').value = document.getElementById('memo').value;
        }
    });
}

function changeDupInfoPage(page, sortField, sortDirection) {
    var settleDate = $('#settleDate').val();
    var queryType = $('#queryType').val();
    var queryData = $('#queryData').val();
	var pageSize = document.getElementById('pageSize');
    if (!settleDate) {
        alert("簽單日為必填");
        return;
    }

    queryData = queryData.trim();
    if (!queryData) {
        alert("查詢資料為必填");
        return;
    }
    var endPageNum = document.querySelector('input[name="endPageNum"]').value;
	var changePageNum = document.querySelector('input[name="changePageNum"]').value;
	if (sortField === 'null') {
        sortField = ""; 
    }
    if (sortDirection === 'null') {
        sortDirection = ""; 
    }
	if(page==='up'){
		//上一頁
		if(changePageNum == 1){
			alert("已經是第一頁");
			return;
		}
		page = parseInt(changePageNum) -1;//目前頁數-1
	}
	if(page==='down'){
		//上一頁
		if(changePageNum == endPageNum){
			alert("已經是最後一頁");
			return;
		}
		page = parseInt(changePageNum) +1;//目前頁數+1
	}
    document.getElementById('loading').style.display = 'block';
    $.ajax({
        url: contextPath + '/frontend/queryDuplicatePolicyInfo/query',
        type: "post",
        data: {
            settleDate: settleDate,
            queryType: queryType,
            queryData: queryData,
            changePageNum: page,
            pageSize: pageSize.value,
            sortField: sortField,
            sortDirection: sortDirection
        },
        beforeSend: function(xhr) {
            xhr.setRequestHeader(header, token);
        },
        success: function(data) {
            var cleanData = DOMPurify.sanitize(data, purifyConfig);
            $("#page-right").html(cleanData);
            updateSortStatus(sortField, sortDirection);
        }
    });
}

//業務員停招start
function clearIneffStaffConditions() {
	document.getElementById('operatorCode').value = '';
    document.getElementById('staffLicenseNo').value = '';
	document.getElementById('startDate').value = '';
    document.getElementById('endDate').value = '';
    document.getElementById('memo').value = '';
}

function clearMaintainIneffStaffConditions(){
	//初始查詢條件
	clearIneffStaffConditions();
    
	//改變按鈕
    const queryButton = document.getElementById('queryButton');
    const insertButton = document.getElementById('insertButton');
    const clearButton = document.getElementById('clearButton');
    const updateButton = document.getElementById('updateButton');
    const deleteButton = document.getElementById('deleteButton');
    const cancelButton = document.getElementById('cancelButton');

    queryButton.style.display = 'inline-block';
    insertButton.style.display = 'inline-block';
    clearButton.style.display = 'inline-block';
    updateButton.style.display = 'none';
    deleteButton.style.display = 'none';
    cancelButton.style.display = 'none';
    
    //修改或刪除時，白名單資料與白名單ID不允許調整
    document.getElementById('operatorCode').disabled = false;
    document.getElementById('staffLicenseNo').disabled = false;
}


function changeQueryIneffStaffPage(page, sortField, sortDirection){
	var operatorCode = $('#operatorCode').val();
    var staffLicenseNo = $('#staffLicenseNo').val();
    var startDate = $('#startDate').val();
    var endDate = $('#endDate').val();
    var memo = $('#memo').val();
    var pageSize = document.getElementById('pageSize');
    var endPageNum = document.querySelector('input[name="endPageNum"]').value;
	var changePageNum = document.querySelector('input[name="changePageNum"]').value;
	if (sortField === 'null') {
        sortField = ""; 
    }
    if (sortDirection === 'null') {
        sortDirection = ""; 
    }
	if(page==='up'){
		//上一頁
		if(changePageNum == 1){
			alert("已經是第一頁");
			return;
		}
		page = parseInt(changePageNum) -1;//目前頁數-1
	}
	if(page==='down'){
		//上一頁
		if(changePageNum == endPageNum){
			alert("已經是最後一頁");
			return;
		}
		page = parseInt(changePageNum) +1;//目前頁數+1
	}
    document.getElementById('loading').style.display = 'block';
    $.ajax({
        url: contextPath + '/frontend/queryIneffStaff/query',
        type: "post",
        data: {
			insureType: operatorCode,
            whitelistType: staffLicenseNo,
            startDate: startDate,
            endDate: endDate,
            memo: memo,
            changePageNum: page,
            pageSize: pageSize.value,
            sortField: sortField,
            sortDirection: sortDirection
        },
        beforeSend: function(xhr) {
            xhr.setRequestHeader(header, token);
        },
        success: function(data) {
            var cleanData = DOMPurify.sanitize(data, purifyConfig);
            $("#page-right").html(cleanData);
            updateSortStatus(sortField, sortDirection);
        }
    });
}

function queryIneffStaff(sortField, sortDirection) {
    var operatorCode = $('#operatorCode').val();
    var staffLicenseNo = $('#staffLicenseNo').val();
    var startDate = $('#startDate').val();
    var endDate = $('#endDate').val();
    var memo = $('#memo').val();
    var pageSize = 10;
    if(null!=document.getElementById('pageSize')){
		pageSize = document.getElementById('pageSize').value;
	}
    document.getElementById('loading').style.display = 'block';
    $.ajax({
        url: contextPath + '/frontend/queryIneffStaff/query',
        type: "post",
        data: {
            operatorCode: operatorCode,
            staffLicenseNo: staffLicenseNo,
            startDate: startDate,
            endDate: endDate,
            memo: memo,
            pageSize: pageSize,
            sortField: sortField,
            sortDirection: sortDirection
        },
        beforeSend: function(xhr) {
            xhr.setRequestHeader(header, token);
        },
        success: function(data) {
            var cleanData = DOMPurify.sanitize(data, purifyConfig);
            $("#page-right").html(cleanData);

            var tempDiv = document.createElement("div");
    		tempDiv.innerHTML = cleanData;
    		// 找到具有 id="errorMsg" 的元素
    		var errorMsgElement = tempDiv.querySelector("#errorMsg");
    		if(null!=errorMsgElement && errorMsgElement.textContent != "" && errorMsgElement.textContent != null){
				alert(errorMsgElement.textContent);
			}
			updateSortStatus(sortField, sortDirection);
        }
    });
}

function changeMaintainIneffStaffPage(page, sortField, sortDirection){
	var operatorCode = $('#operatorCode').val();
    var staffLicenseNo = $('#staffLicenseNo').val();
    var startDate = $('#startDate').val();
    var endDate = $('#endDate').val();
    var memo = $('#memo').val();
    var pageSize = document.getElementById('pageSize');
    
    //判斷如果已經有點下方單據的序號
    //則重新查詢要依照原本的查詢條件
    const updateButton = document.getElementById('updateButton');
	if(updateButton.style.display=='inline-block'){//已經是修改按鈕 表示有點過序號
		operatorCode = document.getElementById('queryOperatorCode').value;
	    staffLicenseNo = document.getElementById('queryStaffLicenseNo').value;
	    startDate = document.getElementById('queryStartDate').value;
	    endDate = document.getElementById('queryEndDate').value;
	    memo = document.getElementById('queryMemo').value;
	}

    var endPageNum = document.querySelector('input[name="endPageNum"]').value;
	var changePageNum = document.querySelector('input[name="changePageNum"]').value;
	if (sortField === 'null') {
        sortField = ""; 
    }
    if (sortDirection === 'null') {
        sortDirection = ""; 
    }
	if(page==='up'){
		//上一頁
		if(changePageNum == 1){
			alert("已經是第一頁");
			return;
		}
		page = parseInt(changePageNum) -1;//目前頁數-1
	}
	if(page==='down'){
		//上一頁
		if(changePageNum == endPageNum){
			alert("已經是最後一頁");
			return;
		}
		page = parseInt(changePageNum) +1;//目前頁數+1
	}
    document.getElementById('loading').style.display = 'block';
    $.ajax({
        url: contextPath + '/frontend/maintainIneffStaff/query',
        type: "post",
        data: {
			operatorCode: operatorCode,
            staffLicenseNo: staffLicenseNo,
            startDate: startDate,
            endDate: endDate,
            memo: memo,
            pageSize: pageSize,
            changePageNum: page,
            pageSize: pageSize.value,
            sortField: sortField,
            sortDirection: sortDirection
        },
        beforeSend: function(xhr) {
            xhr.setRequestHeader(header, token);
        },
        success: function(data) {
            var cleanData = DOMPurify.sanitize(data, purifyConfig);
            $("#page-right").html(cleanData);
            updateSortStatus(sortField, sortDirection);
            
            // 將原本的查詢條件保留
		    document.getElementById('queryOperatorCode').value = document.getElementById('operatorCode').value;
		    document.getElementById('queryStaffLicenseNo').value = document.getElementById('staffLicenseNo').value;
		    document.getElementById('queryStartDate').value = document.getElementById('startDate').value;
		    document.getElementById('queryEndDate').value = document.getElementById('endDate').value;
		    document.getElementById('queryMemo').value = document.getElementById('memo').value;
        }
    });
}

function fillIneffStaffQueryConditions(rowIndex) {
    const operatorCode = document.getElementById('operatorCode_' + rowIndex);
    const staffLicenseNo = document.getElementById('staffLicenseNo_' + rowIndex);
    const startDate = document.getElementById('startDate_' + rowIndex);
    const endDate = document.getElementById('endDate_' + rowIndex);
    const memo = document.getElementById('memo_' + rowIndex);

    // 將單據資料帶到查詢欄位
    document.getElementById('operatorCode').value = operatorCode.textContent;
    document.getElementById('staffLicenseNo').value = staffLicenseNo.textContent;
    document.getElementById('startDate').value = startDate.textContent;
    document.getElementById('endDate').value = endDate.textContent;
    document.getElementById('memo').value = memo.textContent;

    //改變按鈕
    const queryButton = document.getElementById('queryButton');
    const insertButton = document.getElementById('insertButton');
    const clearButton = document.getElementById('clearButton');
    const updateButton = document.getElementById('updateButton');
    const deleteButton = document.getElementById('deleteButton');
    const cancelButton = document.getElementById('cancelButton');

    queryButton.style.display = 'none';
    insertButton.style.display = 'none';
    clearButton.style.display = 'none';
    updateButton.style.display = 'inline-block';
    deleteButton.style.display = 'inline-block';
    cancelButton.style.display = 'inline-block';
    
    //修改或刪除時，經手人代號&業務員登錄證號(PK)不允許調整
    document.getElementById('operatorCode').disabled = true;
    document.getElementById('staffLicenseNo').disabled = true;
}

function maintainIneffStaffQuery(sortField, sortDirection) {
    var operatorCode = $('#operatorCode').val();
    var staffLicenseNo = $('#staffLicenseNo').val();
    var startDate = $('#startDate').val();
    var endDate = $('#endDate').val();
    var memo = $('#memo').val();
    var pageSize = 10;
    if(null!=document.getElementById('pageSize')){
		pageSize = document.getElementById('pageSize').value;
	}
    document.getElementById('loading').style.display = 'block';
    $.ajax({
        url: contextPath + '/frontend/maintainIneffStaff/query',
        type: "post",
        data: {
            operatorCode: operatorCode,
            staffLicenseNo: staffLicenseNo,
            startDate: startDate,
            endDate: endDate,
            memo: memo,
            pageSize: pageSize,
            sortField: sortField,
            sortDirection: sortDirection
        },
        beforeSend: function(xhr) {
            xhr.setRequestHeader(header, token);
        },
        success: function(data) {
            var cleanData = DOMPurify.sanitize(data, purifyConfig);
            $("#page-right").html(cleanData);
            
            var tempDiv = document.createElement("div");
			tempDiv.innerHTML = cleanData;
			// 找到具有 id="errorMsg" 的元素
			var errorMsgElement = tempDiv.querySelector("#errorMsg");
			if(null!=errorMsgElement && errorMsgElement.textContent != "" && errorMsgElement.textContent != null){
				alert(errorMsgElement.textContent);
			}
			updateSortStatus(sortField, sortDirection);
			
//			// 將原本的查詢條件保留
		    document.getElementById('queryOperatorCode').value = document.getElementById('operatorCode').value;
		    document.getElementById('queryStaffLicenseNo').value = document.getElementById('staffLicenseNo').value;
		    document.getElementById('queryStartDate').value = document.getElementById('startDate').value;
		    document.getElementById('queryEndDate').value = document.getElementById('endDate').value;
		    document.getElementById('queryMemo').value = document.getElementById('memo').value;
        }
    });
}

function insertIneffStaff() {
    var operatorCode = $('#operatorCode').val();
    var staffLicenseNo = $('#staffLicenseNo').val();
    var startDate = $('#startDate').val();
    var endDate = $('#endDate').val();
    var memo = $('#memo').val();
    var userId = document.querySelector('input[name="userId"]').value;
    operatorCode = operatorCode.trim();
    staffLicenseNo = staffLicenseNo.trim();

    if (!operatorCode) {
        alert("經手人代號為必填");
        return;
    }
    if (!staffLicenseNo) {
        alert("業務員登錄證號為必填");
        return;
    }

    if (!confirm("確定要新增停招業務員?")) {
        return;
    }
    document.getElementById('loading').style.display = 'block';
    $.ajax({
        url: contextPath + '/frontend/maintainIneffStaff/insert',
        type: "post",
        data: {
            operatorCode: operatorCode,
            staffLicenseNo: staffLicenseNo,
            startDate: startDate,
            endDate: endDate,
            memo: memo,
            userId: userId
        },
        beforeSend: function(xhr) {
            xhr.setRequestHeader(header, token);
        },
        success: function(data) {
            var cleanData = DOMPurify.sanitize(data, purifyConfig);
            $("#page-right").html(cleanData);
            
            var tempDiv = document.createElement("div");
			tempDiv.innerHTML = cleanData;
			// 找到具有 id="errorMsg" 的元素
			var errorMsgElement = tempDiv.querySelector("#errorMsg");
			if(null!=errorMsgElement && errorMsgElement.textContent != "" && errorMsgElement.textContent != null){
				document.getElementById('startDate').value = '';
   				document.getElementById('endDate').value = '';
   				document.getElementById('memo').value = '';
				alert(errorMsgElement.textContent);
			}else{
				alert("新增成功");
			}
        }
    });
}

function updateIneffStaff() {
    var operatorCode = $('#operatorCode').val();
    var staffLicenseNo = $('#staffLicenseNo').val();
    var startDate = $('#startDate').val();
    var endDate = $('#endDate').val();
    var memo = $('#memo').val();
    var userId = document.querySelector('input[name="userId"]').value;
    operatorCode = operatorCode.trim();
    staffLicenseNo = staffLicenseNo.trim();
    
    if (!operatorCode) {
        alert("經手人代號為必填");
        return;
    }
    if (!staffLicenseNo) {
        alert("業務員登錄證號為必填");
        return;
    }
    if (!confirm("確定要修改停招業務員資訊?")) {
        return;
    }
    document.getElementById('loading').style.display = 'block';
    $.ajax({
        url: contextPath + '/frontend/maintainIneffStaff/update',
        type: "post",
        data: {
            operatorCode: operatorCode,
            staffLicenseNo: staffLicenseNo,
            startDate: startDate,
            endDate: endDate,
            memo: memo,
            userId: userId
        },
        beforeSend: function(xhr) {
            xhr.setRequestHeader(header, token);
        },
        success: function(data) {
            var cleanData = DOMPurify.sanitize(data, purifyConfig);
            $("#page-right").html(cleanData);
            
            var tempDiv = document.createElement("div");
			tempDiv.innerHTML = cleanData;
			// 找到具有 id="errorMsg" 的元素
			var errorMsgElement = tempDiv.querySelector("#errorMsg");
			if(null!=errorMsgElement && errorMsgElement.textContent != "" && errorMsgElement.textContent != null){
				alert(errorMsgElement.textContent);
			}else{
				alert("修改成功");	
			}
        }
    });
}

function deleteIneffStaff() {
   	var operatorCode = $('#operatorCode').val();
    var staffLicenseNo = $('#staffLicenseNo').val();
    var startDate = $('#startDate').val();
    var endDate = $('#endDate').val();
    var memo = $('#memo').val();
    operatorCode = operatorCode.trim();
    staffLicenseNo = staffLicenseNo.trim();

    //保留原本的查詢條件
    var queryOperatorCode = document.getElementById('queryOperatorCode').value;
    var queryStaffLicenseNo = document.getElementById('queryStaffLicenseNo').value;
    var queryStartDate = document.getElementById('queryStartDate').value;
    var queryEndDate = document.getElementById('queryEndDate').value;
    var queryMemo = document.getElementById('queryMemo').value;
	queryOperatorCode = queryOperatorCode.trim();
	queryStaffLicenseNo = queryStaffLicenseNo.trim();
	
    if (!operatorCode) {
        alert("經手人代號為必填");
        return;
    }
    if (!staffLicenseNo) {
        alert("業務員登錄證號為必填");
        return;
    }
    if (!confirm("確定要刪除停招業務員資訊?")) {
        return;
    }
    
    document.getElementById('loading').style.display = 'block';
    $.ajax({
        url: contextPath + '/frontend/maintainIneffStaff/delete',
        type: "post",
        data: {
            operatorCode: operatorCode,
            staffLicenseNo: staffLicenseNo,
            startDate: startDate,
            endDate: endDate,
            memo: memo,
            queryOperatorCode: queryOperatorCode,
            queryStaffLicenseNo: queryStaffLicenseNo,
            queryStartDate: queryStartDate,
            queryEndDate: queryEndDate,
            queryMemo: queryMemo
        },
        beforeSend: function(xhr) {
            xhr.setRequestHeader(header, token);
        },
        success: function(data) {
            var cleanData = DOMPurify.sanitize(data, purifyConfig);
            $("#page-right").html(cleanData);
            
            var tempDiv = document.createElement("div");
			tempDiv.innerHTML = cleanData;
			// 找到具有 id="errorMsg" 的元素
			var errorMsgElement = tempDiv.querySelector("#errorMsg");
			if(null!=errorMsgElement && errorMsgElement.textContent != "" && errorMsgElement.textContent != null){
				alert(errorMsgElement.textContent);
			}else{
				alert("刪除成功");
			}
        }
    });
}
//業務員停招end

function confirmCancelCustomer() {
    var customerId = $('#customerId').val();
    if (!customerId) {
        alert("客戶ID為必填");
        return;
    }
    if (!confirm("確定要取消客戶資料?")) {
        return;
    }
    document.getElementById('loading').style.display = 'block';
    $.ajax({
        url: contextPath + '/frontend/cancelCustomerDataShare/cancel',
        type: "post",
        data: {
            customerId: customerId
        },
        beforeSend: function(xhr) {
            xhr.setRequestHeader(header, token);
        },
        success: function(data) {
            var cleanData = DOMPurify.sanitize(data, purifyConfig);
            $("#page-right").html(cleanData);
            
            var tempDiv = document.createElement("div");
			tempDiv.innerHTML = cleanData;
			// 找到具有 id="errorMsg" 的元素
			var errorMsgElement = tempDiv.querySelector("#errorMsg");
			if(null!=errorMsgElement && errorMsgElement.textContent != "" && errorMsgElement.textContent != null){
				alert(errorMsgElement.textContent);
			}
        }
    });
}