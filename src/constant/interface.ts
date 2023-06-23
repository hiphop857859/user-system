export interface ICalendar {
    subject: string,
    body ?: {
        contentType?: string,
        content?: string
    },
    start?: {
        dateTime: string,
        timeZone: string
    },
    end?: {
        dateTime: string,
        timeZone: string
    },
    location?: {
        displayName?: string
    },
    attendees ?: [
        {
            emailAddress?: {
                address: string
            },
            type?: string
        }
    ]
}
