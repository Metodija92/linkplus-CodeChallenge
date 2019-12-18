const initialGuestsState = {
    guestsList: [],
    didUpdate: false
}

export function guestsReducer (state = initialGuestsState, action) {
    switch(action.type) {
        case 'GUEST_LIST' : {
            return {
                ...state,
                guestsList: action.payload
            }
        }
        case 'DID_UPDATE' : {
            return {
                ...state,
                didUpdate: action.payload
            }
        }
        default: {
            return {...state}
        }
    }
}