export default class Notification {
    constructor(message) {
        document.dispatchEvent(new CustomEvent('notification', { detail: message }))
    }
}