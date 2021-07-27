export interface Address {
    type: string,
    query: number[],
    features: [{
        place_name: string
    }],
    attribution: string
    
}