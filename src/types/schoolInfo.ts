export type SchoolInfo = {
    aboutUs: {
        inspirationalQuote: {
            inspirationalQuoteAuthor: string;
            inspirationalQuoteMessage: string;
        };
        messages: [{
            messageBy: string;
            messageContent: string;
            messageTitle: string;
            highlightedMessage: string;
        }]
    };
    latestNews: string;
    contactDetails: {
        email: string;
        phoneNumbers: string[];
    };
    schoolAddress: string;
    schoolName: string;
    noticeBoard: [
        {
            createdAt: Date;
            noticeContent: string;
        }
    ];
    contactUsThumbnail: string;
}