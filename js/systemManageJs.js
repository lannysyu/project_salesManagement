

function queryJob(sortField, sortDirection) {
    $.ajax({
        url: contextPath + '/systemManage/quartzManage/query',
        type: "post",
        data: {
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

function queryJobLog(sortField, sortDirection) {
    var jobName = $('#jobName').val();
    var fromTime = $('#fromTime').val();
    var toTime = $('#toTime').val();
    var status = $('#status').val();
    var pageSize = 10;
    if(null!=document.getElementById('pageSize')){
		pageSize = document.getElementById('pageSize').value;
	}
    document.getElementById('loading').style.display = 'block';
    $.ajax({
        url: contextPath + '/systemManage/batchView/query',
        type: "post",
        data: {
            jobName: jobName,
            fromTime: fromTime,
            toTime: toTime,
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
        }
    });
}

function changeBatchListPage(page, sortField, sortDirection) {
	var jobName = $('#jobName').val();
	var fromTime = $('#fromTime').val();
	var toTime = $('#toTime').val();
	var status = $('#status').val();
	var pageSize = document.getElementById('pageSize');
	var endPageNum = document.querySelector('input[name="endPageNum"]').value;
	var changePageNum = document.querySelector('input[name="changePageNum"]').value;
	if (sortField === 'null') {
        sortField = ""; 
    }
    if (sortDirection === 'null') {
        sortDirection = ""; 
    }
	if (page === 'up') {
		//上一頁
		if (changePageNum == 1) {
			alert("已經是第一頁");
			return;
		}
		page = parseInt(changePageNum) - 1;//目前頁數-1
	}
	if (page === 'down') {
		//上一頁
		if (changePageNum == endPageNum) {
			alert("已經是最後一頁");
			return;
		}
		page = parseInt(changePageNum) + 1;//目前頁數+1
	}
	document.getElementById('loading').style.display = 'block';
	$.ajax({
		url: contextPath + '/systemManage/batchView/query',
		type: "post",
		data: {
			jobName: jobName,
			fromTime: fromTime,
			toTime: toTime,
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
		}
	});
}

function toggleInput(obj, inputId) {
    const input = document.getElementById('confValueInput_' + inputId);
    input.disabled = !obj.checked;
}

function updateMiddleConf() {
    const checkboxes = document.querySelectorAll('input[type="checkbox"]');
    var pageSize = document.getElementById('pageSize');
    let updateMap = new Map();
    var index = 0;
    var hasChange = false;
    checkboxes.forEach((checkbox) => {
        if (checkbox.checked) {
            hasChange = true;
            const confValueInput = document.getElementById('confValueInput_' + index);
            if (!confValueInput.value.trim()) {
                alert("參數值為必填");
                return;
            }
            const confKeyInput = document.getElementById('confKeyInput_' + index);
            const key = confKeyInput.textContent;
            const value = confValueInput.value;
            updateMap.set(key, value);
        }
        index++;
    });
    if (!hasChange) {
        alert("請至少選擇一項參數作修改");
        return;
    }
    if (!confirm("確定要修改?")) {
        return;
    }
    var jsonData = JSON.stringify(Array.from(updateMap));
    $.ajax({
        url: contextPath + '/systemManage/middleConf/update',
        type: "post",
        data: {
            updateMapJson: jsonData,
            pageSize: pageSize.value
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

function pausedTriggerState(jobName, group) {
    if (!confirm("確定要暫停排程?")) {
        return;
    }
    document.getElementById('loading').style.display = 'block';
    $.ajax({
        url: contextPath + '/systemManage/pausedTriggerState',
        type: "post",
        data: {
            jobName: jobName,
            group: group
        },
        beforeSend: function(xhr) {
            xhr.setRequestHeader(header, token);
        },
        success: function(data) {
            var cleanData = DOMPurify.sanitize(data, purifyConfig);
            $("#page-right").html(cleanData);
            alert("暫停成功");
        }
    });
}
function openTriggerState(jobName, group) {
    if (!confirm("確定要啟動排程?")) {
        return;
    }
    document.getElementById('loading').style.display = 'block';
    $.ajax({
        url: contextPath + '/systemManage/openTriggerState',
        type: "post",
        data: {
            jobName: jobName,
            group: group
        },
        beforeSend: function(xhr) {
            xhr.setRequestHeader(header, token);
        },
        success: function(data) {
            var cleanData = DOMPurify.sanitize(data, purifyConfig);
            $("#page-right").html(cleanData);
            alert("啟動成功");
        }
    });
}

function triggerJob(jobName, group, scheduleName) {
    if (!confirm("確定要手動執行排程?")) {
        return;
    }
    document.getElementById('loading').style.display = 'block';
    $.ajax({
        url: contextPath + '/systemManage/trigger-job',
        type: "post",
        data: {
            jobName: jobName,
            group: group,
            scheduleName: scheduleName
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
				alert("開始執行");
			}
        }
    });
}

function toggleEdit(jobName, group, rowIndex, triggerName) {
    const cronInput = document.getElementById('cronInput_' + rowIndex);
    const editButton = document.getElementById('editButton_' + rowIndex);

    if (cronInput.disabled) {
        cronInput.disabled = false;
        editButton.innerText = '修改';
    } else {
        if (!confirm("確定要修改Cron?")) {
            return;
        }
        if (cronInput.value === "") {
            alert("Cron不允許為空");
            return;
        }
        document.getElementById('loading').style.display = 'block';
        $.ajax({
            url: contextPath + '/systemManage/edit-cron',
            type: "post",
            data: {
                cron: cronInput.value,
                jobName: jobName,
                group: group,
                triggerName: triggerName
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
					alert("執行成功");
				}
            }
        });
    }
}



function queryMiddleConf(sortField, sortDirection) {
    var confDesc = $('#confDesc').val();
    var confKey = $('#confKey').val();

	var pageSize = 10;
    if(null!=document.getElementById('pageSize')){
		pageSize = document.getElementById('pageSize').value;
	}
    document.getElementById('loading').style.display = 'block';
    $.ajax({
        url: contextPath + '/systemManage/middleConf/query',
        type: "post",
        data: {
            confDesc: confDesc,
            confKey: confKey,
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


function changeListPageForMiddleConf(page, sortField, sortDirection){
	var confDesc = $('#confDesc').val();
    var confKey = $('#confKey').val();
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
        url: contextPath + '/systemManage/middleConf/query',
        type: "post",
        data: {
			confDesc: confDesc,
            confKey: confKey,
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


function clearMiddleConfConditions() {
    //初始查詢條件
    document.getElementById('confDesc').value = '';
    document.getElementById('confKey').value = '';
}

function queryCache(sortField, sortDirection) {
	var cacheName = $('#cacheName').val();
	var cacheDesc = $('#cacheDesc').val();
	var pageSize = 10;
	if (null != document.getElementById('pageSize')) {
		pageSize = document.getElementById('pageSize').value;
	}
	document.getElementById('loading').style.display = 'block';
	$.ajax({
		url: contextPath + '/systemManage/cacheManage',
		type: "post",
		data: {
			cacheName: cacheName,
			cacheDesc: cacheDesc,
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
			if (null != errorMsgElement && errorMsgElement.textContent != "" && errorMsgElement.textContent != null) {
				alert(errorMsgElement.textContent);
			}
			updateSortStatus(sortField, sortDirection);
		}
	});
}

function refreshCache(cacheRefreshName, sortField, sortDirection) {
	var cacheName = $('#cacheName').val();
	var cacheDesc = $('#cacheDesc').val();
	if (sortField === 'null') {
		sortField = "";
	}
	if (sortDirection === 'null') {
		sortDirection = "";
	}
	var pageSize = 10;
	if (null != document.getElementById('pageSize')) {
		pageSize = document.getElementById('pageSize').value;
	}
	if (!confirm("確定要刷新?")) {
		return;
	}
	$.ajax({
		url: contextPath + '/systemManage/cacheManage/refresh',
		type: "post",
		data: {
			cacheName: cacheName,
			cacheDesc: cacheDesc,
			pageSize: pageSize,
			sortField: sortField,
			sortDirection: sortDirection,
			cacheRefreshName: cacheRefreshName
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
			if (null != errorMsgElement && errorMsgElement.textContent != "" && errorMsgElement.textContent != null) {
				alert(errorMsgElement.textContent);
			} else {
				var refreshMessageElement = tempDiv.querySelector('input[name="refreshMessage"]');
				if (null != refreshMessageElement && refreshMessageElement.value != null) {
					if (cacheRefreshName === "allCache") {
						alert("快取刷新成功，刷新筆數：" + refreshMessageElement.value + "。未初始化之快取不進行刷新。");
					} else {
						alert("快取刷新成功");
					}
				}
			}
			updateSortStatus(sortField, sortDirection);
		}
	});
}

function changeListPageForCacheManage(page, sortField, sortDirection){
	var cacheName = $('#cacheName').val();
    var cacheDesc = $('#cacheDesc').val();
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
        url: contextPath + '/systemManage/cacheManage',
        type: "post",
        data: {
			cacheName: cacheName,
            cacheDesc: cacheDesc,
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

function clearCacheConditions() {
    //初始查詢條件
    document.getElementById('cacheName').value = '';
    document.getElementById('cacheDesc').value = '';
}


function queryNotice(sortField, sortDirection) {
    var fromTime = $('#fromTime').val();
    var toTime = $('#toTime').val();
    var status = $('#status').val();
    var noticeType = $('#noticeType').val();
    var topic = $('#topic').val();
    const fuzzySearchCheckbox = document.getElementById('fuzzySearch');

	var pageSize = 10;
    if(null!=document.getElementById('pageSize')){
		pageSize = document.getElementById('pageSize').value;
	}
    document.getElementById('loading').style.display = 'block';
    $.ajax({
        url: contextPath + '/systemManage/noticeManage/query',
        type: "post",
        data: {
            fromTime: fromTime,
            toTime: toTime,
            status: status,
            noticeType: noticeType,
            topic: topic,
            fuzzySearch: fuzzySearchCheckbox.checked,
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
        }
    });
}


function clearNoticeConditions() {
    //初始查詢條件
    document.getElementById('fromTime').value = '';
    document.getElementById('toTime').value = '';
    document.getElementById('status').value = 0;
	document.getElementById('noticeType').value = '';
	document.getElementById('topic').value = '';
	
	const fuzzySearchCheckbox = document.getElementById('fuzzySearch');
	fuzzySearchCheckbox.checked = true;
}


function changeListPageForNoticeManage(page, sortField, sortDirection){
	var fromTime = $('#fromTime').val();
    var toTime = $('#toTime').val();
    var status = $('#status').val();
    var noticeType = $('#noticeType').val();
    var topic = $('#topic').val();
    const fuzzySearchCheckbox = document.getElementById('fuzzySearch');
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
        url: contextPath + '/systemManage/noticeManage/query',
        type: "post",
        data: {
			fromTime: fromTime,
            toTime: toTime,
            status: status,
            noticeType: noticeType,
            topic: topic,
            fuzzySearch: fuzzySearchCheckbox.checked,
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


function toNoticeDetail(noticeId) {
    document.getElementById('loading').style.display = 'block';
    $.ajax({
        url: contextPath + '/systemManage/noticeManage/noticeDetail',
        type: "post",
        data: {
            noticeId: noticeId
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

function backNoticeManage() {
    $.ajax({
        url: contextPath + '/systemManage/noticeManage',
        type: "post",
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
            if (null != errorMsgElement && errorMsgElement.textContent != "" && errorMsgElement.textContent != null) {
                alert(errorMsgElement.textContent);
            }
        }
    });
}

function saveNoticeDtail() {
    var topic = $('#topic').val();
    var noticeType = $('#noticeType').val();
    var fromTime = $('#fromTime').val();
    var toTime = $('#toTime').val();
	var status = $('#status').val();
	var typeStyle = $('#typeStyle').val();
	var fontSize = $('#fontSize').val();
	const italicsCheckbox = document.getElementById('italics');
	const boldCheckbox = document.getElementById('bold');
	var colour = $('#colour').val();
	var comments = $('#comments').val();
	var operation = document.querySelector('input[name="operation"]').value;
	var noticeId = document.querySelector('input[name="noticeId"]').value;

	if (!topic) {
        alert("標題為必填");
        return;
    }
    if (!noticeType) {
        alert("類型為必填");
        return;
    }
    if (!fromTime) {
        alert("公告日期起為必填");
        return;
    }
    if (!toTime) {
        alert("公告日期訖為必填");
        return;
    }
    if(toTime<fromTime){
		alert("有效期間訖不允許早於起");
		return;
	}
    if (!comments) {
        alert("內文為必填");
        return;
    }
	$.ajax({
        url: contextPath + '/systemManage/noticeManage/noticeDetail/save',
        type: "post",
        data: {
            topic: topic,
            noticeType: noticeType,
            fromTime: fromTime,
            toTime: toTime,
            status: status,
            typeStyle: typeStyle,
            fontSize: fontSize,
            italics: italicsCheckbox.checked,
            bold: boldCheckbox.checked,
            colour: colour,
            comments: comments,
            operation: operation,
            noticeId: noticeId
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
				if(operation==='update'){
					alert("修改成功");
				}else{
					alert("新增成功");
				}
			}
			backNoticeManage();
        }
    });
}


function showCronExplanation(event){
	// 阻止觸發父事件
    event.stopPropagation();
	// 設置視窗的寬度和高度
    var width = 900;
    var height = 350;

    // 計算視窗應該出現的位置，使其居中
    var left = (window.screen.width / 2) - (width / 2);
    var top = (window.screen.height / 2) - (height / 2);
    
    var explanationText =
    	"1. 0 0 8 ? * *          每天上午8點觸發 \n" + 
    	"2. 0 0/5 14 * * ?       在每天下午2點到下午2:55期間的每5分鐘觸發 \n" +
    	"3. 0 0-5 10 ? * MON-FRI 周一至周五的上午10點到10點05分 每一分鐘觸發 \n" +
    	"4. 0 15 10 L * ?        每月最後一日的上午10:15觸發 \n" + 
    	"5. 0 15 10 ? * 6L       每月的最後一個星期五上午10:15觸發 \n" + 
    	"6. 0 15 10 ? * 6#3      每月的第三個星期五上午10:15觸發 \n"

	var newWindow = window.open("", "Cron 表達式說明", 
        `width=${width},height=${height},left=${left},top=${top}`);

	// 添加CSS來美化視窗內容並增大字體
    newWindow.document.head.innerHTML = `
        <style>
            pre {
                padding: 20px;
                font-size: 24px;
            }
        </style>
    `;
    
    newWindow.document.body.innerHTML = `
        <h1>Cron 表達式說明</h1>
        <pre>${explanationText}</pre>
    `;
    newWindow.document.close();
}