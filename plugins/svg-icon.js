import Vue from 'vue'

import '@/icons/components'

import SvgIcon from 'vue-svgicon'
Vue.use(SvgIcon, {
    tagName: 'svg-icon',
    defaultWidth: '1em',
    defaultHeight: '1em'
})