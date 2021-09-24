type feature = {
    type: String,
    properties:{
        id: Number,
        message: String
        iconSize: Number[]
    },
    geometry: {
        type: String,
        coordinates: [number, number]
    } 
}

export class marker{
    type: String
    features: feature[]
}
