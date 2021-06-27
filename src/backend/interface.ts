// Data Types
export interface STORY {
    body: string;
    datePublished: string;
    description: string;
    id: string;
    image: any;
    language: string;
    provider: any
    snippet: string
    title: string;
    url: string;
}

// Return Types

export interface STORIES {
    error: false;
    result: [STORY];
}

export interface ERROR {
    error: true;
    msg: string;
    obj?: any;
}