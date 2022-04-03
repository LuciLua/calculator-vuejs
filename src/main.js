import Vue from 'vue'
import App from './App'

new Vue({
    render: h => h(App)
    // é igual a:
    // render(createElement){
    //     return createElement(App)
    // }
}).$mount("#app")
//  renderizando componente dntro da div com id app