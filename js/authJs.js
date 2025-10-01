
function queryRoleList(sortField, sortDirection) {
    var roleId = $('#roleId').val();
    var roleName = $('#roleName').val();
    var description = $('#description').val();
    var status = $('#status').val();
	var pageSize = 10;
    if(null!=document.getElementById('pageSize')){
		pageSize = document.getElementById('pageSize').value;
	}
    document.getElementById('loading').style.display = 'block';
    $.ajax({
        url: contextPath + '/auth/roleManage/query',
        type: "post",
        data: {
            roleId: roleId,
            roleName: roleName,
            description: description,
            status: status,
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
		    document.getElementById('queryRoleId').value = document.getElementById('roleId').value;
		    document.getElementById('queryRoleName').value = document.getElementById('roleName').value;
		    document.getElementById('queryDescription').value = document.getElementById('description').value;
		    document.getElementById('queryStatus').value = document.getElementById('status').value;
        }
    });
}

function clearRoleConditions() {
    //初始查詢條件
    document.getElementById('roleId').value = '';
    document.getElementById('roleName').value = '';
    document.getElementById('description').value = '';
    document.getElementById('status').value = 0;

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
    
    //修改或刪除時，角色代碼不允許調整
    document.getElementById('roleId').disabled = false;
}

function fillRoleQueryConditions(rowIndex) {
    const roleId = document.getElementById('roleId_' + rowIndex);
    const roleName = document.getElementById('roleName_' + rowIndex);
    const description = document.getElementById('description_' + rowIndex);
    const status = document.getElementById('status_' + rowIndex);

    // 將單據資料帶到查詢欄位
    document.getElementById('roleId').value = roleId.textContent;
    document.getElementById('roleName').value = roleName.textContent;
    document.getElementById('description').value = description.textContent;
    document.getElementById('status').value = status.textContent;

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
    document.getElementById('roleId').disabled = true;
}

