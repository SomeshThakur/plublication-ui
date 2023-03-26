export interface Publication {
    id: number
    title: string
    subTitle: string
    topic: string
    identificationNumber: string
    price: number
    type: PublicationType
    category: Category
    publishedDate: string
    createdAt: string
    updatedAt: string
}
export interface NewPublication {
    title: string
    sub_title: string
    topic: string
    type_id: number
    category_id: number
    identification_number: string
    published_date: string,
    price: string
}



export interface PublicationType {
    id: number
    name: string
    code: string
    createdAt: string
    updatedAt: string
}

export interface Category {
    id: number
    name: string
    code: string
    createdAt: string
    updatedAt: string
}

export type PublicationSectionType = {
    id: number;
    name: string;
    category_id: number;
};



export interface PublicationSection {
    id?: number
    title: string
    content: any
    sectionTypeId?: number,
    sectionType?: SectionType
    createdAt?: string
    updatedAt?: string
}

export interface SectionType {
    id: number
    name: string
    publicationCategory: PublicationCategory
    createdAt: any
    updatedAt: any
}

export interface PublicationCategory {
    id: number
    name: string
    code: string
    createdAt: any
    updatedAt: any
}
