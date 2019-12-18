export function editGuestsList (data) {
    return {
        type: 'GUEST_LIST',
        payload: data
    }
}

export function didUpdate (data) {
    return {
        type: 'DID_UPDATE',
        payload: data
    }
}