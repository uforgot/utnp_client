// src/mq.ts
var MIN_WIDTH_MOBILE = 620;
var MIN_WIDTH_TABLET = 1024;
var MIN_WIDTH_DESKTOP = 1280;
var UNIT_STORED = {
  TYPE_PX: { unit: 'px', reg: new RegExp(/([0-9.]+)px/) },
  TYPE_STATIC_PX: { unit: 'spx', reg: new RegExp(/([0-9.]+)spx/) },
  TYPE_UNDEFINED: { unit: '', reg: null },
};
function getMqByString(str, isString = false) {
  const strArray = String(str).split('|');
  const property = strArray[0];
  const valueArray = String(strArray[1]).split('<');
  const rtnObj = new Mq(property, valueArray).value;
  if (!isString) {
    return rtnObj;
  }
  const rtnValue = JSON.stringify(rtnObj, null, 2);
  return rtnValue.replace(/"/g, '').replace(/,\n/g, '\n');
}
var Mq = class _Mq {
  constructor(property, origin) {
    this.property = property;
    this._valueArray = [];
    this.isDebug = false;
    let lastValue = origin[0];
    _Mq.breakPoint.forEach((value, index) => {
      if (origin[index] && index < _Mq.breakPoint.length - 1) {
        this._valueArray.push(this.getValue(origin[index], index));
        lastValue = origin[index];
      } else {
        this._valueArray.push(this.getValue(lastValue, index, true));
      }
    });
  }
  static {
    this.breakPoint = [
      MIN_WIDTH_MOBILE,
      MIN_WIDTH_TABLET,
      MIN_WIDTH_DESKTOP,
      MIN_WIDTH_DESKTOP + 1,
    ];
  }
  static {
    this.mobileRatio = 2;
  }
  static {
    this.MAX_DIGIT = 5;
  }
  static {
    this.constantStyle = {};
  }
  static get getBreakPoint() {
    return _Mq.breakPoint;
  }
  static setBreakPoint(value) {
    _Mq.breakPoint = value;
    _Mq.breakPoint.push(value[value.length - 1] + 1);
  }
  static setMobileRatio(value) {
    _Mq.mobileRatio = value;
  }
  get value() {
    const obj = {};
    // obj[this.property] = this.getValue(this._valueArray[0], 0, true);
    // vw 반영 하지 않도록 수정
    obj[this.property] = parseFloat(this._valueArray[1]) / 2 + 'px';

    // mobile 사이즈 하나만 있으므로 media 쿼리 생성 안함
    for (let i = 0; i < _Mq.breakPoint.length - 1; i++) {
      obj[`@media (min-width : ${_Mq.breakPoint[i] + 1}px)`] = {
        [this.property]: parseFloat(this._valueArray[i + 1]) / 2 + 'px',
      };
    }
    if (this.isDebug) console.log(obj);
    return obj;
  }
  getVw(value, width, isStatic = false) {
    if (width === _Mq.breakPoint[0]) {
      width = width / _Mq.mobileRatio;
    }
    if (!isStatic) {
      const match = value.match(/([0-9.]+)(px)/g);
      if (match) {
        match.forEach((str) => {
          const px = parseFloat(str.replace('px', ''));
          const vw = (px / width) * 100;
          value = value.replace(str, `${vw.toFixed(_Mq.MAX_DIGIT)}vw`);
        });
      }
    }
    value = value.replace(/spx/g, 'px');
    return value;
  }
  setChangeConstant(origin) {
    let rtn = origin.trim();
    for (const key of Object.keys(_Mq.constantStyle)) {
      const keyString = key.replace(new RegExp('_', 'g'), ' ');
      rtn = rtn.replace(
        new RegExp(`${keyString}`, 'g'),
        // @ts-ignore
        `${_Mq.constantStyle[key]}${typeof _Mq.constantStyle[key] === 'number' ? 'px' : ''}`
      );
    }
    return rtn;
  }
  getValue(origin, index = 0, isStatic = false, token = ' ') {
    let value = '';
    if (index === _Mq.breakPoint.length - 1) {
      isStatic = true;
    }
    origin = this.setChangeConstant(origin);
    if (!isStatic) {
      const splitValueArray = origin.split(token);
      if (splitValueArray.length > 0) {
        splitValueArray.forEach((_value, order) => {
          value += order !== 0 ? token : '';
          value += this.getVw(_value, _Mq.breakPoint[index]);
        });
      } else {
        value = this.getVw(origin, _Mq.breakPoint[index]);
      }
    } else {
      value = this.getVw(origin, _Mq.breakPoint[index], true);
    }
    return value.trim();
  }
};
var mq_default = Mq;

// src/index.ts
function index_default({ matchUtilities, theme }) {
  matchUtilities({
    mq: (str) => {
      return getMqByString(str);
    },
  });
}
export { mq_default as Mq, index_default as default };
//# sourceMappingURL=index.js.map
