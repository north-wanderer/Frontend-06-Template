function kmp(source, pattern) {
  // 计算 table
  const table = new Array(pattern.length).fill(0)
  table[0] = -1

  {
    let i = 1; let j = 0
    while (i < pattern.length) {
      if (pattern[i] === pattern[j]) {
        ++j, ++i
        table[i] = j
      } else {
        if (j > 0) {
          j = table[j]
        } else {
          ++i
        }
      }
    }
    console.log(table)
  }

  {
    let i = 0; let j = 0
    while (i < source.length) {
      if (pattern[j] === source[i]) {
        ++j, ++i
      } else {
        if (j > 0) {
          j = table[j]
        } else {
          ++i
        }
      }
      if (j === pattern.length) {
        return true
      }
    }
    return false
  }
}

console.log(kmp('ababaab', 'ababa'))

function KMP(source, pattern) {
  // 预处理，生成next数组
  const next = getPrefixTable(pattern)
  let j = 0
  // 主循环，遍历主串字符
  for (let i = 0; i < source.length; i++) {
    while (j > 0 && source.charAt(i) !== pattern.charAt(j)) {
      // 遇到坏字符时，查询next数组并改变模式串的起点
      j = next[j]
    }
    if (source.charAt(i) === pattern.charAt(j)) {
      j++
    }
    if (j === pattern.length()) {
      // 匹配成功，返回下标
      return i - pattern.length() + 1
    }
  }
  return -1
}

// 生成前缀表
function getPrefixTable(pattern) {
  const table = new Array(pattern.length).fill(0)
  let j = 0
  for (let i = 2; i < pattern.length; i++) {
    while (j !== 0 && pattern.charAt(j) !== pattern.charAt(i - 1)) {
      // 从next[i+1]的求解回溯到 next[j]
      j = table[j]
    }
    if (pattern.charAt(j) === pattern.charAt(i - 1)) {
      j++
    }
    table[i] = j
  }
  return table
}
