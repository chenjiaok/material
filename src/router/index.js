import Vue from 'vue'
import Router from 'vue-router'
import hello from '@/components/hello'
import material from '@/components/material/material'
import MaterialTotal from '@/components/material/materialtotal'
import MaterialDetail from '@/components/material/materialdetail'
import MaterialAdd from '@/components/material/materialadd'
import MaterialPut from '@/components/material/materialput' 


import stock from '@/components/stock/stock'
import StockDetail from '@/components/stock/stockdetail'
import StockTotal from '@/components/stock/stocktotal'


import StockIn from '@/components/stock/stockin'
import StockOut from '@/components/stock/stockout'
import StockPut from '@/components/stock/stockput'
import StockHistory from '@/components/stock/stockhistory'


Vue.use(Router)

export default new Router({

	routes: [
		{
			path: '/',     
			component: hello,
		},
		{
			path: '/material',
			component: material,
			children: [
				{
					path: '/',
					component: MaterialTotal
				},
				{
					path: 'total',
					component: MaterialTotal
				},
				{
					path: 'detail',
					component: MaterialDetail
				},
				{
					path: 'add',
					component: MaterialAdd
				},
				{
					path: 'put',
					component: MaterialPut
				},
			]
		},
		{
			path: '/stock',
			component: stock,
			children: [
				{
					path: '/',
					component: StockTotal
				},
				{
					path: 'total',
					component: StockTotal
				},
				{
					path: 'detail',
					component: StockDetail
				},
				{
					path: 'in',
					component: StockIn
				},
				{
					path: 'out',
					component: StockOut
				},
				{
					path: 'put',
					component: StockPut
				},
				{
					path: 'history',
					component: StockHistory
				},
			]
		},  
	]
})
