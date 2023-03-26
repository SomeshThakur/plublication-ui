import { Publication } from "./publication"
import { UserDetails } from "./users"

export interface Order {
    id: number
    receiver: UserDetails
    amount: number
    items: Item[]
    createdAt: string
    updatedAt: string
}

export interface Item {
    id: number
    publication: Publication
    quantity: number
    unitPrice: number
    amount: number
    createdAt: string
    updatedAt: string
}


export interface NewOrder {
    receiver_id: string
    order_items: OrderItem[]
}

export interface OrderItem {
    publication_id: string
    quantity: string
}
