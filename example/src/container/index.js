import Vue from 'vue';
import Hello from 'index';

import './index.less';

new Vue({
    el: '#container',
    render: h => h(Hello),
})
