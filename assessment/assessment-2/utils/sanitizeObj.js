export const sanitizedObj = (allowFields, obj) => {
    const sanitizeData = {};
    for (const field in obj) {
        if (allowFields.includes(field)) {
            sanitizeData[field] = obj[field];
        }
    }
    return sanitizeData;
};
