<!-- 背景 组件，代表画布的背景 -->
<!-- Grid、Ruler 是自定义的组件 -->
<!-- 该组件根据传入的 props 属性来改变画布的背景 -->
<template>
	<div id="background">
		<div id="horiz-container" v-show='rulerVisibility'>
			<Ruler id='horizontalRuler' orientation='horizontal' :location='hLocation' :params='hParams'></Ruler>
		</div>
		<div id="verti-container" v-show='rulerVisibility'>
			<Ruler id='verticalRuler' orientation='vertical' :location='vLocation' :params='vParams'></Ruler>
		</div>
		<div id="grid-container">
			<Grid id='grid' :visibility='gridVisibility' :height='actualHeight' :width='actualWidth' :color="gridColor" :bgcolor='bgcolor'></Grid>
		</div>
	</div>
</template>
<script>
	import Ruler from './Ruler'
	import Grid from './Grid'

	export default {
		name: 'background',

		components: {
			Ruler,
			Grid,
		},

		data: function() {
			return {
	    	// 每个小刻度的默认真实长度
	    	interval:20,
	    }
	  },

	  props:[
	  'zoom',

	  // 'interval',
	  'hLocation',
	  'vLocation',

	  'rulerVisibility',
	  'gridVisibility',
	  'gridColor',
	  'height',
	  'width',
	  'bgcolor',
	  ],

	  computed:{
	  	// params的结构
	  	//  {
	   	//  	length, 	标尺真实长度
	   	//  	unit,		每个小刻度的显示长度
	   	//  	interval,	每个小刻度的真实长度
	   	//  }
	   	//  传入水平标尺的参数
	   	hParams:function() {
	   		var p = {
	   			length: this.actualWidth, 
	   			unit: this.unit,
	   			interval: this.interval,
	   		}
	   		return p
	   	},

	    // 传入垂直标尺的参数
	    vParams: function() {
	    	var p = {
	    		length: this.actualHeight,
	    		unit: this.unit,
	    		interval: this.interval,
	    	}
	    	return p
	    },

	    // 每个小刻度的显示长度
	    unit: function() {
	    	return this.interval / this.zoom
	    },

	    // 垂直标尺的实际长度
	    actualHeight: function() {
	    	return this.zoom * this.height
	    },

	    // 水平标尺的实际长度
	    actualWidth: function() {
	    	return this.zoom * this.width
	    },
	  }
	}
</script>
<style scoped>
#background{
	position: relative;
}
#horizontalRuler{
  background-color: #fff;
}

#verticalRuler{
  background-color: #fff;
}

#horiz-container {
  position: absolute;
  left: 22px;
  top: 2px;
}

#verti-container {
  position: absolute;
  left: 2px;
  top: 22px;
}

#grid-container {
  position: absolute;
  left: 22px;
  top: 22px;
}
</style>