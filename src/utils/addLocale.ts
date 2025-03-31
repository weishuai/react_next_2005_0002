import { locale, addLocale, updateLocaleOption, updateLocaleOptions, localeOption, localeOptions } from 'primereact/api';
import { globalStorage } from '../utils/Globalstorage';
const  fhlocale=globalStorage.get("locale")
console.log('locale22:' +fhlocale);
// if(fhlocale=="cn")
// {
  addLocale('cn', {
    firstDayOfWeek: 1,
    dayNames: ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'],
    dayNamesShort: ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'],
    dayNamesMin: ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'],
    monthNames: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'],
    monthNamesShort: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'],
    today: '今天',
    clear: '清除',
    startsWith: '以开头',
    contains: '包含',
    notContains: '不包含',
    endsWith: '以结尾',
    equals: '等于',
    notEquals: '不等于',
    noFilter: '不过滤',
    lt: '少于',
    lte: '小于或等于',
    gt: '大于',
    gte: '大于或等于',
    dateIs: '日期为',
    dateIsNot: '日期不是',
    dateBefore: '日期早于',
    dateAfter: '日期晚于',
    custom: '习惯',
    apply: '申请',
    matchAll: '全部匹配',
    matchAny: '匹配任意项',
    addRule: '添加规则',
    removeRule: '删除规则',
    accept: '对',
    reject: '不',
    choose: '选择',
    upload: '上载',
    weekHeader: '工作',
    dateFormat: 'mm/dd/yy',
    weak: '微弱的',
    medium: '中等的',
    strong: '坚强的',
    passwordPrompt: '输入密码',
    emptyFilterMessage: '未找到结果',
    emptyMessage: '没有可用选项'

  });

  locale('cn');
// }
  //globalStorage.set("locale",'cn');
