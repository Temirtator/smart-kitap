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
	        }
	        xhr.onerror = () => {
	            isOnline = false
	            reject(isOnline)
	        }
	        xhr.open('GET', baseUrl, true)
	        xhr.send()
	    })
	}
}
