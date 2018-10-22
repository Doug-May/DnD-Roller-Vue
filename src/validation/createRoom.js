module.exports = function validateInput(data) {

    function isEmpty(obj) {
        for(var key in obj) {
            if(obj.hasOwnProperty(key))
                return false;
        }
        return true;
    }

    let errors = {};

    if (data.roomName.length < 2 || data.roomName.length > 10) {
        errors.roomName = 'Room name must be between 2 and 10 characters';
    }

    if (data.roomName == "" || data.roomName === null || data.roomName === undefined) {
        errors.roomName = "Room name is required";
    }

    if (data.password.length < 2 || data.password.length > 20) {
        errors.password = 'Password must be between 2 and 20 characters';
    }

    if (data.password == "" || data.password === null || data.password === undefined) {
        errors.password = "Password is required";
    }

    return {
        errors,
        isValid: isEmpty(errors)
    };
};