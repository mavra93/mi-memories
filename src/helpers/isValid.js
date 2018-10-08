const checkItem = (item) => {
    let isValid = false;
    switch (item.type) {
        case 'email':
            const emailRegex = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
            isValid = item.value && emailRegex.test(item.value);
            break;
        case 'password':
            isValid = item.value && item.value.length >= 6;
            break;
        case 'text':
            isValid = item.value && item.value.length > 0
    }
    return isValid;
};

const generateArray = (formElements) => {
    let generatedArray = [];
    Object.entries(formElements).forEach(([key, val]) => {
        if (val.hasOwnProperty('value') && val.hasOwnProperty('type')) {
            generatedArray.push(val);
        }
    });
    return generatedArray;
};

const isValid = (formElements, item) => {
    const formElementsArray = generateArray(formElements);
    return {
        isFormValid: formElementsArray.every(checkItem),
        isElValid: checkItem(formElements[item])
    }
};

export default isValid;