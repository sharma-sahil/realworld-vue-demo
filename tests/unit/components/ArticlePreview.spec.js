import { shallowMount } from '@vue/test-utils'
import ArticlePreview from '@/components/ArticlePreview.vue'

describe('ArticlePreview.vue', () => {
    it('renders props.article when passed', () => {
        const article = {
            author: {
                username: "sahil"
            },
            title: "Test",
            description: "For testing",
            body: "This is a test article",
            tagList: []
        }
        const msg = article.title + ' ' + article.description + ' Read more...';
        const wrapper = shallowMount(ArticlePreview, {
            propsData: { article },
            stubs: ['router-link']
        })
        expect(wrapper.text()).toMatch(msg)
    })

})
