module.exports = function validateInput(data) {

    function isEmpty(obj) {
        for(var key in obj) {
            if(obj.hasOwnProperty(key))
                return false;
        }
        return true;
    }

    let errors = {};

    if (data.roomName === "" || data.roomName === null || data.roomName === undefined) {
        errors.roomName = "Room name is required";
    }

    if (data.password === "" || data.password === null || data.password === undefined) {
        errors.password = "password is required";
    }

    return {
        errors,
        isValid: isEmpty(errors)
    };
};