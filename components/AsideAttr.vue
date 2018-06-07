<template>
	<div class="asideAttr">
		<ul >
			<li class="clearFix" v-for="item in attrData" v-show="item.attrTitle">
				<div class="left">
					<p>{{item.attrTitle}}</p>
				</div>
				<div class="right">
					<p>{{item.name}}</p>
				</div>
			</li>
		</ul>
	</div>
</template>

<script>
export default {
	props:{
		attrData:{
			type:Array
		}
	}
}
</script>

<style scoped>
.asideAttr{
	margin-left: 4px;
}
li {
  width: 164px;
  height: 25px;
  line-height: 25px;
  overflow: hidden;
  border-bottom: 1px solid #d0c7c7;
}
.left {
  float: left;
  width: 81px;
  overflow: hidden;
  border-right: 1px solid #d0c7c7;
}
.right {
  float: left;
  width: 81px;
  overflow: hidden;
}
</style>
