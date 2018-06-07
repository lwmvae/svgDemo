<!-- 自定义的 标尺 组件 -->
<template>
	<canvas :id="id"></canvas>
</template>
<script>
	import { ruler } from '../utils/ruler/ruler.js'
	import { utils } from '../utils/utils.js'

	// 标尺默认高度
	var defaultHeight = 20
	export default {
		name:'Ruler',

		props:[
			// 标尺的朝向，'horizontal' or 'vertical'
			'orientation',

			// {
			//  	length: 	标尺实际长度
			//  	unit: 		最小刻度所表示的长度
			//  	interval: 	最小刻度的实际长度
			// }
			'params',

			// 位置指示器（实心小三角） 的位置
			'location',

			// canvas 的 id
			'id',
		],

		data () {
			return {
			}
		},

		methods:{
			update() {
				// 设置标尺长度
				let len = this.params.length
				this.setLength(len)

				this.canvas.clear()

				// 新生产 刻度线 和 刻度，并添加到 canvas 上
				var lines = this.lines()
				utils.addObjects(this.canvas, lines)
				var labels = this.labels()
				utils.addObjects(this.canvas, labels)
				this.canvas.add(this.pointer)

				// 更新 位置指示器（实心小三角） 的位置
				this.setPosOfIndicator(this.isVertical, this.location)
				this.canvas.renderAll()
			},

			// 生成 刻度线
			lines() {
				return ruler.lines(this.isVertical, this.params, defaultHeight)
			},

			// 生成 刻度
			labels() {
				return ruler.labels(this.isVertical, this.params, defaultHeight)
			},

			// 生成 位置指示器（实心小三角）
			indicator() {
				return ruler.indicator(this.isVertical, defaultHeight)
			},

			// 设定 位置指示器（实心小三角）的位置
			setPosOfIndicator(isVertical, location) {
				if (isVertical) {
					this.pointer.set({
						top:location,
					})
				} else {
					this.pointer.set({
						left:location,
					})
				}
				this.canvas.renderAll()
			},

			// 设定 标尺 的长度
			setLength(length) {
				if(this.isVertical) {
					this.canvas.setHeight(length)
				} else {
					this.canvas.setWidth(length)
				}
			}
		},

		mounted: function() {
			this.canvas = new fabric.Canvas(this.id)
			this.pointer = this.indicator()
			this.update()
		},

		watch:{
			params:function() {
				// 更新标尺
				this.update()
			},

			location:function() {
				this.setPosOfIndicator(this.isVertical, this.location)
			},

		},

		computed:{
			// 判定 标尺 是垂直还是水平
			isVertical:function() {
				return this.orientation === 'vertical'
			},
		},
	}
</script>
<style>
</style>