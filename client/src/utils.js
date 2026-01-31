export const optimizeImage = (url, width = 500) => {
    if (url && url.includes('unsplash.com')) {
        // Remove existing width/quality params and add our own
        const baseUrl = url.split('?')[0];
        return `${baseUrl}?q=80&w=${width}&auto=format&fit=crop`;
    }
    return url;
};
