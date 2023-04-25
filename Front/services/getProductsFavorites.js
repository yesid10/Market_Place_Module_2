const getProductsFavorites = async (url) => {
    try {
        const { data } = await axios.get(url);
        
        return data;
    } catch (error) {
        console.log(error);
        alert("Sr Usuario, ocurrió un error")
        return {};
    }
};
export default getProductsFavorites;