import {FileType} from "./types"
import yaml from "js-yaml";

export function compress(content: string, fileType: FileType): string {
    try {
        return fileType === "json"
            ? JSON.stringify(JSON.parse(content))
            : fileType === "text"
                ? JSON.stringify((content.split('\n') || []))
                : JSON.stringify(yaml.load(content)) as string;
    } catch (error) {
        throw new Error(`${fileType} is not valid`)
    }
}

export function prettierJson(content: string, fileType: FileType): string {
    if (typeof content !== "string") return JSON.stringify(content, null, 2);
    try {
        return fileType === "json" ? JSON.stringify(JSON.parse(content), null, 2)
            : fileType === "text"
                ? content
                : yaml.dump(yaml.load(content)) as string;
    } catch (error) {
        throw new Error('json is not valid')
    }
}

// copy content to clipboard
export function copy2Clipboard(content: string) {
    navigator.clipboard.writeText(content)
}
