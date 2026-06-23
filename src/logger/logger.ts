import { prefix } from "../config";
import { LogEntry } from "../interfaces/default";

import * as fs from "fs";
import * as path from "path";

export class Logger {
    private static logsDir = path.join(process.cwd(), "logs");

    static log(entry: LogEntry): void {
        this.ensureLogsDir();

        const now = new Date();
        
        const year = now.getFullYear();
        const month = String(now.getMonth() + 1).padStart(2, "0");
        const day = String(now.getDate()).padStart(2, "0");
        
        const fileName = `${year}_${month}.log`;
        const filePath = path.join(this.logsDir, fileName);

        this.ensureDayHeader(filePath, `${year}-${month}-${day}`);

        const level = entry.level || "INFO";
        const time = now.toTimeString().slice(0, 8);
        const platform = entry.platform.toUpperCase();
        const args = entry.args?.join(" ") || "";
        const channel = entry.channel ? `#${entry.channel}` : "";
        const user = entry.user ? `${entry.user}` : "";
        const command = entry.command ? ` ${prefix}${entry.command}` : "";
        const message = entry.message ? ` | ${entry.message}` : "";

        const error = entry.error ? ` | ERROR: ${
            entry.error instanceof Error 
            ? entry.error.message 
            : String(entry.error)
        }` : "";

        const logLine = 
          `[${time}] ` +
          `[${level}] ` +
          `[${platform}] ` +
          `${channel} ` +
          `[${user}]` +
          `${command} ` +
          (args ? ` ${args}` : "") +
          `${message}` +
          `${error}` +
          "\n";

        fs.appendFileSync(filePath, logLine, "utf8");
    }

    private static ensureLogsDir(): void {
        if (!fs.existsSync(this.logsDir)) {
            fs.mkdirSync(this.logsDir, { recursive: true });
        }
    }

    private static ensureDayHeader(filePath: string, day: string): void {
        if (!fs.existsSync(filePath)) {
            fs.writeFileSync(filePath, `===== ${day} =====\n`, "utf8");
            return;
        }

        const content = fs.readFileSync(filePath, "utf8");
        if (!content.startsWith(`===== ${day} =====`)) {
            fs.appendFileSync(filePath, `\n===== ${day} =====\n`, "utf8");
        }
    }
}