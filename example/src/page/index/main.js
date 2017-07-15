import Vue from 'vue';
import Hello from 'index';

import './container/index.less';

new Vue({
    el: '#container',
    render: h => h(Hello),
})