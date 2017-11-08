import Vue from 'vue';
import Spinner from 'index';

import './container/index.less';

new Vue({
    el: '#container',
    render: h => h(Spinner),
});
