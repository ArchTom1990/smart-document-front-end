export const storage = {
  // 设置缓存，duration 为有效时长（单位：毫秒）
  set: (key: string, value: any, duration: number) => {
    const data = {
      value: value,
      expiry: new Date().getTime() + duration,
    };
    localStorage.setItem(key, JSON.stringify(data));
  },

  // 获取缓存
  get: (key: string) => {
    const itemStr = localStorage.getItem(key);
    if (!itemStr) return null;

    const item = JSON.parse(itemStr);
    const now = new Date().getTime();

    // 如果当前时间超过了过期时间，则删除并返回 null
    if (now > item.expiry) {
      localStorage.removeItem(key);
      return null;
    }
    return item.value;
  },
};

// 使用的例子 // 使用示例：存入 Token，2 小时后过期
// storage.set('token', 'XXXXXXXXXXXXXXXXXXXX', 2 * 60 * 60 * 1000);
