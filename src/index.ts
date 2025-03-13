import input from 'input';
import { Logger, TelegramClient } from 'telegram';
import { LogLevel } from 'telegram/extensions/Logger';
import { ProxyInterface } from 'telegram/network/connection/TCPMTProxy';
import { StringSession } from 'telegram/sessions';

class MyLogger extends Logger {
    public format(message: string, level: string, messageFormat?: string) {
        return (messageFormat || this.messageFormat)
            .replace("%t", this.getDateTime())
            .replace("%l", level.toUpperCase())
            .replace("%m", message);
    }
    public log(level: LogLevel, message: string, color: string) {
        let multiLine = message.includes("\n");
        let messageFormat = "";

        if (multiLine) {
            messageFormat = "[%t] [%l]\n%m";
        } else {
            messageFormat = "[%t] [%l] - %m";
        }

        const log = color + this.format(message, level, messageFormat) + this['colors'].end;

        console.log(log);
    }
}

let logger: Logger = new MyLogger();
let client: TelegramClient;

(async function main() {
    logger.warn("此登录器获取的 Session 只适用于基于 GramJS 的项目");
    logger.info("https://github.com/gram-js/gramjs");

    console.log("");

    logger.info("↓↓↓ 使用说明 ↓↓↓");
    logger.info("https://github.com/liesauer/TGLogin");

    console.log("");

    const apiId: string   = await input.text("api_id: ");
    const apiHash: string = await input.text("api_hash: ");

    logger.info("手机号需要带区号，比如+86");

    const account: string = await input.text("phone: ");

    logger.info("SOCKS5 代理，回车跳过");
    logger.info("格式：[user:pass@]127.0.0.1:1080");

    const proxy: string   = await input.text("proxy: ");

    let proxyObj: ProxyInterface = undefined;

    try {
        const url = new URL("http://" + proxy.split("://").pop());

        proxyObj = {
            socksType: 5,
            ip: url.hostname || "127.0.0.1",
            port: Number(url.port) || 1080,
            secret: "",
            MTProxy: false,
            timeout: 3,
            username: url.username || undefined,
            password: url.password || undefined,
        };
    } catch (_) {}

    client = new TelegramClient(new StringSession(""), Number(apiId), apiHash, {
        baseLogger: logger,
        connectionRetries: 5,
        useWSS: false,
        proxy: proxyObj,
    });

    await client.start({
        phoneNumber: account,
        phoneCode: async () => {
            console.log("");

            logger.info("请检查短信、TG客户端是否接收到验证码");

            return await input.text("code: ");
        },
        onError: (err) => logger.error(err.message),
    });

    const session = <string><unknown>client.session.save();

    logger.info("※※※ Session ※※※");
    logger.info("请自行妥善保管，此登录器不保存任何历史登录信息");

    logger.warn(session);

    console.log("");

    client.setLogLevel(LogLevel.NONE);
    await client.destroy();
})();
