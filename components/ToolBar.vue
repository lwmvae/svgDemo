<!-- 工具栏 组件 -->
<!-- 使用 iview 的 ButtonGroup、Button组件 -->
<!-- ObrIcon 为自定义的组件 -->
<!-- TODO: 等高，等宽，恢复初始状态 -->
<!-- TODO：文字属性 -->
<!-- TODO：填充色、线条颜色 -->
<!-- TODO：缩放倍数选择下拉框 -->
<template>
	<div>
		<div class="toolContainer">
			<ButtonGroup size="small">
				<Button @click="fileSignal('new')" title="新建文件 Ctrl+N">
					<ObrIcon type="xinjian"></ObrIcon>
				</Button>
				<Button @click="fileSignal('open')" title="打开文件 Ctrl+O">
					<ObrIcon type="dakai"></ObrIcon>
				</Button>
				<Button @click="fileSignal('save')" title="保存文件 Ctrl+S">
					<ObrIcon type="baocun"></ObrIcon>
				</Button>
			</ButtonGroup>
			
			<ButtonGroup size="small">
				<Button @click="editSignal('undo')" title="取消上次操作 Ctrl+Z">
					<ObrIcon type="quxiaoshangcicaozuo"></ObrIcon>
				</Button>
				<Button @click="editSignal('redo')" title="恢复上次操作 Ctrl+Y">
					<ObrIcon type="huifushangcicaozuo"></ObrIcon>
				</Button>
				<Button @click="editSignal('cut')" title="剪切 Ctrl+X">
					<ObrIcon type="jianqie"></ObrIcon>
				</Button>
				<Button @click="editSignal('copy')" title="复制 Ctrl+C">
					<ObrIcon type="kaobei"></ObrIcon>
				</Button>
				<Button @click="editSignal('paste')" title="粘贴 Ctrl+V">
					<ObrIcon type="niantie"></ObrIcon>
				</Button>
				<Button @click="editSignal('delete')" title="删除 Delete">
					<ObrIcon type="shanchu"></ObrIcon>
				</Button>
			</ButtonGroup>
			<ButtonGroup size="small">
				<Button @click="arrangeSignal('leftAlign')" title="左对齐">
					<ObrIcon type="zuoduiqi"></ObrIcon>
				</Button>
				<Button @click="arrangeSignal('horizontalAlign')" title="水平居中">
					<ObrIcon type="shuipingjuzhong"></ObrIcon>
				</Button>
				<Button @click="arrangeSignal('rightAlign')" title="右对齐">
					<ObrIcon type="youduiqi"></ObrIcon>
				</Button>
				<Button @click="arrangeSignal('topAlign')" title="上对齐">
					<ObrIcon type="shangduiqi"></ObrIcon>
				</Button>
				<Button @click="arrangeSignal('verticalAlign')" title="垂直居中">
					<ObrIcon type="chuizhijuzhong"></ObrIcon>
				</Button>
				<Button @click="arrangeSignal('bottomAlign')" title="下对齐">
					<ObrIcon type="xiaduiqi"></ObrIcon>
				</Button>

				<!-- TODO -->
				<Button @click="" title="等宽">
					<ObrIcon type="dengkuan"></ObrIcon>
				</Button>
				<!-- TODO -->
				<Button @click="" title="等高">
					<ObrIcon type="denggao"></ObrIcon>
				</Button>
			</ButtonGroup>
			<ButtonGroup size="small">
				<Button @click="arrangeSignal('toFront')" title="移到最上">
					<ObrIcon type="yidaozuishang"></ObrIcon>
				</Button>
				<Button @click="arrangeSignal('moveUp')" title="上移一层">
					<ObrIcon type="shangyiyiceng2"></ObrIcon>
				</Button>
				<Button @click="arrangeSignal('moveDown')" title="下移一层">
					<ObrIcon type="xiayiyiceng2"></ObrIcon>
				</Button>
				<Button @click="arrangeSignal('toBottom')" title="移到最下">
					<ObrIcon type="yidaozuixia1"></ObrIcon>
				</Button>
			</ButtonGroup>
			<ButtonGroup size="small">
				<Button @click="arrangeSignal('horizontalFlip')" title="水平翻转">
					<ObrIcon type="shuipingfanzhuan"></ObrIcon>
				</Button>
				<Button @click="arrangeSignal('verticalFlip')" title="垂直翻转">
					<ObrIcon type="chuizhifanzhuan"></ObrIcon>
				</Button>
				<Button @click="arrangeSignal('rightRotate')" title="顺时针旋转90度">
					<ObrIcon type="shunshizhen"></ObrIcon>
				</Button>
				<Button @click="arrangeSignal('leftRotate')" title="逆时针旋转90度">
					<ObrIcon type="nishizhen"></ObrIcon>
				</Button>
			</ButtonGroup>
			<ButtonGroup size="small">
				<!-- TODO -->
				<Button @click="sceneSignal('zoomOri')" title="恢复原始尺寸">
					<ObrIcon type="huifuyuanshichicun"></ObrIcon>
				</Button>

				<Button @click="sceneSignal('zoomIn')" title="放大">
					<ObrIcon type="fangda"></ObrIcon>
				</Button>
				<Button @click="sceneSignal('zoomOut')" title="缩小">
					<ObrIcon type="suoxiao"></ObrIcon>
				</Button>
			</ButtonGroup>
		</div>
		<div class="toolContainer">
			<!-- TODO -->
			<ButtonGroup size="small">
				<Button title="文字加粗">
					<ObrIcon type="jiacub"></ObrIcon>
				</Button>
				<Button title="文字倾斜">
					<ObrIcon type="xietii"></ObrIcon>
				</Button>
				<Button title="文字左对齐">
					<ObrIcon type="zuoduiqi1"></ObrIcon>
				</Button>
				<Button title="文字居中对齐">
					<ObrIcon type="zhongduiqi"></ObrIcon>
				</Button>
				<Button title="文字右对齐">
					<ObrIcon type="youduiqi1"></ObrIcon>
				</Button>
				<Button title="文字颜色">
					<ObrIcon type="wenziyanse"></ObrIcon>
				</Button>
			</ButtonGroup>

			<!-- TODO -->
			<ButtonGroup size="small">
				<Button title="填充色">
					<ObrIcon type="tianchongse"></ObrIcon>
				</Button>
				<Button title="线条颜色">
					<ObrIcon type="xiantiaoyanse"></ObrIcon>
				</Button>
			</ButtonGroup>

			<ButtonGroup size="small">
				<Button @click="arrangeSignal('group')" title="合并元件">
					<ObrIcon type="zuhe1"></ObrIcon>
				</Button>
				<Button @click="arrangeSignal('ungroup')" title="拆分元件">
					<ObrIcon type="fenzu"></ObrIcon>
				</Button>
				<Button @click="editSignal('selectAll')" title="全部选中">
					<ObrIcon type="quanbuxuanzhong"></ObrIcon>
				</Button>
				<Button @click="editSignal('selectRest')" title="反向选中">
					<ObrIcon type="fanxiangxuanzhong"></ObrIcon>
				</Button>
			</ButtonGroup>
		</div>
	</div>
