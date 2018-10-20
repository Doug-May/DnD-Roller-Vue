module.exports = function validateInput(data) {

    function isEmpty(obj) {
        for(var key in obj) {
            if(obj.hasOwnProperty(key))
                return false;
        }
        return true;
    }

    let errors = {};

    if (data.addName.length < 2 || data.addName.length > 10) {
        errors.addName = 'Roll name must be between 2 and 10 characters';
    }

    if (data.addName == "" || data.addName === null || data.addName === undefined) {
        errors.addName = "Roll name is required";
    }

    return {
        errors,
        isValid: isEmpty(errors)
    };
};