import { shallowMount } from '@vue/test-utils'
import ArticleMeta from '@/components/ArticleMeta.vue'

describe('ArticleMeta.vue', () => {
    it('renders props.article when passed', () => {
        const date = new Date();
        date.setDate(1);
        date.setMonth(0);
        date.setFullYear(2019);
        const article = {
            author: {
                username: "sahil"
            },
            title: "Test",
            description: "For testing",
            body: "This is a test article",
            createdAt: date,
            tagList: []
        }
        const msg = 'sahil January 1st, 2019'
        const wrapper = shallowMount(ArticleMeta, {
            propsData: { article },
            stubs: ['router-link']
        })
        expect(wrapper.text()).toMatch(msg)
    })
})
