// 获取三个月之前的时间毫秒数与当前时间的标准格式
function getTime(type) {
  if (type === 'start') {
    return new Date().getTime() - 3600 * 1000 * 24 * 90    //毫秒数
  } else {
    // new Date().toDateString() ==> "Fri May 21 2021"
    return new Date(new Date().toDateString())   //2020-08-20T16:00:00.000Z
  }
}



// 格式化时间
function parseTime(time, pattern) {
	if (arguments.length === 0 || !time) {
		return null
	}
	const format = pattern || '{y}-{m}-{d} {h}:{i}:{s}'
	let date
	if (typeof time === 'object') {
		date = time
	} else {
		if ((typeof time === 'string') && (/^[0-9]+$/.test(time))) {
			time = parseInt(time)
		}
		if ((typeof time === 'number') && (time.toString().length === 10)) {
			time = time * 1000
		}
		date = new Date(time)
	}
	const formatObj = {
		y: date.getFullYear(),
		m: date.getMonth() + 1,
		d: date.getDate(),
		h: date.getHours(),
		i: date.getMinutes(),
		s: date.getSeconds(),
		a: date.getDay()
	}
	const time_str = format.replace(/{(y|m|d|h|i|s|a)+}/g, (result, key) => {
		let value = formatObj[key]
		// Note: getDay() returns 0 on Sunday
		if (key === 'a') { return ['日', '一', '二', '三', '四', '五', '六'][value] }
		if (result.length > 0 && value < 10) {
			value = '0' + value
		}
		return value || 0
	})
	return time_str
}



// 一天之内的某时某分转化为毫秒数
function coversionTimeToSecond(str){
  return str.split(':')[0]*3600+str.split(':')[1]*60;
}



// 一天之内的毫秒数转化为某时某分
function coversionTimeToHour(str){
  var str2 = parseInt((str%3600)/60);
  if(str2<10){
    str2='0'+str2;
  }
  var str3 = Math.floor((str/3600));
  if(str3<10){
    str3='0'+str3;
  }
  return str3+':'+str2
}

// 将由"-"连接的时间转化为new Date()可识别的以"/"连接的字符串
function coversionToDate(value){
  let t = parseTime(value, "{y}-{m}-{d}");
  let str = t.replace("/-/g",'/')
  let dt = new Date(str);
  return dt;
}

// 获取过去一年之内的几个月前的时间,依赖parseTime
function filterPreMonth(date,count){

  if(parseInt(count) >= 12||parseInt(count)<1) return false
  let timeStr = parseTime(date,'{y}-{m}-{d}')
  let timeArr = timeStr.split('-');
  let str;
  parseInt(timeArr[1])-count>0 ?
    str = ''+timeArr[0]+'-'+
      ((parseInt(timeArr[1])-count)>9?parseInt(timeArr[1])-count:'0'+parseInt(timeArr[1])-count)
      +'-'+timeArr[2]:
    (
      str = ''+(parseInt(timeArr[0])-1)+'-'+
      (12+(parseInt(timeArr[1])-count)>9?12+(parseInt(timeArr[1])-count):'0'+(12+(parseInt(timeArr[1])-count)))
      +'-'+timeArr[2]
    )
  return str
}

console.log(getTime('start'));
console.log(getTime(12));