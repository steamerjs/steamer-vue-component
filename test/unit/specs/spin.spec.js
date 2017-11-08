import Vue from 'vue';
import Spinner from '../../../src/spinner.vue';

describe('test', function() {
    it('spin initial word', function() {
        const Constructor = Vue.extend(Spinner);
        const vm = new Constructor().$mount();
        expect(vm.$el.querySelector('.spin').textContent).to.eql('loading');
    });
});
