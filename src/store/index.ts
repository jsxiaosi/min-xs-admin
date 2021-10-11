import { createStore, Store } from 'vuex'
import { InjectionKey } from 'vue'
import { AnyObject } from '#/vuex'

export interface State {
	[key: string]: any
}

export const key: InjectionKey<Store<State>> = Symbol('vuex')

const modules: AnyObject[] = ((r) => {
	return Object.keys(r).map((key) => {
		const name: any = key.match(/^\.\/module\/([\s\S]+)\/index\.ts$/)
		return {
			name: name[1],
			module: r[key].default,
		}
	})
})(import.meta.globEager('./module/**/index.ts'))

const modulesObj: AnyObject = {}

modules.forEach((item) => {
	modulesObj[item.name] = item.module
})

const store = createStore({
	modules: modulesObj,
	strict: process.env.NODE_ENV !== 'production',
})

// 热重载
// if (import.meta.hot) {
// 	import.meta.hot?.accept(Object.keys(modulesObj), () => {
// 		store.hotUpdate({
// 			modulesObj,
// 		})
// 	})
// }

export default store