function insertRoleId() {
    var roleId = $('#roleId').val();
    var roleName = $('#roleName').val();
    var description = $('#description').val();
    var status = $('#status').val();

    roleId = roleId.trim();

    if (!roleId) {
        alert("角色代碼為必填");
        return;
    }
    if (!roleName) {
        alert("角色名稱為必填");
        return;
    }
    if (status==0) {
        alert("使用狀態為必填");
        return;
    }

    if (!confirm("確定要新增角色?")) {
        return;
    }
    document.getElementById('loading').style.display = 'block';
    $.ajax({
        url: contextPath + '/auth/roleManage/insert',
        type: "post",
        data: {
            roleId: roleId,
            roleName: roleName,
            description: description,
            status: status
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

function updateRoleId() {
    var roleId = $('#roleId').val();
    var roleName = $('#roleName').val();
    var description = $('#description').val();
    var status = $('#status').val();

    roleId = roleId.trim();

    if (!roleId) {
        alert("角色代碼為必填");
        return;
    }
    if (!roleName) {
        alert("角色名稱為必填");
        return;
    }
    if (status==0) {
        alert("使用狀態為必填");
        return;
    }

    if (!confirm("確定要修改角色?")) {
        return;
    }
    document.getElementById('loading').style.display = 'block';
    $.ajax({
        url: contextPath + '/auth/roleManage/update',
        type: "post",
        data: {
            roleId: roleId,
            roleName: roleName,
            description: description,
            status: status
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


function deleteRoleId() {
    var roleId = $('#roleId').val();

	//保留原本的查詢條件
    var queryRoleId = document.getElementById('queryRoleId').value;
    var queryRoleName = document.getElementById('queryRoleName').value;
    var queryDescription = document.getElementById('queryDescription').value;
    var queryStatus = document.getElementById('queryStatus').value;
    
    roleId = roleId.trim();

	if (!roleId) {
        alert("角色代碼為必填");
        return;
    }
    if (!confirm("確定要刪除角色?")) {
        return;
    }
    document.getElementById('loading').style.display = 'block';
    $.ajax({
        url: contextPath + '/auth/roleManage/delete',
        type: "post",
        data: {
            roleId: roleId,
            queryRoleId: queryRoleId,
            queryRoleName: queryRoleName,
            queryDescription: queryDescription,
            queryStatus: queryStatus
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


function changeListPageForRoleManage(page, sortField, sortDirection){
	var roleId = $('#roleId').val();
    var roleName = $('#roleName').val();
    var description = $('#description').val();
    var status = $('#status').val();
    var pageSize = document.getElementById('pageSize');
    //判斷如果已經有點下方單據的序號
    //則重新查詢要依照原本的查詢條件
    const updateButton = document.getElementById('updateButton');
	if(updateButton.style.display=='inline-block'){//已經是修改按鈕 表示有點過序號
		roleId = document.getElementById('queryRoleId').value;
	    roleName = document.getElementById('queryRoleName').value;
	    description = document.getElementById('queryDescription').value;
	    status = document.getElementById('queryStatus').value;
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
        url: contextPath + '/auth/roleManage/query',
        type: "post",
        data: {
			roleId: roleId,
            roleName: roleName,
            description: description,
            status: status,
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
		    document.getElementById('queryRoleId').value = document.getElementById('roleId').value;
		    document.getElementById('queryRoleName').value = document.getElementById('roleName').value;
		    document.getElementById('queryDescription').value = document.getElementById('description').value;
		    document.getElementById('queryStatus').value = document.getElementById('status').value;
        }
    });
}


function queryUserInfo(sortField, sortDirection) {
    var userId = $('#userId').val();
    var userName = $('#userName').val();
    var mail = $('#mail').val();
    var status = $('#status').val();
    
    var pageSize = 10;
    if(null!=document.getElementById('pageSize')){
		pageSize = document.getElementById('pageSize').value;
	}
	if (!userId) {
        alert("帳號為必填");
        return;
    }
    document.getElementById('loading').style.display = 'block';
    $.ajax({
        url: contextPath + '/auth/userManage/query',
        type: "post",
        data: {
            userId: userId,
            userName: userName,
            mail: mail,
            status: status,
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
            updateSortStatus(sortField, sortDirection);
            var tempDiv = document.createElement("div");
			tempDiv.innerHTML = cleanData;
			// 找到具有 id="errorMsg" 的元素
			var errorMsgElement = tempDiv.querySelector("#errorMsg");
			if(null!=errorMsgElement && errorMsgElement.textContent != "" && errorMsgElement.textContent != null){
				alert(errorMsgElement.textContent);
			}
			
		    // 將原本的查詢條件保留
		    document.getElementById('queryUserId').value = document.getElementById('userId').value;
		    document.getElementById('queryUserName').value = document.getElementById('userName').value;
		    document.getElementById('queryMail').value = document.getElementById('mail').value;
		    document.getElementById('queryStatus').value = document.getElementById('status').value;
        }
    });
}


function insertUserInfo() {
    var userId = $('#userId').val();
    var userName = $('#userName').val();
    var mail = $('#mail').val();
    var status = $('#status').val();
    
	if (!userId) {
        alert("帳號為必填");
        return;
    }
    if (!userName) {
        alert("姓名為必填");
        return;
    }
    if (status==0) {
        alert("狀態為必填");
        return;
    }
    document.getElementById('loading').style.display = 'block';
    $.ajax({
        url: contextPath + '/auth/userManage/insert',
        type: "post",
        data: {
            userId: userId,
            userName: userName,
            mail: mail,
            status: status
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

function clearUserInfo() {
    document.getElementById('userId').value = '';
    document.getElementById('userName').value = '';
    document.getElementById('mail').value = '';
    document.getElementById('status').value = '1';
}


function updateUserInfo() {
	var userId = document.getElementById('userId').value;
	var userName = document.getElementById('userName').value;
    var mail = document.getElementById('mail').value;
    var status = document.getElementById('status').value;

    if (!confirm("確定要修改?")) {
        return;
    }

    $.ajax({
        url: contextPath + '/auth/userManage/update',
        type: "post",
        data: {
			userId: userId,
			userName: userName,
            mail: mail,
            status: status
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


function deleteUserInfo() {
	var userId = document.getElementById('userId').value;

 	//保留原本的查詢條件
    var queryUserId = document.getElementById('queryUserId').value;
    var queryUserName = document.getElementById('queryUserName').value;
    var queryMail = document.getElementById('queryMail').value;
    var queryStatus = document.getElementById('queryStatus').value;
    
    if (!confirm("確定要刪除使用者?")) {
        return;
    }

    $.ajax({
        url: contextPath + '/auth/userManage/delete',
        type: "post",
        data: {
			userId: userId,
            queryUserId: queryUserId,
            queryUserName: queryUserName,
            queryMail: queryMail,
            queryStatus: queryStatus
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

function clearUserConditions() {
    //初始查詢條件
    document.getElementById('userId').value = '';
    document.getElementById('userName').value = '';
    document.getElementById('mail').value = '';
    document.getElementById('status').value = 0;

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
    
    //修改時，帳號不允許調整 解開
    document.getElementById('userId').disabled = false;
}


function fillUserQueryConditions(rowIndex) {
    const userId = document.getElementById('userId_' + rowIndex);
    const userName = document.getElementById('userName_' + rowIndex);
    const mail = document.getElementById('mail_' + rowIndex);
    const status = document.getElementById('status_' + rowIndex);

    // 將單據資料帶到查詢欄位
    document.getElementById('userId').value = userId.textContent;
    document.getElementById('userName').value = userName.textContent;
    document.getElementById('mail').value = mail.textContent;
    document.getElementById('status').value = status.textContent;

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
    
    //修改時，帳號不允許調整
    document.getElementById('userId').disabled = true;
}

function queryUserRoleInfo() {
    var queryUserId = $('#queryUserId').val();
    var queryRoleId = $('#queryRoleId').val();
    
	if (!queryUserId && !queryRoleId) {
        alert("帳號與角色請至少則一項");
        return;
    }
    if (queryUserId && queryRoleId) {
        alert("帳號與角色請則一輸入");
        return;
    }
    document.getElementById('loading').style.display = 'block';
    $.ajax({
        url: contextPath + '/auth/userRoleManage/query',
        type: "post",
        data: {
            queryUserId: queryUserId,
            queryRoleId: queryRoleId
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

function changeUserId(){
	document.getElementById('queryRoleId').value = '';
    document.getElementById('roleId').value = '';
	var hasSelectedRole = $('#hasSelectedRole').val();
	if(hasSelectedRole!=null && hasSelectedRole!=""){
		if(hasSelectedRole === 'true'){
		    // 獲取未選擇角色的 select 元素
		    const unSelectedList = document.getElementById("unSelectedRole");
		    // 獲取已選擇角色的 select 元素
		    const selectedList = document.getElementById("selectedRole");
		    
		    for (let i = unSelectedList.options.length - 1; i >= 0; i--) {
				//移除全部"未選擇角色"
		        unSelectedList.remove(i);
		    }
		    
		    for (let i = selectedList.options.length - 1; i >= 0; i--) {
				//移除全部"已選擇角色"
		        selectedList.remove(i);
		    }
		}else{
			// 獲取未選擇帳號的 select 元素
		    const unSelectedList = document.getElementById("unSelectedUser");
		    // 獲取已選擇帳號的 select 元素
		    const selectedList = document.getElementById("selectedUser");
		    
		    for (let i = unSelectedList.options.length - 1; i >= 0; i--) {
				//移除全部"未選擇帳號"
		        unSelectedList.remove(i);
		    }
		    
		    for (let i = selectedList.options.length - 1; i >= 0; i--) {
				//移除全部"已選擇帳號"
		        selectedList.remove(i);
		    }
		}
	}
}

function changeRoleId(){
	document.getElementById('queryUserId').value = '';
    document.getElementById('userId').value = '';
	var hasSelectedRole = $('#hasSelectedRole').val();
	if(hasSelectedRole!=null && hasSelectedRole!=""){
		if(hasSelectedRole === 'true'){
		    // 獲取未選擇角色的 select 元素
		    const unSelectedList = document.getElementById("unSelectedRole");
		    // 獲取已選擇角色的 select 元素
		    const selectedList = document.getElementById("selectedRole");
		    
		    for (let i = unSelectedList.options.length - 1; i >= 0; i--) {
				//移除全部"未選擇角色"
		        unSelectedList.remove(i);
		    }
		    
		    for (let i = selectedList.options.length - 1; i >= 0; i--) {
				//移除全部"已選擇角色"
		        selectedList.remove(i);
		    }
		}else{
			// 獲取未選擇帳號的 select 元素
		    const unSelectedList = document.getElementById("unSelectedUser");
		    // 獲取已選擇帳號的 select 元素
		    const selectedList = document.getElementById("selectedUser");
		    
		    for (let i = unSelectedList.options.length - 1; i >= 0; i--) {
				//移除全部"未選擇帳號"
		        unSelectedList.remove(i);
		    }
		    
		    for (let i = selectedList.options.length - 1; i >= 0; i--) {
				//移除全部"已選擇帳號"
		        selectedList.remove(i);
		    }
		}
	}
}

function clearUserRoleInfo() {
    document.getElementById('queryUserId').value = '';
    document.getElementById('userId').value = '';
    document.getElementById('queryRoleId').value = '';
    document.getElementById('roleId').value = '';
    var hasSelectedRole = $('#hasSelectedRole').val();
	if(hasSelectedRole!=null && hasSelectedRole!=""){
		if(hasSelectedRole === 'true'){
			// 獲取未選擇角色的 select 元素
		    const unSelectedList = document.getElementById("unSelectedRole");
		    // 獲取已選擇角色的 select 元素
		    const selectedList = document.getElementById("selectedRole");
		    if(null!=unSelectedList){
			    for (let i = unSelectedList.options.length - 1; i >= 0; i--) {
					//移除全部"未選擇角色"
			        unSelectedList.remove(i);
			    } 
		    }
			if(null!=selectedList){
			    for (let i = selectedList.options.length - 1; i >= 0; i--) {
					//移除全部"已選擇角色"
			        selectedList.remove(i);
			    }
		    }
	    }else{
			// 獲取未選擇帳號的 select 元素
		    const unSelectedList = document.getElementById("unSelectedUser");
		    // 獲取已選擇帳號的 select 元素
		    const selectedList = document.getElementById("selectedUser");
		    if(null!=unSelectedList){
			    for (let i = unSelectedList.options.length - 1; i >= 0; i--) {
					//移除全部"未選擇帳號"
			        unSelectedList.remove(i);
			    } 
		    }
		    if(null!=selectedList){
			    for (let i = selectedList.options.length - 1; i >= 0; i--) {
					//移除全部"已選擇帳號"
			        selectedList.remove(i);
			    }
		    }
		}
	}
}

function addRoleSelectedOptions() {
	var hasSelectedRole = $('#hasSelectedRole').val();
	if(hasSelectedRole === 'true'){
	    // 獲取未選擇角色的 select 元素
	    const unSelectedList = document.getElementById("unSelectedRole");
	    // 獲取已選擇角色的 select 元素
	    const selectedList = document.getElementById("selectedRole");
	    
	    // 找出"未選擇角色"LIST中被選取的角色 並加到"已選擇角色"中
	    for (const option of unSelectedList.options) {
	        if (option.selected) {
	            selectedList.appendChild(option.cloneNode(true));
	        }
	    } 
	    // 將加入"已選擇角色"的角色 從"未選擇角色"的List 中刪除
	    for (let i = unSelectedList.options.length - 1; i >= 0; i--) {
	        if (unSelectedList.options[i].selected) {
	            unSelectedList.remove(i);
	        }
	    }
	}else{
		// 獲取未選擇帳號的 select 元素
	    const unSelectedList = document.getElementById("unSelectedUser");
	    // 獲取已選擇帳號的 select 元素
	    const selectedList = document.getElementById("selectedUser");
	    
		// 找出"未選擇帳號"LIST中被選取的帳號 並加到"已選擇帳號"中
	    for (const option of unSelectedList.options) {
	        if (option.selected) {
	            selectedList.appendChild(option.cloneNode(true));
	        }
	    } 
	    // 將加入"已選擇帳號"的角色 從"未選擇帳號"的List 中刪除
	    for (let i = unSelectedList.options.length - 1; i >= 0; i--) {
	        if (unSelectedList.options[i].selected) {
	            unSelectedList.remove(i);
	        }
	    }
	}
}

function removeRoleSelectedOptions() {
	var hasSelectedRole = $('#hasSelectedRole').val();
	if(hasSelectedRole === 'true'){
	    // 獲取未選擇角色的 select 元素
	    const unSelectedList = document.getElementById("unSelectedRole");
	    // 獲取已選擇角色的 select 元素
	    const selectedList = document.getElementById("selectedRole");
	    
	    // 找出"已選擇角色"LIST中被選取的角色 並加到"未選擇角色"中
	    for (const option of selectedList.options) {
	        if (option.selected) {
	            unSelectedList.appendChild(option.cloneNode(true));
	        }
	    }
	    
	    // 將加入"未選擇角色"的角色 從"已選擇角色"的List 中刪除
	    for (let i = selectedList.options.length - 1; i >= 0; i--) {
	        if (selectedList.options[i].selected) {
	            selectedList.remove(i);
	        }
	    }
	}else{
		// 獲取未選擇帳號的 select 元素
	    const unSelectedList = document.getElementById("unSelectedUser");
	    // 獲取已選擇帳號的 select 元素
	    const selectedList = document.getElementById("selectedUser");
	    
	    // 找出"已選擇帳號"LIST中被選取的帳號 並加到"未選擇帳號"中
	    for (const option of selectedList.options) {
	        if (option.selected) {
	            unSelectedList.appendChild(option.cloneNode(true));
	        }
	    }
	    
	    // 將加入"未選擇帳號"的帳號 從"已選擇帳號"的List 中刪除
	    for (let i = selectedList.options.length - 1; i >= 0; i--) {
	        if (selectedList.options[i].selected) {
	            selectedList.remove(i);
	        }
	    }
	}
}

function resetUserRole(){
	var hasSelectedRole = $('#hasSelectedRole').val();
	if(hasSelectedRole === 'true'){
		// 獲取未選擇角色的 select 元素
	    const unSelectedList = document.getElementById("unSelectedRole");
	    // 獲取已選擇角色的 select 元素
	    const selectedList = document.getElementById("selectedRole");
	    
		for (const option of selectedList.options) {
	        //將選項全部加入"未選擇角色""
	        unSelectedList.appendChild(option.cloneNode(true));
	    }
	    
	    for (let i = selectedList.options.length - 1; i >= 0; i--) {
			//移除全部"已選擇角色"
	        selectedList.remove(i);
	    }
	}else{
		// 獲取未選擇帳號的 select 元素
	    const unSelectedList = document.getElementById("unSelectedUser");
	    // 獲取已選擇帳號的 select 元素
	    const selectedList = document.getElementById("selectedUser");
	    
		for (const option of selectedList.options) {
	        //將選項全部加入"未選擇帳號""
	        unSelectedList.appendChild(option.cloneNode(true));
	    }
	    
	    for (let i = selectedList.options.length - 1; i >= 0; i--) {
			//移除全部"已選擇帳號"
	        selectedList.remove(i);
	    }
	}
}

function saveUserRole(){
	var userId = $('#userId').val();//用查出來Hidden的userId當修改條件，避免User查出來之後 手動改了查詢框的userId
	var roleId = $('#roleId').val();//用查出來Hidden的roleId當修改條件，避免User查出來之後 手動改了查詢框的roleId
	
	if (!userId && !roleId) {
        alert("請先進行查詢");
        return;
    }
    
    var hasSelectedRole = $('#hasSelectedRole').val();
    //轉成Map
    let unSelectedMap = new Map();
    let selectedMap = new Map();
	if(hasSelectedRole === 'true'){
	    const unSelectedRole = document.getElementById("unSelectedRole");
	    const selectedRole = document.getElementById("selectedRole");
	    
	    for (const option of unSelectedRole.options) {
			unSelectedMap.set(option.value, option.textContent);
	    }
	    for (const option of selectedRole.options) {
			selectedMap.set(option.value, option.textContent);
	    }
    }else{
		const unSelectedUser = document.getElementById("unSelectedUser");
	    const selectedUser = document.getElementById("selectedUser");
	    
	    for (const option of unSelectedUser.options) {
			unSelectedMap.set(option.value, option.textContent);
	    }
	    for (const option of selectedUser.options) {
			selectedMap.set(option.value, option.textContent);
	    }
	}
    //Map轉成Jason
    var unSelectedJsonData = JSON.stringify(Array.from(unSelectedMap));
	var selectedJsonData = JSON.stringify(Array.from(selectedMap));
	 document.getElementById('loading').style.display = 'block';
	    $.ajax({
	        url: contextPath + '/auth/userRoleManage/save',
	        type: "post",
	        data: {
	            userId: userId,
	            roleId: roleId,
	            unSelectedJsonData: unSelectedJsonData,
	            selectedJsonData: selectedJsonData
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

function queryRoleAuthInfo() {
    var queryRoleId = $('#queryRoleId').val(); 
    var queryAuthId = $('#queryAuthId').val();

	if (!queryAuthId && !queryRoleId) {
        alert("角色與權限請至少則一項");
        return;
    }
    if (queryAuthId && queryRoleId) {
        alert("角色與權限請則一輸入");
        return;
    }
 
    document.getElementById('loading').style.display = 'block';
    $.ajax({
        url: contextPath + '/auth/roleAuthManage/query',
        type: "post",
        data: {
            queryRoleId: queryRoleId,
            queryAuthId: queryAuthId
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

function clearRoleAuthInfo() {
	document.getElementById('queryAuthId').value = '';
    document.getElementById('authId').value = '';
    document.getElementById('queryRoleId').value = '';
    document.getElementById('roleId').value = '';
    var hasSelectedRole = $('#hasSelectedRole').val();
	if(hasSelectedRole!=null && hasSelectedRole!=""){
		if(hasSelectedRole === 'true'){
			// 獲取未選擇角色的 select 元素
		    const unSelectedList = document.getElementById("unSelectedRole");
		    // 獲取已選擇角色的 select 元素
		    const selectedList = document.getElementById("selectedRole");
		    if(null!=unSelectedList){
			    for (let i = unSelectedList.options.length - 1; i >= 0; i--) {
					//移除全部"未選擇角色"
			        unSelectedList.remove(i);
			    } 
		    }
			if(null!=selectedList){
			    for (let i = selectedList.options.length - 1; i >= 0; i--) {
					//移除全部"已選擇角色"
			        selectedList.remove(i);
			    }
		    }
	    }else{
			// 獲取未選擇權限的 select 元素
		    const unSelectedList = document.getElementById("unSelectedAuth");
		    // 獲取已選擇權限的 select 元素
		    const selectedList = document.getElementById("selectedAuth");
		    if(null!=unSelectedList){
			    for (let i = unSelectedList.options.length - 1; i >= 0; i--) {
					//移除全部"未選擇權限"
			        unSelectedList.remove(i);
			    } 
		    }
		    if(null!=selectedList){
			    for (let i = selectedList.options.length - 1; i >= 0; i--) {
					//移除全部"已選擇權限"
			        selectedList.remove(i);
			    }
		    }
		}
	}
}


function addAuthSelectedOptions() {
    // 獲取未選擇角色的 select 元素
    const unSelectedList = document.getElementById("unSelectedAuth");
    // 獲取已選擇角色的 select 元素
    const selectedList = document.getElementById("selectedAuth");
    
    // 找出"未選擇角色"LIST中被選取的角色 並加到"已選擇角色"中
    for (const option of unSelectedList.options) {
        if (option.selected) {
            selectedList.appendChild(option.cloneNode(true));
        }
    }
    
    // 將加入"已選擇角色"的角色 從"未選擇角色"的List 中刪除
    for (let i = unSelectedList.options.length - 1; i >= 0; i--) {
        if (unSelectedList.options[i].selected) {
            unSelectedList.remove(i);
        }
    }
}

function removeAuthSelectedOptions() {
    // 獲取未選擇角色的 select 元素
    const unSelectedList = document.getElementById("unSelectedAuth");
    // 獲取已選擇角色的 select 元素
    const selectedList = document.getElementById("selectedAuth");
    
    // 找出"已選擇角色"LIST中被選取的角色 並加到"未選擇角色"中
    for (const option of selectedList.options) {
        if (option.selected) {
            unSelectedList.appendChild(option.cloneNode(true));
        }
    }
    
    // 將加入"未選擇角色"的角色 從"已選擇角色"的List 中刪除
    for (let i = selectedList.options.length - 1; i >= 0; i--) {
        if (selectedList.options[i].selected) {
            selectedList.remove(i);
        }
    }
}

function resetRoleAuth(){
	var hasSelectedRole = $('#hasSelectedRole').val();
	if(hasSelectedRole === 'true'){
		// 獲取未選擇角色的 select 元素
	    const unSelectedList = document.getElementById("unSelectedRole");
	    // 獲取已選擇角色的 select 元素
	    const selectedList = document.getElementById("selectedRole");
	    
		for (const option of selectedList.options) {
	        //將選項全部加入"未選擇角色""
	        unSelectedList.appendChild(option.cloneNode(true));
	    }
	    
	    for (let i = selectedList.options.length - 1; i >= 0; i--) {
			//移除全部"已選擇角色"
	        selectedList.remove(i);
	    }
	}else{
		// 獲取未選擇權限的 select 元素
	    const unSelectedList = document.getElementById("unSelectedAuth");
	    // 獲取已選擇權限的 select 元素
	    const selectedList = document.getElementById("selectedAuth");
	    
		for (const option of selectedList.options) {
	        //將選項全部加入"未選擇權限""
	        unSelectedList.appendChild(option.cloneNode(true));
	    }
	    
	    for (let i = selectedList.options.length - 1; i >= 0; i--) {
			//移除全部"已選擇權限"
	        selectedList.remove(i);
	    }
	}
}


function saveRoleAuth(){
	var roleId = $('#roleId').val();//用查出來Hidden的roleId當修改條件，避免User查出來之後 手動改了查詢框的roleId
	var authId = $('#authId').val();//用查出來Hidden的authId當修改條件，避免User查出來之後 手動改了查詢框的authId

	if (!authId && !roleId) {
        alert("請先進行查詢");
        return;
    }
 
 	var hasSelectedRole = $('#hasSelectedRole').val();
    //轉成Map
    let unSelectedMap = new Map();
    let selectedMap = new Map();
	if(hasSelectedRole === 'true'){
	    const unSelectedRole = document.getElementById("unSelectedRole");
	    const selectedRole = document.getElementById("selectedRole");
	    
	    for (const option of unSelectedRole.options) {
			unSelectedMap.set(option.value, option.textContent);
	    }
	    for (const option of selectedRole.options) {
			selectedMap.set(option.value, option.textContent);
	    }
    }else{
		const unSelectedAuth = document.getElementById("unSelectedAuth");
	    const selectedAuth = document.getElementById("selectedAuth");
	    
	    for (const option of unSelectedAuth.options) {
			unSelectedMap.set(option.value, option.textContent);
	    }
	    for (const option of selectedAuth.options) {
			selectedMap.set(option.value, option.textContent);
	    }
	}

    //Map轉成Jason
    var unSelectedJsonData = JSON.stringify(Array.from(unSelectedMap));
	var selectedJsonData = JSON.stringify(Array.from(selectedMap));
	 document.getElementById('loading').style.display = 'block';
	    $.ajax({
	        url: contextPath + '/auth/roleAuthManage/save',
	        type: "post",
	        data: {
	            roleId: roleId,
	            authId: authId,
	            unSelectedJsonData: unSelectedJsonData,
	            selectedJsonData: selectedJsonData
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


function queryAuthList(sortField, sortDirection) {
    var authId = $('#authId').val();
    var authName = $('#authName').val();
    var description = $('#description').val();
    var status = $('#status').val();
	var pageSize = 10;
    if(null!=document.getElementById('pageSize')){
		pageSize = document.getElementById('pageSize').value;
	}
    document.getElementById('loading').style.display = 'block';
    $.ajax({
        url: contextPath + '/auth/authManage/query',
        type: "post",
        data: {
            authId: authId,
            authName: authName,
            description: description,
            status: status,
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
			document.getElementById('queryAuthId').value = document.getElementById('authId').value;
			document.getElementById('queryAuthName').value = document.getElementById('authName').value;
			document.getElementById('queryDescription').value = document.getElementById('description').value;
			document.getElementById('queryStatus').value = document.getElementById('status').value;
        }
    });
}



function changeListPageForAuthManage(page, sortField, sortDirection){
	var authId = $('#authId').val();
    var authName = $('#authName').val();
    var description = $('#description').val();
    var status = $('#status').val();
    var pageSize = document.getElementById('pageSize');
    //判斷如果已經有點下方單據的序號
    //則重新查詢要依照原本的查詢條件
    const updateButton = document.getElementById('updateButton');
	if(updateButton.style.display=='inline-block'){//已經是修改按鈕 表示有點過序號
		authId = document.getElementById('queryAuthId').value;
	    authName = document.getElementById('queryAuthName').value;
	    description = document.getElementById('queryDescription').value;
	    status = document.getElementById('queryStatus').value;
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
        url: contextPath + '/auth/authManage/query',
        type: "post",
        data: {
			authId: authId,
            authName: authName,
            description: description,
            status: status,
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
			document.getElementById('queryAuthId').value = document.getElementById('authId').value;
			document.getElementById('queryAuthName').value = document.getElementById('authName').value;
			document.getElementById('queryDescription').value = document.getElementById('description').value;
			document.getElementById('queryStatus').value = document.getElementById('status').value;
        }
    });
}


function fillAuthQueryConditions(rowIndex) {
    const authId = document.getElementById('authId_' + rowIndex);
    const authName = document.getElementById('authName_' + rowIndex);
    const description = document.getElementById('description_' + rowIndex);
    const status = document.getElementById('status_' + rowIndex);

    // 將單據資料帶到查詢欄位
    document.getElementById('authId').value = authId.textContent;
    document.getElementById('authName').value = authName.textContent;
    document.getElementById('description').value = description.textContent;
    document.getElementById('status').value = status.textContent;

    //改變按鈕
    const queryButton = document.getElementById('queryButton');
    const clearButton = document.getElementById('clearButton');
    const updateButton = document.getElementById('updateButton');
    const cancelButton = document.getElementById('cancelButton');

    queryButton.style.display = 'none';
    clearButton.style.display = 'none';
    updateButton.style.display = 'inline-block';
    cancelButton.style.display = 'inline-block';
    
    //修改時，白名單資料與白名單ID不允許調整
    document.getElementById('authId').disabled = true;
}


function clearAuthConditions() {
    //初始查詢條件
    document.getElementById('authId').value = '';
    document.getElementById('authName').value = '';
    document.getElementById('description').value = '';
    document.getElementById('status').value = 0;

    //改變按鈕
    const queryButton = document.getElementById('queryButton');
    const clearButton = document.getElementById('clearButton');
    const updateButton = document.getElementById('updateButton');
    const cancelButton = document.getElementById('cancelButton');

    queryButton.style.display = 'inline-block';
    clearButton.style.display = 'inline-block';
    updateButton.style.display = 'none';
    cancelButton.style.display = 'none';
    
    //修改時，角色代碼不允許調整
    document.getElementById('authId').disabled = false;
}


function updateAuthId() {
    var authId = $('#authId').val();
    var authName = $('#authName').val();
    var description = $('#description').val();
    var status = $('#status').val();

    authId = authId.trim();

    if (!authId) {
        alert("權限代碼為必填");
        return;
    }
    if (!authName) {
        alert("權限名稱為必填");
        return;
    }
    if (status==0) {
        alert("使用狀態為必填");
        return;
    }

    if (!confirm("確定要修改權限?")) {
        return;
    }
    document.getElementById('loading').style.display = 'block';
    $.ajax({
        url: contextPath + '/auth/authManage/update',
        type: "post",
        data: {
            authId: authId,
            authName: authName,
            description: description,
            status: status
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

function changeRoleIdSelect(){
	document.getElementById('queryAuthId').value = '';
    document.getElementById('authId').value = '';
	var hasSelectedRole = $('#hasSelectedRole').val();
	if(hasSelectedRole!=null && hasSelectedRole!=""){
		if(hasSelectedRole === 'true'){
		    // 獲取未選擇角色的 select 元素
		    const unSelectedList = document.getElementById("unSelectedRole");
		    // 獲取已選擇角色的 select 元素
		    const selectedList = document.getElementById("selectedRole");
		    
		    for (let i = unSelectedList.options.length - 1; i >= 0; i--) {
				//移除全部"未選擇角色"
		        unSelectedList.remove(i);
		    }
		    
		    for (let i = selectedList.options.length - 1; i >= 0; i--) {
				//移除全部"已選擇角色"
		        selectedList.remove(i);
		    }
		}else{
			// 獲取未選擇權限的 select 元素
		    const unSelectedList = document.getElementById("unSelectedAuth");
		    // 獲取已選擇權限的 select 元素
		    const selectedList = document.getElementById("selectedAuth");
		    
		    for (let i = unSelectedList.options.length - 1; i >= 0; i--) {
				//移除全部"未選擇權限"
		        unSelectedList.remove(i);
		    }
		    
		    for (let i = selectedList.options.length - 1; i >= 0; i--) {
				//移除全部"已選擇權限"
		        selectedList.remove(i);
		    }
		}
	}
}

function changeAuthIdSelect(){
	document.getElementById('queryRoleId').value = '';
    document.getElementById('roleId').value = '';
	var hasSelectedRole = $('#hasSelectedRole').val();
	if(hasSelectedRole!=null && hasSelectedRole!=""){
		if(hasSelectedRole === 'true'){
		    // 獲取未選擇角色的 select 元素
		    const unSelectedList = document.getElementById("unSelectedRole");
		    // 獲取已選擇角色的 select 元素
		    const selectedList = document.getElementById("selectedRole");
		    
		    for (let i = unSelectedList.options.length - 1; i >= 0; i--) {
				//移除全部"未選擇角色"
		        unSelectedList.remove(i);
		    }
		    
		    for (let i = selectedList.options.length - 1; i >= 0; i--) {
				//移除全部"已選擇角色"
		        selectedList.remove(i);
		    }
		}else{
			// 獲取未選擇權限的 select 元素
		    const unSelectedList = document.getElementById("unSelectedAuth");
		    // 獲取已選擇權限的 select 元素
		    const selectedList = document.getElementById("selectedAuth");
		    
		    for (let i = unSelectedList.options.length - 1; i >= 0; i--) {
				//移除全部"未選擇權限"
		        unSelectedList.remove(i);
		    }
		    
		    for (let i = selectedList.options.length - 1; i >= 0; i--) {
				//移除全部"已選擇權限"
		        selectedList.remove(i);
		    }
		}
	}
}

function changeListPageForUserManage(page, sortField, sortDirection){
	var userId = $('#userId').val();
	var userName = $('#userName').val();
	var mail = $('#mail').val();
    var status = $('#status').val();
    //判斷如果已經有點下方單據的序號
    //則重新查詢要依照原本的查詢條件
    const updateButton = document.getElementById('updateButton');
	if(updateButton.style.display=='inline-block'){//已經是修改按鈕 表示有點過序號
		userId = document.getElementById('queryUserId').value;
		userName = document.getElementById('queryUserName').value;
	    mail = document.getElementById('queryMail').value;
	    status = document.getElementById('queryStatus').value;
	}
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
        url: contextPath + '/auth/userManage/query',
        type: "post",
        data: {
			userId: userId,
			userName: userName,
			mail: mail,
			status: status,
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
		    document.getElementById('queryUserId').value = document.getElementById('userId').value;
		    document.getElementById('queryUserName').value = document.getElementById('userName').value;
		    document.getElementById('queryMail').value = document.getElementById('mail').value;
		    document.getElementById('queryStatus').value = document.getElementById('status').value;
        }
    });
}

function changeRoleIdForRoleManage(){
	document.getElementById('queryAuthId').value = '';
    document.getElementById('authId').value = '';
	var hasSelectedRole = $('#hasSelectedRole').val();
	if(hasSelectedRole!=null && hasSelectedRole!=""){
		if(hasSelectedRole === 'true'){
		    // 獲取未選擇角色的 select 元素
		    const unSelectedList = document.getElementById("unSelectedRole");
		    // 獲取已選擇角色的 select 元素
		    const selectedList = document.getElementById("selectedRole");
		    
		    for (let i = unSelectedList.options.length - 1; i >= 0; i--) {
				//移除全部"未選擇角色"
		        unSelectedList.remove(i);
		    }
		    
		    for (let i = selectedList.options.length - 1; i >= 0; i--) {
				//移除全部"已選擇角色"
		        selectedList.remove(i);
		    }
		}else{
			// 獲取未選擇帳號的 select 元素
		    const unSelectedList = document.getElementById("unSelectedAuth");
		    // 獲取已選擇帳號的 select 元素
		    const selectedList = document.getElementById("selectedAuth");
		    
		    for (let i = unSelectedList.options.length - 1; i >= 0; i--) {
				//移除全部"未選擇帳號"
		        unSelectedList.remove(i);
		    }
		    
		    for (let i = selectedList.options.length - 1; i >= 0; i--) {
				//移除全部"已選擇帳號"
		        selectedList.remove(i);
		    }
		}
	}
}
