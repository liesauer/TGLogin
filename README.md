适用于基于 [GramJS](https://github.com/gram-js/gramjs) 的项目的TG登录器，用于获取 Session。

## 使用说明
1. [api_id 和 api_hash 怎么获取](https://gram.js.org/getting-started/authorization#getting-api-id-and-api-hash)
2. 手机号需要加上区号，比如中国大陆就是：+86xxxxxxxxxxx，其他国家、区域同理
3. 支持 socks5 代理，格式：`[user:pass@]127.0.0.1:1080`
4. 收不到验证码怎么办？帮不了任何忙。
5. 会有封号风险吗？会存在风险，但风险取决于很多因素，参考：https://github.com/LonamiWebs/Telethon/issues/824

无法申请 API （一直提示 ERROR 等）可以尝试这个教程，[另一种不需要 API ID 和 API HASH 的登录方式](https://github.com/liesauer/TGLogin/discussions/1)。

**登录器不保存、上传任何历史登录信息，请自行妥善保管 Session**

**如发现账号有可疑登录记录、行为，TG客户端的设置中可登出可疑 Session，及时止损**
