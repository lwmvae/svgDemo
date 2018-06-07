<template>
	<div class="aside">
		<div class="info" @click="showTree">
			<span class="title">{{treeTitle}}</span>
			<Icon type="arrow-down-b"></Icon>
		</div>
		<transition name="fade">
			<Tree class="tree" :data="treeList" @on-select-change="getTitle" v-show="tree"></Tree>
		</transition>
	</div>
</template>
<script>
	import { mapGetters, mapMutations } from 'vuex'

	export default{
		data(){
			return{
				tree:false
			}
		},
		methods:{
			showTree(){
				this.tree=!this.tree;
			},
			getTitle(e){
				this.tree=false;
				this.setTreeTitle(e[0].title);
			},
			...mapMutations({setTreeTitle:'SET_TREE_TITLE'})
		},
		computed:{
			...mapGetters(['treeList','treeTitle'])
		},
		watch:{

		}
	}
</script>
<style scoped>
.aside{
	position: relative;
}
.info{
	border:1px solid #d0c7c7;
	cursor: pointer;
}
.title{
	display: inline-block;
	width: 150px;
	height: 25px;
	line-height: 25px;
	padding-left: 5px;
}
.tree{
	width: 100%;
	box-sizing: border-box;
	background-color: #fff;
	position:absolute;
	top:27px;
	left:0;
	z-index: 1000;
	padding-left: 5px;
	min-height: 200px;
	max-height: 500px;
	overflow: auto;
}
.fade-enter-active, .fade-leave-active {
  transition: opacity .3s;
}
.fade-enter, .fade-leave-to {
  opacity: 0;
}
</style>