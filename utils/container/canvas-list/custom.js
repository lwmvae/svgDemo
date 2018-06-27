// 处理 序列化 和 反序列化 的问题
import { utils } from '../../utils'


// fabric classes used in SVGEditor 
// SVGEditor 中引用的 fabric的类的数组
var fabricClasses = [
	fabric.Rect,
	fabric.Triangle,
	fabric.Line,
	fabric.Circle,
	fabric.Ellipse,
	fabric.IText,
	fabric.Path,
	fabric.Polygon,
	fabric.Polyline,
	fabric.Group,
	fabric.Image,
]

// 添加的自定义属性
// 添加新的自定义属性时，需配置
var customProperties = [
	'name',
	'obrType', 
	'length', 
	'radius', 
	'startAngle', 
	'endAngle',
	'strokeDashArray'
]

// @klass object：SVGEditor 中引用的 fabric的类
// @properties array：自定义属性的数组
// 向 fabric 注册自定义的属性，这样序列化和反序列化的过程中就不会丢失自定义的属性
function addCustomProperties(klass, properties) {
	properties.forEach(function(property) {
		klass.prototype.stateProperties.push(property)
	})
}

// @klasses array：SVGEditor 中引用的 fabric的类
// @properties array：自定义属性的数组
// 向 fabric 注册自定义的属性，这样序列化和反序列化的过程中就不会丢失自定义的属性
function _customizeDeserialization(klasses, properties) {
	klasses.forEach(function(klass) {
		addCustomProperties(klass, properties)
	})
}

// 在引用的 fabric 的类中添加自定义属性，以便反序列化时能正确解析
function customizeDeserialization() {
	_customizeDeserialization(fabricClasses, customProperties)
}



// @target object：目标对象
// @properties array：待提取的属性名
// @return object：返回从 target 中提取目标属性值的对象
function extract(target, properties) {
	var s = {}
	properties.forEach(function(p) {
		s[p] = target[p]
	})
	return s
}

// @toObject function：引用的 fabric 的类的 prototype 所包含的 toObject 函数
// @properties array：自定义属性的数组
// @return function
function extend(toObject, properties) {
	return function() {
		var dest = toObject.call(this)
		var src = extract(this, properties)
		return fabric.util.object.extend(dest, src)
	}
}

// @prototype object：引用的 fabric 的类的 prototype
// @properties array：自定义属性的数组
// 修改 prototype.toObject，使之的调用结果包含自定义的属性
function _customizeSerialization(prototype, properties) {
	prototype.toObject = extend(prototype.toObject, properties)
}

// 定制序列化过程
function customizeSerialization() {
	fabricClasses.forEach(function(k) {
		_customizeSerialization(k.prototype, customProperties)
	})
}

// 该函数应在引入 fabric 后立即执行
// 定制化 序列化 和 反序列化 过程
function customize() {
	customizeDeserialization()
	customizeSerialization()
}


// @group object：普通 fabric.Group 实例或者 tempGroup
// 给传入对象加入自定义的 obrType 属性
function customizeGroup(group) {
	var g = group
	if (utils.isTempGroup(g)) {
		g.obrType = 'tempGroup'
	} else {
		g.obrType = 'group'
	}
}

// @image object：fabric.Image 实例
// 给传入对象加入自定义的 obrType 属性
function customizeImage(image) {
	image.obrType = 'image'
}

export {
	// function，定制化 序列化 和 反序列化 过程
	customize,

	// array，添加的自定义属性 
	customProperties,

	// function，定制化，给传入对象加入自定义的 obrType 属性
	customizeGroup,
	customizeImage,
}