</template>
<script>
	import ObrIcon from './ObrIcon'
	import { mapMutations } from 'vuex'
	export default {
		name: 'toolbar',
		components: {
			ObrIcon,
		},
		data() {
			return {}
		},
		mounted(){
			var that=this;
			window.addEventListener('keydown',function(e){
				var keyCode = e.keyCode || e.which || e.charCode;
        var ctrlKey = e.ctrlKey || e.metaKey;
        var altKey = e.altKey;
				// console.log(altKey)
				
				//Ctrl+N 新建文件
				if(keyCode==78 && ctrlKey){
					that.fileSignal('new')
				}
				//Ctrl+O 打开文件
				if(keyCode==79 && ctrlKey){
					that.fileSignal('open')
				}
				//Ctrl+S 保存文件
				if(keyCode==83 && ctrlKey){
					that.fileSignal('save')
				}

				//Ctrl+Z 取消上次操作
				if(keyCode==90 && ctrlKey){
					that.editSignal('undo')
				}
				//Ctrl+Y 恢复上次操作
				if(keyCode==89 && ctrlKey){
					that.editSignal('redo')
				}
				//Ctrl+X 剪切
				if(keyCode==88 && ctrlKey){
					that.editSignal('cut')
				}
				//Ctrl+C 复制
				if(keyCode==67 && ctrlKey){
					that.editSignal('copy')
				}
				//Ctrl+V 粘贴
				if(keyCode==86 && ctrlKey){
					that.editSignal('paste')
				}
				//Delete 删除
				if(keyCode==46){
					that.editSignal('delete')
				}

			})
		},
		methods: {
			...mapMutations({
				fileSignal: 'FILE_SIGNAL',
				editSignal: 'EDIT_SIGNAL',
				arrangeSignal: 'ARRANGE_SIGNAL',
				sceneSignal: 'SCENE_SIGNAL',
			})
		}
	}
</script>
<style>
	.toolContainer {
		padding: 5px 5px;
	}
	.toolContainer button {
	    border: 1px solid transparent;
	}

	.toolContainer button:hover {
	    border: 1px solid #2b85e4;
	}

	.toolContainer .ivu-btn-group {
		border-left: 1px inset #fff;
		padding-left: 2px;
	}

	.toolContainer .ivu-btn-group:first-child {
		border-left-style: none;
	}
</style>