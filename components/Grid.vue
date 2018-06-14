<!-- 网格 组件 -->
<template>
	<canvas :id="id"></canvas>
</template>
<script>
	import { gridLines } from '../utils/grid/grid'
	import { options } from '../options/options'

	// 画布的最大高度
	var maxHeight = options.maxCanvasHeight

	// 画布的最大宽度
	var maxWidth = options.maxCanvasWidth

	// 网格间距
	var interval = options.gridInterval
	export default {
		name: 'Grid',

		props: [
			// canvas 的 id
			'id',

			// canvas 的高度
			'height',

			// canvas 的宽度
			'width',

			// 网格线颜色
			'color',

			// 是否显示网格线
			'visibility',

			// canvas 的背景色
			'bgcolor',
		],

		data() {
			return {
			}
		},
		methods:{
			// 设定网格线的属性
			setLinesProperty:function(options) {
				var objs = this.canvas.getObjects()
				objs.forEach(o => {
					o.set(options)
				})
				this.canvas.renderAll()
			},
		}, 

		mounted: function() {
			this.canvas = new fabric.Canvas(this.id)

			// 生成网格线
			var lines = gridLines({
				x1: 0,
				y1: 0,
				x2: maxWidth,
				y2: maxHeight,
				color: this.color,
				interval: interval,
			})
			// 将网格线加到 canvas 上
			lines.forEach(l => {
				this.canvas.add(l)
			})

			// 设置 canvas 的属性
			this.canvas.setBackgroundColor(this.bgcolor)
			this.canvas.setHeight(this.height)
			this.canvas.setWidth(this.width)
			this.canvas.renderAll()
		},

		// 根据 props 的传入值，更新
		watch: {
			color: function() {
				var opt = {
					stroke:this.color,
				}
				this.setLinesProperty(opt)
			},
			visibility: function() {
				var opt = {
					visible:this.visibility
				}
				this.setLinesProperty(opt)
			},
			bgcolor: function() {
				this.canvas.setBackgroundColor(this.bgcolor)
				this.canvas.renderAll()
			},
			height: function() {
				this.canvas.setHeight(this.height)
			},
			width: function() {
				this.canvas.setWidth(this.width)
			},
		},

	}
</script>
<style>
	
</style>