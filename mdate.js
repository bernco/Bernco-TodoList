module.exports.getDate = () => {

    // define options using toLocaleDateString
    const options = {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric"
    };
    return new Date().toLocaleDateString(undefined, options);

}

module.exports.getDay = () =>{
    const options = {
        weekday: "long",
    }
    return new Date().toLocaleDateString(undefined, options);
}