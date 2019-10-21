import { shallowMount, createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import NavBar from '@/components/NavBar.vue'

const localVue = createLocalVue()

localVue.use(Vuex)

describe('NavBar.vue', () => {
    let getters = {
        isAuthenticated: () => false
    }

    let store = new Vuex.Store({
        getters
    })

    it('should display correct links when user not authorized', () => {
        const wrapper = shallowMount(NavBar, {
            store,
            localVue,
            stubs: ['router-link']
        })

        const links = wrapper.findAll("li");
        expect(links.length).toEqual(3);
        expect(links.at(0).text()).toContain('Home');
        expect(links.at(1).text()).toContain('Sign in');
        expect(links.at(2).text()).toContain('Sign up');
        // expect(wrapper.text()).toMatch(msg)
    })

})
