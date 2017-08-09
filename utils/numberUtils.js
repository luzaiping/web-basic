/**
 * 阿拉伯数字转中文数字,
 * 如果传入数字时则最多处理到21位，超过21位js会自动将数字表示成科学计数法，导致精度丢失和处理出错
 * 传入数字字符串则没有限制
 * @param {number|string} digit
 */

let ChineseSymbole = ['零', '一', '二', '三', '四', '五', '六', '七', '八', '九']
let ChineseSection = ['', '万', '亿', '万亿']
let ChineseUnit = ['', '十', '百', '千']
let ChineseUnitArab = {
    '零': 0,
    '一': 1,
    '二': 2,
    '三': 3,
    '四': 4,
    '五': 5,
    '六': 6,
    '七': 7,
    '八': 8,
    '九': 9,
    '十': 10,
    '百': 100,
    '千': 1000,
    '万': 10000,
    '亿': 100000000,
    '万亿': 1000000000000
}

function Arab2Chn_section(v) {
    let num_str = '',
        unit_idx = 0,
        set_zero = false
    while (v > 0) {
        let n = v % 10,
            s = ChineseSymbole[n],
            unit = ChineseUnit[unit_idx++]
        v = Math.floor(v / 10)
        if (num_str == '' && n == 0) {
            continue
        }
        if (n > 0) {
            if (n == 1 && unit == ChineseUnit[1] && v == 0) {
                s = ''
            }
            num_str = s + unit + num_str
            set_zero = false
        } else {
            if (!set_zero) {
                set_zero = true
                num_str = ChineseSymbole[0] + num_str
            }
        }
    }

    return num_str
}

function Chinese2Arab_section(str) {
    let n = 0

    for (let i = 0; i < str.length; i++) {
        let n2 = ChineseUnitArab[str[i]]
        if (typeof n2 == 'undefined') {
            // 使用中文拼音输入法时，输入框首先接收到的是拼音，然后才会变成汉字，
            // 在拼音阶段，可能导致这个报错：
            console.log('非法字符')
            continue
        }
        if (n2 === 0) continue
        let n3 = 1
        if (n2 < 10) {
            if (++i < str.length) {
                n3 = ChineseUnitArab[str[i]]
                if (n3 < 10) {
                    console.log('invalid: 数字之间缺少单位')
                    return -1
                }
            }
        } else {
            if (!(n2 == 10 && n == 0)) {
                console.log('invalid: 单位前面缺少数字')
                return -1
            }
        }
        n += n2 * n3
    }
    return n
}

function Arab2Chinese(v) {
    let chn_num = '',
        sec_idx = 0
    v = Math.floor(v)
    let CHINESE_SECTION = 10000
    while (v > 0) {
        if (sec_idx >= ChineseUnit.length) {
            return '数字超过范围！'
        }
        let section = v % CHINESE_SECTION,
            unit = ChineseSection[sec_idx]
        v = Math.floor(v / CHINESE_SECTION)
        sec_idx++
        if (section == 0) continue
        let zero_prefix = (v > 0 && section < CHINESE_SECTION / 10) ? ChineseSymbole[0] : ''
        chn_num = zero_prefix + Arab2Chn_section(section) + unit + chn_num
    }

    //chn_num为''时v是0
    chn_num = chn_num === '' ? ChineseSymbole[0] : chn_num

    return chn_num
}

function Chinese2Arab(str) {
    let n = 0,
        si = 0
    for (let i = 0; i < str.length; i++) {
        let n2 = ChineseUnitArab[str[i]]
        if (n2 > 1000) {
            let n3 = Chinese2Arab_section(str.slice(si, i))
            if (n3 >= 0) {
                n += n3 * n2
            } else {
                return 0
            }
            si = i + 1
        }
    }
    let n2 = Chinese2Arab_section(str.slice(si))
    if (n2 < 0) {
        return 0
    }
    return n + n2
}

module.exports = {
    Arab2Chinese,
    Chinese2Arab
}

console.log(Arab2Chinese('1'))
console.log(Arab2Chinese('10'))
console.log(Arab2Chinese('11'))
console.log(Arab2Chinese('99'))
console.log(Arab2Chinese('100'))
console.log(Arab2Chinese('101'))

console.log(Chinese2Arab('一'))
console.log(Chinese2Arab('十'))
console.log(Chinese2Arab('十一'))
console.log(Chinese2Arab('二十一'))
console.log(Chinese2Arab('九十九'))
console.log(Chinese2Arab('一百'))
console.log(Chinese2Arab('一百零一'))
