//Obtiene los productos
const deleteProducts = async (url) => {
    try {
        const { data } = await axios.delete(url);
        
    } catch (error) {
        console.log(error);
        alert("Sr Usuario, ocurrió un error")
        return {};
    }
};

export default deleteProducts;