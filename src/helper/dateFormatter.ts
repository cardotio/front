import { TypeMessageInfo } from "types";

export function getOnlyDate(date: string) {
    return date.split(" ")[0];
}

export function getOnlyTime(date: string) {
    return date.split(" ")[1];
}

export function formatDateToKR(date: string) {  // yyyy년 mm월 dd일
    const splitedDate = date.split(" ")[0].split("-");
    return splitedDate[0] + "년 " + splitedDate[1] + "월 " + splitedDate[2] + "일 ";
};

export function createDateTimeStamp (message: TypeMessageInfo) {
    return {
        messageId: message.messageId,
        content: "timestamp",
        sender: message.sender,
        senderDisplayname: message.senderDisplayname,
        receiver: message.receiver,
        createdDate: message.createdDate,
        type: false,
        teamId: message.teamId,
        unread: message.unread,
        isTimestamp: true,
    }
}
export function splitByDate(messages: TypeMessageInfo[]) {
    let latestDate = getOnlyDate(messages[0].createdDate);
    const resultMessages = [];
    for (let i = 1; i < messages.length; i++) {
        if (getOnlyDate(messages[i].createdDate) !== latestDate) {
            latestDate = getOnlyDate(messages[i].createdDate);
            resultMessages.push(createDateTimeStamp(messages[i]));
        }
        resultMessages.push(messages[i]);
    }
    return resultMessages;
};