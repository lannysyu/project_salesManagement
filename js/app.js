var token = $("meta[name='_csrf']").attr("content");
var header = $("meta[name='_csrf_header']").attr("content");

var purifyConfig = {
    ADD_ATTR: ['onclick', 'onkeyup', 'onchange'],
};

var contextPath = '';

window.onload = function() {
    contextPath = document.getElementById('contextPath').value;
    if (window.location.pathname === contextPath + '/main') {
        // 移除無權限查看的功能大標題
        $(document).ready(function() {
            $(".func-List").each(function() {
                if ($(this).children("li").length === 0) {
                    $(this).closest("li").remove();
                }
            });
        });
        
        // 初始化載入首頁
        $.ajax({
            url: contextPath + "/frontend/frontPage",
            type: "get",
            success: function(data) {
                var cleanData = DOMPurify.sanitize(data, purifyConfig);
                $("#page-right").html(cleanData);
            }
        });
        
        // 刷新跑馬燈
		$.ajax({
	        url: contextPath + '/systemManage/noticeManage/refresh',
	        type: "get",
	        success: function(data) {
				var cleanData = DOMPurify.sanitize(data, purifyConfig);
				 $('.marquee-container').replaceWith(cleanData);
				 
				 // 檢查更新後的 marquee-container 是否有內容
			    var hasNotices = $('.marquee-container').find('span').length > 0;
			    
			    // 根據結果調整 #page-right 的樣式
			    $('#page-right').css('top', hasNotices ? '100px' : '50px');
	        }
	    });
    }
};

function changeRightPage(url) {
    // 先檢查 session 是否有效
    if (!isSessionValid()) {
        // session 無效,重定向到登入頁面
        window.location.href = contextPath + "/login?timeout";
        return;
    }

    $.ajax({
        url: url,
        type: "get",
        async: false,
        success: function(data) {
            var cleanData = DOMPurify.sanitize(data, purifyConfig);
            //            console.log(DOMPurify.removed);
            $("#page-right").html(cleanData);
        }
    });
    
    //刷新跑馬燈
	$.ajax({
        url: contextPath + '/systemManage/noticeManage/refresh',
        type: "get",
        success: function(data) {
			var cleanData = DOMPurify.sanitize(data, purifyConfig);
			 $('.marquee-container').replaceWith(cleanData);
			 
			 // 檢查更新後的 marquee-container 是否有內容 
		    var hasNotices = $('.marquee-container').find('span').length > 0;
		    
		    // 根據結果調整 #page-right 的樣式
		    $('#page-right').css('top', hasNotices ? '100px' : '50px');
        }
    });
}

function isSessionValid() {
    try {
        var response = $.ajax({
            url: contextPath + "/check-session",
            type: "GET",
            async: false
        });

        return response.getResponseHeader('X-Session-Valid') === 'true';
    } catch (error) {
        console.error(error);
        return false;
    }
}

function toggleSortAndQuery(element, field, queryFunction) {
    const direction = toggleSortDirection(element);
    // 調用傳入的查詢方法
    queryFunction(field, direction);
    // 注意：需在查詢方法的success中自行調用updateSortStatus(field, direction);
}

// 獲取當前排序方向
function toggleSortDirection(element) {
    const isAsc = element.classList.toggle('sort-asc');
    element.classList.toggle('sort-desc', !isAsc);
    return isAsc ? 'ASC' : 'DESC';
}

// 更新排序狀態
function updateSortStatus(field, direction) {
    const allSortables = document.querySelectorAll('th.sortable');
    allSortables.forEach(th => {
        const icon = th.querySelector('.sort-icon');
        const isTargetColumn = th.dataset.field === field;

        if (isTargetColumn) {
            th.classList.remove('sort-asc', 'sort-desc');
            th.classList.add(direction === 'ASC' ? 'sort-asc' : 'sort-desc');
            icon.innerHTML = direction === 'ASC' ? '↑' : '↓';
        } else if (!th.classList.contains('sort-asc') && !th.classList.contains('sort-desc')) {
            // 只有當列沒有排序狀態時才設置默認狀態
            th.classList.add('sort-asc');
            icon.innerHTML = '↓↑';
        }
    });
}

// 取得頁面中所有所需欄位屬性，HTML元件預設須標註data-form-field Tag，且須有name屬性。如果使用th:field就會自己標註id、name。
// 也可以在HTML使用自定義Tag名稱，並在JS調用處傳入'[Tag名稱]'作為fieldTag參數。
// 預設取得類型為「物件」。如果要用ajax傳參數，在type參數給'value'，會自動根據不同類型取值；須使用JSON.stringify()包覆本方法調用。
function getDataFormFields(type = 'object', fieldTag = '[data-form-field]') {
    // 自動判斷欄位類型並取值的匿名函數
    const autoDetectValue = (input) => {
        // 根據標籤名稱和類型判斷
        const tagName = input.tagName.toLowerCase();
        const inputType = input.type ? input.type.toLowerCase() : '';

        // SELECT 元素的處理
        if (tagName === 'select') {
            if (input.multiple) {
                return Array.from(input.selectedOptions).map(opt => opt.value);
            }
            return input.value;
        }

        // INPUT 元素的處理
        if (tagName === 'input') {
            switch (inputType) {
                case 'checkbox':
                    return input.checked;
                case 'radio': {
                    const name = input.name;
                    const checkedInput = document.querySelector(`input[name="${name}"]:checked`);
                    return checkedInput ? checkedInput.value : null;
                }
                case 'number':
                case 'range':
                    return input.value === '' ? null : Number(input.value);
                case 'date':
                case 'datetime-local':
                    return input.value === '' ? null : new Date(input.value);
                case 'file':
                    return input.files;
                default:
                    return input.value;
            }
        }

        // TEXTAREA 元素的處理
        if (tagName === 'textarea') {
            return input.value;
        }

        // 其他元素的預設處理
        return input.value || null;
    };

    // 定義不同型別的值處理策略，值為函數
    const valueStrategies = {
        'value': autoDetectValue,
        'object': input => input
    };

    // 獲取處理策略。用鍵值對取值，取不到則預設使用物件類型，valueStrategies.object就是input => input。
    const getValue = valueStrategies[type] || valueStrategies.object;

    try {
        const inputs = document.querySelectorAll(fieldTag);
        const data = {};

        inputs.forEach(input => {
            if (!input.name) {
                console.warn('Field found without name attribute:', input);
                return; // 只跳過當前的迭代，不影響其他有效的元素
            }

            const nameArr = input.name.split('.');
            nameArr.reduce((acc, curVal, index) => {
                acc[curVal] = index === nameArr.length - 1
                    ? getValue(input) // 最後一層才賦值
                    : acc[curVal] || {};
                return acc[curVal]; // 向下一層級移動
            }, data);
        });

        return data;
    } catch (error) {
        console.error('Error processing form fields:', error);
        return {};
    }
}

//根據是否有跑馬燈緊急訊息 調整查詢結果的TABLE高度
function fixTableWrapHeight(){
	const marquee = document.getElementById('marquee');
    var hasNotices = marquee.innerText.length > 0;
    // 獲取當前 .table-wrap 的高度
    var currentHeight = $('.table-wrap').height(); 
    // 根據 hasNotices 計算新的高度
    var newHeight = hasNotices ? (currentHeight - 100) : currentHeight;
    // 調整 .table-wrap 的高度
    $('.table-wrap').css('height', newHeight + 'px');
}
