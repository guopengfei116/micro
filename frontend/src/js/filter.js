export default function(Vue) {
	
	// 日期过滤器
	Vue.filter('formatDate', function(time, format = 'yyyy-mm-dd') {
		let date = new Date(time);
		
		// 不同format对应的日期
		let pattern = {
			yyyy: date.getFullYear(),
			mm: date.getMonth() + 1,
			dd: date.getDate()
		};
		
		// format依次替换为年、月、日
		for(let key in pattern) {
			format = format.replace(new RegExp(key, 'i'), pattern[key]);
		}
		return format;
	});
	
};
