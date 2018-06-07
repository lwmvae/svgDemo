// 记录 缩放 倍数
// TODO：设计合理的允许缩放的倍数，保证 标尺 上的刻度为整数

// 允许缩放的倍数
var data = [
	0.25,
	0.5,
	0.75,
	1.00,
	1.25,
	1.50,
	2.00,
	3.00,
	4.00,
	5.00,
]

class ZoomData{
	constructor() {
		this.index = data.findIndex(function(e) {
			return e === 1
		})
	}

	// @return number：缩放倍数
	// 放大，并返回缩放倍数
	zoomIn() {
		if (this.index < data.length - 1) {
			this.index++
		}
		return data[this.index]
	}

	// @return number：缩放倍数
	// 缩小，并返回缩放倍数
	zoomOut() {
		if (this.index > 0) {
			this.index--
		}
		return data[this.index]
	}

	//原始尺寸
	zoomOri(){
		this.index=3
		console.log(data[this.index])
		return data[this.index]
	}

}

export { ZoomData }