import { url as url_api } from '../path.json'
let baseUrl = url_api
let isOnline = false
let xhr = new XMLHttpRequest()	
export function onlineCheck() {
	return dispatch => {
		return new Promise((resolve, reject) => {
	        xhr.onload = () => {
	            isOnline = true
	            resolve(isOnline)
	            console.log('good')
	        }
	        xhr.onerror = () => {
	            isOnline = false
	            reject(isOnline)
	            console.log('bad')
	        }
	        xhr.open('GET', baseUrl, true)
	        xhr.send()
	    })
	}
}

/*this.props.checkConnectivity.onlineCheck().then(() => {
			
})
.catch(() => {
	alert('Интернет не работает. Пожалуйста проверьте ваше соединение')
})*/